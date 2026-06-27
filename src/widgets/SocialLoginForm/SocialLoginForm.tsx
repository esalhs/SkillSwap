import React from 'react'
import { ButtonLink } from '@/shared/ui/Button' 
import styles from './SocialLoginForm.module.css'

// Импортируйте ваши SVG как React-компоненты (названия могут отличаться в зависимости от вашего сборщика)
// import { GoogleIcon } from '@/shared/assets/icons/google.svg'
// import { AppleIcon } from '@/shared/assets/icons/apple.svg'

export const SocialLoginForm: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Кнопка Google */}
      <div className={styles.socialButtonContainer}>
      <ButtonLink
        to="#"
        variant="secondary"
        className={styles.socialButton}
        icon="G" //{<GoogleIcon className={styles.socialIcon}/>}
      >
        Продолжить с Google
      </ButtonLink>

      {/* Кнопка Apple */}
      <ButtonLink
        to="#"
        variant="secondary"
        className={styles.socialButton}
        icon="🍎" // {<AppleIcon className={styles.socialIcon}/>}
      >
        Продолжить с Apple
      </ButtonLink>
      </div>

      {/* Разделитель "или" с линиями */}
      <div className={styles.dividerContainer}>
        <span className={styles.line} />
        <span>или</span>
        <span className={styles.line} />
      </div>
    </div>
  )
}