import styles from './Input.module.css'
import { FC, ChangeEvent } from 'react'
import clsx from 'clsx'

type InputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: string
  placeholder: string
  type: string
  description: string
  label?: string
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
  isError?: boolean
  onRightIconClick?: () => void
}

export const Input: FC<InputProps> = ({
  onChange,
  value,
  placeholder,
  label,
  type,
  description,
  leftIcon,
  rightIcon,
  isError,
  onRightIconClick,
}) => {
  const showClearButton = type === 'search' && value

  return (
    <div className={styles.input_container}>
      <span>{label}</span>
      <div className={styles.input_wrapper}>
        {leftIcon && <div className={`${styles.left_icon} ${styles.icon}`}>{leftIcon}</div>}
        <input
          className={clsx(
            styles.input,
            leftIcon && styles.is_left_icon,
            rightIcon && styles.is_right_icon,
            isError && styles.input_incorrect,
          )}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
        />
        {showClearButton && (
          <button
            className={styles.clear_button}
            type="button"
            onClick={onRightIconClick}
            aria-label="Удалить введенный запрос"
          />
        )}
        {rightIcon && (
          <button
            className={`${styles.right_icon} ${styles.icon}`}
            onClick={onRightIconClick}
            type="button"
            aria-label="Показать/скрыть пароль"
          >
            {rightIcon}
          </button>
        )}
      </div>
      <div className={clsx(styles.description, isError && styles.description_incorrect)}>
        {description}
      </div>
    </div>
  )
}
