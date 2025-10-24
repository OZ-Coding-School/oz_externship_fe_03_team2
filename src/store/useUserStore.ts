import { create } from 'zustand'

interface UserType {
  id: number
  email: string
  userName: string
  profileImage: string
  createdAt: string
  lastLogin: string
}

interface UserStoreType {
  user: UserType | null
  setUser: (user: UserType) => void
  getUser: () => Promise<void>
  clearUser: () => void
}

export const useUserStore = create<UserStoreType>((set) => ({
  // user: null,
  user: {
    id: 1001,
    email: 'user@example.com',
    userName: '홍길동',
    profileImage: 'https://example.com/profile/1001.jpg',
    createdAt: '2025-10-10T10:30:00Z',
    lastLogin: '2025-10-10T10:30:00Z',
  },

  setUser: (user) => set({ user }),
  getUser: async () => {
    try {
      // TanStack Query 로그인 함수 호출 => 추후에 탠스택 쓰면 구체적으로 수정
      // const response = await fetchUserProfile()
      // set({user: response.data})
    } catch (error) {
      console.error(error)
      set({ user: null })
    }
  },
  clearUser: () => set({ user: null }),
}))
