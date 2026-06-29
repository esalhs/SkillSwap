import { Input } from '@/shared/ui/Input'
import styles from './RegUserForm.module.css'
import { CalendarIcon } from '@/shared/ui/Icons'
import { Select } from '@/shared/ui/Select'
import { ButtonLink, Button } from '@/shared/ui/Button'

export type RegUserFormProps = {
  fullName: string
  birthday: string
  sex: string
  city: string
  categoryId: string
  subcategoryId: string

  onChangeFullName: (value: string) => void
  onChangeBirthday: (value: string) => void
  onChangeSex: (value: string) => void
  onChangeCity: (value: string) => void
  onChangeCategoryId: (value: string) => void
  onChangeSubcategoryId: (value: string) => void
  sexOptions: { value: string; label: string }[]
  cityOptions: { value: string; label: string }[]
  categoryOptions: { value: string; label: string }[]
  subcategoryOptions: { value: string; label: string }[]
}

export function RegUserForm({
  //Значения
  fullName,
  birthday,
  sex,
  city,
  categoryId,
  subcategoryId,
  //Функции установки значений
  onChangeFullName,
  onChangeBirthday,
  onChangeSex,
  onChangeCity,
  onChangeCategoryId,
  onChangeSubcategoryId,
  //Опции выпадающих списков
  sexOptions,
  cityOptions,
  categoryOptions,
  subcategoryOptions,
}: RegUserFormProps) {
  return (
    <form className={styles.registerForm}>
      <figure>
        <Button className={styles.registerForm__avatar} variant="tertiary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            fill="none"
            viewBox="0 0 72 72"
          >
            <path
              stroke="#253017"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M53.946 56.174A22.47 22.47 0 0 0 36 47.25a22.47 22.47 0 0 0-17.946 8.925m35.892 0a27 27 0 1 0-35.892 0m35.892 0A26.92 26.92 0 0 1 36 63a26.9 26.9 0 0 1-17.946-6.825M45 29.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
            />
            <rect width="16" height="16" x="48" y="48" fill="#abd27a" rx="8" />
            <path
              fill="#fff"
              d="M60 56.5h-8a.504.504 0 0 1-.5-.5c0-.273.227-.5.5-.5h8c.273 0 .5.227.5.5s-.227.5-.5.5"
            />
            <path
              fill="#fff"
              d="M56 60.5a.504.504 0 0 1-.5-.5v-8c0-.273.227-.5.5-.5s.5.227.5.5v8c0 .273-.227.5-.5.5"
            />
          </svg>
        </Button>
      </figure>
      <fieldset className={styles.registerForm__fieldset}>
        <legend className={styles.registerForm__fieldset__legend}>Личные данные</legend>
        <Input
          label="Имя"
          type="text"
          value={fullName}
          onChange={(e) => onChangeFullName(e.target.value)}
          placeholder="Введите ваше имя"
          description=""
        />
        <div className={styles.registerForm__fieldset__block}>
          <Input
            label="Дата рождения"
            type="date"
            value={birthday}
            onChange={(e) => onChangeBirthday(e.target.value)}
            placeholder="дд.мм.гггг"
            description=""
            rightIcon={<CalendarIcon />}
          />
          <Select
            label="Пол"
            value={sex}
            onChange={(value) => {
              if (typeof value === 'string') {
                onChangeSex(value)
              }
            }}
            options={sexOptions}
            placeholder="Не указан"
            mode="simple"
            className={styles.select_for_form}
          />
        </div>
      </fieldset>
      <fieldset className={styles.registerForm__fieldset}>
        <legend className={styles.registerForm__fieldset__legend}>Местоположение</legend>
        <Select
          label="Город"
          value={city}
          onChange={(value) => {
            if (typeof value === 'string') {
              onChangeCity(value)
            }
          }}
          options={cityOptions}
          placeholder="Не указан"
          mode="simple"
          className={`${styles.select_in_flow} ${styles.select_in_flow_setting}`}
        />
      </fieldset>
      <fieldset className={styles.registerForm__fieldset}>
        <legend className={styles.registerForm__fieldset__legend}>Навыки и обучение</legend>
        <Select
          label="Категория навыка, которому хотите научиться"
          value={categoryId}
          onChange={(value) => {
            if (typeof value === 'string') {
              onChangeCategoryId(value)
            }
          }}
          options={categoryOptions}
          placeholder="Выберите категорию"
          mode="simple"
          className={styles.select_in_flow}
        />
        <Select
          label="Подкатегория навыка, которому хотите научиться"
          value={subcategoryId}
          onChange={(value) => {
            if (typeof value === 'string') {
              onChangeSubcategoryId(value)
            }
          }}
          options={subcategoryOptions}
          placeholder="Выберите подкатегорию"
          mode="simple"
          className={styles.select_in_flow}
        />
      </fieldset>
      <div className={styles.registerForm__controls}>
        <ButtonLink className={styles.registerForm__controls__button} variant="secondary" to={''}>
          Назад
        </ButtonLink>
        <ButtonLink className={styles.registerForm__controls__button} to={''}>
          Продолжить
        </ButtonLink>
      </div>
    </form>
  )
}

export default RegUserForm
