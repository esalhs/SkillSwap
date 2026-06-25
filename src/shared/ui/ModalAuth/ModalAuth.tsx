import { Button } from '@/shared/ui/Button'
import { UserCircleIcon } from '../Icons/UserCircleIcon'
import styles from './ModalAuth.module.css'

type ModalAuthProps = {
  onLogin: () => void
  onRegister: () => void
}

export const ModalAuth = (props: ModalAuthProps) => {
  return (
    <div className={styles.modalContainer}>
      <UserCircleIcon width={100} height={100} style={{ strokeWidth: 0.5 }} />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Войдите, чтобы предложить обмен</h1>
        <p className={styles.paragraph}>Создайте аккаунт или войдите в существующий</p>
        <div className={styles.btnContainer}>
          <Button variant="secondary" onClick={props.onLogin}>Войти</Button>
          <Button variant="primary" onClick={props.onRegister}>Зарегистрироваться</Button>
        </div>
      </div>
    </div>
  )
}
