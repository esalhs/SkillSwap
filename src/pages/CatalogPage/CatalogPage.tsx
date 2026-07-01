import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleLike, selectFavoriteUserIds } from '@/store/favoritesSlice';
import { fetchUsers } from '@/api/users';
import { fetchSkillDomains } from '@/api/skills';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/Footer';
import { CardSection } from '@/widgets/CardSection';
import { InfiniteCardList } from '@/widgets/InfiniteCardList';
import { SidebarPanel } from '@/widgets/SidebarFilters/SidebarPanel';
import { ActiveFiltersBar } from '@/widgets/SidebarFilters/ActiveFiltersBar';
import type { User, SkillDomain } from '@/shared/types';
import { ROUTES } from '@/shared/lib/constants';
import styles from './CatalogPage.module.css';

type FiltersState = {
  type: 'all' | 'want' | 'can';
  sex: 'any' | 'male' | 'female';
  categories: string[];
  cities: string[];
};

const DEFAULT_FILTERS: FiltersState = {
  type: 'all',
  sex: 'any',
  categories: [],
  cities: [],
};

export const CatalogPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const likedUserIds = useAppSelector(selectFavoriteUserIds);

  const [users, setUsers] = useState<User[]>([]);
  const [domains, setDomains] = useState<SkillDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  const isAuth = false;
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.cities.length > 0 ||
    filters.type !== 'all' ||
    filters.sex !== 'any';

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, domainsData] = await Promise.all([
          fetchUsers(),
          fetchSkillDomains(),
        ]);
        setUsers(usersData);
        setDomains(domainsData);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLikeClick = (userId: string) => {
    dispatch(toggleLike(userId));
  };

  const handleDetailsClick = (userId: string) => {
    const user = users.find((u: User) => u.id === userId);
    if (user) {
      navigate(ROUTES.SKILL.replace(':id', user.idSkill));
    }
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleRemoveFilter = (key: string, value: string) => {
    setFilters((prev: FiltersState) => {
      if (key === 'type' || key === 'sex') {
        return { ...prev, [key]: key === 'type' ? 'all' as const : 'any' as const };
      }
      return {
        ...prev,
        [key]: (prev[key as keyof FiltersState] as string[]).filter((id: string) => id !== value),
      };
    });
  };

  const getSectionTitles = () => {
    if (hasActiveFilters) {
      return {
        first: 'Подходящие предложения',
        second: 'Рекомендуем',
        third: null as string | null,
      };
    }
    if (isAuth) {
      return {
        first: 'Точное совпадение',
        second: 'Новые идеи',
        third: 'Рекомендуем',
      };
    }
    return {
      first: 'Популярное',
      second: 'Новое',
      third: 'Рекомендуем',
    };
  };

  const sectionTitles = getSectionTitles();

  const firstSectionUsers = users.slice(0, 6);
  const secondSectionUsers = users.slice(6, 12);
  const thirdSectionUsers = users.slice(12, 18);
  const remainingUsers = users.slice(18);

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
        <SidebarPanel filters={filters} onChange={setFilters} />
        <main className={styles.main}>
          <ActiveFiltersBar
            filters={filters}
            onReset={handleResetFilters}
            onRemoveFilter={handleRemoveFilter}
          />
          <div className={styles.sections}>
            <CardSection
              title={sectionTitles.first}
              users={firstSectionUsers}
              domains={domains}
              likedUserIds={likedUserIds}
              onLikeClick={handleLikeClick}
              onDetailsClick={handleDetailsClick}
            />
            <CardSection
              title={sectionTitles.second}
              users={secondSectionUsers}
              domains={domains}
              likedUserIds={likedUserIds}
              onLikeClick={handleLikeClick}
              onDetailsClick={handleDetailsClick}
            />
            {sectionTitles.third && (
              <CardSection
                title={sectionTitles.third}
                users={thirdSectionUsers}
                domains={domains}
                likedUserIds={likedUserIds}
                onLikeClick={handleLikeClick}
                onDetailsClick={handleDetailsClick}
              />
            )}
          </div>
          {remainingUsers.length > 0 && (
            <InfiniteCardList
              title="Все пользователи"
              users={remainingUsers}
              domains={domains}
              likedUserIds={likedUserIds}
              onLikeClick={handleLikeClick}
              onDetailsClick={handleDetailsClick}
            />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CatalogPage;
