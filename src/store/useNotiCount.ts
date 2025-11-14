import { create } from 'zustand'
import type { NotiItem } from '../types/apiInterface/NotiInterface'

interface NotiCountType {
  unreadCount: number
  setUnreadCount: (unreadCount: number) => void
}

export const useNotiCount = create<NotiCountType>((set) => ({
  unreadCount: 0,
  setUnreadCount: (unreadCount) => set({ unreadCount }),
  fetchNotiCount: async (data: NotiItem[]) => {},
}))
