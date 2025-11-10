import { toast } from 'sonner'
import NotificationToast from '../components/common/toast/NotificationToast'

export const showNotificationToast = (
  title: string,
  user: string,
  content: string,
  date: string,
  type: 'chat' | 'notice'
) => {
  toast.custom(
    (t) => {
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

// 사용 예
// showNotificationToast(
//       '오즈코딩스쿨',
//       '오코스',
//       '5분 뒤 중간 출석이 있을 예정입니다. 정각이 되면 ZEP 학습공간의 초록색 원에 캐릭터를 위치시켜주세요!',
//       '2025년 11월 08일',
//       'chat'
//     )
