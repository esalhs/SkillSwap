
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleLike, selectFavoriteUserIds } from '@/store/favoritesSlice';
import { useMemo, useState, useEffect } from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/Footer';
import { InfiniteCardList } from '@/widgets/InfiniteCardList';
import { fetchUsers } from '@/api/users';
import { fetchSkillDomains } from '@/api/skills';
import type { User, SkillDomain } from '@/shared/types';
import { ROUTES } from '@/shared/lib/constants';
import styles from './FavoritesPage.module.css';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const likedUserIds = useAppSelector(selectFavoriteUserIds);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [domains, setDomains] = useState<SkillDomain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, domainsData] = await Promise.all([
          fetchUsers(),
          fetchSkillDomains(),
        ]);
        setAllUsers(usersData);
        setDomains(domainsData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Фильтруем только лайкнутых пользователей
  const favoriteUsers = useMemo(
    () => allUsers.filter((user: User) => likedUserIds.includes(user.id)),
    [allUsers, likedUserIds]
  );

  const handleLikeClick = (userId: string) => {
    dispatch(toggleLike(userId));
  };

  const handleDetailsClick = (userId: string) => {
    const user = allUsers.find((u: User) => u.id === userId);
    if (user) {
      navigate(ROUTES.SKILL.replace(':id', user.idSkill));
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.loading}>Загрузка...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        {favoriteUsers.length > 0 ? (
          <InfiniteCardList
            title="Избранное"
            users={favoriteUsers}
            domains={domains}
            likedUserIds={likedUserIds}
            onLikeClick={handleLikeClick}
            onDetailsClick={handleDetailsClick}
          />
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Пока нет избранных предложений</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
