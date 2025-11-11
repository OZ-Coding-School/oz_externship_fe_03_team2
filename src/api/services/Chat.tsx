import { useSimpleQuery } from '../Helper/useSimpleQuery'
import {
  type UnreadMessage,
  type ChatMessage,
  type ChatMessageData,
  type ChatRoom,
} from '../../types/apiInterface/chatInterface'
import { api } from '../client'
import type { SimpleError } from '../../types/apiInterface/findInterface'
import { useInfiniteQuery } from '@tanstack/react-query'

// 채팅방 목록 불러오기
export const useChatRooms = () => {
  return useSimpleQuery<ChatRoom, SimpleError>(['chatRooms'], () =>
    api.get('/v1/chat/chatrooms')
  )
}

// 안 읽은 메시지 수 불러오기
export const useUnreadMessages = () => {
  return useSimpleQuery<UnreadMessage, SimpleError>(['unread'], () =>
    api.get(`/v1/chat/total-unread-messages`)
  )
}

// 채팅 메시지 무한 스크롤
export const useChatMessages = (uuid: string | null) => {
  return useInfiniteQuery<ChatMessageData[], SimpleError>({
    queryKey: ['chatMessages', uuid],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<ChatMessage>(
        `/v1/chat/chatrooms/${uuid}/messages`,
        {
          params: {
            page: pageParam,
            page_size: pageParam === 1 ? 300 : 100,
            // 처음 가져올 때는 300개 가져오고 이후에 스크롤 할 때 100개씩 가져옴.
          },
        }
      )
      return response.data.messages.reverse().map((msg) => ({
        ...msg,
        type: 'chat.message' as const,
      }))
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
    select: (data) => {
      return {
        ...data,
        pages: [...data.pages].reverse(),
      }
    },
  })
}

// API 응답
// 페이지 1: ChatMessage[] (300개)
// 페이지 2: ChatMessage[] (100개)
// 페이지 3: ChatMessage[] (100개)

// useInfiniteQuery가 저장하는 형태
// data = {
//   pages: [
//     [메시지500, 메시지499, ..., 메시지201 까지 총 300개],  // 페이지 1. 데이터를 최신순으로 준댔으니
//     [메시지200, ...메시지101 까지 총 100개],          // 페이지 2
//     [메시지100, ...메시지1까지 총 100개],          // 페이지 3
//   ],
//   pageParams: [1, 2, 3]
// }

// 합치면
// const messages = data.pages.flatMap(page => page)
// 펼치고 모은 걸 그대로 다사ㅣ 반환
// [메시지1, 메시지2, ...500개]  // 모든 페이지 한번에
// messages.map(...)
