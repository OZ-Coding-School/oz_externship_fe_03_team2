import { Bell } from 'lucide-react'
import Avatar from '../common/Avatar'
import { useCallback, useEffect, useRef, useState } from 'react'
import UserDropdown from '../common/UserDropdown'
import { useNavigate } from 'react-router'
import { useUserStore } from '../../store/useUserStore'
import { useToken } from '../../store/useTokenStore'
import { useLogout } from '../../api/services/Auth'
import { showToast } from '../../utils/showToast'

interface HeaderIsLoginProps {
  isMobile?: boolean
}

function HeaderIsLogin({ isMobile = false }: HeaderIsLoginProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const user = useUserStore((state) => state.user)
  const clearUser = useUserStore((state) => state.clearUser)
  const { clearAccessToken } = useToken()
  const { mutate: LogoutMutate } = useLogout()

  const notificationCount = '3' // 알림 하드코딩 되어있는거 나중에 수정해야 함

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    )
      setOpen(false) // 드롭다운이 존재하고 클릭 위치가 밖일 때 닫음
  }, [])

  useEffect(() => {
    if (!open) return // 안열려있으면 종료

    document.addEventListener('mousedown', handleClickOutside) //마우스 클릭 이벤트 리스너 등록
    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // 컴포넌트 언마운트 또는 open 상태 변경 시 리스너 제거
    }
  }, [open, handleClickOutside])

  const handleMyPageClick = () => {
    navigate('/mypage/profile')
    setOpen(false)
  }

  const handleLogoutClick = () => {
    LogoutMutate(undefined, {
      onSuccess: (data) => {
        clearAccessToken()
        clearUser()
        showToast(`${data.detail}`, 'success', '로그아웃')
        setOpen(false)
        navigate('/login')
      },
      onError: (error) => {
        showToast(`${error.response?.data.error}`, 'error', '로그아웃')
        setOpen(false)
      },
    })
  }

  const handleUserInfoClick = () => {
    if (isMobile) return
    setOpen((prev) => !prev)
  }

  if (!user) return null // user가 없으면 null(아무것도 렌더링 안함)

  return (
    <div className="relative ml-8 flex items-center" ref={dropdownRef}>
      {/* 알림은 모바일에서도 클릭 가능 */}
      <div className="hover:text-primary-500 relative flex h-10 w-10 cursor-pointer items-center justify-center text-gray-400">
        <Bell size={24} />
        <span className="bg-danger-500 absolute -top-1 -right-1 flex min-h-5 min-w-5 items-center justify-center rounded-[9999px] text-xs font-semibold text-white">
          {notificationCount}
        </span>
      </div>

      {/* 유저 정보 */}
      <div
        className={`relative flex items-center gap-2 rounded-full px-4 py-1 ${
          isMobile ? 'cursor-default' : 'cursor-pointer'
        }`}
        onClick={handleUserInfoClick}
      >
        <Avatar name={user.name ?? user.nickname} size="sm" isHeader />
        <span className="text-primary-600 text-base font-medium">
          {user.name ?? user.nickname}
        </span>
      </div>

      {/* 드롭다운 - 모바일에서 표시x */}
      {open && !isMobile && (
        <UserDropdown
          onMyPage={handleMyPageClick}
          onLogout={handleLogoutClick}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

export default HeaderIsLogin
