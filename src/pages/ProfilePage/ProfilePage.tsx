import styles from './ProfilePage.module.css';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/header';
import { ProfileMenu, ProfileTab } from '@/widgets/ProfileMenu';
import { ProfileInfoForm } from '@/widgets/ProfileInfoForm';
import { UserIcon } from '@/shared/ui/UserIcon';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';
import { CardSkill } from '@/widgets/CardSkill';
import { InfiniteCardList } from '@/widgets/InfiniteCardList';
import type { SkillDomain, User } from '@/shared/types';
import { getAuthUser } from '@/features/auth/model/authUtils';
import users from '../../../public/db/users.json';
import skills from '../../../public/db/skills.json';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal');
  const usersData = users as User[];
  const skillDomains = skills.skillDomains as SkillDomain[];
  const authUser = getAuthUser();

  // Если пользователь не авторизован, то пока берём первого пользователя из списка
  const currentUser = useMemo(() => {
    if (!authUser) return usersData[0]

    return (
      usersData.find((user) => user.id === authUser.id) ??
      usersData[0]
    )
  }, [authUser, usersData]);

  const allDomains = skillDomains;
  const allCategories = allDomains.flatMap((domain) => domain.categories);
  const allSkills = allCategories.flatMap((category) => category.skills);

  // Получаем собственный навык
  const ownSkill = useMemo(
    () => allSkills.find((skill) => skill.id === currentUser.idSkill) ?? allSkills[0],
    [allSkills, currentUser.idSkill],
  );

  // Получаем мета-информацию о навыке
  const ownSkillMeta = useMemo(() => {
    const category = allCategories.find((item) => item.skills.some((skill) => skill.id === ownSkill.id))
    const domain = allDomains.find((item) => item.categories.some((cat) => cat.id === category?.id))

    return {
      categoryName: category?.name ?? 'Категория',
      domainName: domain?.name ?? 'Домен',
    }
  }, [allCategories, allDomains, ownSkill.id]);

  // Список пользователей, которые могут предложить обмен (не текущий пользователь)
  // TODO: Изменить логику, если появятся реальные данные обменов
  const suggestedUsers = useMemo(
    () => usersData.filter((user) => user.id !== currentUser.id),
    [currentUser.id, usersData],
  );

  const handleTabChange = (tab: ProfileTab) => {
    if (tab === 'favorites') {
      navigate(ROUTES.FAVORITES)
      return
    }

    setActiveTab(tab)
  }

  const renderContent = () => {
    if (activeTab === 'personal') {
      return (
        <>
          <ProfileInfoForm />
          <div className={styles.imageContainer}>
            <UserIcon
              avatarUrl={currentUser.avatarUrl}
              name={currentUser.fullName}
            />
          </div>
        </>
      )
    }

    if (activeTab === 'skills') {
      return (
        <CardSkill
          pageVariant="home"
          title={ownSkill.name}
          domain={ownSkillMeta.domainName}
          category={ownSkillMeta.categoryName}
          description={ownSkill.description}
          images={ownSkill.skillImages}
        />
      )
    }

    return (
      <InfiniteCardList
        title={activeTab === 'requests' ? 'Заявки' : 'Мои обмены'}
        domains={allDomains}
        users={suggestedUsers}
      />
    )
  }

  return (
    <div className={styles.profileContainer}>
      <Header />
      <main className={styles.content}>
        <div className={`${styles.basicContainer} ${styles.menuContainer}`}>
          <ProfileMenu activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        <div className={`${styles.basicContainer} ${styles.basicContainerPadding} ${styles.infoContainer}`}>
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  )
}
