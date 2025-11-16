import { Star, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  chatDateFormat,
  notificationDateFormat,
} from '../../../utils/dateFormat'
import { typeToColor, typeToIcon } from '../../../utils/typeToCss'

interface NotificationToastType {
  id?: string | number
  title: string //채팅이면 채팅방 | 알림이면 알림 제목
  user?: string //채팅이면 필요하고 알림이면 없이
  content: string //내용은 항상있고
  date: string //알림 들어오는거 보니까 날짜도 있어서
  type: 'chat' | 'notice'
  notiNode?: string
}

function NotificationToast({
  id,
  title,
  content,
  date,
  type = 'chat',
  user,
  notiNode,
}: NotificationToastType) {
  //들어오는 타입에 맞춰서 날짜 가공
  const formatDate =
    type === 'chat' ? chatDateFormat(date) : notificationDateFormat(date)

  const header = (
    <div className="flex justify-between border-b border-gray-200 pb-1">
      <p className="pl-1">{type === 'chat' ? user : title}</p>
      <button onClick={() => toast.dismiss(id)}>
        <X className="text-gray-400 hover:text-gray-500 active:text-gray-600" />
      </button>
    </div>
  )

  return (
    <div className="shadow-normal flex w-80 flex-col gap-2 rounded-lg border border-gray-200 bg-white p-2">
      {type === 'chat' ? (
        <div>
          {header}
          <div className="flex items-center justify-between gap-3">
            <div className="my-3 flex h-full w-full items-center justify-center gap-2.5 pt-1">
              <div className="flex-1 text-sm">{content}</div>
            </div>
            <div className="flex h-full gap-3 self-end text-xs whitespace-nowrap text-gray-500">
              {formatDate}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {header}
          <div className="flex items-center justify-between gap-3">
            <div className="my-3 flex h-full w-full items-center justify-center gap-1 pt-1">
              <div
                className={`mx-2 flex h-8 w-8 items-center justify-center rounded-full ${notiNode ? typeToColor(notiNode) : 'bg-[#DBEAFE] text-[#2563EB]'}`}
              >
                {notiNode ? typeToIcon(notiNode) : <Star />}
              </div>
              <div className="flex-1 text-sm">{content}</div>
            </div>
            <div className="flex h-full gap-3 self-end text-xs whitespace-nowrap text-gray-500">
              {formatDate}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationToast
