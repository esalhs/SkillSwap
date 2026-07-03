import type { AuthUser } from '@/shared/types'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

/** Читает текущего авторизованного пользователя из localStorage */
export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

/** Сохраняет пользователя и mock-токен в localStorage */
export function saveAuthUser(user: Omit<AuthUser, 'token'>): AuthUser {
  const authUser: AuthUser = { ...user, token: 'mock_token_' + user.id }
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USER, JSON.stringify(authUser))
  return authUser
}

/** Удаляет пользователя из localStorage (logout) */
export function clearAuthUser(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER)
}

// ─── Регистрация ───────────────────────────────────────────

export interface RegistrationData {
  // Шаг 1 – Аккаунт
  email: string
  password: string
  // Шаг 2 – Личные данные
  fullName: string
  birthday: string
  sex: string
  city: string
  categoryId: string
  subcategoryId: string
  avatar: File | null
  // Шаг 3 – Навык
  skillName: string
  skillCategory: string
  skillSubcategory: string
  description: string
  images: File[]
}

const emptyRegistrationData: RegistrationData = {
  email: '',
  password: '',
  fullName: '',
  birthday: '',
  sex: '',
  city: '',
  categoryId: '',
  subcategoryId: '',
  avatar: null,
  skillName: '',
  skillCategory: '',
  skillSubcategory: '',
  description: '',
  images: [],
}

/** Читает данные регистрации из localStorage */
export function getRegistrationData(): RegistrationData {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REGISTRATION_DATA)
    if (!raw) return { ...emptyRegistrationData }

    const parsed = JSON.parse(raw) as RegistrationData

    return {
      ...emptyRegistrationData,
      ...parsed,
    }
  } catch {
    return { ...emptyRegistrationData }
  }
}

/** Сохраняет данные регистрации в localStorage (без файлов) */
export function saveRegistrationDataStep1(email: string, password: string): void {
  const current = getRegistrationData()
  const data = { ...current, email, password }

  const { images, ...serializable } = data
  localStorage.setItem(LOCAL_STORAGE_KEYS.REGISTRATION_DATA, JSON.stringify(serializable))
}

export function saveRegistrationDataStep2(data: Partial<RegistrationData>): void {
  const current = getRegistrationData()
  const merged = { ...current, ...data }

  // Исключаем File объекты из сериализации (avatar, images)
  const { avatar, images, ...serializable } = merged
  localStorage.setItem(LOCAL_STORAGE_KEYS.REGISTRATION_DATA, JSON.stringify(serializable))
}

export function saveRegistrationDataStep3(data: Partial<RegistrationData>): void {
  const current = getRegistrationData()
  const merged = { ...current, ...data }

  const { images, ...serializable } = merged
  localStorage.setItem(LOCAL_STORAGE_KEYS.REGISTRATION_DATA, JSON.stringify(serializable))
}

/** Очищает данные регистрации после успешной регистрации */
export function clearRegistrationData(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REGISTRATION_DATA)
}

/** Сохраняет mock-JWT токен */
export function saveMockToken(token: string = 'token123'): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.JWT_TOKEN, token)
}

/** Получает mock-JWT токен */
export function getMockToken(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.JWT_TOKEN)
}

/** Очищает mock-JWT токен */
export function clearMockToken(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.JWT_TOKEN)
}
