import { Link, useNavigate } from 'react-router'
import Button from '../common/Button'
import HeaderIsLogin from './HeaderIsLogin'
import { Menu, X, Users, Megaphone, Book, LogOut } from 'lucide-react'
import { useState } from 'react'
import Avatar from '../common/Avatar'
import { useLogout } from '../../api/services/Auth'
import { showToast } from '../../utils/showToast'
import { useToken } from '../../store/useTokenStore'
import { useUserStore } from '../../store/useUserStore'

function Header() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { mutate: LogoutMutate } = useLogout()
  const { clearAccessToken } = useToken()

  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)

  const isLogin = !!user

  const logout = () => {
    LogoutMutate(undefined, {
      onSuccess: (data) => {
        clearAccessToken()
        clearUser()
        showToast(`${data.detail}`, 'success', '로그아웃')
        navigate('/')
      },
      onError: (error) => {
        showToast(`${error.response?.data.error}`, 'error', '로그아웃')
      },
    })
  }

  const navLinks = [
    {
      label: '강의 목록',
      path: 'https://learn.ozcoding.site/lecture',
      icon: Book,
    },
    { label: '스터디 그룹', path: 'https://study.ozcoding.site/', icon: Users },
    {
      label: '구인 공고',
      path: 'https://learn.ozcoding.site/recruit',
      icon: Megaphone,
    },
  ]

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
          <div className="animate-slide-in-left fixed top-0 left-0 z-50 flex h-full w-66 flex-col overflow-y-auto bg-white shadow-lg">
            {/* 헤더: 로고 + 닫기 버튼 */}
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="bg-primary-500 flex h-7 w-7 items-center justify-center rounded-lg font-bold text-white">
                  S
                </span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="hover:text-primary-500 text-gray-400"
              >
                <X size={22} />
              </button>
            </div>

            {/* 메뉴 섹션 */}
            <div className="flex-1 px-4 py-6">
              <h3 className="mb-4 text-sm font-semibold text-gray-500">메뉴</h3>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.label}
                      to={link.path}
                      className="hover:bg-primary-50 hover:text-primary-600 flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* 로그인 상태일 때만 유저 정보 + 로그아웃 표시 */}
            {isLogin && user && (
              <div className="border-t border-gray-200">
                <div
                  className="hover:bg-primary-50 flex cursor-pointer items-center gap-3 px-4 py-4"
                  onClick={() => {
                    navigate('/mypage')
                    setSidebarOpen(false)
                  }}
                >
                  <Avatar
                    name={user.name ?? user.nickname}
                    imgUrl={user.profile_img_url}
                    size="md"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name ?? user.nickname}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout()
                    setSidebarOpen(false)
                  }}
                  className="hover:text-danger-500 mb-5 flex min-w-58 cursor-pointer items-center justify-center gap-3 border-t border-gray-100 bg-gray-100 px-4 py-2 text-sm text-gray-700 transition hover:bg-red-50"
                >
                  <LogOut size={16} className="rotate-180 transform" />
                  <span>로그아웃</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Header
