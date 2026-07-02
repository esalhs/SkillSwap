import { useNavigate } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { SocialLoginForm } from '@/widgets/SocialLoginForm'
import { AuthForm } from '@/widgets/AuthForm'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { LightBulb } from '@/shared/ui/Illustrations'
import { useRegistrationSteps } from '@/shared/hooks/useRegistrationSteps'
import { ROUTES } from '@/shared/lib/constants'
import styles from './RegAccountPage.module.css'

export const RegAccountPage = () => {
  const navigate = useNavigate()
  const { data, updateStep1, validateStep1, errors } = useRegistrationSteps()

  const handleSubmit = (email: string, password: string) => {
    updateStep1(email, password)
    if (validateStep1()) {
      navigate(ROUTES.REG_USER)
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Header isAuthPage={true} />
        <StepIndicator currentStep={1} totalSteps={3} />
      </div>
      <div className={styles.content}>
        <div className={styles.form_container}>
          <div className={styles.form}>
            <SocialLoginForm />
            <AuthForm
              mode="register"
              onSubmit={handleSubmit}
              email={data.email}
              password={data.password}
              emailError={errors.email}
              passwordError={errors.password}
            />
          </div>
        </div>
        <div className={styles.guide}>
          <IllustratedGuide
            ImageComponent={LightBulb}
            title="Добро пожаловать в SkillSwap!"
            description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
          />
        </div>
      </div>
    </main>
  )
}
