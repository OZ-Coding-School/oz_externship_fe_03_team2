import { useQueryClient } from '@tanstack/react-query'
import { useToken } from '../store/useTokenStore'
import { useEffect } from 'react'
import { showToast } from '../utils/showToast'
import {
  type NotificationResponse,
  type NotiItem,
} from '../types/apiInterface/NotiInterface'
import { showNotificationToast } from '../utils/showNotificationToast'

export function useSSE() {
  const { accessToken } = useToken()
  const queryClient = useQueryClient()
  const typeMap = [
    'APPLICATIONS_CREATED',
    'APPLICATIONS_STATUS_APPROVAL',
    'APPLICATIONS_STATUS_REJECTION',
    'STUDY_MEMBER_JOINED',
    'STUDY_REVIEW_REQUEST',
    'STUDY_SCHEDULE_UPCOMING',
    'STUDY_SCHEDULE_TODAY',
    'STUDY_RECORD_CREATED',
    'SYSTEM',
    'CUSTOM',
  ]

  useEffect(() => {
    if (!accessToken) return

    const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
    const eventSource = new EventSource(
      `${BASE_URL}/v1/notifications/stream?token=${accessToken}`
    )

    eventSource.onopen = () => {
      showToast('SSE 연결 성공', 'success')
    }

    eventSource.onmessage = (e) => {
      const newNoti: NotiItem = JSON.parse(e.data)
      // SSE로 새 알림을 받아옴
      console.log('메씨지 왔쪄염')
      console.log(newNoti)

      if (!newNoti.type || !typeMap.includes(newNoti.type)) return

      showNotificationToast(
        newNoti.content,
        newNoti.type,
        newNoti.created_at,
        'chat'
      )

      queryClient.setQueryData<NotificationResponse>(
        ['/notification'],
        (old) => {
          // 현재 캐시에 있는 데이터 (NotificationResponse | null 타입)
          if (!old) return old
          // 캐싱된 데이터가 없으면 ? = restAPI로 초기 목록 불러오기 전이면 ? 아무것도 안 함
          const updatedItems: NotiItem[] = [newNoti, ...old.results]
          // 새 알림을 헌 알림 위에다 둠
          return {
            // 새로운 캐시 데이터
            ...old,
            count: old.count + 1,
            results: updatedItems,
          }
        }
      )
      // 여기에 showNotiToast 이런 거 추가..
    }
    eventSource.onerror = () => {
      showToast('SSE 연결 오류', 'error')
    }

    return () => {
      eventSource.close()
      queryClient.removeQueries({ queryKey: ['/notification'] })
    }
  }, [accessToken])
}
