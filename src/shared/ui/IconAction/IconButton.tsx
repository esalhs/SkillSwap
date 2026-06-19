import React from 'react'
import styles from './IconAction.module.css'

export type IconButtonProps = {
  icon: React.ReactNode
  ariaLabel: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function IconButton({ icon, ariaLabel, className = '', onClick }: IconButtonProps) {
  return (
    <button
      className={`${styles.container} ${className}`.trim()}
      aria-label={ariaLabel}
      onClick={onClick}
      type="button"
    >
      {icon}
    </button>
  )
}

export default IconButton
