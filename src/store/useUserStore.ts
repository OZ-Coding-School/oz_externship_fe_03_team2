import { create } from 'zustand'

export interface UserType {
  // 로그인 시 필수 필드
  id: number
  email: string
  nickname: string

  // /v1/users/me에서 추가로 오는 필드 (옵셔널)
  name?: string
  phone_number?: string
  birthday?: string
  profile_image_url?: string
  created_at?: string
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
    nickname: '김개발',
  },

  setUser: (user) => set({ user }),
  getUser: async () => {
    try {
      // TanStack Query 로그인 함수 호출 => 추후에 탠스택 쓰면 구체적으로 수정
      // const response = await fetchUserProfile()
      // set({user: response.data})
    } catch {
      set({ user: null })
    }
  },
  clearUser: () => set({ user: null }),
}))
