import { ChangeEvent, FocusEvent} from 'react'

export type TextAreaProps = {
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
  className?: string
}