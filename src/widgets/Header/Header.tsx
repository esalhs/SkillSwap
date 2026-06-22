import React, { useState }  from 'react'
import { HeaderProps } from './types'
import styles from './Header.module.css'
import { Logo } from '@/shared/ui/logo'
// import { Navbar } from '@/shared/ui/Navbar';
// import { SearchInput } from '@/shared/ui/SearchInput';
import { Input } from '@/shared/ui/Input'
import { IconButton } from '@/shared/ui/IconAction'
import { ButtonLink, Button } from '@/shared/ui/Button'
import { CrossIcon, LikeIcon, MoonIcon, NotificationIcon, SearchIcon } from '@/shared/ui/Icons' 
import { UserIcon } from '@/shared/ui/UserIcon' 

// pfukeirb
//const LogoStub = () => <div className={styles.stub}>Logo</div>;
const NavbarStub = () => <div className={styles.stub}>Navbar</div>
const SearchInputStub = () => <div className={styles.stub}>SearchInput</div>
const IconButtonStub = ({ label }: { label: string }) => (
  <button className={styles.stub}>Icon {label}</button>
)
//const ButtonLinkStub = ({ text }: { text: string }) => <button className={styles.stub}>{text}</button>;
//const ButtonStub = ({ text }: { text: string }) => <button className={styles.stub}>{text}</button>

export const Header: React.FC<HeaderProps> = ({ userData, isAuthPage = false }) => {
  // Страница логина / регистрации
   const [searchQuery, setSearchQuery] = useState('')
   
  if (isAuthPage) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Logo className={styles.headerLogo}>
            <span className={styles.textLogo}>SkillSwap</span>
          </Logo>
          <Button 
            variant="tertiary" 
            icon={<CrossIcon />} 
            iconPosition="after"
            onClick={() => console.log('Закрыть кликнуто')}
          >
            Закрыть
          </Button>
        </div>
      </header>
    )
  }

  // Пользователь авторизован
  if (userData) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.leftSection}>
          <Logo className={styles.headerLogo}>
            <span className={styles.textLogo}>SkillSwap</span>
          </Logo>
            <NavbarStub />
          </div>

          <div className={styles.centerSection}>
                <Input
      type="search"
      placeholder="Искать навык"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      leftIcon={<SearchIcon />}
      description=""
    />
          </div>

          <div className={styles.rightSection}>
            <div className={styles.iconSection}>
              <IconButton 
                icon={<MoonIcon />} 
                ariaLabel="Сменить тему"
                onClick={() => console.log('Смена темы')}
              />
              <IconButton 
                icon={<NotificationIcon />} 
                ariaLabel="Уведомления"
                onClick={() => console.log('Уведомления')}
              />
              <IconButton 
                icon={<LikeIcon />} 
                ariaLabel="Избранное"
                onClick={() => console.log('Избранное')}
              />
            </div>
            <div className={styles.buttonSection}>
              <span className={styles.userName}>{userData.name}</span>
                 <UserIcon 
                avatarUrl={userData.avatarUrl} 
                name={userData.name} 
                className={styles.userAvatar} 
              />
            </div>
          </div>
        </div>
      </header>
    )
  }

  // Пользователь не авторизован (по умолчанию)
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Logo className={styles.headerLogo}>
            <span className={styles.textLogo}>SkillSwap</span>
          </Logo>
          <NavbarStub />
        </div>

        <div className={styles.centerSection}>
                          <Input
      type="search"
      placeholder="Искать навык"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      leftIcon={<SearchIcon />}
      description=""
    />
        </div>

        <div className={styles.rightSection}>
          <div className={styles.iconSection}>
                         <IconButton 
                icon={<MoonIcon />} 
                ariaLabel="Сменить тему"
                onClick={() => console.log('Смена темы')}
              />
          </div>
          <div className={styles.buttonSection}>
            <ButtonLink to="#" variant="secondary">
              Войти
            </ButtonLink>
            <ButtonLink to="#" variant="primary">
              Зарегистрироваться
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  )
}
