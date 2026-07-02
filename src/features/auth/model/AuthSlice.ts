import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { AuthSliceUser, AuthUser, User } from '@/shared/types'
import { getAuthUser, saveAuthUser, clearAuthUser } from './authUtils'

interface ILogin {
  email: string
  password: string
}

interface AuthState {
  user: AuthSliceUser | null
  isAuth: boolean
  isLoading: boolean
  error: string | null
}

const initialUser = getAuthUser()

const initialState: AuthState = {
  user: initialUser,
  isAuth: !!initialUser,
  isLoading: false,
  error: null,
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const loginUser = createAsyncThunk<AuthUser, ILogin, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await delay(1000)

      if (!email || !password) {
        return rejectWithValue('Заполните все поля')
      }

      const res = await fetch('/db/users.json')
      const users: User[] = await res.json()

      const foundUser = users.find((u: User) => u.email === email && u.password === password)

      if (!foundUser) {
        return rejectWithValue('Неверный email или пароль')
      }

      const authUser = saveAuthUser({
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.fullName,
        avatarUrl: foundUser.avatarUrl ?? undefined,
      })

      return authUser
    } catch {
      return rejectWithValue('Ошибка при авторизации')
    }
  },
)


export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await delay(1000)
      clearAuthUser()
    } catch {
      return rejectWithValue('Ошибка при выходе')
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthUser>) => {
        state.isLoading = false
        state.isAuth = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Ошибка при авторизации'
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.isAuth = false
        state.user = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Ошибка при выходе'
      })
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuth: (state) => state.isAuth,
    selectAuthError: (state) => state.error,
    selectAuthLoading: (state) => state.isLoading,
  },
})

export const { clearAuthError } = authSlice.actions
export const { selectUser, selectIsAuth, selectAuthError } = authSlice.selectors
export default authSlice.reducer
