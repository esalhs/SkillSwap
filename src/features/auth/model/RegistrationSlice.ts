import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  getRegistrationData,
  saveRegistrationDataStep1,
  saveRegistrationDataStep2,
  saveRegistrationDataStep3,
  clearRegistrationData,
  saveMockToken,
  saveAuthUser,
} from './authUtils'
import { fetchUsers } from '@/api/users'

interface RegistrationStep1Data {
  email: string
  password: string
}

interface RegistrationStep2Data {
  fullName: string
  birthday: string
  sex: string
  city: string
  categoryId: string
  subcategoryId: string
  avatar: File | null
}

interface RegistrationStep3Data {
  skillName: string
  skillCategory: string
  skillSubcategory: string
  description: string
  images: File[]
}

interface RegistrationState {
  step1Data: RegistrationStep1Data
  step2Data: RegistrationStep2Data
  step3Data: RegistrationStep3Data
  currentStep: number
  isRegistering: boolean
  registrationError: string | null
  registrationSuccess: boolean
}

const initialData = getRegistrationData()

const initialState: RegistrationState = {
  step1Data: {
    email: initialData.email,
    password: initialData.password,
  },
  step2Data: {
    fullName: initialData.fullName,
    birthday: initialData.birthday,
    sex: initialData.sex,
    city: initialData.city,
    categoryId: initialData.categoryId,
    subcategoryId: initialData.subcategoryId,
    avatar: null,
  },
  step3Data: {
    skillName: initialData.skillName,
    skillCategory: initialData.skillCategory,
    skillSubcategory: initialData.skillSubcategory,
    description: initialData.description,
    images: [],
  },
  currentStep: 1,
  isRegistering: false,
  registrationError: null,
  registrationSuccess: false,
}

// Async thunk для регистрации
export const registerUser = createAsyncThunk<
  { id: string; email: string; name: string },
  void,
  { rejectValue: string }
>('auth/register', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as { registration?: RegistrationState }
    const registration = state.registration

    if (!registration) {
      return rejectWithValue('Ошибка состояния регистрации')
    }

    const { step1Data, step2Data } = registration

    // Имитация задержки сети
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Проверка существования пользователя с таким email
    const users = await fetchUsers()
    const existingUser = users.find((u) => u.email === step1Data.email)

    if (existingUser) {
      return rejectWithValue('Пользователь с таким email уже существует')
    }

    // Создаём нового пользователя (mock)
    const newUser = {
      id: String(Date.now()),
      email: step1Data.email,
      password: step1Data.password,
      fullName: step2Data.fullName,
      sex: step2Data.sex as 'male' | 'female',
      birthday: step2Data.birthday,
      avatarUrl: step2Data.avatar ? URL.createObjectURL(step2Data.avatar) : null,
      location: step2Data.city,
      role: 'user' as const,
      createdAt: new Date().toISOString(),
      bio: '',
      idSkill: '',
      favoriteCategories: [],
    }

    // Сохраняем пользователя (в реальном приложении — отправка на сервер)
    const authUser = saveAuthUser({
      id: newUser.id,
      email: newUser.email,
      name: newUser.fullName,
    })

    // Сохраняем mock-JWT токен
    saveMockToken('token123')

    // Очищаем данные регистрации
    clearRegistrationData()

    return {
      id: authUser.id,
      email: authUser.email,
      name: authUser.name,
    }
  } catch (error) {
    return rejectWithValue('Ошибка при регистрации')
  }
})

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep1Data: (state, action: PayloadAction<RegistrationStep1Data>) => {
      state.step1Data = action.payload
      saveRegistrationDataStep1(action.payload.email, action.payload.password)
    },
    setStep2Data: (state, action: PayloadAction<RegistrationStep2Data>) => {
      state.step2Data = action.payload
      saveRegistrationDataStep2(action.payload)
    },
    setStep3Data: (state, action: PayloadAction<RegistrationStep3Data>) => {
      state.step3Data = action.payload
      saveRegistrationDataStep3(action.payload)
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    resetRegistration: (state) => {
      state.step1Data = initialState.step1Data
      state.step2Data = initialState.step2Data
      state.step3Data = initialState.step3Data
      state.currentStep = 1
      state.isRegistering = false
      state.registrationError = null
      state.registrationSuccess = false
      clearRegistrationData()
    },
    clearRegistrationError: (state) => {
      state.registrationError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isRegistering = true
        state.registrationError = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistering = false
        state.registrationSuccess = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isRegistering = false
        state.registrationError = action.payload ?? 'Ошибка при регистрации'
      })
  },
  selectors: {
    selectStep1Data: (state) => state.step1Data,
    selectStep2Data: (state) => state.step2Data,
    selectStep3Data: (state) => state.step3Data,
    selectCurrentStep: (state) => state.currentStep,
    selectIsRegistering: (state) => state.isRegistering,
    selectRegistrationError: (state) => state.registrationError,
    selectRegistrationSuccess: (state) => state.registrationSuccess,
  },
})

export const {
  setStep1Data,
  setStep2Data,
  setStep3Data,
  setCurrentStep,
  resetRegistration,
  clearRegistrationError,
} = registrationSlice.actions

export const {
  selectStep1Data,
  selectStep2Data,
  selectStep3Data,
  selectCurrentStep,
  selectIsRegistering,
  selectRegistrationError,
  selectRegistrationSuccess,
} = registrationSlice.selectors

export default registrationSlice.reducer
