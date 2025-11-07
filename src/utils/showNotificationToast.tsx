import { toast } from 'sonner'
import NotificationToast from '../components/common/toast/NotificationToast'

export const showChatToast = (
  title: string,
  user: string,
  content: string,
  date: string,
  type: 'chat' | 'notice'
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
          type={type}
        />
      )
    },
    {
      position: 'top-right',
    }
  )
}
