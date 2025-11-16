import type { RouteObject } from 'react-router'
import { Suspense } from 'react'
import * as Lazy from './lazy'
import CommonTest from '../tests/CommonTest'
import ApiTestPage from '../tests/ApiTestPage'
import ProtectedRoute from './ProtectedRoute'
import LoadingFallback from '../components/common/LoadingFallback'

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Lazy.LayoutPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Lazy.MainPage />
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
          <Lazy.LoginPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingFallback />}>
          <Lazy.SignUpPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/email-find',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingFallback />}>
          <Lazy.EmailFindPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/password-find',
    element: (
      <ProtectedRoute requireAuth={false}>
        <Suspense fallback={<LoadingFallback />}>
          <Lazy.PasswordFindPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: '/social-callback',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Lazy.SocialCallback />
      </Suspense>
    ),
  },
  { path: '/test', element: <CommonTest /> },
  { path: '/api-test', element: <ApiTestPage /> },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Lazy.NotFoundPage />
      </Suspense>
    ),
  },
]
