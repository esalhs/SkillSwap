import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchSkillDomains } from '@/api/skills'
import type { SkillDomain } from '@/shared/types'
import citiesData from '../../../public/db/cities.json'
import { Header } from '@/widgets/header'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { RegUserForm } from '@/widgets/RegUserForm'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { UserInfo } from '@/shared/ui/Illustrations'
import { useRegistrationSteps } from '@/shared/hooks/useRegistrationSteps'
import { ROUTES } from '@/shared/lib/constants'
import styles from './RegUserPage.module.css'

const sexOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' }
]

const cityOptions = citiesData.map((city) => ({
  value: city.id,
  label: city.name,
}))

export const RegUserPage: React.FC = () => {
  const navigate = useNavigate()
  const { data, updateStep2, validateStep2, errors, goToPrevStep } = useRegistrationSteps()
  const [skillDomains, setSkillDomains] = useState<SkillDomain[]>([])

  useEffect(() => {
    fetchSkillDomains()
      .then(setSkillDomains)
      .catch((err) => console.error('Failed to load skill domains:', err))
  }, [])

  const categoryOptions = useMemo(() => {
    return skillDomains.map((domain) => ({
      value: domain.id,
      label: domain.name,
    }))
  }, [skillDomains])

  // Собираем все подкатегории из всех доменов для отображения
  const allSubcategories = useMemo(() => {
    const subs: { value: string; label: string; domainId: string }[] = []
    skillDomains.forEach((domain) => {
      domain.categories?.forEach((category) => {
        subs.push({
          value: category.id,
          label: category.name,
          domainId: domain.id,
        })
      })
    })
    return subs
  }, [skillDomains])

  const subcategoryOptions = useMemo(() => {
    return allSubcategories.map((sub) => ({
      value: sub.value,
      label: sub.label,
    }))
  }, [allSubcategories])

  const handleCategoryChange = (newCategoryId: string) => {
    updateStep2({ categoryId: newCategoryId, subcategoryId: '' })
  }

  const handleSubcategoryChange = (newSubcategoryId: string) => {
    // Находим домен (категорию верхнего уровня), которой принадлежит подкатегория
    const parentDomain = allSubcategories.find((sub) => sub.value === newSubcategoryId)
    if (parentDomain) {
      updateStep2({ categoryId: parentDomain.domainId, subcategoryId: newSubcategoryId })
    }
  }

  const handleSubmit = () => {
    if (validateStep2()) {
      navigate(ROUTES.REG_SKILL)
    }
  }

  const handleBack = () => {
    goToPrevStep()
    navigate(ROUTES.REGISTER)
  }

  return (
    <div className={styles.page}>
      <Header isAuthPage={true} />

      <main className={styles.content}>
        <StepIndicator currentStep={2} totalSteps={3} />
        <div className={styles.columns}>
          <div className={styles.column}>
            <RegUserForm
                fullName={data.fullName}
                birthday={data.birthday}
                sex={data.sex}
                city={data.city}
                categoryId={data.categoryId}
                subcategoryId={data.subcategoryId}
                onChangeFullName={(value) => updateStep2({ fullName: value })}
                onChangeBirthday={(value) => updateStep2({ birthday: value })}
                onChangeSex={(value) => updateStep2({ sex: value })}
                onChangeCity={(value) => updateStep2({ city: value })}
                onChangeCategoryId={handleCategoryChange}
                onChangeSubcategoryId={handleSubcategoryChange}
                sexOptions={sexOptions}
                cityOptions={cityOptions}
                categoryOptions={categoryOptions}
                subcategoryOptions={subcategoryOptions}
                errors={errors}
                onSubmit={handleSubmit}
                onBack={handleBack}
            />
            </div>

            <div className={styles.column}>
              <IllustratedGuide
                ImageComponent={UserInfo}
                title="Расскажите немного о себе"
                description="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
              />
            </div>
          </div>
      </main>
    </div>
  )
}

export default RegUserPage
