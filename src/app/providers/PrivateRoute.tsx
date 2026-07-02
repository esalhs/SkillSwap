import React from 'react'
import { useAppSelector } from '@/store/hooks'
import { Navigate, useLocation } from 'react-router-dom'
import { selectIsAuth } from '@/features/auth/model/AuthSlice'
import { ROUTES } from '@/shared/lib/constants.ts'

type PrivateRouteProps = {
  onlyUnAuth?: boolean
  children: React.ReactElement
}

export const PrivateRoute = ({ onlyUnAuth, children }: PrivateRouteProps) => {
  const isAuth = useAppSelector(selectIsAuth)
  const location = useLocation()

  if (onlyUnAuth) {
    if (isAuth) {
      const from = (location.state as { from?: Location })?.from?.pathname ?? '/'
      return <Navigate replace to={from} />
    }
    return children
  }

  if (!isAuth) {
    return <Navigate replace to={ROUTES.LOGIN} state={{ from: location }} />
  }

  return children
}
