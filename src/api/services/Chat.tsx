import { useSimpleQuery } from '../Helper/useSimpleQuery'
import {
  type ChatMessageData,
  type ChatMessagesResponse,
  type ChatRoomData,
} from '../../types/apiInterface/chatInterface'
import { api } from '../client'
import type { SimpleError } from '../../types/apiInterface/findInterface'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useStudyGroupId } from '../../store/useStudyGroupId'

// 채팅방 목록 불러오기
export const useChatRooms = () => {
  const { studyGroupUuid } = useStudyGroupId()
  return useSimpleQuery<ChatRoomData[], SimpleError>(
    ['chatRooms'],
    () => api.get('/v1/chat/chatrooms'),
    {
      refetchInterval: studyGroupUuid ? false : 10000,
      // 일정 시간마다 스스로 refetch 시키는 아이.. 폴링 을 위해서..
      // studyGroupUuid가 있을 때 = 그룹채팅 안에 들어와 있을 떄는 웹소켓으로 가져오니까 꺼두고
      // 채팅방 목록에 있거나 채팅보드 꺼놨을 때는 10초마다 리페치
      refetchIntervalInBackground: false,
      // 백그라운드에 있을 때는 리패치 안 함
      refetchOnWindowFocus: true,
      // 다시 포커스하면 즉시 리패치함
      select: (data) => {
        if (!studyGroupUuid) return data

        return data.map((room) => {
          if (room.uuid === studyGroupUuid) {
            return {
              ...room,
              unread_message_count: 0,
            }
          }
          return room
        })
      },
    }
  )
}

// 채팅 메시지 무한 스크롤
export const useChatMessages = (uuid: string | null) => {
  return useInfiniteQuery<ChatMessageData[], SimpleError>({
    queryKey: ['chatMessages', uuid],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<ChatMessagesResponse>(
        `/v1/chat/chatrooms/${uuid}/messages`,
        {
          params: {
            page: pageParam,
            page_size: pageParam === 1 ? 300 : 100,
          },
        }
      )
      return response.results.map((msg) => ({
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
