import { X } from 'lucide-react'
import { toast } from 'sonner'

interface NotificationToastType {
  id?: string | number
  title: string //채팅이면 채팅방 | 알림이면 알림 제목
  user?: string
  content: string
  date: string
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
  console.log('ghcnf3')
  return (
    <div>
      {type === 'chat' ? (
        <div className="bg-amber-200">
          <h1>{title}</h1>
          <button onClick={() => toast.dismiss(id)}>
            <X />
          </button>
          <div>{user}</div>
          <div>{content}</div>
          <div>{date}</div>
        </div>
      ) : (
        <div>
          <h1>{title}</h1>
          <button onClick={() => toast.dismiss(id)}>
            <X />
          </button>
          <div></div>
          <div>{content}</div>
          <div>{date}</div>
        </div>
      )}
    </div>
  )
}

export default NotificationToast
