import { Button } from '@/shared/ui/Button'
import { IconButton } from '@/shared/ui/IconAction'
import { EditIcon, LikeIcon, MoreSquareIcon, ShareIcon } from '@/shared/ui/Icons'
import { GallerySlider } from '@/widgets/GallerySlider'
import styles from './CardSkill.module.css'

type CardSkillProps = {
  variant: 'home' | 'register' // добавил пропс, чтобы указывать, где находится компонент
  title: string
  domain: string // "Творчество и искусство"
  category: string // "Музыка и звук"
  description: string
  images: string[] // массив путей к фото
  // иконки действий на странице навыка (variant: 'home')
  isLiked?: boolean
  onLikeClick?: () => void
  onShareClick?: () => void
  onMoreClick?: () => void
  // кнопки
  mainButtonLabel: string // текст основной кнопки
  onMainClick: () => void
  secondaryButtonLabel?: string // текст второй кнопки (variant: 'register' – "Редактировать")
  onSecondaryClick?: () => void
}

export const CardSkill = (props: CardSkillProps) => {
  return (
    <article className={styles.overallWrapper}>
      {props.variant === 'home' ? (
        <div className={styles.icons}>
          <IconButton
            icon={<LikeIcon active={props.isLiked} />}
            ariaLabel="Кнопка лайка"
            onClick={props.onLikeClick}
          />
          <IconButton icon={<ShareIcon />} ariaLabel="Поделиться" onClick={props.onShareClick} />
          <IconButton
            icon={<MoreSquareIcon />}
            ariaLabel="Узнать больше"
            onClick={props.onMoreClick}
          />
        </div>
      ) : (
        <div className={styles.registerTitle}>
          <h3 className={styles.registerHeading}>Ваше предложение</h3>
          <p className={styles.registerText}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </div>
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.about}>
          <div className={styles.text}>
            <h3 className={styles.skillPageTitle}>{props.title}</h3>
            <p className={styles.categories}>
              <span className={styles.category}>{props.domain}</span>
              <span className={styles.category}>{props.category}</span>
            </p>
            <p className={styles.description}>{props.description}</p>
          </div>
          <div className={styles.buttons}>
            {props.variant === 'register' && (
              <Button
                className={styles.secondaryButton}
                variant="secondary"
                iconPosition="after"
                icon={<EditIcon />}
                onClick={props.onSecondaryClick}
              >
                {props.secondaryButtonLabel}
              </Button>
            )}
            <Button className={styles.mainButton} onClick={props.onMainClick}>
              {props.mainButtonLabel}
            </Button>
          </div>
        </div>
        <GallerySlider images={props.images} />
      </div>
    </article>
  )
}
