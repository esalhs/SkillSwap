import { Button, ButtonVariant } from '@/shared/ui/Button'
import { IconButton } from '@/shared/ui/IconAction'
import { ClockIcon, EditIcon, LikeIcon, MoreSquareIcon, ShareIcon } from '@/shared/ui/Icons'
import { GallerySlider } from '@/widgets/GallerySlider'

import styles from './CardSkill.module.css'

type CardSkillProps = {
  pageVariant: 'home' | 'register'
  title: string
  domain: string
  category: string
  description: string
  images: string[]
  buttonVariant?: ButtonVariant
  isOffered?: boolean
  isLiked?: boolean
  onMainButtonClick?: () => void
  onSecondaryButtonClick?: () => void
  onLikeClick?: () => void
  mainButtonLabel: string
}

export const CardSkill = (props: CardSkillProps) => {
  const isOffered = props.isOffered ?? false
  const isLiked = props.isLiked ?? false

  return (
    <article className={styles.overallWrapper}>
      {props.pageVariant === 'home' ? (
        <div className={styles.icons}>
          <IconButton
            icon={<LikeIcon active={isLiked} />}
            ariaLabel="Кнопка лайка"
            onClick={props.onLikeClick}
          />
          <IconButton icon={<ShareIcon />} ariaLabel="Поделиться" />
          <IconButton icon={<MoreSquareIcon />} ariaLabel="Узнать больше" />
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
            {props.pageVariant === 'register' && (
              <Button
                className={styles.secondaryButton}
                variant="secondary"
                iconPosition="after"
                icon={<EditIcon />}
                onClick={props.onSecondaryButtonClick}
              >
                Редактировать
              </Button>
            )}
            <Button
              className={styles.mainButton}
              onClick={props.onMainButtonClick}
              {...(isOffered ? { icon: <ClockIcon />, iconPosition: 'before', variant: 'secondary' } : {})}
            >
              {props.pageVariant === 'home'
                ? (props.mainButtonLabel ?? 'Предложить обмен')
                : 'Готово'}
            </Button>
          </div>
        </div>
        <GallerySlider images={props.images} />
      </div>
    </article>
  )
}
