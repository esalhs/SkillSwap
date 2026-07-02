import { CardUser } from '@/widgets/CardUser'
import type { User, SkillDomain } from '@/shared/types'
import {
  getAge,
  getCategoryNames,
  getSkillName,
  getSkillsFromDomains,
  getCategoriesFromDomains,
} from '../../shared/lib/helpers'
import styles from './InfiniteCardList.module.css'
import { Button } from '@/shared/ui/Button'
import { SortIcon } from '@/shared/ui/Icons'
import { useEffect, useRef, useState } from 'react'

export type InfiniteCardListProps = {
  title: string
  domains: SkillDomain[]
  users: User[]
  totalCount?: number // если передан — показывает "Подходящие предложения: N"
  likedUserIds?: string[]
  onSortClick?: () => void // реализует сортировку при фильтрации (другая задача)
  sentOfferUserIds?: string[]
  onLikeClick?: (userId: string) => void
  onDetailsClick?: (userId: string) => void
  onAcceptClick?: (userId: string) => void
  onDeclineClick?: (userId: string) => void
  showRequestActions?: boolean
}

export function InfiniteCardList({
  title,
  domains,
  users,
  totalCount,
  likedUserIds,
  onSortClick,
  sentOfferUserIds,
  onLikeClick,
  onDetailsClick,
  onAcceptClick,
  onDeclineClick,
  showRequestActions,
}: InfiniteCardListProps) {
  // Реализация бесконечной подгрузки
  const [visibleCount, setVisibleCount] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const visibleUsers = users.slice(0, visibleCount)

  const skills = getSkillsFromDomains(domains)
  const categories = getCategoriesFromDomains(domains)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !isLoading && visibleCount < users.length) {
          setIsLoading(true)
          setVisibleCount((prev) => prev + 3)
          setTimeout(() => setIsLoading(false), 300) // Защита от дублирующихся подгрузок при быстром скролле
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [isLoading, visibleCount, users.length])
  return (
    <div className={styles.cardList}>
      {totalCount !== undefined ? (
        <div className={styles.cardList__header}>
          <h2>Подходящие предложения: {totalCount}</h2>
          {onSortClick && (
            <Button
              icon={<SortIcon />}
              iconPosition="before"
              variant="tertiary"
              onClick={onSortClick}
            >
              Сначала новые
            </Button>
          )}
        </div>
      ) : (
        <h2>{title}</h2>
      )}
      <div className={styles.cardList__users}>
        {visibleUsers.map((user) => {
          const skillCan = getSkillName(skills, user.idSkill)
          const skillWant = getCategoryNames(categories, user.favoriteCategories)
          const age = getAge(user.birthday)

          return (
            <CardUser
              domains={domains}
              key={user.id}
              name={user.fullName}
              avatarUrl={user.avatarUrl}
              location={user.location}
              age={age}
              skillCan={skillCan}
              skillWant={skillWant}
              isLiked={likedUserIds?.includes(user.id)}
              onLikeClick={() => onLikeClick?.(user.id)}
              onDetailsClick={showRequestActions ? undefined : () => onDetailsClick?.(user.id)}
              isOfferSent={sentOfferUserIds?.includes(user.id)}
              onAcceptClick={
                showRequestActions && onAcceptClick ? () => onAcceptClick(user.id) : undefined
              }
              onDeclineClick={
                showRequestActions && onDeclineClick ? () => onDeclineClick(user.id) : undefined
              }
            />
          )
        })}
      </div>
      <div ref={sentinelRef} style={{ height: '1px' }} />
    </div>
  )
}

export default InfiniteCardList
