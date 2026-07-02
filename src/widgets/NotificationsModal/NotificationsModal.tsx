// src/widgets/NotificationsModal/NotificationsModal.tsx
import React from 'react'
import { Notification } from '@/widgets/Notification'
import { Button } from '@/shared/ui/Button'
import styles from './NotificationsModal.module.css'
import {
  clearReadNotifications,
  markAllAsRead,
  selectReadNotifications,
  selectUnreadNotifications,
} from '@/store/notificationSlice.ts'
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts'

export type NotificationsModalProps = {
  isOpen?: boolean
}

function getRelativeDateLabel(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  if (isSameDay(date, now)) return 'сегодня'
  if (isSameDay(date, yesterday)) return 'вчера'

  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen = true,
}) => {
  const dispatch = useAppDispatch()
  const unread = useAppSelector(selectUnreadNotifications)
  const read = useAppSelector(selectReadNotifications)

  const handleReadAll = () => {
    dispatch(markAllAsRead())
  }

  const handleClear = () => {
    dispatch(clearReadNotifications())
  }

  if (!isOpen) return null

  return (
    <div className={styles.content}>
      {/* Новые уведомления */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Новые уведомления</h2>
          <Button variant="tertiary" onClick={handleReadAll} className={styles.actionButton}>
            Прочитать все
          </Button>
        </div>
        <div className={styles.notificationsList}>
          {unread.length === 0 ? (
            <p className={styles.emptyText}>Новых уведомлений нет</p>
          ) : (
            unread.map((notification) => (
              <Notification
                key={notification.id}
                userName={notification.userName}
                variant={notification.variant}
                buttonLink={notification.buttonLink}
                date={getRelativeDateLabel(notification.createdAt)}
              />
            ))
          )}
        </div>
      </section>

      {/* Просмотренные */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Просмотренные</h2>
          <Button variant="tertiary" onClick={handleClear} className={styles.actionButton}>
            Очистить
          </Button>
        </div>
        <div className={styles.notificationsList}>
          {read.length === 0 ? (
            <p className={styles.emptyText}>Просмотренных уведомлений нет</p>
          ) : (
            read.map((notification) => (
              <Notification
                key={notification.id}
                userName={notification.userName}
                variant={notification.variant}
                buttonLink={notification.buttonLink}
                showButton={false}
                date={getRelativeDateLabel(notification.createdAt)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  )
}
