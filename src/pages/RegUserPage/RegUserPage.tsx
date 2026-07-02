import React, { useState, useEffect, useMemo } from 'react'
import { fetchSkillDomains } from '@/api/skills'
import type { SkillDomain } from '@/shared/types'
import citiesData from '../../../public/db/cities.json'
import { Header } from '@/widgets/header'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { RegUserForm } from '@/widgets/RegUserForm'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { UserInfo } from '@/shared/ui/Illustrations'
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
  const [fullName, setFullName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [sex, setSex] = useState('')
  const [city, setCity] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
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

  const subcategoryOptions = useMemo(() => {
    if (!categoryId) return []
    const selectedDomain = skillDomains.find((d) => d.id === categoryId)
    if (!selectedDomain?.categories) return []
    
    return selectedDomain.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }))
  }, [categoryId, skillDomains])

  const handleCategoryChange = (newCategoryId: string) => {
    setCategoryId(newCategoryId)
    setSubcategoryId('')
  }

  return (
    <div className={styles.page}>
      <Header isAuthPage={true} />
      
      <main className={styles.content}>
        <StepIndicator currentStep={2} totalSteps={3} />
        <div className={styles.columns}>
          <div className={styles.column}>
            <RegUserForm
                fullName={fullName}
                birthday={birthday}
                sex={sex}
                city={city}
                categoryId={categoryId}
                subcategoryId={subcategoryId}
                onChangeFullName={setFullName}
                onChangeBirthday={setBirthday}
                onChangeSex={setSex}
                onChangeCity={setCity}
                onChangeCategoryId={handleCategoryChange}
                onChangeSubcategoryId={setSubcategoryId}
                sexOptions={sexOptions}
                cityOptions={cityOptions}
                categoryOptions={categoryOptions}
                subcategoryOptions={subcategoryOptions}
            />
            </div>

            <div className={styles.column}>
              <IllustratedGuide
                ImageComponent={UserInfo}
                title="Расскажите немного о себе"
                description="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
              />
            </div>
          </div>
      </main>
    </div>
  )
}

export default RegUserPage