import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './index'
import type { NotificationVariant } from '@/widgets/Notification'

export interface AppNotification {
  id: string
  userName: string
  variant: NotificationVariant
  buttonLink?: string
  isRead: boolean
  createdAt: string
}

interface NotificationsState {
  items: AppNotification[]
}

const initialState: NotificationsState = {
  items: [],
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action: PayloadAction<AppNotification>) {
        state.items.unshift(action.payload)
      },
      prepare(data: { userName: string; variant: NotificationVariant; buttonLink?: string }) {
        return {
          payload: {
            id: crypto.randomUUID(),
            userName: data.userName,
            variant: data.variant,
            buttonLink: data.buttonLink,
            isRead: false,
            createdAt: new Date().toISOString(),
          },
        }
      },
    },
    markAllAsRead(state) {
      state.items.forEach((n) => {
        n.isRead = true
      })
    },
    clearReadNotifications(state) {
      state.items = state.items.filter((n) => !n.isRead)
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((n) => n.id !== action.payload)
    },
  },
})

export const { addNotification, markAllAsRead, clearReadNotifications, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer

export const selectUnreadNotifications = (state: RootState) =>
  state.notifications.items.filter((n) => !n.isRead)
export const selectReadNotifications = (state: RootState) =>
  state.notifications.items.filter((n) => n.isRead)
export const selectHasUnreadNotifications = (state: RootState) =>
  state.notifications.items.some((n) => !n.isRead)
