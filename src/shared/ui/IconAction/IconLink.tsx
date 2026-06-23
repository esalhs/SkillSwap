import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styles from './IconAction.module.css'

export type IconLinkProps = Omit<LinkProps, 'children'> & {
  icon: React.ReactNode
  ariaLabel: string
  className?: string
}

export function IconLink({ icon, ariaLabel, className = '', to, ...restLinkProps }: IconLinkProps) {
  return (
    <Link
      to={to}
      className={`${styles.container} ${className}`.trim()}
      aria-label={ariaLabel}
      {...restLinkProps}
    >
      {icon}
    </Link>
  )
}

export default IconLink
