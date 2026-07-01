import { Header } from '@/widgets/header'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { SocialLoginForm } from '@/widgets/SocialLoginForm'
import { AuthForm } from '@/widgets/AuthForm'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { LightBulb } from '@/shared/ui/Illustrations'
import styles from './RegAccountPage.module.css'

export const RegAccountPage = () => {
  const onSubmit = () => {}
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
              onSubmit={onSubmit} // заглушка обработчика
              mode="register"
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
