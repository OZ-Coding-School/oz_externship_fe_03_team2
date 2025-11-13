import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type { BookmarksStudyResponse } from '../../../types/apiInterface/mypageInterface'

// 북마크한 공고 목록 조회 (GET)
export const useGetStudyJobBookmarks = (page?: number, enabled = true) => {
  return useSimpleQuery<BookmarksStudyResponse>(
    ['/v1/recruitments/bookmarks', page], // 캐시 키에 page 파라미터 포함
    async () => {
      const isError = false // 에러테스트 플래그

      if (isError) throw new Error('북마크한 공고를 불러오는데 실패했습니다')

      return api.get<BookmarksStudyResponse>('/v1/recruitments/bookmarks', {
        params: {
          ...(page !== undefined && page !== null && { page }), // page가 있을 때만 포함
        },
      })
    },
    { enabled }
  )
}
