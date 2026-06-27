import type { Skill, SkillDomain } from '@/shared/types'

const BASE_URL = '/db'

export async function fetchSkillDomains(): Promise<SkillDomain[]> {
  const response = await fetch(`${BASE_URL}/skills.json`)
  if (!response.ok) throw new Error('Failed to fetch skills')
  const data = await response.json()
  return data.skillDomains
}

export async function fetchSkills(): Promise<Skill[]> {
  const domains = await fetchSkillDomains()
  return domains.flatMap(d => d.categories.flatMap(c => c.skills))
}

export async function fetchSkillById(id: string): Promise<Skill | undefined> {
  const skills = await fetchSkills()
  return skills.find((skill) => skill.id === id)
}
