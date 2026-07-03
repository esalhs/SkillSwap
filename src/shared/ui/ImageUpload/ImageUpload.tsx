import styles from './ImageUpload.module.css'
import { GalleryAddIcon, CrossIcon } from '@/shared/ui/Icons'
import { useRef, useState } from 'react'

type ImageUploadProps = {
  value: File[]
  onChange: (files: File[]) => void
  maxFiles?: number
  className?: string
  isError?: boolean
  errorMessage?: string
}

export const ImageUpload = (props: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isDragging, setIsDragging] = useState(false)

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false)
    e.preventDefault()
    if (props.maxFiles && props.value.length >= props.maxFiles) return
    props.onChange([...props.value, ...Array.from(e.dataTransfer.files)])
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.maxFiles && props.value.length >= props.maxFiles) return
    props.onChange([...props.value, ...Array.from(e.target.files ?? [])])
  }

  const onDelete = (file: File) => {
    props.onChange(props.value.filter((f) => !(f.name === file.name && f.size === file.size)))
  }

  const onDragEnter = () => {
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsDragging(false)
  }

  return (
    <div
      className={`${styles.imageContainer} ${isDragging && styles.dragging} ${props.isError ? styles.imageContainer_error : ''}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <p className={styles.text}>Перетащите или выберите изображения навыка</p>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        onChange={onChange}
        className={styles.imageInput}
      />
      <button type="button" className={styles.uploadButton} onClick={() => inputRef.current?.click()}>
        <GalleryAddIcon color="var(--color-accent)" />
        Выбрать изображения
      </button>
      {props.value.length > 0 && (
        <div className={styles.fileList}>
          {props.value.map((file) => (
            <div key={`${file.name}-${file.size}`} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <button type="button" className={styles.deleteButton} onClick={() => onDelete(file)}>
                <CrossIcon />
              </button>
            </div>
          ))}
        </div>
      )}
      {props.errorMessage && <div className={styles.error_message}>{props.errorMessage}</div>}
    </div>
  )
}
