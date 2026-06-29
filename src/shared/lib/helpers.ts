import type { Skill, SkillCategory, SkillDomain } from '@/shared/types'
import type { TagProps } from '../ui/Tag'
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
export function getSkillName(skills: Skill[], id: string) {
  return skills.find(s => s.id === id)?.name ?? 'Нет данных'
}

/** Фильтрует категории по id */
export function getCategoryNames(categories: SkillCategory[], ids: string[]) {
  return ids.map(id => categories.find(c => c.id === id)?.name ?? 'Нет данных')
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

// Преобразование скиллов в категории
const categoryMap: Record<string, TagProps['category']> = {
  Фотография: 'art',
  'Музыка и звук': 'art',
  Дизайн: 'art',
  Рукоделие: 'art',

  'Иностранные языки': 'languages',
  'Программирование и IT': 'plus',
  'Логика и критическое мышление': 'education',
  'Публичные выступления': 'education',

  'Йога и медитация': 'health',
  'Водные виды спорта': 'health',
  'Походы и туризм': 'health',

  Кулинария: 'home',
  Садоводство: 'home',
  'Ремонт и мастерство': 'home',

  'Маркетинг и SMM': 'business',
  'Тайм-менеджмент': 'business',

  'Ролевые игры и фэнтези': 'plus',
}

export function getCategoryByCategoryName(categoryName: string): TagProps['category'] {
  return categoryMap[categoryName] || 'plus'
}

export function getSkillCategoryBySkillName(domains: SkillDomain[], skillName: string): TagProps['category'] {
  const domain = domains.find((d) =>
    d.categories.some((cat) => cat.skills.some((skill) => skill.name === skillName)),
  )

  const category = domain?.categories.find((cat) =>
    cat.skills.some((skill) => skill.name === skillName),
  )?.name

  return categoryMap[category || ''] || 'plus'
}

// Возвращает плоский массив всех навыков из доменов
export function getSkillsFromDomains(domains: SkillDomain[]): Skill[] {
  return domains.flatMap(d => d.categories.flatMap(c => c.skills))
}

// Возвращает плоский массив всех категорий из доменов
export function getCategoriesFromDomains(domains: SkillDomain[]): SkillCategory[] {
  return domains.flatMap(d => d.categories)
}
