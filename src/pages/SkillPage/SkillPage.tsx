import { Header } from '@/widgets/header'
import { CardUser } from '@/widgets/CardUser'
import { useNavigate, useParams } from 'react-router-dom'
import users from '../../../public/db/users.json'
import skills from '../../../public/db/skills.json'
import { getAge, getCategoryNames, getSkillName } from '@/shared/lib/helpers.ts'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { CardSkill } from '@/widgets/CardSkill'
import { CardSlider } from '@/widgets/CardSlider'
import { ModalAuth } from '@/shared/ui/ModalAuth'
import { User } from '@/shared/types'
import { Footer } from '@/widgets/Footer'
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts'
import { createRequest, selectRequests } from '@/store/requestsSlice.ts'
import { selectIsAuth, selectUser } from '@/features/auth/model/AuthSlice.ts'
import { ROUTES } from '@/shared/lib/constants.ts'
import styles from './SkillPage.module.css'
import { ModalOfferSent } from '@/shared/ui/ModalOfferSent'

const allCategories = skills.skillDomains.flatMap((domain) => domain.categories)
const allSkills = allCategories.flatMap((category) => category.skills)

export default function SkillPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const currentUser = useAppSelector(selectUser)
  //   ?? {
  //   id: '1',
  //   name: 'Анна',
  //   email: 'anna.volkova@mail.ru',
  //   token: 'mock_token_1',
  // } // фоллбек для теста раскомментировать
  const isAuth = useAppSelector(selectIsAuth)
  // const isAuth = true // можно раскомментировать для теста

  const req = useAppSelector(selectRequests)

  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showOfferSentModal, setShowOfferSentModal] = useState(false)

  const user = users.find((u) => u.id === id)

  const isOffered = useMemo(() => {
    if (!currentUser?.id || !user?.id || !req) return false
    return req.some(
      (request) =>
        request.fromUserId === currentUser.id &&
        request.toUserId === user.id &&
        request.status === 'pending',
    )
  }, [req, currentUser?.id, user?.id])

  const mainButtonLabel = isOffered ? 'Обмен предложен' : 'Предложить обмен'

  const favoriteDomains = useMemo(() => {
    if (!user || !user.favoriteCategories) return []
    return skills.skillDomains
      .map((domain) => ({
        ...domain,
        categories: domain.categories.filter((category) =>
          user.favoriteCategories.includes(category.id),
        ),
      }))
      .filter((domain) => domain.categories.length > 0)
  }, [user])

  const currentSkill = useMemo(() => {
    if (!user) return null
    return allSkills.find((s) => s.id === user.idSkill)
  }, [user])

  const skillMeta = useMemo(() => {
    if (!currentSkill) return { domainName: 'Нет данных', categoryName: 'Нет данных' }
    let domainName = 'Нет данных'
    let categoryName = 'Нет данных'
    for (const domain of skills.skillDomains) {
      for (const cat of domain.categories) {
        if (cat.skills.some((s) => s.id === currentSkill.id)) {
          domainName = domain.name
          categoryName = cat.name
          break
        }
      }
    }
    return { domainName, categoryName }
  }, [currentSkill])

  const similarUsers = useMemo(() => {
    if (!user) return []

    let currentDomainId: string | null = null

    for (const domain of skills.skillDomains) {
      const hasSkill = domain.categories.some((cat) =>
        cat.skills.some((s) => s.id === user.idSkill),
      )
      if (hasSkill) {
        currentDomainId = domain.id
        break
      }
    }

    const allUsers = users as User[]

    let filteredUsers = allUsers.filter((u) => {
      if (u.id === user.id) return false

      return skills.skillDomains
        .find((d) => d.id === currentDomainId)
        ?.categories.some((cat) => cat.skills.some((s) => s.id === u.idSkill))
    })

    if (filteredUsers.length === 0) {
      filteredUsers = allUsers.filter(
        (u) =>
          u.id !== user.id &&
          u.favoriteCategories.some((cat) => user.favoriteCategories.includes(cat)),
      )
    }
    return filteredUsers
  }, [user])

  const handleMainButtonClick = useCallback(() => {
    if (!isAuth) {
      setShowAuthModal(true)
      return
    }

    if (isOffered) {
      return
    }

    if (!currentSkill?.id || !user?.id || !currentUser?.id) {
      console.warn('Недостаточно данных для создания заявки')
      return
    }

    try {
      dispatch(
        createRequest({
          skillId: currentSkill.id,
          fromUserId: currentUser.id,
          toUserId: user.id,
        }),
      )
      setShowOfferSentModal(true)
    } catch (error) {
      console.error('Ошибка при создании заявки:', error)
    }
  }, [isAuth, dispatch, currentSkill, user, currentUser, isOffered])

  const handleModalLogin = useCallback(() => {
    setShowAuthModal(false)
    navigate(ROUTES.LOGIN)
  }, [navigate])

  const handleModalRegister = useCallback(() => {
    setShowAuthModal(false)
    navigate(ROUTES.REGISTER)
  }, [navigate])

  useEffect(() => {
    document.body.style.overflow = showAuthModal ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showAuthModal])

  useEffect(() => {
    if (!showAuthModal) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAuthModal(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showAuthModal])

  if (!user) {
    return null
  }

  const age = getAge(user.birthday)
  const skillCan = getSkillName(allSkills, user.idSkill)
  const skillWant = getCategoryNames(allCategories, user.favoriteCategories)

  return (
    <section className={styles.skillPage}>
      <Header />
      <div className={styles.userSection}>
        <CardUser
          avatarUrl={user.avatarUrl}
          name={user.fullName}
          location={user.location}
          age={age}
          skillCan={skillCan}
          skillWant={skillWant}
          domains={favoriteDomains}
          bio={user.bio}
        ></CardUser>
        <CardSkill
          pageVariant="home"
          title={skillCan}
          domain={skillMeta.domainName}
          category={skillMeta.categoryName}
          description={currentSkill?.description ?? 'Описание отсутствует'}
          images={currentSkill?.skillImages ?? []}
          onMainButtonClick={handleMainButtonClick}
          mainButtonLabel={mainButtonLabel}
          isOffered={isOffered}
        />
      </div>
      <div className={styles.sliderWrapper}>
        <CardSlider
          onLikeClick={() => {
            // TODO: лайк будет обрабатывать редакс
            console.log('Лайк поставлен')
          }}
          onDetailsClick={(userId) => {
            navigate(`/skill/${userId}`)
          }}
          title="Похожие предложения"
          users={similarUsers}
          domains={skills.skillDomains}
        />
      </div>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>

      {showAuthModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAuthModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ModalAuth onLogin={handleModalLogin} onRegister={handleModalRegister} />
          </div>
        </div>
      )}

      {showOfferSentModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAuthModal(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ModalOfferSent
              onClose={() => {
                setShowOfferSentModal(false)
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
