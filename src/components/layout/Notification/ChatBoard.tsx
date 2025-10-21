import { X } from 'lucide-react'
import { useNotificationStore } from '../../../store/useNotificationStore'

interface ChatOpenType {
  setChatOpen: (chatOpen: boolean) => void
}
//프롭스로 챗오픈 상태 받아와서 안에서 엑스바튼으로 열었다 닫았다 할 수 있게

export function ChatBoard({ setChatOpen }: ChatOpenType) {
  const { notiMessage } = useNotificationStore()
  const notiCount = notiMessage.count
  return (
    <div className="w-full max-w-[19.875rem] border bg-amber-400 shadow">
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start justify-center">
          <p>채팅방</p>
          {notiCount > 0 && (
            <p className="text-[.75rem]">{notiCount}개의 읽지 않은 메시지</p>
          )}
        </div>
        <X size={55} />
      </div>
    </div>
  )
}
