import skillsData from '../../../public/db/skills.json'
/** Форматирует дату в читаемый вид */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

/** Обрезает строку до maxLength символов */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

/** Генерирует уникальный id */
export function generateId(): string {
  return crypto.randomUUID()
}

/** Получает возраст, используя дату рождения */
export function getAge(birthday: string): number {
  const birthDate = new Date(birthday)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

/** Фильтрует скиллы по id */
export function getSkillName(id: string) {
  return (
    skillsData.skillDomains
      .flatMap((domain) => domain.categories.flatMap((cat) => cat.skills))
      .find((skill) => skill.id === id)?.name || 'Нет данных'
  )
}

/** Фильтрует категории по id */
export function getCategoryNames(ids: string[]) {
  return ids.map(
    (id) =>
      skillsData.skillDomains.flatMap((domain) => domain.categories).find((cat) => cat.id === id)
        ?.name || 'Нет данных',
  )
}

/** Склоняет слово "год" в зависимости от возраста */
export function getYearDeclension(age: number): string {
  const lastDigit = age % 10
  const lastTwoDigits = age % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'лет'
  }

  switch (lastDigit) {
    case 1:
      return 'год'
    case 2:
    case 3:
    case 4:
      return 'года'
    default:
      return 'лет'
  }
}
