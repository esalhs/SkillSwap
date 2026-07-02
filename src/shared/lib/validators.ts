/** Валидатор email */
export const emailValidator = (value: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!value) {
    return 'Введите email'
  }
  if (!emailRegex.test(value)) {
    return 'Введите корректный email'
  }
  return undefined
}

/** Валидатор минимальной длины */
export const minLengthValidator = (value: string, min: number, message?: string): string | undefined => {
  if (!value) {
    return undefined
  }
  if (value.length < min) {
    return message || `Минимум ${min} символов`
  }
  return undefined
}

/** Валидатор максимальной длины */
export const maxLengthValidator = (value: string, max: number, message?: string): string | undefined => {
  if (!value) {
    return undefined
  }
  if (value.length > max) {
    return message || `Максимум ${max} символов`
  }
  return undefined
}

/** Валидатор на непустое значение */
export const notEmptyValidator = (value: string | null | undefined, message: string): string | undefined => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return message
  }
  return undefined
}

/** Валидатор даты (не в будущем) */
export const isValidDateValidator = (dateString: string): string | undefined => {
  if (!dateString) {
    return 'Выберите дату'
  }
  const date = new Date(dateString)
  const today = new Date()
  if (date > today) {
    return 'Дата не может быть в будущем'
  }
  return undefined
}

/** Валидатор размера и типа файла (для изображений) */
export const fileSizeAndTypeValidator = (
  files: File[],
  maxSizeMB: number = 2,
  allowedTypes: string[] = ['image/jpeg', 'image/png'],
): string | undefined => {
  if (files.length === 0) {
    return undefined
  }

  const invalidFile = files.find((file) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    const isTooLarge = file.size > maxSizeBytes
    const isWrongType = !allowedTypes.includes(file.type)
    return isTooLarge || isWrongType
  })

  if (invalidFile) {
    const typeList = allowedTypes.map((t) => t.split('/')[1].toUpperCase()).join('/')
    return `Файл должен быть ${typeList} и не более ${maxSizeMB}MB`
  }

  return undefined
}

/** Валидатор диапазона длины строки */
export const stringLengthRangeValidator = (
  value: string,
  min: number,
  max: number,
  message?: string,
): string | undefined => {
  if (!value) {
    return undefined
  }
  if (value.length < min || value.length > max) {
    return message || `От ${min} до ${max} символов`
  }
  return undefined
}

// ─── Слайсы валидаторов для регистрации ──────────────────

/** Валидаторы для шага 1: Аккаунт (email + пароль) */
export const accountValidators = {
  /** Валидация email */
  email: (value: string): string | undefined => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      return 'Введите email'
    }
    if (!emailRegex.test(value)) {
      return 'Введите корректный email'
    }
    return undefined
  },

  /** Валидация пароля */
  password: (value: string, min: number = 8): string | undefined => {
    if (!value) {
      return 'Введите пароль'
    }
    if (value.length < min) {
      return `Пароль должен содержать не менее ${min} символов`
    }
    return undefined
  },

  /** Валидация обоих полей сразу */
  validate: (email: string, password: string): { email?: string; password?: string } => {
    const errors: { email?: string; password?: string } = {}
    const emailError = accountValidators.email(email)
    const passwordError = accountValidators.password(password)
    if (emailError) errors.email = emailError
    if (passwordError) errors.password = passwordError
    return errors
  },
}

