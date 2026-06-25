import styles from './CardUser.module.css'
import { IconButton } from '@/shared/ui/IconAction'
import LikeIcon from '../../shared/ui/Icons/LikeIcon'
import { UserIcon } from '../../shared/ui/UserIcon/UserIcon'
import { useMemo } from 'react'
import { Button } from '@/shared/ui/Button'
import { getYearDeclension } from '../../shared/lib/helpers'

export type CardUserProps = {
  avatarUrl: string | null
  name: string
  location: string
  age: number
  skillCan: string
  skillWant: string[]
  isLiked?: boolean
  onLikeClick?: () => void
  onDetailsClick?: () => void
}

export function CardUser({
  avatarUrl,
  name,
  location,
  age, // Для возраста есть функция getAge в helpers.ts, которая преобразует birthday в возраст, пропс возраста ожидает извне age = getAge(user.birthday)
  skillCan, // Работает также как и для возраста, ожидает пропс извне skillCan = getSkillName(user.idSkill), где getSkillName - функция из helpers.ts
  skillWant, // Работает также как и для возраста, ожидает пропс извне skillWant = getCategoryNames(user.favoriteCategories), где getCategoryNames - функция из helpers.ts
  isLiked,
  onLikeClick,
  onDetailsClick,
}: CardUserProps) {
  // Элемент отвечает за количество видимых навыков
  const visibleSkills = useMemo(() => {
    if (skillWant.length === 0) return []

    const avgCharWidth = 7.33
    const totalPadding = 24
    const gap = 4
    const containerWidth = 284

    const maxElements = skillWant.length >= 2 ? 2 : skillWant.length

    if (maxElements === 2) {
      const totalChars = skillWant[0].length + skillWant[1].length
      const estimatedWidth = totalChars * avgCharWidth + totalPadding + gap

      if (estimatedWidth > containerWidth) {
        return [skillWant[0]]
      }
    }

    return skillWant.slice(0, maxElements)
  }, [skillWant])

  const hiddenCount = skillWant.length - visibleSkills.length
  const showMoreText = hiddenCount === 0 ? null : `+${hiddenCount}`

  return (
    <article className={`${styles.userCard}`}>
      <div className={styles.userCard__info}>
        <IconButton
          className={styles.iconLike}
          icon={<LikeIcon active={isLiked} />}
          ariaLabel="Лайк"
          onClick={onLikeClick}
        />
        <div className={styles.userCard__avatarWrapper}>
          <UserIcon avatarUrl={avatarUrl} name={name} className={styles.userCard__avatar} />
        </div>
        <div className={styles.userCard__text}>
          <h3 className={styles.userCard__name}>{name}</h3>
          <p className={styles.userCard__textStyle}>
            {location}, {age} {getYearDeclension(age)}
          </p>
        </div>
      </div>
      <div className={styles.userCard__skills}>
        <div className={styles.userCard__skills__option}>
          <h4 className={styles.userCard__skill__heading}>Может научить:</h4>
          {/* TODO: добавить настоящий компонент Tag */}
          <ul className={styles.userCard__skill__list}>
            <li className={`${styles.userCard__skill__list__item} ${styles.userCard__textStyle}`}>
              {skillCan}
            </li>
          </ul>
        </div>
        <div className={styles.userCard__skills__option}>
          <h4 className={styles.userCard__skill__heading}>Хочет научиться:</h4>
          {/* TODO: добавить настоящий компонент Tag */}
          <ul className={styles.userCard__skill__list}>
            {visibleSkills.map((skill) => (
              <li
                className={`${styles.userCard__skill__list__item} ${styles.userCard__textStyle}`}
                key={skill}
              >
                {skill}
              </li>
            ))}
            {showMoreText && (
              <li className={`${styles.userCard__skill__list__item} ${styles.userCard__textStyle}`}>
                {showMoreText}
              </li>
            )}
          </ul>
        </div>
        <Button children="Подробнее" className={styles.userCardButton} onClick={onDetailsClick} />
      </div>
    </article>
  )
}

export default CardUser
