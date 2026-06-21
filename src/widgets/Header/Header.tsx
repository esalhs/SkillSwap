import React from 'react';
import { HeaderProps } from './types';
import styles from './Header.module.css';
// import { Logo } from '@/shared/ui/Logo';
// import { Navbar } from '@/shared/ui/Navbar';
// import { SearchInput } from '@/shared/ui/SearchInput';
// import { IconButton } from '@/shared/ui/IconButton';
import { ButtonLink } from '@/shared/ui/Button';
// import { Button } from '@/shared/ui/Button';

// pfukeirb
const LogoStub = () => <div className={styles.stub}>Logo</div>;
const NavbarStub = () => <div className={styles.stub}>Navbar</div>;
const SearchInputStub = () => <div className={styles.stub}>SearchInput</div>;
const IconButtonStub = ({ label }: { label: string }) => <button className={styles.stub}>Icon {label}</button>;
//const ButtonLinkStub = ({ text }: { text: string }) => <button className={styles.stub}>{text}</button>;
const ButtonStub = ({ text }: { text: string }) => <button className={styles.stub}>{text}</button>;


export const Header: React.FC<HeaderProps> = ({ userData, isAuthPage = false }) => {
  
  // Страница логина / регистрации
  if (isAuthPage) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <LogoStub />
          <ButtonStub text="Закрыть ×" />
        </div>
      </header>
    );
  }

  // Пользователь авторизован
  if (userData) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.leftSection}>
            <LogoStub />
            <NavbarStub />
          </div>
          
          <div className={styles.centerSection}>
            <SearchInputStub />
          </div>
          
          <div className={styles.rightSection}>
            <div className={styles.iconSection}>
            <IconButtonStub label="Theme" />
            <IconButtonStub label="Notifications" />
            <IconButtonStub label="Favorites" />
            </div>
            <div className={styles.buttonSection}>
            <span className={styles.userName}>{userData.name}</span>
            <img 
              src={userData.avatarUrl} 
              alt={userData.name} 
              className={styles.userAvatar} 
            />
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Пользователь не авторизован (по умолчанию)
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <LogoStub />
          <NavbarStub />
        </div>
        
        <div className={styles.centerSection}>
          <SearchInputStub />
        </div>
        
        <div className={styles.rightSection}>
          <div className={styles.iconSection}>
          <IconButtonStub label="Theme" />
          </div>
           <div className={styles.buttonSection}>
          <ButtonLink to="/login" variant="secondary">
            Войти
          </ButtonLink>
          <ButtonLink to="/register" variant="primary">
            Зарегистрироваться
          </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
};