import { useState, useEffect } from 'react';
import styles from './CatalogPage.module.css';

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

// TODO: Заменить на CardSection после мержа виджета
const CardSectionStub = ({ title }: { title: string }) => (
  <section className={styles.sectionStub}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <div className={styles.sectionContent}>
      TODO: Секция «{title}» — заменить на CardSection после мержа feature/card-section
    </div>
  </section>
);

// Состояние фильтров будет использоваться после реализации SidebarPanel и ActiveFiltersBar
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type FiltersState = {
  skills: string[];
  cities: string[];
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

const CatalogPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [domains, setDomains] = useState<SkillDomain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, skillsRes] = await Promise.all([
          fetch('/db/users.json'),
          fetch('/db/skills.json'),
        ]);

        const usersData = await usersRes.json();
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
            <CardSectionStub title="Популярное" />
            <CardSectionStub title="Новое" />
            <CardSectionStub title="Рекомендуем" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;
