import React from 'react'
import styles from './Radio.module.css'

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export function Radio({ label, className = '', ...inputProps }: RadioProps) {
  return (
    <label className={`${styles.container} ${className}`.trim()}>
      <input type="radio" className={styles.input} {...inputProps} />
      <span className={styles.label}>{label}</span>
    </label>
  )
}

export default Radio
