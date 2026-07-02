import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ROUTES } from '@/shared/lib/constants'
import { PrivateRoute} from './PrivateRoute'
// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'))
// const LoginPage = lazy(() => import('@/pages/LoginPage'))
const LoginPage = lazy(() => import('@/pages/WelcomePage'))
const RegistrationPage = lazy(() => import('@/pages/RegAccountPage'))
const RegSkillPage = lazy(() => import('@/pages/RegSkillPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path={ROUTES.HOME} element={<CatalogPage />} />
          <Route path={ROUTES.SKILL} element={<SkillPage />} />
          <Route
            path={ROUTES.FAVORITES}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
          <Route path={ROUTES.REG_SKILL} element={<RegSkillPage />} />

          {/* Защищённые маршруты — добавь PrivateRoute обёртку */}
          <Route
            path={ROUTES.PROFILE}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.CREATE}
            element={
              <PrivateRoute>
                <CreateSkillPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
