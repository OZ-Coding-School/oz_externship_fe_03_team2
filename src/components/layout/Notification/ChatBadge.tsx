import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { ChatBoard } from './ChatBoard'
import { useChatRooms } from '../../../api/services/Chat'

export function ChatBadge() {
  const [chatOpen, setChatOpen] = useState(false)
  const { data: chatRoomAllData } = useChatRooms()

  const chatCount = chatRoomAllData?.reduce((sum, item) => {
    return sum + Number(item.unread_message_count || 0)
  }, 0)
  return (
    <div className="fixed right-4 bottom-4 z-1000 lg:right-5 lg:bottom-5">
      <div
        onClick={() => setChatOpen(!chatOpen)}
        className="bg-primary-500 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full text-white shadow-[0_5px_10px_#00000040] lg:h-[3.7rem] lg:w-[3.7rem]"
      >
        <MessageCircle size={25} />
        {chatCount && chatCount > 0 ? (
          <div
            className={`bg-danger-500 absolute top-[-6px] right-[-6px] flex h-[1.3rem] w-[1.3rem] items-center justify-center rounded-full text-[.7rem] lg:top-[-7px] lg:right-[-7px] lg:h-[1.4rem] lg:w-[1.4rem] lg:text-[.75rem] ${chatCount > 9 && 'tracking-tighter'}`}
          >
            {chatCount > 9 ? `9+` : `${chatCount}`}
          </div>
        ) : null}
      </div>

      {chatOpen && (
        <div className="absolute right-0 bottom-[130%] z-99990">
          <ChatBoard setChatOpen={setChatOpen} chatOpen={chatOpen} />
        </div>
      )}
    </div>
  )
}
