import { Error500 } from '@/shared/ui/Illustrations/Error500'
import styles from './ServerErrorPage.module.css'

export const ServerErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <Error500 width={460} height={304} />
      <h1 className={styles.title}>На сервере произошла ошибка</h1>
      <span className={styles.description}>Попробуйте позже или вернитесь на главную страницу</span>
      <div className={styles.buttonContainer}>
        <button className={`${styles.btnError} ${styles.btn}`}>Сообщить об ошибке</button>
        <button className={`${styles.btnMain} ${styles.btn}`}>На главную</button>
      </div>
    </div>
  )
}
