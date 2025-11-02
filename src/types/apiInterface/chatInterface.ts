// Chat_02 채팅방 목록 조회
export interface ChatType {
  status: string
  code: string
  message: string
  data: {
    messages: Chat[]
    pagination: {
      page: number
      page_size: number
      total_count: number
    }
  } | null
}

export interface Chat {
  id: number
  sender_id: number
  sender_nickname: string
  study_group_id: number
  content: string
  file_url: null
  is_read: boolean
  created_at: string
}

// Chat_03 메시지 내역 조회
export interface ChatSearchParameter {
  study_group_id: number
  keyword: string
  page?: number
  size?: number
}

export interface ChatSearchResponse {
  status: 'success' | 'error'
  code: 'SUCCESS' | 'NOT_FOUND'
  message: string
  data: {
    messages: Chat[]
    total_count: number
  } | null
}
