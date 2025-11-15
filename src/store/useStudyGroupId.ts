import { create } from 'zustand'

interface StoreType {
  studyGroupUuid: string | null
  setStudyGroupUuid: (studyGroupUuid: string | null) => void
}

export const useStudyGroupId = create<StoreType>((set) => ({
  studyGroupUuid: null,
  setStudyGroupUuid: (uuid) => set({ studyGroupUuid: uuid }),
}))
