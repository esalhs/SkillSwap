import React from 'react'
import { ButtonLink } from '@/shared/ui/Button'
import styles from './SocialLoginForm.module.css'
import { GoogleIcon } from '@/shared/ui/Icons'
import { MacIcon } from '@/shared/ui/Icons'

export const SocialLoginForm: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Кнопка Google */}
      <div className={styles.socialButtonContainer}>
        <ButtonLink
          to="#"
          variant="secondary"
          className={styles.socialButton}
          icon={<GoogleIcon />}
        >
          Продолжить с Google
        </ButtonLink>

        {/* Кнопка Apple */}
        <ButtonLink to="#" variant="secondary" className={styles.socialButton} icon={<MacIcon />}>
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
