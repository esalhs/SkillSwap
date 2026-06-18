import { FC } from 'react';
import styles from './Header.module.css';
// import { LogoIcon } from '@/shared/ui/Icons/LogoIcon';

type HeaderProps = {
    userData: {},
};

export const Header: FC<HeaderProps> = ({ userData }) => {
  return (
    <header className={styles.header}>
        Хедер
    </header>
  );
};