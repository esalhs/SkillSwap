import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeaderProps } from './types'
import styles from './Header.module.css'
import { Logo } from '@/shared/ui/logo'
import { NavBar } from './NavBar/NavBar'
import { Input } from '@/shared/ui/Input'
import { IconButton } from '@/shared/ui/IconAction'
import { ButtonLink, Button } from '@/shared/ui/Button'
import {
  CrossIcon,
  LikeIcon,
  MoonIcon,
  NotificationActiveIcon,
  SearchIcon,
} from '@/shared/ui/Icons'
import { UserIcon } from '@/shared/ui/UserIcon'
import { ROUTES } from '@/shared/lib/constants'

export const Header: React.FC<HeaderProps> = ({ userData, isAuthPage = false }) => {
  // Страница логина / регистрации
  const [searchQuery, setSearchQuery] = useState('')
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  if (isAuthPage) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to={ROUTES.HOME}>
            <Logo className={styles.headerLogo}>
              <span className={styles.textLogo}>SkillSwap</span>
            </Logo>
          </Link>
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
            <Link to={ROUTES.HOME}>
              <Logo className={styles.headerLogo}>
                <span className={styles.textLogo}>SkillSwap</span>
              </Logo>
            </Link>
            <NavBar />
          </div>

          <div className={styles.centerSection}>
            <div className={styles.searchWrapper}>
              <Input
                type="search"
                placeholder="Искать навык"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<SearchIcon />}
                onRightIconClick={() => setSearchQuery('')}
                description=""
              />
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.iconSection}>
              <IconButton
                icon={<MoonIcon />}
                ariaLabel="Сменить тему"
                onClick={() => console.log('Смена темы')}
              />
              <IconButton
                icon={<NotificationActiveIcon />}
                ariaLabel="Уведомления"
                onClick={() => setIsNotificationsOpen(true)}
              />
              {/* {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )} */}
              <Link to={ROUTES.FAVORITES}>
                <IconButton
                  icon={<LikeIcon />}
                  ariaLabel="Избранное"
                  onClick={() => console.log('Избранное')}
                />
              </Link>
            </div>
            <div className={styles.buttonSection}>
              <Link to={ROUTES.PROFILE}>
                <span className={styles.userName}>{userData.name}</span>
              </Link>
              <Link to={ROUTES.PROFILE} className={styles.profileLink}>
                <UserIcon
                  avatarUrl={userData.avatarUrl}
                  name={userData.name}
                  className={styles.userAvatar}
                />
              </Link>
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
          <Link to={ROUTES.HOME}>
            <Logo className={styles.headerLogo}>
              <span className={styles.textLogo}>SkillSwap</span>
            </Logo>
          </Link>
          <NavBar />
        </div>

        <div className={styles.centerSection}>
          <div className={styles.searchWrapper}>
            <Input
              type="search"
              placeholder="Искать навык"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<SearchIcon />}
              description=""
              onRightIconClick={() => setSearchQuery('')}
            />
          </div>
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
            <ButtonLink to={ROUTES.LOGIN} variant="secondary">
              Войти
            </ButtonLink>
            <ButtonLink to={ROUTES.REGISTER} variant="primary">
              Зарегистрироваться
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  )
}
