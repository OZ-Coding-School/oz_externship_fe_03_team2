import { ArrowLeft, Ellipsis, Send, X } from 'lucide-react'
// import { useChatDetail } from '../../../api/services/Chat'
import { useUserStore } from '../../../store/useUserStore'
import {
  chatMessagesData_10,
  chatMessagesData_20,
  chatMessagesData_5,
  online,
} from '../../NotiDummy'
import { timeFormat } from '../../../utils/dateFormat'
import { PeopleBoard } from './PeopleBoard'
import { useState } from 'react'

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
  const [openPeople, setOpenPeople] = useState<boolean>(false)
  const [sendMessage, setSendMessage] = useState<string>('')
  let chatData
  if (selectedRoomId === 20) chatData = chatMessagesData_20
  else if (selectedRoomId === 10) chatData = chatMessagesData_10
  else if (selectedRoomId === 5) chatData = chatMessagesData_5

  const CSS = {
    me: 'bg-primary-500 text-white rounded-xl rounded-br-sm',
    you: 'bg-gray-100 rounded-xl rounded-bl-sm',
  }

  return (
    <div className="flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none">
      {/* 상단바 */}
      <div className="flex items-center justify-between bg-gray-50 p-3">
        <div className="flex items-center gap-4">
          <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
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
      <div className="relative flex justify-between gap-2 border-y border-gray-200 bg-gray-50 p-2 whitespace-nowrap">
        <div className="flex h-full items-center gap-2">
          {online.people.slice(0, 4).map((person) => (
            <div
              key={person.id}
              className="flex h-auto w-auto flex-0 items-center justify-center gap-1 rounded-full bg-white px-2 py-1"
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
        {online.people.length > 4 && (
          <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
            <Ellipsis onClick={() => setOpenPeople(true)} />
          </div>
        )}
        {openPeople && (
          <div className="absolute top-0 right-0">
            <PeopleBoard setOpenPeople={setOpenPeople} />
          </div>
        )}
      </div>

      {/* 채팅내역 */}
      <div className="scrollbar-hide flex flex-col gap-3.5 overflow-x-scroll p-3">
        {chatData?.data.messages.map((msg) => (
          <div
            key={msg.id}
            className={`${msg.sender_id === user?.id ? 'items-end' : 'items-start'} flex flex-col gap-1`}
          >
            {msg.sender_id !== user?.id && (
              <p className="text-xs text-gray-500">{msg.sender_nickname}</p>
            )}
            <div
              className={`${msg.sender_id === user?.id ? `${CSS.me}` : `${CSS.you}`} flex flex-col px-3 py-2 text-sm`}
            >
              {msg.content}
            </div>
            <p className="text-xs text-gray-500">
              {timeFormat(msg.created_at)}
            </p>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="border-secondary-200 flex items-center justify-center gap-2 border-t p-3">
        <input
          type="text"
          className="w-full flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm focus:border-gray-400 focus:ring-0 focus:outline-none"
          placeholder="메시지를 입력하세요..."
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
        />
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white">
          <Send size={18} />
        </div>
      </div>
    </div>
  )
}
