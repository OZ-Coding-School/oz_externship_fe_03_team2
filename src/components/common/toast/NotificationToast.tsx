import { Star, X } from 'lucide-react'
import { toast } from 'sonner'

interface NotificationToastType {
  id?: string | number
  title: string //채팅이면 채팅방 | 알림이면 알림 제목
  user?: string //채팅이면 필요하고 알림이면 없이
  content: string //내용은 항상있고
  date: string //알림 들어오는거 보니까 날짜도 있어서
  type: 'chat' | 'notice'
}

function NotificationToast({
  id,
  title,
  user,
  content,
  date,
  type = 'chat',
}: NotificationToastType) {
  return (
    <div>
      {type === 'chat' ? (
        <div className="flex w-80 flex-col rounded-sm border border-gray-400 bg-gray-100 p-2">
          <div className="flex justify-between border-b border-gray-400 pb-1">
            <h1>{title}</h1>
            <button onClick={() => toast.dismiss(id)}>
              <X className="text-gray-600" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>{user}</div>
            <div className="text-xs text-gray-700">{date}</div>
          </div>
          <div className="line-clamp-2 text-sm">{content}</div>
        </div>
      ) : (
        <div className="flex w-80 flex-col rounded-sm border border-gray-400 bg-gray-100 p-2">
          <div className="flex justify-between border-b border-gray-400 pb-1">
            <h1>{title}</h1>
            <button onClick={() => toast.dismiss(id)}>
              <X className="text-gray-600" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div>
              {/* 알림 아이콘 만들어진거 있으면 넣어도 괜찮아보여서 추가해둠*/}
              <Star />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-end gap-2 text-xs text-gray-700">
                {date}
              </div>
              <div className="line-clamp-2 text-sm">{content}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationToast
