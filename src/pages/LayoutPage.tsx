import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { Outlet, useLocation } from 'react-router'

function LayoutPage() {
  const location = useLocation()

  const showFooter = location.pathname === '/' // 메인페이지에서만 Footer 렌더링

  return (
    <>
      <Header />
      <Outlet />
      {showFooter && <Footer />}
    </>
  )
}

export default LayoutPage
