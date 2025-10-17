import { Bell } from 'lucide-react'
import Avatar from '../common/Avatar'
import { useEffect, useRef, useState } from 'react'
import UserDropdown from '../common/UserDropdown'
import { useNavigate } from 'react-router'

function HeaderIsLogin() {
  const username = '김개발'
  const notificationCount = '3'
  const [open, setOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const handleMyPageClick = () => {
    navigate('/mypage') // 마이페이지로 이동
    setOpen(false) // 드롭다운 닫기
  }

  const handleLogoutClick = () => {
    setOpen(false) // 드롭다운 닫기
  }

  return (
    <div className="relative ml-8 flex items-center" ref={dropdownRef}>
      {/* 알림 */}
      <div className="hover:text-primary-500 h10 relative flex w-10 cursor-pointer items-center justify-center text-gray-400">
        <Bell size={24} />
        <span className="bg-danger-500 absolute -top-3 -right-1 flex min-h-5 min-w-5 items-center justify-center rounded-[9999px] text-xs font-semibold text-white">
          {notificationCount}
        </span>
      </div>

      <div
        className="relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar name={username} size="sm" isHeader />
        <span className="text-primary-600 text-base font-medium">
          {username}
        </span>
      </div>

      {open && (
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
