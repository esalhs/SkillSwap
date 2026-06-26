import styles from './ModalOfferCreated.module.css'
import { Button } from '../Button/Button'
import { DoneIcon } from '../Icons'

type ModalOfferCreatedProps = {
  onClose: () => void
}

export const ModalOfferCreated = ({ onClose }: ModalOfferCreatedProps) => {
  return (
    <div className={styles.containerModal}>
      <div className={styles.iconWrapper}>
        <DoneIcon />
      </div>
      <div className={styles.descriptionWrapper}>
        <h2 className={styles.titleModal}>Ваше предложение создано</h2>
        <p className={styles.descriptionModal}>Теперь вы можете предложить обмен</p>
        <Button type="button" variant="primary" className={styles.button} onClick={onClose}>
            Готово
        </Button>
      </div>
    </div>
  )
}
