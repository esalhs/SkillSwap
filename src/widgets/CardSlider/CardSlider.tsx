import { FC, useRef, useState, useEffect } from 'react'
import { User } from '@/shared/types' 
import { CardUser } from '@/widgets/CardUser'
import { ChevronRightIcon } from '@/shared/ui/Icons/ChevronRightIcon'
import { getAge, getSkillName, getCategoryNames } from '../../shared/lib/helpers'
import styles from './CardSlider.module.css'

type CardSliderProps = {
  title: string
  users: User[]
  onLikeClick?: (userId: string) => void
  onDetailsClick?: (userId: string) => void
  likedUserIds?: string[]
}

export const CardSlider: FC<CardSliderProps> = ({
  title,
  users,
  onLikeClick,
  onDetailsClick,
  likedUserIds = [],
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  /*  отвечает за  включение/выключение стрелок */
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }

  useEffect(() => {
    const slider = sliderRef.current
    if (slider) {
      checkScrollPosition()
      slider.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', checkScrollPosition)
    }

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScrollPosition)
      }
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [users])

  /* функция прокрутки карточек */
  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 348 
      const newScrollPosition =
        direction === 'left'
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount

      sliderRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      })
    }
  }

  if (!users || users.length === 0) return null

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.wrapper}>
        {showLeftArrow && (
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowLeft}`}
            onClick={() => handleScroll('left')}
            aria-label="Прокрутить влево"
          >
            <ChevronRightIcon />
          </button>
        )}

        <div className={styles.slider} ref={sliderRef}>
          {users.map((baseUser) => {
            const user = baseUser as any
            const age = getAge(user.birthday)
            const skillCan = getSkillName(user.idSkill)
            const skillWant = getCategoryNames(user.favoriteCategories || [])
            const isLiked = likedUserIds.includes(user.id)

            return (
              <div key={user.id} className={styles.cardItem}>
                
        <CardUser
          avatarUrl={user.avatarUrl}
          name={user.name} // Безопасное чтение имени
          location={user.location || user.city || 'Не указан'}
          age={age}
          skillCan={skillCan}
          skillWant={skillWant}
          bio={user.bio ?? undefined}
          isLiked={isLiked}
          onLikeClick={onLikeClick ? () => onLikeClick(user.id) : undefined}
          onDetailsClick={onDetailsClick ? () => onDetailsClick(user.id) : undefined}
          isOfferSent={user.isOfferSent}
        />
              </div>
            )
          })}
        </div>

        {showRightArrow && (
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowRight}`}
            onClick={() => handleScroll('right')}
            aria-label="Прокрутить вправо"
          >
            <ChevronRightIcon />
          </button>
        )}
      </div>
    </section>
  )
}