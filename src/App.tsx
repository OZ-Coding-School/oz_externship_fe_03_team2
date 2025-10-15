import { useRoutes } from 'react-router'
import './App.css'

import LayoutPage from './pages/LayoutPage'
import RenderPage from './pages/RenderPage'
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LayoutPage />, // 공통 레이아웃
      children: [
        { index: true, element: <RenderPage /> }, //메인페이지
        { path: 'mypage', element: <MyPage /> },
      ],
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUpPage /> },
  ])

  return routes
}

export default App
