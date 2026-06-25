import styles from './ImageUpload.module.css'
import { GalleryAddIcon } from '../../ui/Icons/GalleryAdd'
import { useRef, useState } from 'react'

type ImageUploadProps = {
  value: File[]
  onChange: (files: File[]) => void
  maxFiles?: number
  className?: string
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
    if (props.maxFiles && props.value.length === props.maxFiles) return
    props.onChange([...props.value, ...Array.from(e.dataTransfer.files)])
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.maxFiles && props.value.length === props.maxFiles) return
    props.onChange([...props.value, ...Array.from(e.target.files ?? [])])
  }

  const onDelete = (i: number) => {
    props.onChange(props.value.filter((_, index) => index !== i))
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
      className={`${styles.imageContainer} ${isDragging && styles.dragging}`}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <p className={styles.text}>Перетащите или выберите изображения навыка</p>
      <input type="file" accept="image/*" multiple ref={inputRef} onChange={onChange} className={styles.imageInput} />
      <button type="button" className={styles.uploadButton} onClick={() => inputRef.current?.click()}>
        <GalleryAddIcon color="var(--color-accent)" />
        Выбрать изображения
      </button>
      {props.value.length > 0 && (
        <div className={styles.fileList}>
          {props.value.map((file, i) => (
            <div key={i} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <button type="button" className={styles.deleteButton} onClick={() => onDelete(i)}>
                х
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
