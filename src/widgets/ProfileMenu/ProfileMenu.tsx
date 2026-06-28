import styles from './ProfileMenu.module.css'
import { FC } from 'react'
import { Button } from '@/shared/ui/Button'
import { RequestIcon, MessageTextIcon, LikeIcon, IdeaIcon, UserIcon } from '@/shared/ui/Icons'
import { clsx } from 'clsx'

type ProfileMenuProps = {
  className?: string
}

export const ProfileMenu: FC<ProfileMenuProps> = ({ className }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <ul className={styles.list_wrapper}>
        <li>
          <Button variant="tertiary" icon={<RequestIcon />} className={styles.button}>
            Заявки
          </Button>
        </li>
        <li>
          <Button variant="tertiary" icon={<MessageTextIcon />} className={styles.button}>
            Мои обмены
          </Button>
        </li>
        <li>
          <Button variant="tertiary" icon={<LikeIcon />} className={styles.button}>
            Избранное
          </Button>
        </li>
        <li>
          <Button variant="tertiary" icon={<IdeaIcon />} className={styles.button}>
            Мои навыки
          </Button>
        </li>
        <li>
          <Button variant="tertiary" icon={<UserIcon />} className={styles.button}>
            Личные данные
          </Button>
        </li>
      </ul>
    </div>
  )
}
