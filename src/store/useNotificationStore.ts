import { create } from 'zustand'

interface MessageType {
  id: number
  chatRoomId: number
  userId: number
  userName: string
  content: string
  createdAt: string
  isRead: boolean
}

interface MessageDataType {
  success: boolean
  data: MessageType[]
  count: number
}

interface MessageStateType {
  notiMessage: MessageDataType
  setNotiMessage: (message: MessageDataType) => void
}

export const useNotificationStore = create<MessageStateType>((set) => ({
  notiMessage: {
    // success: true,
    // data: [],
    // count: 0,
    success: true,
    data: [
      {
        id: 1,
        chatRoomId: 101,
        userId: 1001,
        userName: '홍길동',
        content: '안녕하세요!',
        createdAt: '2025-10-20T10:30:00Z',
        isRead: false,
      },
      {
        id: 2,
        chatRoomId: 102,
        userId: 1002,
        userName: '카리나',
        content: '회의 시간 변경됐습니다',
        createdAt: '2025-10-20T11:15:00Z',
        isRead: false,
      },
      {
        id: 3,
        chatRoomId: 101,
        userId: 1003,
        userName: '장원영',
        content: '확인했습니다',
        createdAt: '2025-10-20T12:00:00Z',
        isRead: false,
      },
    ],
    count: 3,
  },
  setNotiMessage: (notiMessage) => set({ notiMessage }),
}))
