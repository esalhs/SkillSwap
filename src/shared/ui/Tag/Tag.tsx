import { ReactNode } from 'react'
import styles from './Tag.module.css'

export type TagProps = {
  children: ReactNode
  category: 'business' | 'art' | 'languages' | 'education' | 'home' | 'health' | 'plus'
  className?: string
}

export function Tag({ children, category, className = '' }: TagProps) {
  const combinedClassName = `${styles.tag} ${styles[category]} ${className}`.trim()

  return <span className={combinedClassName}>{children}</span>
}