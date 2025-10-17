import { Link, useNavigate } from 'react-router'
import Button from '../common/Button'
import HeaderIsLogin from './HeaderIsLogin'
import { Menu, X, User, Power } from 'lucide-react'
import { useState } from 'react'
import Avatar from '../common/Avatar'

function Header() {
  const isLogin = true // false일땐 비로그인
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userName = '김개발'
  const userEmail = 'test@naver.com'

  const navLinks = [
    { label: '강의 목록', path: '/ddd' },
    { label: '스터디 그룹', path: '/ddd' },
    { label: '구인 공고', path: '/ddd' },
  ]

  const handleLoginClick = () => {
    navigate('/login')
    setSidebarOpen(false)
  }

  return (
    <>
      <header className="h-16 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-8">
          {/* 왼쪽 햄버거 버튼 (모바일) + 로고 */}
          <div className="flex items-center gap-4">
            {/* 햄버거 버튼 (md 이하에서만 표시) */}
            <button
              className="hover:text-primary-500 -ml-4 pr-1 text-gray-700 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} className="cursor-pointer" />
            </button>

            {/* 로고 */}
            <Link to="/" className="flex h-12 items-center justify-center">
              <span className="bg-primary-500 mr-2 flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white">
                S
              </span>
              <span className="text-primary-600 text-[20px] font-bold">
                StudyHub
              </span>
            </Link>
          </div>

          {/* 오른쪽 네비 (PC) + 로그인/유저 정보 */}
          <div className="ml-auto flex items-center">
            {/* PC 네비 (md 이상에서만 표시) */}
            <div className="hidden gap-[32px] text-base text-gray-700 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="hover:text-primary-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* 로그인 + 회원가입 버튼 */}
            {isLogin ? (
              <div className="hidden md:block">
                <HeaderIsLogin isMobile={false} />
              </div>
            ) : (
              <>
                {/* PC에서만 표시 */}
                <div className="ml-8 hidden items-center justify-center gap-4 md:flex">
                  <Link
                    to="/login"
                    className="hover:text-primary-500 text-base text-gray-700"
                  >
                    로그인
                  </Link>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => navigate('/signup')}
                  >
                    회원가입
                  </Button>
                </div>

                {/* 모바일에서만 표시 */}
                <div className="ml-4 flex items-center justify-center gap-3 md:hidden">
                  <Link
                    to="/login"
                    className="hover:text-primary-500 text-sm text-gray-700"
                  >
                    로그인
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/signup')}
                  >
                    회원가입
                  </Button>
                </div>
              </>
            )}

            {/* 모바일 알림만 표시 */}
            {isLogin && (
              <div className="md:hidden">
                <HeaderIsLogin isMobile />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 사이드 패널 (모바일) */}
      {sidebarOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="animate-fade-in fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* 사이드 패널 */}
          <div className="animate-slide-in-left fixed top-0 left-0 z-50 flex h-full w-64 flex-col overflow-y-auto bg-white shadow-lg">
            {/* 닫기 버튼 */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setSidebarOpen(false)}
                className="hover:text-primary-500 text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* 사용자 정보 섹션 */}
            <div className="border-b border-gray-200 px-6 py-4">
              {isLogin ? (
                <div className="flex items-center gap-3">
                  <Avatar name={userName} size="md" isHeader />
                  <div className="flex-1">
                    <p className="text-base font-semibold text-gray-900">
                      {userName}
                    </p>
                    <p className="text-sm text-gray-500">{userEmail}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Avatar name={userName} size="md" isHeader />
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={handleLoginClick}
                  >
                    <p className="hover:text-primary-500 text-sm text-gray-900">
                      로그인해주세요
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 네비 링크 */}
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="hover:bg-primary-50 hover:text-primary-600 border-b border-gray-100 px-6 py-3 text-sm text-gray-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* 마이페이지, 로그아웃 버튼 (로그인 상태일 때만) */}
            {isLogin && (
              <div className="mt-auto flex justify-around border-b border-gray-200 py-3">
                <div
                  onClick={() => {
                    navigate('/mypage')
                    setSidebarOpen(false)
                  }}
                  className="hover:text-primary-500 flex cursor-pointer items-center gap-3 px-6 py-3 text-base text-gray-700"
                >
                  <User size={20} />
                </div>
                <div
                  onClick={() => {
                    setSidebarOpen(false)
                  }}
                  className="hover:text-danger-500 flex cursor-pointer items-center gap-3 px-6 py-3 text-base text-gray-700"
                >
                  <Power size={20} />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Header
