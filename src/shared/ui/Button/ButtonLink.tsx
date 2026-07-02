import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styles from './Button.module.css'
import { ButtonVariant, IconPosition } from './Button'

export type ButtonLinkProps = Omit<LinkProps, 'children'> & {
  children: React.ReactNode
  icon?: React.ReactNode
  iconPosition?: IconPosition
  variant?: ButtonVariant
  className?: string
  disabled?: boolean
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  children,
  icon,
  iconPosition = 'before',
  variant = 'primary',
  className,
  disabled,
  onClick,
  ...props
}) => {
  const linkClasses = [
    styles.button,
    styles[variant],
    icon ? (iconPosition === 'after' ? styles.iconAfter : styles.iconBefore) : '',
    className,
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    // Вызываем onClick из props, если есть
    if (onClick) {
      onClick(e)
    }
    // Иначе Link сам обработает навигацию через to prop
  }

  return (
    <Link className={linkClasses} {...props} onClick={disabled ? handleClick : onClick}>
      {icon && <span className={styles.iconWrapper}>{icon}</span>}
      <span>{children}</span>
    </Link>
  )
}
