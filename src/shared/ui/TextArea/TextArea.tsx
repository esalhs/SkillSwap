import styles from './TextArea.module.css'
import { FC } from 'react'
import { TextAreaProps } from './type'
import clsx from 'clsx'

export const TextArea: FC<TextAreaProps> = ({
  onChange,
  value,
  placeholder,
  label,
  readOnly,
  onFocus,
  rows = 4,
  maxLength,
  isError,
  description,
}) => {
  return (
    <div className={styles.textarea_container}>
      {label && <span>{label}</span>}
        <textarea
          className={clsx(styles.textarea, isError && styles.textarea_incorrect)}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={onFocus}
          rows={rows}
          maxLength={maxLength}
        />
      {description && (
        <div className={clsx(styles.description, isError && styles.description_incorrect)}>
          {description}
        </div>
      )}
    </div>
  )
}