import { useRoutes } from 'react-router'
import './App.css'
import ToastContainer from './components/common/toast/ToastContainer'
import { useAuthInit } from './hooks/useAuthInit'
import { routesConfig } from './routes/routes'

function App() {
  const { isAuthCheck, isLoading } = useAuthInit() // 인증 초기화

  const routes = useRoutes(routesConfig) //라우트 설정을 기반으로 라우팅 처리

  if (isAuthCheck || isLoading) return // 인증 확인 중이거나 유저정보를 로딩중일 떄는 아무것도 렌더링x

  return (
    <>
      <ToastContainer />
      {routes}
    </>
  )
}

export default App
