import React from 'react'
import { ButtonLink } from '@/shared/ui/Button/ButtonLink'
import { IdeaIcon } from '@/shared/ui/Icons'
import styles from './Notification.module.css'

export type NotificationVariant = 'accepted' | 'offered'

export type NotificationProps = {
  userName: string
  variant: NotificationVariant
  buttonLink?: string
  showButton?: boolean
  date?: string // добавили
}

export const Notification: React.FC<NotificationProps> = ({
  userName,
  variant,
  buttonLink = '',
  showButton = true,
  date = 'сегодня', // добавили
}) => {
  const isAccepted = variant === 'accepted'

  const title = isAccepted ? `${userName} принял ваш обмен` : `${userName} предлагает вам обмен`

  const subtitle = isAccepted
    ? 'Перейдите в профиль, чтобы обсудить детали'
    : 'Примите обмен, чтобы обсудить детали'

  return (
    <div className={styles.notification}>
      <div className={styles.header}>
        <IdeaIcon className={styles.icon} />
        <div className={styles.content}>
          <div className={styles.texts}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          <span className={styles.date}>{date}</span>
        </div>
      </div>
      {showButton && buttonLink && (
        <ButtonLink to={buttonLink} variant="primary" className={styles.button}>
          Перейти
        </ButtonLink>
      )}
    </div>
  )
}
