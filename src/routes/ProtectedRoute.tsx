import React, { useEffect } from 'react'
import { Navigate } from 'react-router'
import { useUserStore } from '../store/useUserStore'
import { showToast } from '../utils/showToast'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth: boolean // true 로그인 필수, false 비로그인 필수
}

const ProtectedRoute = ({ children, requireAuth }: ProtectedRouteProps) => {
  const user = useUserStore((state) => state.user)
  const isAuth = !!user

  useEffect(() => {
    if (requireAuth && !isAuth) {
      showToast('로그인 후 이용 가능합니다', 'warning', '접근 제한')
      return
    }

    if (!requireAuth && isAuth) {
      showToast('이미 로그인 상태입니다', 'warning', '접근 제한')
      return
    }
  }, [requireAuth, isAuth])

  //로그인 필수인데 로그인 안됨 >  로그인페이지로 리다이렉션
  if (requireAuth && !isAuth) return <Navigate to="/login" replace />

  // 비로그인 필수인데 로그인 됨  > 메인페이지로 리다이렉션
  if (!requireAuth && isAuth) return <Navigate to="/" replace />

  return children // 조건 만족 > 페이지 렌더링
}

export default ProtectedRoute
