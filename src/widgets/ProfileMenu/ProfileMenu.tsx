import styles from './ProfileMenu.module.css'
import { FC } from 'react'
import { Button } from '@/shared/ui/Button'
import { RequestIcon, MessageTextIcon, LikeIcon, IdeaIcon, UserIcon } from '@/shared/ui/Icons'
import { clsx } from 'clsx'

export type ProfileTab = 'requests' | 'swaps' | 'favorites' | 'skills' | 'personal'

type ProfileMenuProps = {
  className?: string
  activeTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ className, activeTab, onTabChange }) => {
  const getButtonClass = (tab: ProfileTab) => clsx(styles.button, activeTab === tab && styles.buttonActive)

  return (
    <div className={clsx(styles.container, className)}>
      <ul className={styles.list_wrapper}>
        <li>
          <Button
            variant="tertiary"
            icon={<RequestIcon />}
            className={getButtonClass('requests')}
            onClick={() => onTabChange('requests')}
          >
            Заявки
          </Button>
        </li>
        <li>
          <Button
            variant="tertiary"
            icon={<MessageTextIcon />}
            className={getButtonClass('swaps')}
            onClick={() => onTabChange('swaps')}
          >
            Мои обмены
          </Button>
        </li>
        <li>
          <Button
            variant="tertiary"
            icon={<LikeIcon />}
            className={getButtonClass('favorites')}
            onClick={() => onTabChange('favorites')}
          >
            Избранное
          </Button>
        </li>
        <li>
          <Button
            variant="tertiary"
            icon={<IdeaIcon />}
            className={getButtonClass('skills')}
            onClick={() => onTabChange('skills')}
          >
            Мои навыки
          </Button>
        </li>
        <li>
          <Button
            variant="tertiary"
            icon={<UserIcon />}
            className={getButtonClass('personal')}
            onClick={() => onTabChange('personal')}
          >
            Личные данные
          </Button>
        </li>
      </ul>
    </div>
  )
}
