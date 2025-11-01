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
    <div className="w-full max-w-[19.875rem] border bg-white shadow">
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start justify-center bg-gray-50 p-1">
          <p className="font-semibold">채팅방</p>
          {notiCount > 0 ? (
            <p className="text-primary-600 text-xs">
              {notiCount}개의 읽지 않은 메시지
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="text-gray-400 hover:text-gray-500 active:text-gray-600">
          <X size={55} onClick={() => setChatOpen(false)} />
        </div>
      </div>
    </div>
  )
}
