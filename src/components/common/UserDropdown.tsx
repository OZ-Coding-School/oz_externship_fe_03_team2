import { LogOut, UserRound } from 'lucide-react'

interface UserDropdownProps {
  onClose?: () => void
  onMyPage?: () => void
  onLogout?: () => void
}

function UserDropdown({ onClose, onMyPage, onLogout }: UserDropdownProps) {
  return (
    <div className="absolute top-full right-0 z-50 mt-2 min-h-[6.25rem] min-w-[12rem] rounded-lg border border-gray-200 bg-white text-sm shadow-md">
      <div className="py-1">
        <div
          onClick={() => {
            onMyPage?.()
            onClose?.()
          }}
          className="hover:bg-primary-50 flex w-full cursor-pointer items-center gap-2 border-b border-gray-200 px-5 py-3"
        >
          <UserRound className="h-3.5 w-3.5 text-gray-700" />
          마이페이지
        </div>
        <div
          onClick={() => {
            onLogout?.()
            onClose?.()
          }}
          className="text-danger-500 hover:bg-primary-50 flex w-full cursor-pointer items-center gap-2 px-5 py-3"
        >
          <LogOut className="text-danger-600 h-3.5 w-3.5 rotate-180 transform" />
          로그아웃
        </div>
      </div>
    </div>
  )
}

export default UserDropdown
