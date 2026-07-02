import { FC, useState, ChangeEvent, useEffect } from 'react'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { ButtonLink } from '@/shared/ui/Button'
import { ImageUpload } from '@/shared/ui/ImageUpload'
import { Select } from '@/shared/ui/Select'
import { fetchSkillDomains } from '@/api/skills'
import type { SkillDomain } from '@/shared/types'
import styles from './RegSkillForm.module.css'

export type RegSkillFormData = {
  skillName: string
  skillCategory: string
  skillSubcategory: string
  description: string
  skillImages: File[]
}

export type RegSkillFormProps = {
  onBack: () => void
  onSubmit: (data: RegSkillFormData) => void
  initialData?: Partial<RegSkillFormData>
}

export const RegSkillForm: FC<RegSkillFormProps> = ({
  onBack,
  onSubmit,
  initialData,
}) => {
  const [skillName, setSkillName] = useState(initialData?.skillName || '')
  const [skillCategory, setSkillCategory] = useState(initialData?.skillCategory || '')
  const [skillSubcategory, setSkillSubcategory] = useState(initialData?.skillSubcategory || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [skillImages, setSkillImages] = useState<File[]>(initialData?.skillImages || [])

  const [skillDomains, setSkillDomains] = useState<SkillDomain[]>([])
  const [errors, setErrors] = useState<Partial<Record<keyof RegSkillFormData, string>>>({})

  useEffect(() => {
    fetchSkillDomains()
      .then(setSkillDomains)
      .catch((err) => console.error('Failed to load skill domains:', err))
  }, [])

  const categoryOptions = skillDomains.map((domain) => ({
    value: domain.id,
    label: domain.name,
  }))

  const subcategoryOptions = (() => {
    if (!skillCategory) return []
    const selectedDomain = skillDomains.find((d) => d.id === skillCategory)
    if (!selectedDomain?.categories) return []
    return selectedDomain.categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    }))
  })()

  const handleCategoryChange = (newCategory: string) => {
    setSkillCategory(newCategory)
    setSkillSubcategory('')
  }

  const handleSkillNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillName(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleImagesChange = (files: File[]) => {
    setSkillImages(files)
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegSkillFormData, string>> = {}

    if (!skillName) {
      newErrors.skillName = 'Введите название навыка'
    } else if (skillName.length < 3 || skillName.length > 50) {
      newErrors.skillName = 'Название должно содержать от 3 до 50 символов'
    }

    if (!skillCategory) {
      newErrors.skillCategory = 'Выберите категорию'
    }

    if (!skillSubcategory) {
      newErrors.skillSubcategory = 'Выберите подкатегорию'
    }

    if (!description) {
      newErrors.description = 'Введите описание'
    } else if (description.length > 500) {
      newErrors.description = 'Описание не должно превышать 500 символов'
    }

    if (skillImages.length > 0) {
      const invalidImage = skillImages.find(
        (file) =>
          file.size > 2 * 1024 * 1024 || // 2MB
          !['image/jpeg', 'image/png'].includes(file.type),
      )
      if (invalidImage) {
        newErrors.skillImages = 'Файл должен быть JPEG/PNG и не более 2MB'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        skillName,
        skillCategory,
        skillSubcategory,
        description,
        skillImages,
      })
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.inputs}>
        <Input
          label="Название навыка"
          type="text"
          placeholder="Введите название вашего навыка"
          value={skillName}
          onChange={handleSkillNameChange}
          description={errors.skillName || ''}
          isError={!!errors.skillName}
        />

        <Select
          label="Категория навыка"
          value={skillCategory}
          onChange={(value) => {
            if (typeof value === 'string') {
              handleCategoryChange(value)
            }
          }}
          options={categoryOptions}
          placeholder="Выберите категорию"
          mode="simple"
        />
        {errors.skillCategory && <span className={styles.error_text}>{errors.skillCategory}</span>}

        <Select
          label="Подкатегория навыка"
          value={skillSubcategory}
          onChange={(value) => {
            if (typeof value === 'string') {
              setSkillSubcategory(value)
            }
          }}
          options={subcategoryOptions}
          placeholder="Выберите подкатегорию"
          mode="simple"
          disabled={!skillCategory}
        />
        {errors.skillSubcategory && <span className={styles.error_text}>{errors.skillSubcategory}</span>}

        <TextArea
          label="Описание"
          placeholder="Коротко опишите, чему можете научить"
          value={description}
          onChange={handleDescriptionChange}
          rows={3}
          isError={!!errors.description}
          description={errors.description || ''}
        />

        <ImageUpload value={skillImages} onChange={handleImagesChange} maxFiles={5} />
        {errors.skillImages && <span className={styles.error_text}>{errors.skillImages}</span>}
      </div>

      <div className={styles.buttons}>
        <ButtonLink
          to="#"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault()
            onBack()
          }}
          className={styles.button}
        >
          Назад
        </ButtonLink>
        <ButtonLink
          to="#"
          variant="primary"
          onClick={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className={styles.button}
        >
          Продолжить
        </ButtonLink>
      </div>
    </div>
  )
}
