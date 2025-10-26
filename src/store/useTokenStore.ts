import { create } from 'zustand'

interface TokenType {
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  clearAccessToken: () => void
}

export const useToken = create<TokenType>((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
}))
