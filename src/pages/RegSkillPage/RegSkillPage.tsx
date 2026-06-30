import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { RegSkillForm, RegSkillFormData } from '@/widgets/RegSkillForm'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { SchoolBoard } from '@/shared/ui/Illustrations'
import { ROUTES } from '@/shared/lib/constants'
import styles from './RegSkillPage.module.css'

export const RegSkillPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(ROUTES.REGISTER)
  }

  const handleSubmit = (data: RegSkillFormData) => {
    console.log('Регистрация навыка:', data)
  }

  return (
    <div className={styles.pageWrapper}>
      <Header isAuthPage={true} />

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Регистрация навыка</h1>

        <StepIndicator currentStep={3} totalSteps={3} />

        <div className={styles.container}>
          <section className={styles.formSection}>
            <RegSkillForm onBack={handleBack} onSubmit={handleSubmit} />
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
