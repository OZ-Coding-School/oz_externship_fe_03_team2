import { lazy } from 'react'

// 큰 페이지만 lazy import
export const MyPage = lazy(() => import('../pages/MyPage'))
