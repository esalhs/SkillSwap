import styles from './Select.module.css'
import { FC } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CrossIcon,
  CheckboxSubcategoryIcon,
  CheckboxCategoryIcon,
} from '../Icons'
import { useState, useEffect, useRef } from 'react'
import clsx from 'clsx'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = {
  options: SelectOption[]
  value: string | string[] | null
  onChange: (value: string | string[]) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  className?: string
  mode?: 'simple' | 'search' | 'multi' // по умолчанию 'simple'
  type?: 'category' | 'subcategory' // для чекбоксов
  isError?: boolean
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '',
  label,
  disabled,
  className,
  mode = 'simple',
  type,
  isError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [previousValue, setPreviousValue] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const simpleInput = options.find((option) => option.value === value) // для simple, search
  const searchInput = simpleInput?.label || query
  const filteredOptions = options.filter(
    (option) => !query || option.label.toLowerCase().includes(query.toLowerCase()),
  )
  const handleToggle = (option: string) => {
    const newCategories = selectedCategories.includes(option)
      ? selectedCategories.filter((v) => v !== option)
      : [...selectedCategories, option]

    setSelectedCategories(newCategories)
    onChange(newCategories)
  }

  const wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      <div className={clsx(styles.container, isOpen && styles.container_open, isError && styles.container_error, className)}>
        <span>{label}</span>
        <div ref={wrapperRef} className={styles.select_wrapper}>
          {mode === 'simple' && (
            <>
              <div className={clsx(styles.select, isOpen && styles.dropdown_open)}>
                <span className={clsx(!simpleInput && styles.init_option)}>
                  {simpleInput ? simpleInput.label : placeholder}
                </span>
                <button
                  disabled={disabled}
                  type="button"
                  className={styles.button}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
              </div>
              {isOpen && (
                <div className={styles.dropdown}>
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={clsx(
                        styles.option,
                        option.value === value && styles.option_selected,
                      )}
                      onClick={() => {
                        setIsOpen(false)
                        onChange(option.value)
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {mode === 'search' && (
            <>
              <div className={clsx(styles.select, isOpen && styles.dropdown_open)}>
                <input
                  className={styles.search_input}
                  type="search"
                  value={searchInput}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    onChange('')
                    setIsOpen(true)
                  }}
                  placeholder={placeholder}
                />
                {query && (
                  <button type="button" className={styles.button} onClick={() => setQuery('')}>
                    <CrossIcon />
                  </button>
                )}
                {!query && (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={disabled}
                  >
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </button>
                )}
              </div>
              {isOpen && filteredOptions.length > 0 && (
                <div className={clsx(styles.dropdown, styles.dropdown_search)}>
                  {filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={clsx(
                        styles.option,
                        option.value === previousValue && styles.option_selected,
                      )}
                      onClick={() => {
                        setIsOpen(false)
                        onChange(option.value)
                        setQuery('')
                        setPreviousValue(option.value)
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
              {isOpen && filteredOptions.length === 0 && query && (
                <div className={styles.no_results}>Ничего не найдено</div>
              )}
            </>
          )}
          {mode === 'multi' && (
            <>
              <div className={clsx(styles.select, isOpen && styles.dropdown_open)}>
                <span className={clsx(selectedCategories.length === 0 && styles.init_option)}>
                  {selectedCategories.length > 0
                    ? `Выбрано: ${selectedCategories.length}`
                    : placeholder}
                </span>
                <button
                  type="button"
                  disabled={disabled}
                  className={styles.button}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </button>
              </div>
              {isOpen && (
                <div className={styles.dropdown}>
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={clsx(
                        styles.option,
                        styles.select_category,
                        selectedCategories.includes(option.value) && styles.option_selected,
                      )}
                      onClick={() => {
                        handleToggle(option.value)
                      }}
                    >
                      <button type="button" className={styles.button_category}>
                        {type === 'category' && (
                          <CheckboxCategoryIcon
                            active={selectedCategories.includes(option.value)}
                            color="#ABD27A"
                          />
                        )}
                        {type === 'subcategory' && (
                          <CheckboxSubcategoryIcon
                            active={selectedCategories.includes(option.value)}
                            color="#ABD27A"
                          />
                        )}
                      </button>
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
