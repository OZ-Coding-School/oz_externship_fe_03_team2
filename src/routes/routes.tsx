import type { RouteObject } from 'react-router'
import { Suspense } from 'react'
import * as Lazy from './lazy'
import LayoutPage from '../pages/LayoutPage'
import MainPage from '../pages/MainPage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import EmailFindPage from '../pages/EmailFindPage'
import PasswordFindPage from '../pages/PasswordFindPage'
import SocialCallback from '../pages/SocialCallback'
import NotFoundPage from '../pages/NotFoundPage'
import CommonTest from '../tests/CommonTest'
import ApiTestPage from '../tests/ApiTestPage'
import ProtectedRoute from './ProtectedRoute'
import LoadingFallback from '../components/common/LoadingFallback'

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LayoutPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: 'mypage/*',
        element: (
          <ProtectedRoute requireAuth>
            <Suspense fallback={<LoadingFallback />}>
              <Lazy.MyPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingFallback />}>
          <LoginPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingFallback />}>
          <SignUpPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/email-find',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingFallback />}>
          <EmailFindPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/password-find',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingFallback />}>
          <PasswordFindPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/social-callback',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SocialCallback />
      </Suspense>
    ),
  },
  { path: '/test', element: <CommonTest /> },
  { path: '/api-test', element: <ApiTestPage /> },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]
