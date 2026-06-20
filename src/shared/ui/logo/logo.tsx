import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'
import { LogoIcon } from '../Icons/LogoIcon'
import styles from './logo.module.css'

interface LogoProps {
  children?: ReactNode
  className?: string
}

export function Logo({ children, className }: LogoProps) {
  return (
    <Link to={ROUTES.HOME} className={`${styles.logo} ${className ?? ''}`}>
      <LogoIcon className={styles['logo-icon']} />
      {children && <span className={styles['text']}>{children}</span>}
    </Link>
  )
}
