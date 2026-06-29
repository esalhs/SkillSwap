import styles from './TextArea.module.css'
import { FC } from 'react'
import { TextAreaProps } from './type'

export const TextArea: FC<TextAreaProps> = ({
  onChange,
  value,
  placeholder,
  label,
  readOnly,
  onFocus,
  rows = 4,
  maxLength,
}) => {
  return ( 
    <div className={styles.textarea_container}>
      {label && <span>{label}</span>}
        <textarea
          className={styles.textarea}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={onFocus}
          rows={rows}
          maxLength={maxLength}
        />
    </div>
  )
}