import { Bell } from 'lucide-react'
import Avatar from '../common/Avatar'
import { useCallback, useEffect, useRef, useState } from 'react'
import UserDropdown from '../common/UserDropdown'
import { useNavigate } from 'react-router'

interface HeaderIsLoginProps {
  isMobile?: boolean
}

function HeaderIsLogin({ isMobile = false }: HeaderIsLoginProps) {
  const userName = '김개발'
  const notificationCount = '3'
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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
    navigate('/mypage')
    setOpen(false)
  }

  const handleLogoutClick = () => {
    setOpen(false)
  }

  const handleUserInfoClick = () => {
    if (isMobile) return // 모바일이면 종료
    setOpen((prev) => !prev)
  }

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
        <Avatar name={userName} size="sm" isHeader />
        <span className="text-primary-600 text-base font-medium">
          {userName}
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
