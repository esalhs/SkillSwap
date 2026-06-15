import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/lib/constants'
import logoSvg from '@/shared/ui/Logo.svg'
import styles from './logo.module.css'

interface LogoProps {
  children?: ReactNode
  className?: string
}

export function Logo({ children, className }: LogoProps) {
  return (
    <Link to={ROUTES.HOME} className={`${styles.logo} ${className ?? ''}`}>
      <img src={logoSvg} alt="SkillSwap" className={styles.icon} />
      {children && <span className={styles.text}>{children}</span>}
    </Link>
  )
}
