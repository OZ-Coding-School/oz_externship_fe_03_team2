import { X } from 'lucide-react'
import { chatData } from '../../NotiDummy'
import { monthDayFormat } from '../../../utils/dateFormat'
import { useState } from 'react'
import { ChatDetail } from './DetailChatBoard'

interface ChatOpenType {
  setChatOpen: (chatOpen: boolean) => void
}
//프롭스로 챗오픈 상태 받아와서 안에서 엑스바튼으로 열었다 닫았다 할 수 있게

export function ChatBoard({ setChatOpen }: ChatOpenType) {
  // const { data: chatData } = useChatRooms()
  const chatCount = chatData.data.pagination.total_count
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null)
  const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null)

  if (selectedRoomId) {
    return (
      <ChatDetail
        studyGroupId={selectedRoomId}
        setChatOpen={setChatOpen}
        studyGroupName={selectedRoomName}
        setSelectedRoomId={setSelectedRoomId}
      />
    )
  }

  return (
    <div className="flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none">
      <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col items-start justify-center p-1">
          <p className="text-black">채팅방</p>
          {chatCount > 0 ? (
            <p className="text-primary-600 text-xs">
              {chatCount}개의 읽지 않은 메시지
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="flex items-center text-gray-400 hover:text-gray-500 active:text-gray-600">
          <X size={20} onClick={() => setChatOpen(false)} />
        </div>
      </div>
      <div className="scrollbar-hide overflow-y-scroll">
        {chatData.data.messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => {
              setSelectedRoomId(msg.study_group_id)
            }}
            className="flex flex-col gap-1 border-b border-gray-200 p-3 hover:bg-gray-50 active:bg-gray-100"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="flex-1 text-sm">{msg.study_group_name}</p>
              <div className="flex items-center gap-1">
                <p className="text-xs text-gray-500">
                  {monthDayFormat(msg.created_at)}
                </p>
                {!msg.is_read && (
                  <div className="bg-danger-500 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                    1{/* 안 읽은 수 나오면 그거로 변경 */}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <p className="mb-2 text-xs text-gray-500">
                {msg.sender_nickname}: {msg.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
