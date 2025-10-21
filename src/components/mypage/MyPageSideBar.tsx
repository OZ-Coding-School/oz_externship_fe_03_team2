import { useNavigate } from 'react-router'
import Avatar from '../common/Avatar'

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

  return (
    <div className="w-70 flex-shrink-0 rounded-xl border border-gray-200 bg-white p-[25px] shadow-sm">
      {/* 프로필 */}
      <div className="mb-8 border-b border-gray-200 pb-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar name="김개발" size="xl" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">김개발</h3>
            <p className="text-sm text-gray-600">kim.dev@example.com</p>
            <p className="mt-1 text-xs text-gray-500">가입일: 2024년 1월</p>
          </div>
        </div>
      </div>

      {/* 메뉴 */}
      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`${item.hiddenOnMobile ? 'hidden md:block' : ''} ${
              item.hiddenOnDesktop ? 'md:hidden' : ''
            }`}
          >
            <button
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
          </div>
        ))}
      </div>
    </div>
  )
}
export default MyPageSideBar