/** Валидаторы для шага 2: Данные пользователя */
export const userValidators = {
  /** Валидация имени */
  fullName: (value: string): string | undefined => {
    if (!value || !value.trim()) {
      return 'Введите имя'
    }
    if (value.trim().length < 2) {
      return 'Имя должно содержать минимум 2 символа'
    }
    return undefined
  },

  /** Валидация даты рождения */
  birthday: (value: string): string | undefined => {
    if (!value) {
      return 'Выберите дату рождения'
    }
    const date = new Date(value)
    const today = new Date()
    if (date > today) {
      return 'Дата не может быть в будущем'
    }
    return undefined
  },

  /** Валидация пола */
  sex: (value: string): string | undefined => {
    if (!value) {
      return 'Выберите пол'
    }
    return undefined
  },

  /** Валидация города */
  city: (value: string): string | undefined => {
    if (!value) {
      return 'Выберите город'
    }
    return undefined
  },

  /** Валидация категории */
  categoryId: (value: string): string | undefined => {
    if (!value) {
      return 'Выберите категорию'
    }
    return undefined
  },

  /** Валидация подкатегории */
  subcategoryId: (value: string): string | undefined => {
    if (!value) {
      return 'Выберите подкатегорию'
    }
    return undefined
  },

  /** Валидация всех полей сразу */
  validate: (data: {
    fullName: string
    birthday: string
    sex: string
    city: string
    categoryId: string
    subcategoryId: string
  }): Record<string, string> => {
    const errors: Record<string, string> = {}
    const fullNameError = userValidators.fullName(data.fullName)
    if (fullNameError) errors.fullName = fullNameError
    const birthdayError = userValidators.birthday(data.birthday)
    if (birthdayError) errors.birthday = birthdayError
    const sexError = userValidators.sex(data.sex)
    if (sexError) errors.sex = sexError
    const cityError = userValidators.city(data.city)
    if (cityError) errors.city = cityError
    const categoryIdError = userValidators.categoryId(data.categoryId)
    if (categoryIdError) errors.categoryId = categoryIdError
    const subcategoryIdError = userValidators.subcategoryId(data.subcategoryId)
    if (subcategoryIdError) errors.subcategoryId = subcategoryIdError
    return errors
  },
}

/** Валидаторы для шага 3: Навык */
export const skillValidators = {
  /** Валидация названия навыка */
  skillName: (value: string): string | undefined => {
    if (!value || !value.trim()) {
      return 'Введите название навыка'
    }
    const trimmed = value.trim()
    if (trimmed.length < 3 || trimmed.length > 50) {
      return 'Название должно содержать от 3 до 50 символов'
    }
    return undefined
  },

  /** Валидация категории навыка */
  category: (value: string): string | undefined => {
    if (!value) {
      return 'Выберите категорию'
    }
    return undefined
  },

  /** Валидация подкатегории навыка */
  subcategory: (value: string): string | undefined => {
    if (!value) {
      return 'Выберите подкатегорию'
    }
    return undefined
  },

  /** Валидация описания навыка */
  description: (value: string, max: number = 500): string | undefined => {
    if (!value || !value.trim()) {
      return 'Введите описание'
    }
    if (value.length > max) {
      return `Описание не должно превышать ${max} символов`
    }
    return undefined
  },

  /** Валидация изображений */
  images: (
    files: File[],
    maxSizeMB: number = 2,
    allowedTypes: string[] = ['image/jpeg', 'image/png'],
  ): string | undefined => {
    if (files.length === 0) {
      return undefined
    }

    const invalidFile = files.find((file) => {
      const maxSizeBytes = maxSizeMB * 1024 * 1024
      const isTooLarge = file.size > maxSizeBytes
      const isWrongType = !allowedTypes.includes(file.type)
      return isTooLarge || isWrongType
    })

    if (invalidFile) {
      const typeList = allowedTypes.map((t) => t.split('/')[1].toUpperCase()).join('/')
      return `Файл должен быть ${typeList} и не более ${maxSizeMB}MB`
    }

    return undefined
  },

  /** Валидация всех полей сразу */
  validate: (data: {
    skillName: string
    category: string
    subcategory: string
    description: string
    images: File[]
  }): Record<string, string> => {
    const errors: Record<string, string> = {}
    const skillNameError = skillValidators.skillName(data.skillName)
    if (skillNameError) errors.skillName = skillNameError
    const categoryError = skillValidators.category(data.category)
    if (categoryError) errors.category = categoryError
    const subcategoryError = skillValidators.subcategory(data.subcategory)
    if (subcategoryError) errors.subcategory = subcategoryError
    const descriptionError = skillValidators.description(data.description)
    if (descriptionError) errors.description = descriptionError
    const imageError = skillValidators.images(data.images)
    if (imageError) errors.images = imageError
    return errors
  },
}
