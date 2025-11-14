import { useEffect, useState } from 'react'
import { useChatRooms } from '../../../api/services/Chat'
import { ChatDetail } from './DetailChatBoard'
import { useStudyGroupId } from '../../../store/useStudyGroupId'
import { X } from 'lucide-react'
import { monthDayFormat } from '../../../utils/dateFormat'

interface ChatOpenType {
  setChatOpen: (chatOpen: boolean) => void
  chatOpen: boolean
}

export function ChatBoard({ setChatOpen, chatOpen }: ChatOpenType) {
  const { data: chatData, refetch } = useChatRooms()

  const unreadCount = chatData?.reduce((sum, item) => {
    return sum + Number(item.unread_message_count || 0)
  }, 0)

  const [selectedRoomName, setSelectedRoomName] = useState<string | null>(null)
  const { studyGroupUuid, setStudyGroupUuid } = useStudyGroupId()

  useEffect(() => {
    if (!studyGroupUuid) {
      refetch()
    }
  }, [studyGroupUuid, refetch])

  useEffect(() => {
    setStudyGroupUuid(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen])

  return (
    <>
      <div
        className={`flex h-96 w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow select-none ${studyGroupUuid ? 'hidden' : ''}`}
      >
        <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-col items-start justify-center p-1">
            <p className="text-black">채팅방</p>
            {unreadCount !== undefined && (
              <p className="text-primary-600 text-xs">
                {unreadCount}개의 읽지 않은 메시지
              </p>
            )}
          </div>
          <div className="flex cursor-pointer items-center text-gray-400 hover:text-gray-500 active:text-gray-600">
            <X size={20} onClick={() => setChatOpen(false)} />
          </div>
        </div>

        <div className="scrollbar-hide h-full overflow-y-scroll">
          {!chatData ? (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
              채팅방이 없습니다.
            </div>
          ) : (
            chatData.map((room) => (
              <div
                key={room.uuid}
                onClick={() => {
                  setStudyGroupUuid(room.uuid)
                  setSelectedRoomName(room.name)
                }}
                className="flex cursor-pointer flex-col gap-1 border-b border-gray-200 p-3 hover:bg-gray-50 active:bg-gray-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="flex-1 text-sm">{room.name}</p>
                  <div className="flex items-center gap-1">
                    {room.last_message && (
                      <p className="text-xs text-gray-500">
                        {monthDayFormat(room.last_message.created_at)}
                      </p>
                    )}
                    {room.unread_message_count > 0 && (
                      <div className="bg-danger-500 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                        {room.unread_message_count}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex">
                  {room.last_message ? (
                    <p className="mb-2 text-xs text-gray-500">
                      {room.last_message.sender_nickname}:{' '}
                      {room.last_message.content}
                    </p>
                  ) : (
                    <p className="mb-2 text-xs text-gray-400">
                      대화 내역이 없습니다.
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {studyGroupUuid && (
        <div className={studyGroupUuid ? '' : 'hidden'}>
          <ChatDetail
            setChatOpen={setChatOpen}
            studyGroupName={selectedRoomName}
          />
        </div>
      )}
    </>
  )
}
