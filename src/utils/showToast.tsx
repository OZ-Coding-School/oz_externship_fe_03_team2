import { toast } from 'sonner'
import Toast from '../components/common/toast/Toast'
import NotificationToast from '../components/common/toast/NotificationToast'

export const showToast = (
  message: string,
  type: 'error' | 'warning' | 'success',
  title?: string
) => {
  toast.custom(
    (t) => <Toast id={t} title={title} message={message} type={type} />,
    {
      position: 'top-center',
    }
  )
}

export const showChatToast = (
  title: string,
  user: string,
  content: string,
  date: string
) => {
  console.log('토스트 호출')
  toast.custom(
    (t) => {
      console.log('토스트 호출2')
      return (
        <NotificationToast
          id={t}
          title={title}
          user={user}
          content={content}
          date={date}
          type="chat"
        />
      )
    },
    {
      position: 'top-right',
      id: `chat-${Date.now()}-${Math.random()}`,
    }
  )
}

export const showNoticeToast = (
  title: string,
  content: string,
  date: string
) => {
  toast.custom(
    (t) => (
      <NotificationToast
        id={t}
        title={title}
        content={content}
        date={date}
        type="notice"
      />
    ),
    {
      position: 'top-right',
    }
  )
}
