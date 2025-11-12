// 채팅방 목록 API - 채팅방 목록 데이터
export interface ChatRoomData {
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

// 채팅방 목록 API - 응답
export interface ChatRoom {
  status: string
  code: string
  message: string
  data: ChatRoomData[]
}

// 안 읽은 메시지 수 API - 응답
export interface UnreadMessage {
  status: string
  code: string
  message: string
  data: {
    total_unread_count: number
  }
}

// 메시지 목록 조회 API - 메시지 목록 데이터
export interface ChatMessageData {
  type?: 'chat.message' | 'error' | 'force_disconnect' | 'system_message'
  id: number
  sender: {
    id: number
    nickname: string
  }
  content: string
  is_read?: boolean
  created_at: string
}

// 메시지 목록 조회 API - 응답
export interface ChatMessage {
  status: string
  code: string
  message: string
  data: {
    messages: ChatMessageData[]
    pagination: {
      page: number
      page_size: number
      total_count: number
    }
  }
}

// 웹소켓 요청
export interface WebSocketRequest {
  type: string
  content: string
}

// 웹소켓 응답
export interface WebSocketResponse {
  type: 'chat.message' | 'error' | 'force_disconnect' | 'system_message'
  id?: number
  sender?: {
    id: number
    nickname: string
  }
  content?: string
  created_at?: string
  code?: string
  message?: string
}

// 정상 응답일 경우 type과 data만,
// 에러 응답일 경우 type과 code, message만 옴.

// // 채팅방 목록 (배열)
// export interface ChatRoom {
//   uuid: string
//   name: string
//   last_message: {
//     id: number
//     content: string
//     sender_nickname: string
//     created_at: string
//   } | null
//   unread_message_count: number
// }

// // 채팅 내역 하나
// export interface ChatMessage {
//   id: number
//   study_group_uuid: string
//   sender: {
//     id: number
//     nickname: string
//   }
//   content: string
//   created_at: string
//   type?: 'chat.message' | 'error' | 'force_disconnect' | 'system_message'
// }

// // 웹소켓 바디
// export interface WebSocketRequest {
//   type: string
//   content: string
// }

// // 웹소켓 response
// export interface WebSocketResponse {
//   type: 'chat.message' | 'error' | 'force_disconnect' | 'system_message'
//   data?: ChatMessage
//   code?: string
//   message?: string
// }
