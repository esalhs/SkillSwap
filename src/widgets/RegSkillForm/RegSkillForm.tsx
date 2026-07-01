import { FC, useState, ChangeEvent } from 'react'
import { Input } from '@/shared/ui/Input'
import { TextArea } from '@/shared/ui/TextArea'
import { ButtonLink } from '@/shared/ui/Button'
import { ImageUpload } from '@/shared/ui/ImageUpload'
import { ChevronDownIcon } from '@/shared/ui/Icons/ChevronDownIcon'
import { ChevronUpIcon } from '@/shared/ui/Icons/ChevronUpIcon'
import styles from './RegSkillForm.module.css'

export type RegSkillFormData = {
  skillName: string
  category: string
  subcategory: string
  description: string
  images: File[]
}

export type RegSkillFormProps = {
  onBack: () => void
  onSubmit: (data: RegSkillFormData) => void
}

export const RegSkillForm: FC<RegSkillFormProps> = ({ onBack, onSubmit }) => {
  const [skillName, setSkillName] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])

  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false)

  const toggleCategory = () => setIsCategoryOpen((prev) => !prev)
  const toggleSubcategory = () => setIsSubcategoryOpen((prev) => !prev)

  const handleSkillNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillName(e.target.value)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleImagesChange = (files: File[]) => {
    setImages(files)
  }

  const handleSubmit = () => {
    onSubmit({
      skillName,
      category: '',
      subcategory: '',
      description,
      images,
    })
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
          description=""
        />

        <Input
          label="Категория навыка"
          type="text"
          placeholder="Выберите категорию навыка"
          value=""
          onChange={() => {}}
          description=""
          readOnly
          rightIcon={isCategoryOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onRightIconClick={toggleCategory}
        />

        <Input
          label="Подкатегория навыка"
          type="text"
          placeholder="Выберите подкатегорию навыка"
          value=""
          onChange={() => {}}
          description=""
          readOnly
          rightIcon={isSubcategoryOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onRightIconClick={toggleSubcategory}
        />

        <TextArea
          label="Описание"
          placeholder="Коротко опишите, чему можете научить"
          value={description}
          onChange={handleDescriptionChange}
          rows={3}
        />

        <ImageUpload value={images} onChange={handleImagesChange} maxFiles={5} />
      </div>

      <div className={styles.buttons}>
        <ButtonLink to="#" variant="secondary" onClick={onBack} className={styles.button}>
          Назад
        </ButtonLink>
        <ButtonLink to="#" variant="primary" onClick={handleSubmit} className={styles.button}>
          Продолжить
        </ButtonLink>
      </div>
    </div>
  )
}