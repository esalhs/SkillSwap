import { Button, ButtonVariant } from '@/shared/ui/Button'
import { IconButton } from '@/shared/ui/IconAction'
import { ClockIcon, EditIcon, LikeIcon, MoreSquareIcon, ShareIcon } from '@/shared/ui/Icons'
import { GallerySlider } from '@/widgets/GallerySlider'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CardSkill.module.css'

type CardSkillProps = {
  pageVariant: 'home' | 'register' // добавил пропс, чтобы указывать, где находится компонент
  skillId?: string
  buttonVariant?: ButtonVariant
  title: string
  domain: string // "Творчество и искусство"
  category: string // "Музыка и звук"
  description: string
  images: string[] // массив путей к фото
  isLiked?: boolean
  onLikeClick?: () => void // если не передан — иконка лайка не рендерится
}

export const CardSkill = (props: CardSkillProps) => {

  const isOffered = false // TODO: подключить requestsSlice

  const handleMainClick = useCallback(
    () => {
      console.log('Предложить обмен')
      // dispatch(offer(props.skillId))
    },
    [
      // props.skillId
    ],
  )

  const navigate = useNavigate()

  const onSecondaryButtonHandler = useCallback(() => {
    navigate(-1) // переходим на шаг назад в регистрацию
  }, [navigate])

  return (
    <article className={styles.overallWrapper}>
      {props.pageVariant === 'home' ? (
        <div className={styles.icons}>
          <IconButton
            icon={<LikeIcon active={props.isLiked} />}
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
                onClick={onSecondaryButtonHandler}
              >
                Редактировать
              </Button>
            )}
            <Button
              variant={props.buttonVariant}
              className={styles.mainButton}
              onClick={handleMainClick}
              {...(isOffered ? { icon: <ClockIcon />, iconPosition: 'before' } : {})}
            >
              {props.pageVariant === 'home' ? 'Предложить обмен' : 'Готово'}
            </Button>
          </div>
        </div>
        <GallerySlider images={props.images} />
      </div>
    </article>
  )
}
