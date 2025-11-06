import { useSimpleQuery } from '../Helper/useSimpleQuery'
import {
  type ChatMessage,
  type ChatRoom,
} from '../../types/apiInterface/chatInterface'
import { api } from '../client'
import type { SimpleError } from '../../types/apiInterface/findInterface'
import { useInfiniteQuery } from '@tanstack/react-query'

// 채팅방 목록 불러오기
export const useChatRooms = () => {
  return useSimpleQuery<ChatRoom[], SimpleError>(['chatRooms'], () =>
    api.get('/v1/chat/chatrooms')
  )
}

// 메시지 목록 조회
export const useChatDetail = (study_group_uuid: number) => {
  return useSimpleQuery(
    ['chatRooms', study_group_uuid],
    () => api.get(`/v1/chat/chatrooms/${study_group_uuid}/messages`),
    {
      enabled: !!study_group_uuid,
    }
  )
}

// 채팅 메시지 무한 스크롤
export const useChatMessages = (uuid: string) => {
  return useInfiniteQuery<ChatMessage[], SimpleError>({
    queryKey: ['chatMessages', uuid],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<ChatMessage[]>(
        `/v1/chat/chatrooms/${uuid}/messages`,
        {
          params: {
            page: pageParam,
            page_size: pageParam === 1 ? 300 : 100,
            // 처음 가져올 때는 300개 가져오고 이후에 스크롤 할 때 100개씩 가져옴.
          },
        }
      )
      return response
    },
    getNextPageParam: (lastPage, allPages) => {
      // useInfiniteQuery의 getNextPageParam은 더이상 페이지가 없을 때는 undefined를 반환하게 하고, 페이지가 더 있으면 그 숫자를 반환하는 게 표준 패턴이라고 함..
      if (!lastPage || lastPage.length === 0) return undefined
      // 마지막 페이지에 메시지가 없으면 다음페이지넘기기 없음

      if (allPages.length === 1 && lastPage.length < 300) return undefined
      // 페이지가 총 1장이고 300개보다 적으면 다음페이지넘기기 없음

      if (allPages.length > 1 && lastPage.length < 100) return undefined

      return allPages.length + 1
      // 다음 페이지 번호 반환
    },
    initialPageParam: 1,
    enabled: !!uuid,
  })
}
