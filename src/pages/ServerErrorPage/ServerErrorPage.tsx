import { Error500 } from '@/shared/ui/Illustrations/Error500'
import styles from './ServerErrorPage.module.css'
import { Button } from '@/shared/ui/Button'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/Footer'

export const ServerErrorPage = () => {
  return (
    <>
    <Header />
      <div className={styles.errorContainer}>
        <Error500 width={460} height={304} />
        <h1 className={styles.title}>На сервере произошла ошибка</h1>
        <span className={styles.description}>Попробуйте позже или вернитесь на главную страницу</span>
        <div className={styles.buttonContainer}>
          <Button variant="secondary">Сообщить об ошибке</Button>
          <Button variant="primary">На главную</Button>
        </div>
      </div>
      <Footer />
    </>
  )
}
