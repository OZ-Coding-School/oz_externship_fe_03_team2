import { useQueryClient } from '@tanstack/react-query'
import { useToken } from '../store/useTokenStore'
import { useEffect } from 'react'
import { showToast } from '../utils/showToast'
import {
  type NotificationResponse,
  type NotiItem,
} from '../types/apiInterface/NotiInterface'
import { EventSourcePolyfill } from 'event-source-polyfill'

export function useSSE() {
  const { accessToken } = useToken()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!accessToken) return

    const eventSource = new EventSourcePolyfill(
      `/api/v1/notifications/stream`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        // withCredentials: true
        // 얘도 필요한지 나중에 보고 ㄱㄱ
      }
    )

    eventSource.onopen = () => {
      showToast('SSE 연결 성공', 'success')
    }

    eventSource.onmessage = (e) => {
      const newNoti: NotiItem = JSON.parse(e.data)
      // SSE로 새 알림을 받아옴

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
    // EventSourcePolyfill은 자동 재연결 시도함

    return () => {
      eventSource.close()
      queryClient.removeQueries({ queryKey: ['/notification', accessToken] })
    }
  }, [accessToken])
}
