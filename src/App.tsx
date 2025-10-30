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
import ApiTestPage from './tests/ApiTestPage'
import { useGetUserMe } from './api/services/mypage/profile'

function App() {
  const [isCheck, setIsCheck] = useState(true) //ture는 인증 확인중 / false는 인증 확인 완료

  const accessToken = useToken((state) => state.accessToken)
  const setAccessToken = useToken((state) => state.setAccessToken)

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const clearUser = useUserStore((state) => state.clearUser)

  const {
    data: meData,
    isLoading,
    error,
  } = useGetUserMe(!!accessToken && !user) // !!accessToken = accessToken이 있으면 true / !user = user가 없으면 true

  useEffect(() => {
    const initAuth = async () => {
      //accessToken과 user가 모두 있으면 종료
      if (accessToken && user) {
        setIsCheck(false)
        return
      }

      try {
        // refreshToken으로 accessToken 발급
        const res = await api.post<{
          detail: string
          data: {
            access: string
          }
        }>('/v1/auth/refresh', {}, { skipAuth: true })

        const newAccessToken = res.data.access
        setAccessToken(newAccessToken)

        // user 정보 조회
        const userRes = await api.get<{
          id: number
          email: string
          nickname: string
          name: string
          phone_number: string
          birthday: string
          profile_img_url: string | null
          created_at: string
        }>('/v1/users/me')

        setUser(userRes)
      } catch {
        clearUser() // refreshToken이 없거나 만료 > 로그아웃 상태
      } finally {
        setIsCheck(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //탠스텍쿼리로 조회한 user 정보 저장
  useEffect(() => {
    if (meData) {
      setUser(meData)
      setIsCheck(false)
    }
  }, [meData, setUser])

  // 에러 발생하면 로그아웃 처리
  useEffect(() => {
    if (error) {
      clearUser()
      setIsCheck(false)
    }
  }, [error, clearUser])

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
    { path: '/api-test', element: <ApiTestPage /> },
    { path: '/email-find', element: <EmailFindPage /> },
    { path: '/password-find', element: <PasswordFindPage /> },
    { path: '*', element: <NotFoundPage /> },
  ])

  if (isCheck || isLoading) return

  return (
    <>
      <ToastContainer />
      {routes}
    </>
  )
}

export default App
