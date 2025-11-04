import { ArrowLeft, X } from 'lucide-react'
// import { useChatDetail } from '../../../api/services/Chat'
import { useUserStore } from '../../../store/useUserStore'
import { chatMessagesData_10, chatMessagesData_20 } from '../../NotiDummy'
import { timeFormat } from '../../../utils/dateFormat'

interface ChatDetailType {
  studyGroupName: string | null
  setChatOpen: (chatOpen: boolean) => void
  selectedRoomId: number
  setSelectedRoomId: (selectedRoomId: number | null) => void
}
export function ChatDetail({
  studyGroupName,
  setChatOpen,
  selectedRoomId,
  setSelectedRoomId,
}: ChatDetailType) {
  // const { data: chatData } = useChatDetail(studyGroupId)
  const { user } = useUserStore()
  let chatData
  if (selectedRoomId === 20) chatData = chatMessagesData_20
  else if (selectedRoomId === 10) chatData = chatMessagesData_10

  // 온라인 어케 되나 일단 나중에 api 나오면 이거 지우기
  const online = {
    total: 3,
    people: [
      { id: 5, name: '민현서', is_online: true },
      { id: 8, name: '김민섭', is_online: true },
      { id: 3, name: '이프론트', is_online: false },
      { id: 4, name: '최자바', is_online: true },
      { id: 7, name: '왁왁왁', is_online: false },
      { id: 6, name: '이야호', is_online: true },
    ],
  }
  return (
    <div className="flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none">
      {/* 상단바 */}
      <div className="flex items-center justify-between bg-gray-50 p-3">
        <div className="flex items-center gap-3">
          <div className="text-gray-600 hover:text-gray-700 active:text-gray-800">
            <ArrowLeft size={18} onClick={() => setSelectedRoomId(null)} />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{studyGroupName}</p>
            <div className="flex items-center gap-1">
              <div className="bg-success-500 h-2 w-2 rounded-full"></div>
              <p className="text-xs text-gray-600">{online.total}명 온라인</p>
            </div>
          </div>
        </div>
        <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
          <X size={18} onClick={() => setChatOpen(false)} />
        </div>
      </div>

      {/* 접속중 온라인 여부 어케 되나 */}
      <div className="scrollbar-thin flex gap-2 overflow-x-scroll border-y border-gray-200 bg-gray-50 whitespace-nowrap">
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

      {/* 채팅내역 */}
      <div className="scrollbar-hide overflow-x-scroll">
        {chatData?.data.messages.map((msg) => (
          <div
            key={msg.id}
            className={`${msg.sender_id === user?.id ? 'items-end' : 'items-start'} flex flex-col`}
          >
            {msg.sender_id !== user?.id && <p></p>}
            <div>{msg.content}</div>
            <p>{timeFormat(msg.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
