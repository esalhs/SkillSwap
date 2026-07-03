import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleLike, selectFavoriteUserIds } from '@/store/favoritesSlice';

import { useDebounce } from '@/shared/hooks/useDebounce';
import { fetchUsers } from '@/api/users';
import { fetchSkillDomains } from '@/api/skills';
import { getSkillsFromDomains } from '@/shared/lib/helpers';
import { ROUTES } from '@/shared/lib/constants';

import { InfiniteCardList } from '@/widgets/InfiniteCardList';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/Footer';
import { CardSection } from '@/widgets/CardSection';
import { SidebarPanel } from '@/widgets/SidebarFilters/SidebarPanel';
import { ActiveFiltersBar } from '@/widgets/SidebarFilters/ActiveFiltersBar';
import { Modal } from '@/shared/ui/Modal';
import { ModalOfferCreated } from '@/shared/ui/ModalOfferCreated';

import type { User, SkillDomain } from '@/shared/types';
import styles from './CatalogPage.module.css';
import cities from '../../../public/db/cities.json';

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
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // Логика поиска (из feature/search)
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';
  const categoryFromUrl = searchParams.get('category') || '';
  const debouncedSearch = useDebounce(searchFromUrl, 300);

  const isAuth = false; // TODO: заменить на реальную проверку авторизации
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

  // Проверка флага успешной регистрации в sessionStorage
  useEffect(() => {
    const showOfferModal = sessionStorage.getItem('showOfferModal');
    if (showOfferModal === 'true') {
      setIsOfferModalOpen(true);
      sessionStorage.removeItem('showOfferModal');
    }
  }, []);

  // Установка категории из URL в фильтры
  useEffect(() => {
    if (categoryFromUrl) {
      setFilters((prev) => ({
        ...prev,
        categories: [categoryFromUrl],
      }));
    }
  }, [categoryFromUrl]);

  // Фильтрация по фильтрам и поиску
  const filteredUsers = users.filter((user) => {
    // 1. Фильтрация по типу (want/can/all)
    if (filters.type !== 'all') {
      const userHasSkill = domains.some((domain) =>
        domain.categories.some((category) =>
          category.skills.some((skill) => skill.id === user.idSkill),
        ),
      );

      if (filters.type === 'can' && !userHasSkill) return false;

      if (filters.type === 'want') {
        const userWantsSkill = user.favoriteCategories.some((catId) =>
          domains.some((domain) =>
            domain.categories.some((category) => category.id === catId),
          ),
        );
        if (!userWantsSkill) return false;
      }
    }

    // 2. Фильтрация по полу
    if (filters.sex !== 'any' && user.sex !== filters.sex) return false;

    // 3. Фильтрация по категориям
    if (filters.categories.length > 0) {
      const hasMatchingCategory = user.favoriteCategories.some((catId) =>
        filters.categories.includes(catId),
      );
      if (!hasMatchingCategory) return false;
    }

    // 4. Фильтрация по городам (filters.cities содержит id, user.location — название)
    if (filters.cities.length > 0) {
      const cityNames = filters.cities
        .map((id) => cities.find((c) => c.id === id)?.name)
        .filter(Boolean) as string[];
      if (!cityNames.includes(user.location)) return false;
    }

    // 5. Текстовый поиск
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      const nameMatch = user.fullName.toLowerCase().includes(query);
      const skills = getSkillsFromDomains(domains);
      const userSkill = skills.find((s) => s.id === user.idSkill);
      const skillMatch = userSkill?.name?.toLowerCase().includes(query) ?? false;
      if (!nameMatch && !skillMatch) return false;
    }

    return true;
  });

  const handleLikeClick = (userId: string) => {
    dispatch(toggleLike(userId));
  };

  const handleDetailsClick = (userId: string) => {
    navigate(ROUTES.SKILL.replace(':id', userId));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleRemoveFilter = (key: string, value: string) => {
    setFilters((prev: FiltersState) => {
      if (key === 'type' || key === 'sex') {
        return {
          ...prev,
          [key]: key === 'type' ? ('all' as const) : ('any' as const),
        };
      }
      return {
        ...prev,
        [key]: (prev[key as keyof FiltersState] as string[]).filter(
          (id: string) => id !== value
        ),
      };
    });
  };

  const firstTitle = isAuth ? 'Точное совпадение' : 'Популярное';
  const secondTitle = isAuth ? 'Новые идеи' : 'Новое';

  const firstSectionUsers = users.slice(0, 6);
  const secondSectionUsers = users.slice(6, 12);
  const thirdSectionUsers = users.slice(12, 18);

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
      <div className={styles.wrapper}>
        <ActiveFiltersBar
          filters={filters}
          onReset={handleResetFilters}
          onRemoveFilter={handleRemoveFilter}
        />
        <div className={styles.content}>
          <SidebarPanel filters={filters} onChange={setFilters} />
          <main className={styles.main}>
            {hasActiveFilters || debouncedSearch ? (
              // Режим поиска и/или фильтров: показываем отфильтрованные результаты
              <InfiniteCardList
                title={debouncedSearch ? 'Результаты поиска' : 'Подходящие предложения'}
                totalCount={filteredUsers.length}
                users={filteredUsers}
                domains={domains}
                likedUserIds={likedUserIds}
                onLikeClick={handleLikeClick}
                onDetailsClick={handleDetailsClick}
                onSortClick={() => {}} // TODO: логика сортировки
              />
            ) : (
              // Обычный режим: секции карточек
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
      </div>
      <Footer />

      {/* Модальное окно успешного создания предложения */}
      <Modal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)}>
        <ModalOfferCreated onClose={() => setIsOfferModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default CatalogPage;