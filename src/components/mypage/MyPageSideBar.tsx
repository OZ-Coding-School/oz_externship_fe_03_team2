import { useNavigate } from 'react-router'
import Avatar from '../common/Avatar'
import { yearMonthFormat } from '../../utils/dateFormat'
import { useUserStore } from '../../store/useUserStore'

interface MenuItem {
  id: string
  label: string
  subLabel: string
  path: string
  icon: React.ReactNode
  hiddenOnMobile?: boolean
  hiddenOnDesktop?: boolean
}

interface MyPageSidebarProps {
  menuItems: MenuItem[]
  currentActive: string
}

function MyPageSideBar({ menuItems, currentActive }: MyPageSidebarProps) {
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)

  // 모바일용 메뉴 (hiddenOnMobile이 아닌 것들)
  const mobileMenuItems = menuItems.filter((item) => !item.hiddenOnMobile)

  // 데스크톱용 메뉴 (hiddenOnDesktop이 아닌 것들)
  const desktopMenuItems = menuItems.filter((item) => !item.hiddenOnDesktop)

  return (
    <>
      {/* 모바일 4개 메뉴 */}
      <div className="mb-6 md:hidden">
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          {mobileMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg p-4 transition-colors ${
                currentActive === item.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-transparent text-gray-600 hover:bg-gray-200 hover:text-white'
              }`}
            >
              <span
                className={
                  currentActive === item.id ? 'text-white' : 'text-gray-700'
                }
              >
                {item.icon}
              </span>
              <p
                className={`text-sm font-medium ${
                  currentActive === item.id ? 'text-white' : 'text-gray-900'
                }`}
              >
                {item.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 데스크톱 사이드바 */}
      <div className="hidden w-70 flex-shrink-0 rounded-xl border border-gray-200 bg-white p-[25px] shadow-sm md:block">
        {/* 프로필 */}
        {user && (
          <div className="mb-8 border-b border-gray-200 pb-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar
                name={user.name || '사용자'}
                size="xl"
                imgUrl={user.profile_img_url}
              />
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {user.name ?? user.nickname ?? '사용자'}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="mt-1 text-xs text-gray-500">
                  가입일:{' '}
                  {user.created_at ? yearMonthFormat(user.created_at) : '-'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 메뉴 */}
        <div className="flex flex-col gap-3">
          {desktopMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full cursor-pointer rounded-lg px-4 py-3 text-left transition-colors ${
                currentActive === item.id
                  ? 'bg-primary-100'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-700">{item.icon}</span>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      currentActive === item.id
                        ? 'text-gray-900'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.subLabel}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default MyPageSideBar
