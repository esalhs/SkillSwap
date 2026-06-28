import { FC, useRef, useState, useEffect } from 'react'
import { User, SkillDomain } from '@/shared/types'
import { CardUser } from '@/widgets/CardUser'
import { ChevronRightIcon } from '@/shared/ui/Icons/ChevronRightIcon'
import {
  getAge,
  getSkillName,
  getCategoryNames,
  getSkillsFromDomains,
  getCategoriesFromDomains,
} from '../../shared/lib/helpers'
import styles from './CardSlider.module.css'

type CardSliderProps = {
  title: string
  users: User[]
  domains: SkillDomain[]
  onLikeClick?: (userId: string) => void
  onDetailsClick?: (userId: string) => void
  likedUserIds?: string[]
}

export const CardSlider: FC<CardSliderProps> = ({
  title,
  users,
  domains = [],
  onLikeClick,
  onDetailsClick,
  likedUserIds = [],
}) => {
  const skills = getSkillsFromDomains(domains)
  const categories = getCategoriesFromDomains(domains)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  /*  отвечает за  включение/выключение стрелок */
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current

      // Левая стрелка: показываем, если ушли от начала дальше 10px
      setShowLeftArrow(scrollLeft > 10)

      // Математическое округление для надежного скрытия правой стрелки на любых мониторах
      const isEndReached = Math.ceil(scrollLeft + clientWidth) >= Math.floor(scrollWidth - 10)
      const hasScrollableContent = scrollWidth > clientWidth

      setShowRightArrow(hasScrollableContent && !isEndReached)
    }
  }

  useEffect(() => {
    const slider = sliderRef.current

    checkScrollPosition()

    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition)
    }
    window.addEventListener('resize', checkScrollPosition)

    // Отслеживаем динамическое появление карточек в DOM через ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      checkScrollPosition()
    })
    if (slider) resizeObserver.observe(slider)

    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScrollPosition)
        resizeObserver.unobserve(slider)
      }
      window.removeEventListener('resize', checkScrollPosition) // Безопасное удаление глобального события
      resizeObserver.disconnect()
    }
  }, [users, domains])

  /*функция прокрутки карточек */
  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      // Замеряем реальную ширину карточки на экране + gap (24px)
      const firstCard = sliderRef.current.querySelector(`.${styles.cardItem}`) as HTMLElement
      const cardWidth = firstCard ? firstCard.offsetWidth : 324
      const gap = 24
      const scrollAmount = cardWidth + gap

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
          {users.map((user) => {
            const age = getAge(user.birthday)
            const isLiked = likedUserIds.includes(user.id)

            return (
              <div key={user.id} className={styles.cardItem}>
                <CardUser
                  avatarUrl={user.avatarUrl}
                  name={user.fullName}
                  location={user.location}
                  age={age}
                  skillCan={getSkillName(skills, user.idSkill)}
                  skillWant={getCategoryNames(categories, user.favoriteCategories)}
                  domains={domains}
                  isLiked={isLiked}
                  onLikeClick={onLikeClick ? () => onLikeClick(user.id) : undefined}
                  onDetailsClick={onDetailsClick ? () => onDetailsClick(user.id) : undefined}
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
