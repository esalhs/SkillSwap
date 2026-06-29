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

const CatalogPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetch('/db/users.json'),
          fetch('/db/skills.json'),
        ]);
        // Данные загружены, в будущем будут использоваться в CardSection и фильтрах
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
