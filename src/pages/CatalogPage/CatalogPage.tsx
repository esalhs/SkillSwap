import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { fetchUsers } from '@/api/users'
import { fetchSkillDomains } from '@/api/skills'
import { InfiniteCardList } from '@/widgets/InfiniteCardList'
import { getSkillsFromDomains } from '@/shared/lib/helpers'
import type { User, SkillDomain } from '@/shared/types'
import styles from './CatalogPage.module.css'



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
  const [users, setUsers] = useState<User[]>([])
  const [domains, setDomains] = useState<SkillDomain[]>([])
  const [loading, setLoading] = useState(true)

  const [searchParams] = useSearchParams()
  const searchFromUrl = searchParams.get('search') || ''
  const debouncedSearch = useDebounce(searchFromUrl, 300)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, domainsData] = await Promise.all([
          fetchUsers(),
          fetchSkillDomains(),
        ])
        setUsers(usersData)
        setDomains(domainsData)
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredUsers = users.filter((user) => {
    if (!debouncedSearch) return false
    const query = debouncedSearch.toLowerCase()

    const nameMatch = user.fullName.toLowerCase().includes(query)

    const skills = getSkillsFromDomains(domains)
    const userSkill = skills.find((s) => s.id === user.idSkill)
    const skillMatch = userSkill?.name?.toLowerCase().includes(query) ?? false

    return nameMatch || skillMatch
  })

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
        {debouncedSearch ? (
          <main className={styles.main}>
            {filteredUsers.length > 0 ? (
              <InfiniteCardList
                title="Результаты поиска"
                domains={domains}
                users={filteredUsers}
              />
            ) : (
              <div className={styles.loading}>Ничего не найдено</div>
            )}
          </main>
        ) : (
          <>
            <SidebarPanel />
            <main className={styles.main}>
              <ActiveFiltersBar />
              <div className={styles.sections}>
                <CardSectionStub title="Популярное" />
                <CardSectionStub title="Новое" />
                <CardSectionStub title="Рекомендуем" />
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
