import { MessageCircle } from 'lucide-react'
import { useNotificationStore } from '../../../store/useNotificationStore'
import { useState } from 'react'
import { ChatBoard } from './ChatBoard'

export function NotiBadge() {
  const { notiMessage } = useNotificationStore()
  const notiCount = notiMessage.count
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <div>
      <div
        onClick={() => {
          setChatOpen(!chatOpen)
        }}
        className="bg-primary-500 fixed right-4 bottom-4 flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full text-white shadow-[0_5px_10px_#00000040] lg:right-5 lg:bottom-5 lg:h-[3.7rem] lg:w-[3.7rem]"
      >
        <MessageCircle size={25} />
        {notiCount > 0 && (
          <div className="bg-danger-500 absolute top-[-6px] right-[-6px] flex h-[1.3rem] w-[1.3rem] items-center justify-center rounded-full text-[.7rem] lg:top-[-7px] lg:right-[-7px] lg:h-[1.4rem] lg:w-[1.4rem] lg:text-[.75rem]">
            {notiCount}
          </div>
        )}
        {chatOpen && (
          <div className="absolute bottom-[110%] z-10">
            <ChatBoard setChatOpen={setChatOpen} />
          </div>
        )}
      </div>
    </div>
  )
}
