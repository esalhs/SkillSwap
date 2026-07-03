import styles from './TextArea.module.css'
import { FC, ChangeEvent, FocusEvent } from 'react'

type TextAreaProps = {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  value: string
  placeholder: string
  label?: string
  readOnly?: boolean
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void
  rows?: number
  maxLength?: number
  isError?: boolean
  description?: string
}

export const TextArea: FC<TextAreaProps> = ({
  onChange,
  value,
  placeholder,
  label,
  readOnly,
  onFocus,
  rows = 4,
  maxLength,
  isError = false,
  description,
}) => {
  return (
    <div className={styles.textarea_container}>
      {label && <span className={isError ? styles.label_error : styles.label}>{label}</span>}
      <textarea
        className={`${styles.textarea} ${isError ? styles.textarea_error : ''}`}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onFocus={onFocus}
        rows={rows}
        maxLength={maxLength}
      />
      {description && (
        <span className={isError ? styles.description_error : styles.description}>
          {description}
        </span>
      )}
    </div>
  )
}
