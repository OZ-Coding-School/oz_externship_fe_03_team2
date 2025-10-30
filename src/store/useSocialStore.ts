import { create } from 'zustand'

interface StateType {
  socialState: string | null
  setSocialState: (state: string) => void
  clearState: () => void
}

export const useSocialState = create<StateType>((set) => ({
  socialState: null,
  setSocialState: (newState) => set({ socialState: newState }),
  clearState: () => set({ socialState: null }),
}))
