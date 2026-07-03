import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '@/store'
import { Header } from '@/widgets/header'
import { RegSkillForm } from '@/widgets/RegSkillForm'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { SchoolBoard } from '@/shared/ui/Illustrations'
import { ROUTES } from '@/shared/lib/constants'
import {
  setStep3Data,
  selectStep1Data,
  selectStep2Data,
  selectStep3Data,
  registerUser,
  selectRegistrationSuccess,
} from '@/features/auth/model/RegistrationSlice'
import {
  isValidSkillName,
  isValidDescription,
  isValidImageFile,
} from '@/shared/lib/validation'
import styles from './RegSkillPage.module.css'

export const RegSkillPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const step1Data = useSelector(selectStep1Data)
  const step2Data = useSelector(selectStep2Data)
  const prevStep3Data = useSelector(selectStep3Data)
  const registrationSuccess = useSelector(selectRegistrationSuccess)

  const [skillName, setSkillName] = useState(prevStep3Data.skillName || '')
  const [category, setCategory] = useState(prevStep3Data.skillCategory || '')
  const [subcategory, setSubcategory] = useState(prevStep3Data.skillSubcategory || '')
  const [description, setDescription] = useState(prevStep3Data.description || '')
  const [images, setImages] = useState<File[]>(prevStep3Data.images || [])

  const [errors, setErrors] = useState<{
    skillName?: string
    category?: string
    subcategory?: string
    description?: string
    images?: string
  }>({})

  // Проверяем, что предыдущие шаги заполнены
  useEffect(() => {
    if (!step1Data.email || !step1Data.password) {
      navigate(ROUTES.REGISTER)
      return
    }
    if (!step2Data.fullName || !step2Data.city) {
      navigate(ROUTES.REGISTER_USER)
      return
    }
  }, [step1Data, step2Data, navigate])

  // Если регистрация успешна, перенаправляем на главную
  useEffect(() => {
    if (registrationSuccess) {
      navigate(ROUTES.HOME)
    }
  }, [registrationSuccess, navigate])

  const validateForm = () => {
    const newErrors: {
      skillName?: string
      category?: string
      subcategory?: string
      description?: string
      images?: string
    } = {}

    // Валидация названия навыка (3-50 символов)
    if (!skillName.trim()) {
      newErrors.skillName = 'Введите название навыка'
    } else if (!isValidSkillName(skillName)) {
      newErrors.skillName = 'Название должно содержать от 3 до 50 символов'
    }

    // Валидация категории
    if (!category) {
      newErrors.category = 'Выберите категорию'
    }

    // Валидация подкатегории
    if (!subcategory) {
      newErrors.subcategory = 'Выберите подкатегорию'
    }

    // Валидация описания (до 500 символов)
    if (!description.trim()) {
      newErrors.description = 'Введите описание навыка'
    } else if (!isValidDescription(description)) {
      newErrors.description = 'Описание не должно превышать 500 символов'
    }

    // Валидация изображений (хотя бы одно, ≤2MB, jpeg/png)
    if (images.length === 0) {
      newErrors.images = 'Загрузите хотя бы одно изображение'
    } else {
      for (const image of images) {
        const validation = isValidImageFile(image)
        if (!validation.valid) {
          newErrors.images = validation.error
          break
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) {
      return
    }

    // Сохраняем данные шага 3 в Redux и localStorage
    dispatch(
      setStep3Data({
        skillName,
        skillCategory: category,
        skillSubcategory: subcategory,
        description,
        images,
      }),
    )

    // Запускаем регистрацию
    dispatch(registerUser())
      .unwrap()
      .then(() => {
        // После успешной регистрации перенаправляем на главную
        navigate(ROUTES.HOME)
      })
      .catch((error: unknown) => {
        console.error('Registration error:', error)
      })
  }

  const handleBack = () => {
    navigate(ROUTES.REGISTER_USER)
  }

  return (
    <div className={styles.pageWrapper}>
      <Header isAuthPage={true} />

      <main className={styles.mainContent}>
        <StepIndicator currentStep={3} totalSteps={3} />
        <div>
          <div className={styles.container}>
            <section className={styles.formSection}>
              <RegSkillForm
                skillName={skillName}
                category={category}
                subcategory={subcategory}
                description={description}
                images={images}
                onChangeSkillName={setSkillName}
                onChangeCategory={setCategory}
                onChangeSubcategory={setSubcategory}
                onChangeDescription={setDescription}
                onChangeImages={setImages}
                onBack={handleBack}
                onSubmit={handleSubmit}
                errors={errors}
              />
            </section>

            <section className={styles.visualSection}>
              <IllustratedGuide
                ImageComponent={SchoolBoard}
                title="Расскажите о своем навыке"
                description="Опишите, чему вы можете научить, добавьте название, категорию и примеры работ"
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
