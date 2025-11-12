import { useToken } from '../../store/useTokenStore'
import { type SimpleError } from '../../types/apiInterface/findInterface'
import { type NotificationResponse } from '../../types/apiInterface/NotiInterface'
import { api } from '../client'
import { useSimpleMutation } from '../Helper/useSimpleMutation'
import { useSimpleQuery } from '../Helper/useSimpleQuery'

// 기존 알림 전체 불러오기
export const useAllNotification = () => {
  const { accessToken } = useToken()
  return useSimpleQuery<NotificationResponse, SimpleError>(
    ['/notification'],
    () => api.get('/v1/notifications'),
    { enabled: !!accessToken, staleTime: 0 }
  )
}

// 개별 읽음 처리
export const useNotiPatchRead = () => {
  return useSimpleMutation<void, SimpleError, number>((notification_id) =>
    api.post(`/v1/notifications/${notification_id}/read`)
  )
}

// 모두 읽음 처리
export const useNotiPatchAllRead = () => {
  return useSimpleMutation<void, SimpleError>(() =>
    api.post(`/v1/notifications/read-all`)
  )
}
