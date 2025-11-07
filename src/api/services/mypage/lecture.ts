import { api } from '../../client'
import { useSimpleQuery } from '../../Helper/useSimpleQuery'
import type { LectureBookmarksResponse } from '../../../types/apiInterface/mypageInterface'
import { useSimpleMutation } from '../../Helper/useSimpleMutation'

// 북마크 강의 조회 (GET)
export const useGetLectureBookmarks = (
  page?: number,
  page_size?: number,
  enabled = true
) => {
  return useSimpleQuery<LectureBookmarksResponse>(
    ['/v1/lectures/bookmarks', page, page_size], // 캐시 키에 파라미터 포함
    async () => {
      const isError = false // 테스트 플래그, true일 때만 에러 발생

      if (isError) throw new Error('북마크한 강의를 불러오는데 실패했습니다')

      return api.get<LectureBookmarksResponse>('/v1/lectures/bookmarks', {
        params: {
          ...(page !== null && { page }),
          ...(page_size !== null && { page_size }),
        },
      })
    },
    { enabled }
  )
}

// 북마크 강의 삭제 (DELETE)
export const useRemoveLectureBookmark = () => {
  return useSimpleMutation<
    void,
    Error,
    string // lecture_uuid를 파라미터로 받음
  >(
    async (lectureUuid: string) => {
      await api.delete<void>(`/v1/lectures/bookmarks/${lectureUuid}`)
    },
    {
      invalidateKeys: ['/v1/lectures/bookmarks'], // 북마크 리스트 캐시 무효화
    }
  )
}
