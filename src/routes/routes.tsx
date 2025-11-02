import type { RouteObject } from 'react-router'
import LayoutPage from '../pages/LayoutPage'
import MainPage from '../pages/MainPage'
import MyPage from '../pages/MyPage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import EmailFindPage from '../pages/EmailFindPage'
import PasswordFindPage from '../pages/PasswordFindPage'
import SocialCallback from '../pages/SocialCallback'
import NotFoundPage from '../pages/NotFoundPage'
import CommonTest from '../tests/CommonTest'
import ApiTestPage from '../tests/ApiTestPage'

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'mypage/*', element: <MyPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/social-callback', element: <SocialCallback /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/test', element: <CommonTest /> },
  { path: '/api-test', element: <ApiTestPage /> },
  { path: '/email-find', element: <EmailFindPage /> },
  { path: '/password-find', element: <PasswordFindPage /> },
  { path: '*', element: <NotFoundPage /> },
]
