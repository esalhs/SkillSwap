import { Error500 } from '@/shared/ui/Illustrations/Error500'
import styles from './ServerErrorPage.module.css'
import { Button } from '@/shared/ui/Button'

// TODO: заменить на реальный Header после мерджа feature/header
const Header = () => <header>Header — в разработке</header>

// TODO: заменить на реальный Footer после мерджа feature/footer
const Footer = () => <footer>Footer — в разработке</footer>

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
