import { useState, useEffect } from 'react';
import styles from './CatalogPage.module.css';
import { CardSection } from '@/widgets/CardSection';
import type { User } from '@/widgets/CardSection';

// TODO: Заменить на реальный компонент после реализации
const ActiveFiltersBar = () => (
  <div className={styles.filterBar}>
    TODO: Sidebar Filters в разработке
  </div>
);

// TODO: Заменить на реальный компонент после реализации
const SidebarPanel = () => (
  <aside className={styles.sidebar}>
    TODO: Sidebar Filters в разработке
  </aside>
);

type FiltersState = {
  skills: string[];
  cities: string[];
};

const DEFAULT_FILTERS: FiltersState = {
  skills: [],
  cities: [],
};

type SkillDomain = {
  id: string;
  name: string;
  categories: {
    id: string;
    name: string;
    skills: {
      id: string;
      name: string;
      description: string;
      skillImages: string[];
      authorId: string;
      likedByUserIds: string[];
    }[];
  }[];
};

export const CatalogPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [domains, setDomains] = useState<SkillDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, skillsRes] = await Promise.all([
          fetch('/db/users.json'),
          fetch('/db/skills.json'),
        ]);

        const usersData: User[] = await usersRes.json();
        const skillsData = await skillsRes.json();

        setUsers(usersData);
        setDomains(skillsData.skillDomains);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredUsers = users;

  const popularUsers = filteredUsers.slice(0, 6);
  const newUsers = filteredUsers.slice(6, 12);
  const recommendedUsers = filteredUsers.slice(12, 18);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <SidebarPanel />
        <main className={styles.main}>
          <ActiveFiltersBar />
          <div className={styles.sections}>
            <CardSection
              title="Популярное"
              users={popularUsers}
              domains={domains}
            />
            <CardSection
              title="Новое"
              users={newUsers}
              domains={domains}
            />
            <CardSection
              title="Рекомендуем"
              users={recommendedUsers}
              domains={domains}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
