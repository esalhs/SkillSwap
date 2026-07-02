import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Input } from '@/shared/ui/Input'
import { ButtonLink } from '@/shared/ui/Button'
import { EyeIcon } from '@/shared/ui/Icons/EyeIcon'
import styles from './AuthForm.module.css'

export type AuthFormMode = 'login' | 'register'

export type AuthFormProps = {
  mode: AuthFormMode
  onSubmit: (email: string, password: string) => void
  email?: string
  password?: string
  emailError?: string
  passwordError?: string
}

export const AuthForm: FC<AuthFormProps> = ({
  mode,
  onSubmit,
  email: propEmail = '',
  password: propPassword = '',
  emailError,
  passwordError,
}) => {
  const [email, setEmail] = useState(propEmail)
  const [password, setPassword] = useState(propPassword)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  useEffect(() => {
    setEmail(propEmail)
  }, [propEmail])

  useEffect(() => {
    setPassword(propPassword)
  }, [propPassword])

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  const isLogin = mode === 'login'

  const buttonText = isLogin ? 'Войти' : 'Далее'
  const passwordPlaceholder = isLogin ? 'Введите ваш пароль' : 'Придумайте надёжный пароль'
  const passwordDescription = isLogin ? '' : 'Пароль должен содержать не менее 8 знаков'

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.inputs}>
        <Input
          label="Email"
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={handleEmailChange}
          description={emailError || ''}
          isError={!!emailError}
        />

        <Input
          label="Пароль"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={passwordPlaceholder}
          value={password}
          onChange={handlePasswordChange}
          description={passwordError || passwordDescription}
          isError={!!passwordError}
          rightIcon={<EyeIcon visibility={isPasswordVisible} />}
          onRightIconClick={togglePasswordVisibility}
        />
      </div>

      <ButtonLink
        to="#"
        variant="primary"
        onClick={handleButtonClick}
        className={styles.button}
      >
        {buttonText}
      </ButtonLink>
    </form>
  )
}