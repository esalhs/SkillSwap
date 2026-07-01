import styles from './ProfileInfoForm.module.css'
import { FC } from 'react'
import { clsx } from 'clsx'
import { Button } from '@/shared/ui/Button'
import { Select } from '@/shared/ui/Select'
import { Input } from '@/shared/ui/Input'
import { DatePicker } from '@/shared/ui/DatePicker'
import { EditIcon } from '@/shared/ui/Icons'

type ProfileInfoFormProps = {
  className?: string
}

const genderOptions = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
  { value: 'not_specified', label: 'Не указан' },
]

const cityOptions = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'novosibirsk', label: 'Новосибирск' },
  { value: 'ekaterinburg', label: 'Екатеринбург' },
  { value: 'kazan', label: 'Казань' },
  { value: 'nizhny_novgorod', label: 'Нижний Новгород' },
  { value: 'chelabinsk', label: 'Челябинск' },
  { value: 'samara', label: 'Самара' },
  { value: 'rostov', label: 'Ростов-на-Дону' },
  { value: 'ufa', label: 'Уфа' },
]
// моковые данные для опций

export const ProfileInfoForm: FC<ProfileInfoFormProps> = ({ className }) => {
  const onChange = () => {}
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.credentials_wrapper}>
        <Input
          label="Почта"
          value="Mariia@gmail.com" // моковые данные
          rightIcon={<EditIcon />}
          type="text"
          description="" // после применения правок по input можно удалить
          onChange={onChange} // заглушка обработчика
          onRightIconClick={onChange} // заглушка обработчика
          placeholder="Введите email"
        />
        <span className={styles.password}>Изменить пароль</span>
      </div>
      <Input
        label="Имя"
        value="Мария" // моковые данные
        rightIcon={<EditIcon />}
        type="text"
        description="" // после применения правок по input можно удалить
        onChange={onChange} // заглушка обработчика
        onRightIconClick={onChange} // заглушка обработчика
        placeholder="Введите ваше имя"
      />
      <div className={styles.date_sex_wrapper}>
        <DatePicker
          label="Дата рождения"
          value={new Date(1995, 9, 28)} // моковые данные
          onChange={onChange} // заглушка обработчика
        />
        <Select
          options={genderOptions}
          value="female" // моковые данные
          onChange={onChange} // заглушка обработчика
          placeholder="Не указан"
          label="Пол"
          className={styles.select}
        />
      </div>
      <Select
        options={cityOptions}
        value={'spb'} // моковые данные
        onChange={onChange} // заглушка обработчика
        placeholder="Не указан"
        label="Город"
        mode="search"
      />
      <div className={styles.textarea_container}>
        <span className={styles.textarea_label}>О себе</span>
        <div className={styles.textarea_wrapper}>
          <textarea
            className={styles.textarea}
            placeholder="Напишите о себе"
            onChange={onChange} // заглушка обработчика
            value="Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем‑то интересным!" // моковые данные
          />
          <button type="button" onClick={onChange} className={styles.textarea_button}>
            <EditIcon />
          </button>
        </div>
      </div>
      <Button>Сохранить</Button>
    </div>
  )
}
