import { create } from 'zustand'
import type { NotificationResponse } from '../types/apiInterface/NotiInterface'

interface HeaderNotiType {
  notReadData: NotificationResponse | null
  setNotReadData: (data: NotificationResponse | null) => void
  readData: NotificationResponse | null
  setReadData: (data: NotificationResponse | null) => void
}

export const useHeaderNoti = create<HeaderNotiType>((set) => ({
  notReadData: null,
  setNotReadData: (notReadData) => set({ notReadData }),
  readData: null,
  setReadData: (readData) => set({ readData }),
}))
