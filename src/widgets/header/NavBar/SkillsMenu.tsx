// src/widgets/header/SkillsMenu.tsx

import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import styles from './SkillsMenu.module.css';
import { domainConfig } from '@/shared/lib/domainConfig';

interface SkillDomain {
  id: string;
  name: string;
  categories: {
    id: string;
    name: string;
    skills: any[];
  }[];
}

interface SkillsMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const SkillsMenu: React.FC<SkillsMenuProps> = ({ isOpen, onClose }) => {
  const [domains, setDomains] = useState<SkillDomain[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isOpen && !loaded && !loading) {
      setLoading(true);
      fetch('/db/skills.json')
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((data) => {
          setDomains(data.skillDomains || []);
          setLoaded(true);
        })
        .catch((err) => {
          console.error('Failed to load skills domains:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, loaded, loading]);

 
  if (!isOpen) return null;
  if (loading || !loaded || domains.length === 0) return null;

  return createPortal(
    <div className={styles.menu}>
      <div className={styles.grid}>
        {domains.map((domain) => {
          const config = domainConfig[domain.id];

          return (
            <div key={domain.id} className={styles.category}>
              <div className={styles.categoryHeader}>
                <span
                  className={styles.categoryIcon}
                  style={{ backgroundColor: config.bgColor }}
                >
                  {config.icon}
                </span>
                <h2 className={styles.categoryTitle}>{domain.name}</h2>
              </div>
              <ul className={styles.subcategoryList}>
                {domain.categories.map((category) => (
                  <li
                    key={category.id}
                    className={styles.subcategoryItem}
                    onClick={onClose}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>,
    document.body
  );
};