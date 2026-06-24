import React from 'react';
import { Logo } from '@/shared/ui/logo';
import { ButtonLink } from '@/shared/ui/Button';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
        <Logo className={styles.logo}>SkillSwap</Logo>
    
        <nav className={styles.nav} aria-label="Навигация в подвале">
            <ul className={styles.columns}>
                <li><ButtonLink className={styles.link} to="#">О проекте</ButtonLink></li>
                <li><ButtonLink className={styles.link} to="#">Все навыки</ButtonLink></li>
                <li><ButtonLink className={styles.link} to="#">Контакты</ButtonLink></li>
                <li><ButtonLink className={styles.link} to="#">Блог</ButtonLink></li>
                <li><ButtonLink className={styles.link} to="#">Политика конфиденциальности</ButtonLink></li>
                <li><ButtonLink className={styles.link} to="#">Пользовательское соглашение</ButtonLink></li>
            </ul>
        </nav>

        <p className={styles.copyright}>SkillSwap - 2025</p>
    </footer>
  );
};