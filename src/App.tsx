import { useRoutes } from 'react-router'
import './App.css'

import LayoutPage from './pages/LayoutPage'
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LayoutPage />,
      children: [
        { index: true, element: <MainPage /> },
        { path: 'mypage', element: <MyPage /> },
      ],
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUpPage /> },
    { path: '*', element: <NotFoundPage /> },
  ])

  return routes
}

export default App
