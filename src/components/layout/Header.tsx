import { Link } from 'react-router'
import Button from '../common/Button'
import HeaderIsLogin from './HeaderIsLogin'

function Header() {
  const isLogin = true // false일땐 비로그인

  return (
    <header className="h-16 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-center px-8">
        {/* 로고 */}
        <Link to="/" className="flex h-12 items-center justify-center">
          <span className="bg-primary-500 mr-2 flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white">
            S
          </span>
          <span className="text-primary-600 text-[20px] font-bold">
            StudyHub
          </span>
        </Link>

        <div className="ml-auto flex items-center">
          {/* 네비 */}
          <div className="flex gap-[32px] text-base text-gray-700">
            <Link to="#" className="hover:text-primary-500">
              강의 목록
            </Link>
            <Link to="#" className="hover:text-primary-500">
              스터디 그룹
            </Link>
            <Link to="#" className="hover:text-primary-500">
              구인 공고
            </Link>
          </div>

          {/* 로그인 + 회원가입 버튼 */}
          {isLogin ? (
            // 로그인 상태라면 헤더 로그인 UI로 교체
            <HeaderIsLogin />
          ) : (
            // 미로그인: 로그인/회원가입 버튼
            <div className="ml-8 flex items-center justify-center gap-4">
              <Link
                to="/login"
                className="hover:text-primary-500 text-base text-gray-700"
              >
                로그인
              </Link>
              <Button variant="primary" size="md">
                회원가입
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
