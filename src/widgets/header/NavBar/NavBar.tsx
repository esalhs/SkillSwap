import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import { SkillsMenu } from './SkillsMenu'
import styles from './NavBar.module.css'
import { ChevronDownIcon } from '@/shared/ui/Icons/index'

export const NavBar: React.FC = () => {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)

  const toggleSkills = () => setIsSkillsOpen((prev) => !prev)
  const closeSkills = () => setIsSkillsOpen(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isSkillsOpen) {
        closeSkills()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSkillsOpen])

  useEffect(() => {
    if (isSkillsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSkillsOpen])

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            О проекте
          </NavLink>
        </li>

        <li className={styles.item}>
          <Button
            variant="tertiary"
            onClick={toggleSkills}
            className={styles.skillsButton}
          >
            Все навыки
          </Button>
          <ChevronDownIcon color='#253017'/>
        </li>
      </ul>

      {isSkillsOpen && <div className={styles.overlay} onClick={closeSkills} />}
      {isSkillsOpen && <SkillsMenu isOpen={isSkillsOpen} onClose={closeSkills} />}
    </nav>
  )
}