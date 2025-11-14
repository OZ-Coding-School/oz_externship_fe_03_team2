import { ChevronUp } from 'lucide-react'
import { useUserStore } from '../../../store/useUserStore'
import type { User } from '../../../types/apiInterface/chatInterface'
interface PeopleBoardType {
  setOpenPeople: (openPeople: boolean) => void
  onlineUsers: User[]
  onlineCount: number
}
export function PeopleBoard({ setOpenPeople, onlineUsers }: PeopleBoardType) {
  const { user } = useUserStore()
  return (
    <div className="shadow-normal flex h-82 w-27 flex-col rounded-br-md bg-gray-50">
      <div className="flex justify-end pt-1 pr-2 text-gray-400 hover:text-gray-500 active:text-gray-600">
        <ChevronUp onClick={() => setOpenPeople(false)} />
      </div>
      <div className="scrollbar-hide flex flex-col items-start gap-1.5 overflow-y-scroll px-1 pb-8">
        {onlineUsers.map((person) => (
          <div
            key={person.id}
            className="flex h-auto w-auto items-center justify-center gap-1 rounded-full bg-white px-2 py-1"
          >
            <div className={`bg-success-500 h-2 w-2 rounded-full`}></div>
            <p
              className={`${user?.id === person.id ? 'text-primary-600' : 'text-gray-700'} text-xs`}
            >
              {person.nickname}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
