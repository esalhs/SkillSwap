import styles from './ProfilePage.module.css';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/header';
import { ProfileMenu, ProfileTab } from '@/widgets/ProfileMenu';
import { ProfileInfoForm } from '@/widgets/ProfileInfoForm';
import { UserIcon } from '@/shared/ui/UserIcon';
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';
import { CardSkill } from '@/widgets/CardSkill';
import { InfiniteCardList } from '@/widgets/InfiniteCardList';
import type { SkillDomain, User } from '@/shared/types';
import { getAuthUser } from '@/features/auth/model/authUtils';
import users from '../../../public/db/users.json';
import skills from '../../../public/db/skills.json';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts'
import { removeRequest, selectRequests, updateRequestStatus } from '@/store/requestsSlice.ts'
import { addNotification } from '@/store/notificationSlice.ts'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<ProfileTab>('personal')
  const usersData = users as User[]
  const skillDomains = skills.skillDomains as SkillDomain[]
  const authUser = getAuthUser()

  // Если пользователь не авторизован, то пока берём первого пользователя из списка
  const currentUser = useMemo(() => {
    if (!authUser) return usersData[0]

    return usersData.find((user) => user.id === authUser.id) ?? usersData[0]
  }, [authUser, usersData])

  const allDomains = skillDomains
  const allCategories = allDomains.flatMap((domain) => domain.categories)
  const allSkills = allCategories.flatMap((category) => category.skills)

  // Получаем собственный навык
  const ownSkill = useMemo(
    () => allSkills.find((skill) => skill.id === currentUser.idSkill) ?? allSkills[0],
    [allSkills, currentUser.idSkill],
  )

  // Получаем мета-информацию о навыке
  const ownSkillMeta = useMemo(() => {
    const category = allCategories.find((item) =>
      item.skills.some((skill) => skill.id === ownSkill.id),
    )
    const domain = allDomains.find((item) => item.categories.some((cat) => cat.id === category?.id))

    return {
      categoryName: category?.name ?? 'Категория',
      domainName: domain?.name ?? 'Домен',
    }
  }, [allCategories, allDomains, ownSkill.id])

  const allRequests = useAppSelector(selectRequests)

  const filteredUsersByRequests = useMemo(() => {
    if (activeTab === 'requests') {
      const pendingRequests = allRequests.filter(
        (req) =>
          (req.fromUserId === currentUser.id || req.toUserId === currentUser.id) &&
          req.status === 'pending',
      )

      const partnerIds = pendingRequests.map((req) =>
        req.fromUserId === currentUser.id ? req.toUserId : req.fromUserId,
      )
      return usersData.filter((user) => partnerIds.includes(user.id))
    }

    if (activeTab === 'swaps') {
      const completedRequests = allRequests.filter(
        (req) =>
          (req.fromUserId === currentUser.id || req.toUserId === currentUser.id) &&
          req.status === 'accepted',
      )
      const partnerIds = completedRequests.map((req) =>
        req.fromUserId === currentUser.id ? req.toUserId : req.fromUserId,
      )
      return usersData.filter((user) => partnerIds.includes(user.id))
    }

    return usersData.filter((user) => user.id !== currentUser.id)
  }, [activeTab, allRequests, currentUser.id, usersData])

  const pendingRequestIdByPartnerId = useMemo(() => {
    const map = new Map<string, string>()
    if (activeTab !== 'requests') return map

    allRequests.forEach((req) => {
      if (req.status !== 'pending') return
      if (req.fromUserId !== currentUser.id && req.toUserId !== currentUser.id) return

      const partnerId = req.fromUserId === currentUser.id ? req.toUserId : req.fromUserId
      map.set(partnerId, req.id)
    })

    return map
  }, [activeTab, allRequests, currentUser.id])

  const handleAcceptRequest = useCallback(
    (userId: string) => {
      const requestId = pendingRequestIdByPartnerId.get(userId)
      if (!requestId) return
      dispatch(updateRequestStatus({ id: requestId, status: 'accepted' }))

      const partner = usersData.find((u) => u.id === userId)
      if (partner) {
        dispatch(
          addNotification({
            userName: partner.fullName,
            variant: 'accepted',
            buttonLink: ROUTES.PROFILE,
          }),
        )
      }
    },
    [dispatch, pendingRequestIdByPartnerId, usersData],
  )

  const handleDeclineRequest = useCallback(
    (userId: string) => {
      const requestId = pendingRequestIdByPartnerId.get(userId)
      if (!requestId) return
      dispatch(removeRequest(requestId))
    },
    [dispatch, pendingRequestIdByPartnerId],
  )

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
            <UserIcon avatarUrl={currentUser.avatarUrl} name={currentUser.fullName} />
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
          mainButtonLabel='Предложить обмен'
        />
      )
    }

    return (
      <InfiniteCardList
        title={activeTab === 'requests' ? 'Заявки' : 'Мои обмены'}
        domains={allDomains}
        users={filteredUsersByRequests}
        showRequestActions={activeTab === 'requests'}
        onAcceptClick={handleAcceptRequest}
        onDeclineClick={handleDeclineRequest}
      />
    )
  }

  return (
    <div className={styles.profileContainer}>
      <Header isAuthPage={true}/>
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
