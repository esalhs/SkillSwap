import { Error404 } from '@/shared/ui/Illustrations/Error404';
import styles from './NotFoundPage.module.css';
import { Button } from '@/shared/ui/Button';
import { Footer } from '@/widgets/Footer';
import { useNavigate } from 'react-router-dom';

// TODO: заменить на реальный Header после мерджа feature/header
const Header = () => <header>Header — в разработке</header>

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/');
  };

  return (
    <>
    <Header />
      <div className={styles.errorContainer}>
        <Error404 width={460} height={304} />
        <h1 className={styles.title}>Страница не найдена</h1>
        <span className={styles.description}>К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже</span>
        <div className={styles.buttonContainer}>
          <Button className={styles.fullButton} variant="secondary">Сообщить об ошибке</Button>
          <Button className={styles.fullButton} onClick={redirectHome} variant="primary">На главную</Button>
        </div>
      </div>
      <Footer />
    </>
  )
}