import { useSimpleQuery } from '../Helper/useSimpleQuery'
import {
  type ChatSearchParameter,
  type ChatSearchResponse,
  type ChatType,
} from '../../types/apiInterface/chatInterface'
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
export const useChatSearch = ({
  study_group_id,
  keyword,
  page = 1,
  size = 20,
}: ChatSearchParameter) => {
  return useSimpleQuery<ChatSearchResponse>(
    ['chatSearch', study_group_id, keyword, page, size],
    () =>
      api.get(`/v1/study_group/${study_group_id}/messages`, {
        params: { keyword, page, size },
      }),
    { enabled: !!keyword && !!study_group_id }
  )
}
//const { data } = useChatSearch(100, '안녕')

// const { data } = useChatSearch({
//   study_group_id: 100,
//   keyword: '안녕',
//   page: 1,
//   size: 20,
// })
