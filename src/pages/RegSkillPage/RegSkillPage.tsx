import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { Header } from '@/widgets/header'
import { RegSkillForm } from '@/widgets/RegSkillForm'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { SchoolBoard } from '@/shared/ui/Illustrations'
import { ROUTES } from '@/shared/lib/constants'
import { useRegistrationSteps } from '@/shared/hooks/useRegistrationSteps'
import { registerUser, type IRegister } from '@/features/auth/model/AuthSlice'
import { CardSkill } from '@/widgets/CardSkill'
import styles from './RegSkillPage.module.css'

export const RegSkillPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { data, validateStep3, clearRegistrationData } = useRegistrationSteps()

  const [showCardSkill, setShowCardSkill] = useState(false)
  const [skillData, setSkillData] = useState<{
    title: string
    domain: string
    category: string
    description: string
    images: string[]
  } | null>(null)

  const handleBack = () => {
    navigate(ROUTES.REG_USER)
  }

  const handleSubmit = useCallback(async (formData: {
    skillName: string
    skillCategory: string
    skillSubcategory: string
    description: string
    skillImages: File[]
  }) => {
    if (!validateStep3()) return

    // Регистрируем пользователя и автоматически логиним
    const registerData: IRegister = {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      birthday: data.birthday,
      sex: data.sex,
      location: data.city,
    }

    try {
      // Отправляем регистрацию и ждём результата
      const result = await dispatch(registerUser(registerData))
      if (registerUser.fulfilled.match(result)) {
        // Подготовка данных навыка для отображения
        setSkillData({
          title: formData.skillName,
          domain: formData.skillCategory,
          category: formData.skillSubcategory,
          description: formData.description,
          images: formData.skillImages.map(f => URL.createObjectURL(f)),
        })

        // Очищаем данные регистрации
        clearRegistrationData()

        // Показываем CardSkill
        setShowCardSkill(true)
      }
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }, [data.email, data.password, data.fullName, data.birthday, data.sex, data.city, validateStep3, dispatch, clearRegistrationData])

  const handleCardSkillMainClick = () => {
    // Кнопка "Готово" - переходим на главную с флагом для показа ModalOfferCreated
    setShowCardSkill(false)
    navigate(ROUTES.HOME, { state: { showOfferModal: true } })
  }

  const handleCardSkillSecondaryClick = () => {
    // Кнопка "Редактировать" - возвращаемся к форме
    setShowCardSkill(false)
  }

  // Если показываем CardSkill
  if (showCardSkill && skillData) {
    return (
      <div className={styles.pageWrapper}>
        <Header isAuthPage={true} />
        <main className={styles.mainContent}>
          <StepIndicator currentStep={3} totalSteps={3} />
          <CardSkill
            pageVariant="register"
            title={skillData.title}
            domain={skillData.domain}
            category={skillData.category}
            description={skillData.description}
            images={skillData.images}
            onMainClick={handleCardSkillMainClick}
            onSecondaryClick={handleCardSkillSecondaryClick}
          />
        </main>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <Header isAuthPage={true} />

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Регистрация навыка</h1>

        <StepIndicator currentStep={3} totalSteps={3} />

        <div className={styles.container}>
          <section className={styles.formSection}>
            <RegSkillForm
              onBack={handleBack}
              onSubmit={handleSubmit}
              initialData={{
                skillName: data.skillName,
                skillCategory: data.skillCategory,
                skillSubcategory: data.skillSubcategory,
                description: data.skillDescription,
                skillImages: data.skillImages,
              }}
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
      </main>
    </div>
  )
}
