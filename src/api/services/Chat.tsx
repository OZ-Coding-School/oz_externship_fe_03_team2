import { useSimpleQuery } from '../Helper/useSimpleQuery'
import { type ChatType } from '../../types/apiInterface/chatInterface'
import { api } from '../client'

// 채팅방 목록 불러오기
export const useChatRooms = () => {
  return useSimpleQuery<ChatType>(['chatRooms'], () =>
    api.get<ChatType>('/v1/chat/rooms', {
      params: { page_size: 100 },
    })
  )
}

// 메시지 검색
export const useChatSearch = () => {
  return useSimpleQuery
}
