import { useState, useEffect, useCallback } from 'react'
import type { User, Skill } from '@/shared/types'
import { accountValidators, userValidators, skillValidators } from '@/shared/lib/validators'

const REGISTRATION_STORAGE_KEY = 'skillswap_registration_data'

interface RegistrationData {
  // Step 1 - Account
  email: string
  password: string
  // Step 2 - User data
  fullName: string
  birthday: string
  sex: string
  city: string
  categoryId: string
  subcategoryId: string
  // Step 3 - Skill data
  skillName: string
  skillCategory: string
  skillSubcategory: string
  skillDescription: string
  skillImages: File[]
}

const initialData: RegistrationData = {
  email: '',
  password: '',
  fullName: '',
  birthday: '',
  sex: '',
  city: '',
  categoryId: '',
  subcategoryId: '',
  skillName: '',
  skillCategory: '',
  skillSubcategory: '',
  skillDescription: '',
  skillImages: [],
}

interface ValidationErrors {
  email?: string
  password?: string
  fullName?: string
  birthday?: string
  sex?: string
  city?: string
  categoryId?: string
  subcategoryId?: string
  skillName?: string
  skillCategory?: string
  skillSubcategory?: string
  skillDescription?: string
  skillImages?: string
}

export function useRegistrationSteps() {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(REGISTRATION_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return parsed.currentStep || 1
      }
    } catch {
      // ignore
    }
    return 1
  })

  const [data, setData] = useState<RegistrationData>(() => {
    try {
      const stored = localStorage.getItem(REGISTRATION_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return { ...initialData, ...parsed.data }
      }
    } catch {
      // ignore
    }
    return initialData
  })

  const [errors, setErrors] = useState<ValidationErrors>({})

  // Persist to localStorage whenever data or step changes
  useEffect(() => {
    try {
      localStorage.setItem(
        REGISTRATION_STORAGE_KEY,
        JSON.stringify({ currentStep, data }),
      )
    } catch (err) {
      console.error('Failed to save registration data to localStorage:', err)
    }
  }, [currentStep, data])

  // Step 1: Account validation
  const validateStep1 = useCallback((): boolean => {
    const newErrors = accountValidators.validate(data.email, data.password)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [data.email, data.password])

  // Step 2: User data validation
  const validateStep2 = useCallback((): boolean => {
    const newErrors = userValidators.validate({
      fullName: data.fullName,
      birthday: data.birthday,
      sex: data.sex,
      city: data.city,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [data.fullName, data.birthday, data.sex, data.city, data.categoryId, data.subcategoryId])

  // Step 3: Skill validation
  const validateStep3 = useCallback((): boolean => {
    const newErrors = skillValidators.validate({
      skillName: data.skillName,
      category: data.skillCategory,
      subcategory: data.skillSubcategory,
      description: data.skillDescription,
      images: data.skillImages,
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [data.skillName, data.skillCategory, data.skillSubcategory, data.skillDescription, data.skillImages])

  const updateStep1 = useCallback((email: string, password: string) => {
    setData((prev) => ({ ...prev, email, password }))
  }, [])

  const updateStep2 = useCallback((updates: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }, [])

  const updateStep3 = useCallback((updates: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...updates }))
  }, [])

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
  }, [])

  const goToPrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step)
  }, [])

  const clearRegistrationData = useCallback(() => {
    localStorage.removeItem(REGISTRATION_STORAGE_KEY)
    setData(initialData)
    setCurrentStep(1)
    setErrors({})
  }, [])

  const getFullUserData = useCallback((): Omit<User, 'id' | 'createdAt' | 'favoriteCategories' | 'role' | 'idSkill'> => {
    return {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      avatarUrl: null,
      birthday: data.birthday,
      sex: data.sex as 'male' | 'female' | 'not_specified',
      location: data.city,
      bio: '',
    }
  }, [data])

  const getSkillData = useCallback((): Pick<Skill, 'name' | 'description' | 'skillImages' | 'authorId' | 'likedByUserIds'> => {
    return {
      name: data.skillName,
      description: data.skillDescription,
      skillImages: data.skillImages.map((f) => URL.createObjectURL(f)),
      authorId: '', // Will be set after registration
      likedByUserIds: [],
    }
  }, [data])

  return {
    currentStep,
    data,
    errors,
    updateStep1,
    updateStep2,
    updateStep3,
    validateStep1,
    validateStep2,
    validateStep3,
    goToNextStep,
    goToPrevStep,
    goToStep,
    clearRegistrationData,
    getFullUserData,
    getSkillData,
  }
}
