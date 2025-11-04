import { X } from 'lucide-react'
import { useUserStore } from '../../../store/useUserStore'
import { online } from '../../NotiDummy'
interface PeopleBoardType {
  setOpenPeople: (openPeople: boolean) => void
}
export function PeopleBoard({ setOpenPeople }: PeopleBoardType) {
  const { user } = useUserStore()
  return (
    <div className="shadow-normal flex h-82 w-22 flex-col rounded-br-md bg-gray-50">
      <div className="flex justify-end text-gray-400 hover:text-gray-500 active:text-gray-600">
        <X size={18} onClick={() => setOpenPeople(false)} />
      </div>
      <div className="scrollbar-hide flex flex-col items-start gap-1.5 overflow-y-scroll px-1">
        {online.people.map((person) => (
          <div
            key={person.id}
            className="flex h-auto w-auto items-center justify-center gap-1 rounded-full bg-white px-2 py-1"
          >
            <div
              className={`${person.is_online ? 'bg-success-500' : 'bg-gray-300'} h-2 w-2 rounded-full`}
            ></div>
            <p
              className={`${user?.id === person.id ? 'text-primary-600' : 'text-gray-700'} text-xs`}
            >
              {person.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
