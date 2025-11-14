import { create } from 'zustand'
import type { User } from '../types/apiInterface/chatInterface'

interface WebSocketType {
  isError: boolean
  setIsError: (isError: boolean) => void

  error: string
  setError: (error: string) => void

  onlineUsers: User[]
  setOnlineUsers: (users: User[]) => void

  onlineCount: number
  setOnlineCount: (count: number) => void

  prevOnlineUsers: User[]
  setPrevOnlineUsers: (users: User[]) => void

  sendMessage: ((content: string) => boolean) | null
  setSendMessage: (fn: (content: string) => boolean) => void

  reset: () => void
}

export const useWebSocketStore = create<WebSocketType>((set) => ({
  isError: false,
  setIsError: (isError) => set({ isError }),

  error: '',
  setError: (error) => set({ error }),

  onlineUsers: [],
  setOnlineUsers: (onlineUsers) => set({ onlineUsers }),

  onlineCount: 0,
  setOnlineCount: (onlineCount) => set({ onlineCount }),

  prevOnlineUsers: [],
  setPrevOnlineUsers: (prevOnlineUsers) => set({ prevOnlineUsers }),

  sendMessage: null,
  setSendMessage: (sendMessage) => set({ sendMessage }),

  reset: () =>
    set({
      isError: false,
      error: '',
      onlineUsers: [],
      onlineCount: 0,
      prevOnlineUsers: [],
      sendMessage: null,
    }),
}))
