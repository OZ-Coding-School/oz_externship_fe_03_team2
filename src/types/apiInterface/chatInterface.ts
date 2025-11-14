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

// export interface WebSocketResponse {
//   type: 'chat.message' | 'system_message' | 'force_disconnect' | 'error'
//   id?: number
//   sender?: {
//     id: number
//     nickname: string
//   }
//   content?: string
//   created_at?: string
//   code?: string
//   message?: string
// }

// // 채팅방 목록 API - 채팅방 데이터
// export interface ChatRoomData {
//   uuid: string
//   name: string
//   created_at: string
//   updated_at: string
//   last_message: {
//     id: number
//     content: string
//     sender_nickname: string
//     created_at: string
//   } | null
//   unread_message_count: number
// }

// // 채팅방 목록 API - 응답
// export interface ChatRoomResponse {
//   data: ChatRoomData[]
// }

// // 메시지 데이터 (공통)
// export interface ChatMessageData {
//   id: number
//   type?: 'chat.message' | 'system_message' | 'force_disconnect'
//   sender: {
//     id: number
//     nickname: string
//   }
//   content: string
//   is_read: boolean
//   created_at: string
// }

// // 메시지 목록 조회 API - 응답
// export interface ChatMessagesResponse {
//   status: string
//   code: string
//   message: string
//   data: {
//     messages: ChatMessageData[]
//     pagination: {
//       page: number
//       page_size: number
//       total_count: number
//     }
//   }
// }

// // 웹소켓 요청
// export interface WebSocketRequest {
//   type: 'chat.message'
//   content: string
// }

// // 웹소켓 응답
// export interface WebSocketResponse {
//   type: 'chat.message' | 'system_message' | 'force_disconnect' | 'error'
//   id?: number
//   sender?: {
//     id: number
//     nickname: string
//   }
//   content?: string
//   created_at?: string
//   code?: string
//   message?: string
// }

// // // 채팅방 목록 API - 채팅방 목록 데이터
// // export interface ChatRoomData {
// //   uuid: string
// //   name: string
// //   last_message: {
// //     id: number
// //     content: string
// //     sender_nickname: string
// //     created_at: string
// //   }
// //   unread_message_count: number
// // }

// // // 채팅방 목록 API - 응답
// // export interface ChatRoom {
// //   status: string
// //   code: string
// //   message: string
// //   data: ChatRoomData[]
// // }

// // // 안 읽은 메시지 수 API - 응답
// // export interface UnreadMessage {
// //   status: string
// //   code: string
// //   message: string
// //   data: {
// //     total_unread_count: number
// //   }
// // }

// // // 메시지 목록 조회 API - 메시지 목록 데이터
// // export interface ChatMessageData {
// //   type?: 'chat.message' | 'error' | 'force_disconnect' | 'system_message'
// //   id: number
// //   sender: {
// //     id: number
// //     nickname: string
// //   }
// //   content: string
// //   is_read?: boolean
// //   created_at: string
// // }

// // // 메시지 목록 조회 API - 응답
// // export interface ChatMessage {
// //   status: string
// //   code: string
// //   message: string
// //   data: {
// //     messages: ChatMessageData[]
// //     pagination: {
// //       page: number
// //       page_size: number
// //       total_count: number
// //     }
// //   }
// // }

// // // 웹소켓 요청
// // export interface WebSocketRequest {
// //   type: string
// //   content: string
// // }

// // // 웹소켓 응답
// // export interface WebSocketResponse {
// //   type: 'chat.message' | 'error' | 'force_disconnect' | 'system_message'
// //   id?: number
// //   sender?: {
// //     id: number
// //     nickname: string
// //   }
// //   content?: string
// //   created_at?: string
// //   code?: string
// //   message?: string
// // }

// // 정상 응답일 경우 type과 data만,
// // 에러 응답일 경우 type과 code, message만 옴.

// // // 채팅방 목록 (배열)
// // export interface ChatRoom {
// //   uuid: string
// //   name: string
// //   last_message: {
// //     id: number
// //     content: string
// //     sender_nickname: string
// //     created_at: string
// //   } | null
// //   unread_message_count: number
// // }

// // // 채팅 내역 하나
// // export interface ChatMessage {
// //   id: number
// //   study_group_uuid: string
// //   sender: {
// //     id: number
// //     nickname: string
// //   }
// //   content: string
// //   created_at: string
// //   type?: 'chat.message' | 'error' | 'force_disconnect' | 'system_message'
// // }

// // // 웹소켓 바디
// // export interface WebSocketRequest {
// //   type: string
// //   content: string
// // }

// // // 웹소켓 response
// // export interface WebSocketResponse {
// //   type: 'chat.message' | 'error' | 'force_disconnect' | 'system_message'
// //   data?: ChatMessage
// //   code?: string
// //   message?: string
// // }
