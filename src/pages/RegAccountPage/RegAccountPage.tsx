import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Header } from '@/widgets/header'
import { StepIndicator } from '@/shared/ui/StepIndicator'
import { SocialLoginForm } from '@/widgets/SocialLoginForm'
import { IllustratedGuide } from '@/widgets/IllustratedGuide'
import { LightBulb } from '@/shared/ui/Illustrations'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { EyeIcon } from '@/shared/ui/Icons/EyeIcon'
import { isValidEmail, isValidPassword } from '@/shared/lib/validation'
import { setStep1Data, setCurrentStep } from '@/features/auth/model/RegistrationSlice'
import { ROUTES } from '@/shared/lib/constants'
import styles from './RegAccountPage.module.css'

export const RegAccountPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateEmail = (value: string): string | undefined => {
    if (!value) return 'Введите email'
    if (!isValidEmail(value)) return 'Введите корректный email'
    return undefined
  }

  const validatePassword = (value: string): string | undefined => {
    if (!value) return 'Введите пароль'
    if (!isValidPassword(value)) return 'Пароль должен содержать не менее 8 знаков'
    return undefined
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    const error = validateEmail(value)
    setErrors((prev) => ({ ...prev, email: error }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    const error = validatePassword(value)
    setErrors((prev) => ({ ...prev, password: error }))
  }

  const handleContinue = () => {
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      })
      return
    }

    dispatch(setStep1Data({ email, password }))
    dispatch(setCurrentStep(2))
    navigate(ROUTES.REGISTER_USER)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
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
            <div className={styles.inputs}>
              <Input
                label="Email"
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={handleEmailChange}
                description={errors.email || ''}
                isError={!!errors.email}
              />
              <Input
                label="Пароль"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Придумайте надёжный пароль"
                value={password}
                onChange={handlePasswordChange}
                description={errors.password || 'Пароль должен содержать не менее 8 знаков'}
                isError={!!errors.password}
                rightIcon={<EyeIcon visibility={isPasswordVisible} />}
                onRightIconClick={togglePasswordVisibility}
              />
            </div>
            <Button
              type="button"
              variant="primary"
              className={styles.button}
              onClick={handleContinue}
            >
              Далее
            </Button>
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
