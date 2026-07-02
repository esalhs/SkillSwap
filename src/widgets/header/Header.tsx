import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HeaderProps } from './types.ts'
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
import { useAppSelector } from '@/store/hooks'
import {
  selectHasUnreadNotifications,
} from '@/store/notificationSlice.ts'
import { selectUser } from '@/features/auth/model/AuthSlice.ts'
import { NotificationsModal } from '@/widgets/NotificationsModal'

export const Header: React.FC<HeaderProps> = ({ isAuthPage = false }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const userData = useAppSelector(selectUser) ?? {
    id: '1',
    name: 'Анна',
    email: 'anna.volkova@mail.ru',
    token: 'mock_token_1',
    avatarUrl: '/avatars/01-anna-volkova.jpg',
  } // фоллбек для теста видимости авторизованного пользователя
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()
  const hasUnread = useAppSelector(selectHasUnreadNotifications)

  const handleSearch = () => {
    const query = searchQuery.trim()
    if (query) {
      navigate(`${ROUTES.HOME}?search=${encodeURIComponent(query)}`)
    } else {
      navigate(ROUTES.HOME)
    }
  }

  const handleToggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!isNotificationsOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNotificationsOpen])

  if (isAuthPage) {
    return (
      <header className={styles.header + ' ' + styles.headerIsAuthPage}>
        <div className={styles.container + ' ' + styles.containerIsAuthPage}>
          <Logo className={styles.headerLogo}>
            <span className={styles.textLogo}>SkillSwap</span>
          </Logo>
          <Button
            variant="tertiary"
            icon={<CrossIcon />}
            iconPosition="after"
            onClick={() => navigate(ROUTES.HOME)}
          >
            Закрыть
          </Button>
        </div>
      </header>
    )
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Logo className={styles.headerLogo}>
            <span className={styles.textLogo}>SkillSwap</span>
          </Logo>
          <NavBar />
        </div>

        <div className={styles.centerSection}>
          <div
            className={styles.searchWrapper}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch()
            }}
          >
            <Input
              type="search"
              placeholder="Искать навык"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={
                <button
                  type="button"
                  onClick={handleSearch}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    padding: 0,
                    pointerEvents: 'auto',
                  }}
                  aria-label="Поиск"
                >
                  <SearchIcon />
                </button>
              }
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

            {userData && (
              <>
                <div className={styles.notificationsWrapper} ref={notificationsRef}>
                  <IconButton
                    icon={<NotificationActiveIcon active={hasUnread} />}
                    ariaLabel="Уведомления"
                    onClick={handleToggleNotifications}
                  />
                  {isNotificationsOpen && (
                    <div className={styles.notificationsDropdown}>
                      <NotificationsModal />
                    </div>
                  )}
                </div>
                <Link to={ROUTES.FAVORITES}>
                  <IconButton icon={<LikeIcon />} ariaLabel="Избранное" />
                </Link>
              </>
            )}
          </div>

          <div className={styles.buttonSection}>
            {userData ? (
              <>
                <Link to={ROUTES.PROFILE}>
                  <span className={styles.userName}>{userData.name}</span>
                </Link>
                <Link to={ROUTES.PROFILE} className={styles.profileLink}>
                  <UserIcon
                    avatarUrl={userData.avatarUrl ?? null}
                    name={userData.name}
                    className={styles.userAvatar}
                  />
                </Link>
              </>
            ) : (
              <>
                <ButtonLink to={ROUTES.LOGIN} variant="secondary">
                  Войти
                </ButtonLink>
                <ButtonLink to={ROUTES.REGISTER} variant="primary">
                  Зарегистрироваться
                </ButtonLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
