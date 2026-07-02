import { useState, useEffect, useMemo } from 'react';
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
import { filterUsers, hasActiveFilters } from '@/shared/lib/helpers';
import type { User, SkillDomain, FiltersState } from '@/shared/types';
import { ROUTES } from '@/shared/lib/constants';
import styles from './CatalogPage.module.css';

type City = {
  id: string;
  name: string;
  country: string;
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
  const [cityIdToName, setCityIdToName] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  const isAuth = false;
  const isFiltered = hasActiveFilters(filters);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, domainsData, citiesRes] = await Promise.all([
          fetchUsers(),
          fetchSkillDomains(),
          fetch('/db/cities.json'),
        ]);

        const citiesData: City[] = await citiesRes.json();
        const citiesMap = new Map<string, string>();
        citiesData.forEach((city: City) => {
          citiesMap.set(city.id, city.name);
        });

        setUsers(usersData);
        setDomains(domainsData);
        setCityIdToName(citiesMap);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredUsers = useMemo(
    () => filterUsers(users, filters, domains, cityIdToName),
    [users, filters, domains, cityIdToName]
  );

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

  const firstTitle = isAuth ? 'Точное совпадение' : 'Популярное';
  const secondTitle = isAuth ? 'Новые идеи' : 'Новое';

  const firstSectionUsers = filteredUsers.slice(0, 6);
  const secondSectionUsers = filteredUsers.slice(6, 12);
  const thirdSectionUsers = filteredUsers.slice(12, 18);

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
          {isFiltered ? (
            <InfiniteCardList
              title="Подходящие предложения"
              totalCount={filteredUsers.length}
              users={filteredUsers}
              domains={domains}
              likedUserIds={likedUserIds}
              onLikeClick={handleLikeClick}
              onDetailsClick={handleDetailsClick}
            />
          ) : (
            <div className={styles.sections}>
              <CardSection
                title={firstTitle}
                users={firstSectionUsers}
                domains={domains}
                likedUserIds={likedUserIds}
                onLikeClick={handleLikeClick}
                onDetailsClick={handleDetailsClick}
              />
              <CardSection
                title={secondTitle}
                users={secondSectionUsers}
                domains={domains}
                likedUserIds={likedUserIds}
                onLikeClick={handleLikeClick}
                onDetailsClick={handleDetailsClick}
              />
              <CardSection
                title="Рекомендуем"
                users={thirdSectionUsers}
                domains={domains}
                likedUserIds={likedUserIds}
                onLikeClick={handleLikeClick}
                onDetailsClick={handleDetailsClick}
              />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CatalogPage;
