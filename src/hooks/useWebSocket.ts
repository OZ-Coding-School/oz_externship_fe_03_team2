interface MessageType {
  id: number
  sender_id: number
  sender_nickname: string
  study_group_id: number
  content: string
  file_url: string | null
  is_read: true
  created_at: string
}

interface MessageResponseType {
  status: string
  code: string
  message: string
  data: {
    messages: MessageType
    pagination: {
      page: number
      page_size: number
      total_count: number
    }
  }
}

interface WebSocketDataType {
  message_id: number
  sender_id: number
  study_group_id: number
  content: string
  created_at: string
}

interface WebSocketResponseType {
  type: string
  data?: WebSocketDataType
  code?: string
  // 응답 실패 시 data 대신에 code가 옴
  message?: string
}
