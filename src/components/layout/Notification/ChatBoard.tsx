import { X } from 'lucide-react'
import { monthDayFormat } from '../../../utils/dateFormat'
import { useState } from 'react'
import { ChatDetail } from './DetailChatBoard'
import { useChatRooms } from '../../../api/services/Chat'
import { useStudyGroupId } from '../../../store/useStudyGroupId'
// import { chatData } from '../../NotiDummy'

interface ChatOpenType {
  setChatOpen: (chatOpen: boolean) => void
}
//프롭스로 챗오픈 상태 받아와서 안에서 엑스바튼으로 열었다 닫았다 할 수 있게

export function ChatBoard({ setChatOpen }: ChatOpenType) {
  const { data: chatData } = useChatRooms()
  // const { data: unread } = useUnreadMessages()
  // const chatCount = unread?.data.total_unread_count
  const chatCount = 3

  const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null)
  const { studyGroupUuid, setStudyGroupUuid } = useStudyGroupId()
  if (studyGroupUuid) {
    return (
      <ChatDetail setChatOpen={setChatOpen} studyGroupName={selectedRoomName} />
    )
  }

  return (
    <div className="flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none">
      <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col items-start justify-center p-1">
          <p className="text-black">채팅방</p>
          <p className="text-primary-600 text-xs">
            {chatCount}개의 읽지 않은 메시지
          </p>
        </div>
        <div className="flex items-center text-gray-400 hover:text-gray-500 active:text-gray-600">
          <X size={20} onClick={() => setChatOpen(false)} />
        </div>
      </div>
      <div className="scrollbar-hide h-full overflow-y-scroll">
        {!chatData?.data || chatData?.data.length === 0 ? (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
            채팅방이 없습니다.
          </div>
        ) : (
          chatData?.data.map((msg) => (
            <div
              key={msg.uuid}
              onClick={() => {
                setStudyGroupUuid(msg.uuid)
                setSelectedRoomName(msg.name)
              }}
              className="flex flex-col gap-1 border-b border-gray-200 p-3 hover:bg-gray-50 active:bg-gray-100"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="flex-1 text-sm">{msg.name}</p>
                <div className="flex items-center gap-1">
                  <p className="text-xs text-gray-500">
                    {msg.last_message
                      ? monthDayFormat(msg.last_message.created_at)
                      : ''}
                  </p>
                  {/* {msg.unread_message_count > 0 && ( */}
                  {chatCount > 0 && (
                    <div className="bg-danger-500 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                      {chatCount}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex">
                <p className="mb-2 text-xs text-gray-500">
                  {msg.last_message
                    ? `${msg.last_message.sender_nickname}: ${msg.last_message.content}`
                    : '대화내역이 없습니다.'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
