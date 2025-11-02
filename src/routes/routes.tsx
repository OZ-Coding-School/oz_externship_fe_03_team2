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
import ProtectedRoute from './ProtectedRoute'

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { index: true, element: <MainPage /> },
      {
        path: 'mypage/*',
        element: (
          <ProtectedRoute requireAuth>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute requireAuth={false}>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <ProtectedRoute requireAuth={false}>
        <SignUpPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/email-find',
    element: (
      <ProtectedRoute requireAuth={false}>
        <EmailFindPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/password-find',
    element: (
      <ProtectedRoute requireAuth={false}>
        <PasswordFindPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/social-callback',
    element: <SocialCallback />,
  },

  { path: '/test', element: <CommonTest /> },
  { path: '/api-test', element: <ApiTestPage /> },
  { path: '*', element: <NotFoundPage /> },
]
