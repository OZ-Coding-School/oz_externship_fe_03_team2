// 채팅방 목록 (배열)
export interface ChatRoom {
  uuid: string
  name: string
  last_message: {
    id: number
    content: string
    sender_nickname: string
    created_at: string
  }
  unread_message_count: number
}

// 채팅 내역 하나
export interface ChatMessage {
  id: number
  study_group_uuid: string
  sender: {
    id: number
    nickname: string
  }
  content: string
  created_at: string
}

// 웹소켓 바디
export interface WebSocketRequest {
  type: string
  content: string
}

// 웹소켓 response
export interface WebSocketResponse {
  type: 'chat.message' | 'error' | 'force_disconnect'
  data?: ChatMessage
  code?: string
  message?: string
}
