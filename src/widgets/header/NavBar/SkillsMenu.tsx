import { createPortal } from 'react-dom'
import { tempCategories } from '@/shared/lib/tempCategories'
import styles from './SkillsMenu.module.css'

interface SkillsMenuProps {
  isOpen: boolean
  onClose?: () => void
}

export const SkillsMenu: React.FC<SkillsMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className={styles.menu}>
      <div className={styles.grid}>
        {tempCategories.map((category) => (
          <div key={category.id} className={styles.category}>
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>
                  {/* TODO: иконка-компонент */}
                </span>
                <h2 className={styles.categoryTitle}>{category.name}</h2>
              </div>
              <ul className={styles.subcategoryList}>
                {category.subcategories.map((sub) => (
                  <li
                    key={sub}
                    className={styles.subcategoryItem}
                    onClick={onClose}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
          </div>
        ))}
      </div>
    </div>,
    document.body
  )
}