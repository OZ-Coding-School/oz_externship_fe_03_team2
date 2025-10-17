import { useRoutes } from 'react-router'
import './App.css'
import LayoutPage from './pages/LayoutPage'
import MyPage from './pages/MyPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import ToastContainer from './components/common/toast/ToastContainer'
import TestPage from './components/find/TestPage'

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
    { path: '/testPage', element: <TestPage /> },
  ])

  return (
    <>
      <ToastContainer />
      {routes}
    </>
  )
}

export default App
