import { useRoutes } from 'react-router'
import './App.css'
import LayoutPage from './pages/LayoutPage'
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPage from './pages/MainPage'
import ToastContainer from './components/common/toast/ToastContainer'

function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LayoutPage />, // 공통 레이아웃
      children: [
        { index: true, element: <MainPage /> },
        { path: 'mypage', element: <MyPage /> },
      ],
    },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUpPage /> },
  ])

  return (
    <>
      <ToastContainer />
      {routes}
    </>
  )
}

export default App
