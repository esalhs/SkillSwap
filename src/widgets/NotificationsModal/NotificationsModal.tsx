// src/widgets/NotificationsModal/NotificationsModal.tsx
import React from 'react'
import { Notification } from '@/widgets/Notification'
import { Button } from '@/shared/ui/Button'
import styles from './NotificationsModal.module.css'

export type NotificationsModalProps = {
  isOpen?: boolean
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen = true,
}) => {


type NotificationMock = {
  id: string
  userName: string
  variant: 'accepted' | 'offered'
  buttonLink: string
  date: string
  showButton?: boolean
}

const newNotifications: NotificationMock[] = [
  {
    id: '1',
    userName: 'Николай',
    variant: 'accepted',
    buttonLink: '/profile/nikolay',
    date: 'сегодня',
  },
  {
    id: '2',
    userName: 'Татьяна',
    variant: 'offered',
    buttonLink: '/exchange/accept/2',
    date: 'сегодня',
  },
]

const viewedNotifications: NotificationMock[] = [
  {
    id: '3',
    userName: 'Олег',
    variant: 'offered',
    buttonLink: '',
    date: 'вчера',
    showButton: false,
  },
  {
    id: '4',
    userName: 'Игорь',
    variant: 'accepted',
    buttonLink: '',
    date: '23 мая',
    showButton: false,
  },
]

  const handleReadAll = () => {
    console.log('Прочитать все')
  }

  const handleClear = () => {
    console.log('Очистить')
  }

  if (!isOpen) return null

  return (
      <div className={styles.content}>
        {/* Новые уведомления */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Новые уведомления</h2>
            <Button
              variant="tertiary"
              onClick={handleReadAll}
              className={styles.actionButton}
            >
              Прочитать все
            </Button>
          </div>
          <div className={styles.notificationsList}>
            {newNotifications.map((notification) => (
              <Notification
                key={notification.id}
                userName={notification.userName}
                variant={notification.variant}
                buttonLink={notification.buttonLink}
                showButton={notification.showButton !== false}
                date={notification.date}
              />
            ))}
          </div>
        </section>

        {/* Просмотренные */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Просмотренные</h2>
            <Button
              variant="tertiary"
              onClick={handleClear}
              className={styles.actionButton}
            >
              Очистить
            </Button>
          </div>
          <div className={styles.notificationsList}>
            {viewedNotifications.map((notification) => (
              <Notification
                key={notification.id}
                userName={notification.userName}
                variant={notification.variant}
                buttonLink={notification.buttonLink}
                showButton={notification.showButton}
                date={notification.date}
              />
            ))}
          </div>
        </section>
      </div>
  )
}