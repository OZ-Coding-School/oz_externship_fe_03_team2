import { useQueryClient } from '@tanstack/react-query'
import { useToken } from '../store/useTokenStore'
import { useEffect } from 'react'
import { useUserStore } from '../store/useUserStore'

import { showToast } from '../utils/showToast'
import {
  type NotificationResponse,
  type NotiItem,
} from '../types/apiInterface/NotiInterface'

export function useSSE() {
  const { accessToken } = useToken()
  const { user } = useUserStore()
  const user_id = user?.id
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!accessToken) return

    const eventSource = new EventSource(
      `/api/v1/notification/stream/${user_id}?token=${accessToken}`
      // 토큰을 쿼리파라미터로 전달하는 경우
    )

    // const evtSource = new EventSource(`/api/v1/notification/stream/${user_id}`, {
    //   withCredentials: true,
    // })
    // 쿠키로 전달하는 경우..

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
    }
    eventSource.onerror = () => {
      showToast('SSE 연결 오류', 'error')
    }

    return () => {
      eventSource.close()
    }
  }, [accessToken])
}
