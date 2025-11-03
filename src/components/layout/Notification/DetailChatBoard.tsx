import { ArrowLeft, X } from 'lucide-react'
// import { useChatDetail } from '../../../api/services/Chat'
import { useUserStore } from '../../../store/useUserStore'

interface ChatDetailType {
  studyGroupId: number
  studyGroupName: string | null
  setChatOpen: (chatOpen: boolean) => void
  setSelectedRoomId: (selectedRoomId: number | null) => void
}
export function ChatDetail({
  // studyGroupId,
  studyGroupName,
  setChatOpen,
  setSelectedRoomId,
}: ChatDetailType) {
  // const { data: chatData } = useChatDetail(studyGroupId)

  const { user } = useUserStore()
  const online = {
    total: 3,
    people: [
      { id: 5, name: '민현서', is_online: true },
      { id: 8, name: '김민섭', is_online: true },
      { id: 3, name: '이프론트', is_online: false },
      { id: 4, name: '최자바', is_online: true },
    ],
  }
  return (
    <div className="flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none">
      <div className="flex justify-between">
        <ArrowLeft onClick={() => setSelectedRoomId(null)} />
        <div className="flex flex-col">
          <p>{studyGroupName}</p>
          <div className="flex">
            <span className="bg-success-500 h-2 w-2 rounded-full"></span>
            <p>{online.total} 온라인</p>
          </div>
        </div>
        <X onClick={() => setChatOpen(false)} />
      </div>
      <div className="scrollbar-hide flex gap-2 overflow-x-scroll">
        {online.people.map((person) => (
          <div key={person.id} className="rounded-full bg-white px-2 py-1">
            <span
              className={`${person.is_online ? 'bg-success-500' : 'bg-gray-300'} h-2 w-2`}
            ></span>
            <p
              className={`${user?.id === person.id ? 'text-primary-600' : 'text-gray-700'}`}
            >
              {person.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
