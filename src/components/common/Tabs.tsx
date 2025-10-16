import { type ReactNode } from 'react'

type TabItem = {
  key: string
  label: ReactNode
  count?: number
}

interface TabsProps {
  items: TabItem[]
  activeKey: string
  onTabChange: (key: string) => void
}

function Tabs({ items, activeKey, onTabChange }: TabsProps) {
  return (
    <div className="flex border-t border-b border-gray-200">
      {items.map(({ key, label, count }) => {
        const isActive = key === activeKey
        return (
          <div
            key={key}
            onClick={() => onTabChange(key)}
            className={`relative flex cursor-pointer items-center px-4 pt-3 pb-3.5 ${
              isActive ? 'text-primary-600 font-semibold' : 'text-gray-500'
            }`}
          >
            {/* label과 count */}
            <span className="flex items-center">
              {label}
              {count !== undefined && (
                <span
                  className={`ml-1 ${
                    isActive ? 'text-primary-600' : 'text-gray-500'
                  }`}
                >
                  ({count})
                </span>
              )}
            </span>

            {/* active시 아래 선 */}
            {isActive && (
              <span className="bg-primary-600 absolute right-0 bottom-0 left-0 h-0.5" />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
