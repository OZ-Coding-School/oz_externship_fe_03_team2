// 채팅방목록 응답 (이거 배열 형태)
export interface ChatRoomData {
  created_at: string
  last_message: {
    id: number
    content: string
    sender_nickname: string
    created_at: string
  }
  name: string
  unread_message_count: number
  updated_at: string
  uuid: string
}

// 채팅내역 하나
export interface ChatMessageData {
  content: string
  created_at: string
  id: number
  sender: {
    id: number
    nickname: string
  }
  study_group_uuid: string
  type?: 'chat.message' | 'system_message' | 'force_disconnect'
}

// 메시지 목록 API 응답
export interface ChatMessagesResponse {
  count: number
  next: string | null
  previous: string | null
  results: ChatMessageData[]
}

// 실시간 응답 - 유저 정보
export interface User {
  id: number | string
  nickname: string
  name: string
}

// 실시간 응답
export interface OnlineResponse {
  type: 'online.users'
  count: number
  users: User[]
}

// 안 읽은 메시지 수 API - 응답
export interface UnreadMessageResponse {
  status: string
  code: string
  message: string
  data: {
    total_unread_count: number
  }
}

export type WebSocketResponse =
  | {
      type: 'chat.message'
      id: number
      sender: {
        id: number
        nickname: string
      }
      content: string
      created_at: string
      study_group_uuid: string
    }
  | {
      type: 'system_message'
      message: string
    }
  | {
      type: 'online.users'
      count: number
      users: User[]
    }
  | {
      type: 'error'
      code?: string
      message?: string
    }
  | {
      type: 'force_disconnect'
      message?: string
    }
