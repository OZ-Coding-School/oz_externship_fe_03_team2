import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Outlet, useLocation } from 'react-router'
// import { NotiBadge } from '../components/layout/Notification/NotiBadge'

function LayoutPage() {
  const location = useLocation()

  const showFooter = location.pathname === '/' // 메인페이지에서만 Footer 렌더링

  return (
    <>
      <Header />
      {/* <NotiBadge /> */}
      <Outlet />
      {showFooter && <Footer />}
    </>
  )
}

export default LayoutPage
