import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { toggleLike, selectFavoriteUserIds } from '@/store/favoritesSlice'
import { selectUser } from '@/features/auth/model/AuthSlice'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { fetchUsers } from '@/api/users'
import { fetchSkillDomains } from '@/api/skills'
import { getSkillsFromDomains } from '@/shared/lib/helpers'
import { ROUTES } from '@/shared/lib/constants'

import { InfiniteCardList } from '@/widgets/InfiniteCardList'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/Footer'
import { CardSection } from '@/widgets/CardSection'
import { SidebarPanel } from '@/widgets/SidebarFilters/SidebarPanel'
import { ActiveFiltersBar } from '@/widgets/SidebarFilters/ActiveFiltersBar'
import { ModalOfferCreated } from '@/shared/ui/ModalOfferCreated/ModalOfferCreated'

import type { User, SkillDomain, FiltersState } from '@/shared/types'
import styles from './CatalogPage.module.css'

type City = {
  id: string
  name: string
}

const DEFAULT_FILTERS: FiltersState = {
  type: 'all',
  sex: 'any',
  categories: [],
  cities: [],
}

export const CatalogPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const likedUserIds = useAppSelector(selectFavoriteUserIds)
  const user = useAppSelector(selectUser)

  const [users, setUsers] = useState<User[]>([])
  const [domains, setDomains] = useState<SkillDomain[]>([])
  const [cityIdToName, setCityIdToName] = useState<Map<string, string>>(new Map())
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS)

  // Модалка после создания оффера
  const [showOfferModal, setShowOfferModal] = useState(() =>
    (location.state as { showOfferModal?: boolean } | undefined)?.showOfferModal ?? false
  )

  // Поиск
  const [searchParams] = useSearchParams()
  const searchFromUrl = searchParams.get('search') || ''
  const debouncedSearch = useDebounce(searchFromUrl, 300)

  const isAuth = !!user

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, domainsData, citiesRes] = await Promise.all([
          fetchUsers(),
          fetchSkillDomains(),
          fetch('/db/cities.json'),
        ])
        const citiesData: City[] = await citiesRes.json()

        const citiesMap = new Map<string, string>()
        citiesData.forEach((city: City) => {
          citiesMap.set(city.id, city.name)
        })

        setUsers(usersData)
        setDomains(domainsData)
        setCityIdToName(citiesMap)
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Проверка, есть ли активные фильтры (включая города)
  const hasActiveFilters = useMemo(
    () =>
      filters.categories.length > 0 ||
      filters.cities.length > 0 ||
      filters.type !== 'all' ||
      filters.sex !== 'any',
    [filters]
  )

  // Фильтрация по фильтрам (включая города)
  const filteredByFilters = useMemo(() => {
    return users.filter((u) => {
      // Фильтр по полу
      if (filters.sex !== 'any' && u.sex !== filters.sex) return false

      // Фильтр по категориям навыков (favoriteCategories)
      if (
        filters.categories.length > 0 &&
        !filters.categories.some((catId) => u.favoriteCategories.includes(catId))
      )
        return false

      // Фильтр по городам (location — название города)
      if (filters.cities.length > 0) {
        const userCityName = cityIdToName.get(u.location) || u.location
        const selectedCityNames = filters.cities.map((cityId) => cityIdToName.get(cityId) || '')
        if (!selectedCityNames.includes(userCityName)) return false
      }

      // Фильтр по типу (want/can) — проверяем через idSkill и favoriteCategories
      if (filters.type !== 'all') {
        const userHasSkill = domains.some((domain) =>
          domain.categories.some((cat) =>
            cat.skills.some((skill) => skill.id === u.idSkill)
          )
        )
        const userWantsSkill = u.favoriteCategories.length > 0

        if (filters.type === 'can' && !userHasSkill) return false
        if (filters.type === 'want' && !userWantsSkill) return false
      }

      return true
    })
  }, [users, filters, domains, cityIdToName])

  // Текстовый поиск поверх уже отфильтрованных данных
  const finalUsers = useMemo(() => {
    if (!debouncedSearch) return filteredByFilters

    const query = debouncedSearch.toLowerCase()
    const skills = getSkillsFromDomains(domains)

    return filteredByFilters.filter((user) => {
      const nameMatch = user.fullName.toLowerCase().includes(query)

      const userSkill = skills.find((s) => s.id === user.idSkill)
      const skillMatch = userSkill?.name?.toLowerCase().includes(query) ?? false

      return nameMatch || skillMatch
    })
  }, [filteredByFilters, debouncedSearch, domains])

  const handleLikeClick = (userId: string) => {
    dispatch(toggleLike(userId))
  }

  const handleDetailsClick = (userId: string) => {
    navigate(ROUTES.SKILL.replace(':id', userId))
  }

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const handleRemoveFilter = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => {
      if (key === 'type' || key === 'sex') {
        return {
          ...prev,
          [key]: key === 'type' ? 'all' : 'any',
        }
      }
      return {
        ...prev,
        [key]: (prev[key] as string[]).filter((id: string) => id !== value),
      }
    })
  }

  const firstTitle = isAuth ? 'Точное совпадение' : 'Популярное'
  const secondTitle = isAuth ? 'Новые идеи' : 'Новое'

  // Нарезка уже отфильтрованного и отпоискованного массива (как в старой версии)
  const firstSectionUsers = finalUsers.slice(0, 6)
  const secondSectionUsers = finalUsers.slice(6, 12)
  const thirdSectionUsers = finalUsers.slice(12, 18)

  if (loading) {
    return (
      <div className={styles.page}>
        <Header userData={user ? { name: user.name, avatarUrl: null } : undefined} />
        <div className={styles.loading}>Загрузка...</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <Header userData={user ? { name: user.name, avatarUrl: null } : undefined} />
      <div className={styles.wrapper}>
        <ActiveFiltersBar
          filters={filters}
          onReset={handleResetFilters}
          onRemoveFilter={handleRemoveFilter}
        />
        <div className={styles.content}>
          <SidebarPanel filters={filters} onChange={setFilters} />
          <main className={styles.main}>
            {debouncedSearch ? (
              // Режим поиска: показываем только результаты поиска
              <InfiniteCardList
                title="Результаты поиска"
                totalCount={finalUsers.length}
                users={finalUsers}
                domains={domains}
                likedUserIds={likedUserIds}
                onLikeClick={handleLikeClick}
                onDetailsClick={handleDetailsClick}
              />
            ) : hasActiveFilters ? (
              // Есть активные фильтры, но нет текстового поиска
              <InfiniteCardList
                title="Подходящие предложения"
                totalCount={filteredByFilters.length}
                users={filteredByFilters}
                domains={domains}
                likedUserIds={likedUserIds}
                onLikeClick={handleLikeClick}
                onDetailsClick={handleDetailsClick}
                onSortClick={() => {}} // TODO: логика сортировки
              />
            ) : (
              // Обычный режим: секции карточек из уже отфильтрованного массива
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

      {showOfferModal && (
        <ModalOfferCreated onClose={() => setShowOfferModal(false)} />
      )}
    </div>
  )
}

export default CatalogPage
