import { useState, useRef, useEffect, useCallback } from 'react'
import { DayPicker } from 'react-day-picker'
import { ru } from 'react-day-picker/locale'
import 'react-day-picker/style.css'
import { format } from 'date-fns'
import styles from './date-picker.module.css'

interface DatePickerProps {
  value?: Date | undefined
  onChange?: (date: Date | undefined) => void
  label?: string
  error?: string
  className?: string
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  fromYear?: number
  toYear?: number
}

export function DatePicker({
  value,
  onChange,
  label,
  error,
  className,
  disabled = false,
  id,
  name,
  placeholder = 'дд.мм.гггг',
  fromYear = 1900,
  toYear = new Date().getFullYear(),
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [draftDate, setDraftDate] = useState<Date | undefined>(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [month, setMonth] = useState<Date>(() => value ?? new Date(toYear, 0, 1))

  const displayValue = value ? format(value, 'dd.MM.yyyy') : ''

  const handleOpen = useCallback(() => {
    if (disabled) return
    setDraftDate(value)
    setMonth(value ?? new Date(toYear, 0, 1))
    setIsOpen(true)
  }, [disabled, value, toYear])

  const handleCancel = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleConfirm = useCallback(() => {
    onChange?.(draftDate)
    setIsOpen(false)
  }, [draftDate, onChange])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className={`${styles['date-picker']} ${className ?? ''}`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`${styles['date-picker__label']} ${error ? styles['date-picker__label--error'] : ''}`}
        >
          {label}
        </label>
      )}
      <div className={styles['date-picker__input-wrapper']}>
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          value={displayValue}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          onFocus={handleOpen}
          className={`${styles['date-picker__input']} ${error ? styles['date-picker__input--error'] : ''} ${disabled ? styles['date-picker__input--disabled'] : ''}`}
        />
        <svg
          className={styles['date-picker__icon']}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      {error && <span className={styles['date-picker__error']}>{error}</span>}
      {isOpen && (
        <div className={styles['date-picker__popover']}>
          <DayPicker
            mode="single"
            selected={draftDate}
            onSelect={(date) => setDraftDate(date)}
            month={month}
            onMonthChange={setMonth}
            locale={ru}
            startMonth={new Date(fromYear, 0)}
            endMonth={new Date(toYear, 11)}
            captionLayout="dropdown"
            hideNavigation
            defaultMonth={value ?? new Date(toYear, 0, 1)}
            weekStartsOn={1}
            footer={
              <div className={styles['date-picker__footer']}>
                <button
                  type="button"
                  className={`${styles['date-picker__btn']} ${styles['date-picker__btn--cancel']}`}
                  onClick={handleCancel}
                >
                  Отменить
                </button>
                <button
                  type="button"
                  className={`${styles['date-picker__btn']} ${styles['date-picker__btn--select']}`}
                  onClick={handleConfirm}
                >
                  Выбрать
                </button>
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}
