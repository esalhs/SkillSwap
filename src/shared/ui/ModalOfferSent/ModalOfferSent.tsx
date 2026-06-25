import { NotificationIcon } from '../Icons/NotificationIcon'
import styles from './ModalOfferSent.module.css'
import { Button } from '../Button/Button'

type ModalOfferSentProps = {
  onClose: () => void
}

export const ModalOfferSent = ({ onClose }: ModalOfferSentProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.iconWrapper}>
        <NotificationIcon />
      </div>

      <h2 className={styles.title}>Вы предложили обмен</h2>

      <p className={styles.description}>Теперь дождитесь подтверждения. Вам придёт уведомление</p>

      <Button type="button" variant="primary" className={styles.button} onClick={onClose}>
        Готово
      </Button>
    </section>
  )
}
