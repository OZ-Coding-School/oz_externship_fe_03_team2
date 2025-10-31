import { type SimpleError } from '../../types/apiInterface/findInterface'
import { type NotificationResponse } from '../../types/apiInterface/NotiInterface'
import { api } from '../client'
import { useSimpleMutation } from '../Helper/useSimpleMutation'
import { useSimpleQuery } from '../Helper/useSimpleQuery'

// 기존 알림 전체 불러오기
export const useAllNotification = () => {
  return useSimpleQuery<NotificationResponse, SimpleError>(
    ['/notification'],
    () => api.get('/v1/notifications/')
  )
}

// 기존 알림 안읽음 불러오기
export const useNotReadNotification = () => {
  return useSimpleQuery<NotificationResponse, SimpleError>(
    ['/notification'],
    () => api.get('/v1/notifications?is_read=false')
  )
}

// 기존 알림 읽음 불러오기
export const useReadNotification = () => {
  return useSimpleQuery<NotificationResponse, SimpleError>(
    ['/notification'],
    () => api.get('/v1/notifications?is_read=true')
  )
}

// 개별 읽음 처리
export const useNotiPatchRead = (notification_id: number) => {
  return useSimpleMutation<void, SimpleError>(() =>
    api.patch(`/v1/notifications/${notification_id}/read/`)
  )
}

// 모두 읽음 처리
export const useNotiPatchAllRead = () => {
  return useSimpleMutation<void, SimpleError>(() =>
    api.patch(`/v1/notifications/read-all`)
  )
}
