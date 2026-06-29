import React, { useState } from 'react'
import { Header } from '@/widgets/header'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { RegUserForm } from '@/widgets/RegUserForm'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { UserInfo } from '@/shared/ui/Illustrations'
import styles from './RegUserPage.module.css'

export const RegUserPage: React.FC = () => {
  const [fullName, setFullName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [sex, setSex] = useState('')
  const [city, setCity] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')

  return (
    <div className={styles.page}>
      <Header isAuthPage={true} />
      
      <main className={styles.content}>
        <StepIndicator currentStep={2} totalSteps={3} />
        <div className={styles.colums}>
          <div className={styles.leftColumn  + ' ' + styles.column}>
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
                onChangeCategoryId={setCategoryId}
                onChangeSubcategoryId={setSubcategoryId}
                sexOptions={[]}
                cityOptions={[]}
                categoryOptions={[]}
                subcategoryOptions={[]}
            />
            </div>
            
            <div className={styles.rightColumn + ' ' + styles.column}>
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