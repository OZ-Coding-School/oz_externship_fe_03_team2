import { create } from 'zustand'

interface StoreType {
  studyGroupId: number | null
  setStudyGroupId: (studyGroupId: number | null) => void
  studyGroupUuid: string | null
  setStudyGroupUuid: (studyGroupUuid: string | null) => void
}

export const useStudyGroupId = create<StoreType>((set) => ({
  studyGroupId: null,
  setStudyGroupId: (id) => set({ studyGroupId: id }),
  studyGroupUuid: null,
  setStudyGroupUuid: (uuid) => set({ studyGroupUuid: uuid }),
}))
