import styles from './ProfilePage.module.css';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/header';
import { ProfileMenu } from '@/widgets/ProfileMenu';
import { ProfileInfoForm } from '@/widgets/ProfileInfoForm';
import { UserIcon } from '@/shared/ui/UserIcon';

export const ProfilePage = () => {
  return (
    <div className={styles.profileContainer}>
      <Header />
      <main className={styles.content}>
        <div className={`${styles.basicContainer} ${styles.menuContainer}`}>
          <ProfileMenu />
        </div>
        <div className={`${styles.basicContainer} ${styles.basicContainerPadding} ${styles.infoContainer}`}>
          <ProfileInfoForm />
          <div >
            <UserIcon className={styles.imageContainer} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
