import { Bell } from 'lucide-react'
import Avatar from '../common/Avatar'

function HeaderIsLogin() {
  const username = '김개발'
  const notificationCount = 3

  return (
    <div className="ml-8 flex items-center gap-6">
      {/* 네비 */}
      <div className="flex gap-[32px] text-base text-gray-700">
        <a href="#" className="hover:text-primary-500">
          강의 목록
        </a>
        <a href="#" className="hover:text-primary-500">
          스터디 그룹
        </a>
        <a href="#" className="hover:text-primary-500">
          구인 공고
        </a>
      </div>

      {/* 알림 */}
      <button
        type="button"
        className="hover:text-primary-500 relative flex cursor-pointer items-center justify-center text-gray-400"
      >
        <Bell size={22} />
        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {notificationCount}
        </span>
      </button>

      {/* 프로필 + 이름*/}
      <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1">
        <Avatar name={username} size="sm" imgUrl="http://asdsdaasd" />
        <span className="text-base font-medium text-yellow-700">
          {username}
        </span>
      </div>
    </div>
  )
}

export default HeaderIsLogin
