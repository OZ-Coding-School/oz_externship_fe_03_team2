import { useRoutes } from 'react-router'
import './App.css'
import LayoutPage from './pages/LayoutPage'
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import ToastContainer from './components/common/toast/ToastContainer'
import EmailFindPage from './pages/EmailFindPage'
import CommonTest from './tests/CommonTest'
import PasswordFindPage from './pages/PasswordFindPage'
import { useEffect, useState } from 'react'
import { useToken } from './store/useTokenStore'
import { useUserStore } from './store/useUserStore'
import { api } from './api/client'

function App() {
  const [isCheck, setIsCheck] = useState(true)
  const { accessToken, setAccessToken } = useToken()
  const { user, setUser, clearUser } = useUserStore()

  useEffect(() => {
    const initAuth = async () => {
      if (accessToken && user) return // 이미 메모리에 토큰이 있으면 재요청x

      try {
        // refreshToken으로 accessToken 발급
        const res = await api.post<{
          detail: string
          data: {
            access_token: string
            token_type: string
            expires_in: number
          }
        }>('/v1/auth/refresh', {}, { skipAuth: true })

        setAccessToken(res.data.access_token) // data 객체 안의 access_token 사용

        // accessToken으로 user 정보 조회
        const userRes = await api.get<{
          detail: string
          data: {
            id: number
            email: string
            nickname: string
            name: string
            phone_number: string
            birthday: string
            profile_image_url: string
            created_at: string
          }
        }>('/v1/users/me')

        setUser(userRes.data)
      } catch {
        clearUser() // refreshToken이 없거나 만료 > 로그아웃 상태
      } finally {
        setIsCheck(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const routes = useRoutes([
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        { index: true, element: <MainPage /> },
        { path: 'mypage/*', element: <MyPage /> },
      ],
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUpPage /> },
    { path: '/test', element: <CommonTest /> },
    { path: '/emailfind', element: <EmailFindPage /> },
    { path: '/passwordfind', element: <PasswordFindPage /> },
    { path: '*', element: <NotFoundPage /> },
  ])

  if (isCheck) return

  return (
    <>
      <ToastContainer />
      {routes}
    </>
  )
}

export default App
