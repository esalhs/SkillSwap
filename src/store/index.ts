import { configureStore } from '@reduxjs/toolkit'
import requestsSlice from './requestsSlice'
import favoritesReducer from './favoritesSlice'
// Импортируй свои slice'ы здесь по мере их создания:
// import skillsReducer from '@/entities/skill/model/skillsSlice'
// import authReducer from '@/features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    // skills: skillsReducer,
    // auth: authReducer,
    requests: requestsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
