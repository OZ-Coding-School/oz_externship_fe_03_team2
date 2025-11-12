import { useSimpleQuery } from '../../api/Helper/useSimpleQuery'
import { api } from '../../api/client'
import type { Lecture } from '../../types/apiInterface/mainpageInterface'

const fetchPopularCourses = async (): Promise<Lecture[]> => {
  const isError = true // 테스트 플래그, true로 변경하면 에러 발생

  if (isError) throw new Error('인기 강의를 불러오는데 실패했습니다')

  const response = await api.get<{
    count: number
    next: string | null
    previous: string | null
    results: Lecture[]
  }>('/v1/lectures')

  const lectures = response.results ?? []

  const sortedLectures = [...lectures]
    .sort(
      (prevLecture, nextLecture) =>
        nextLecture.average_rating - prevLecture.average_rating
    )
    .slice(0, 3)

  return sortedLectures
}

export const usePopularCourses = () =>
  useSimpleQuery(['popularCourses'], fetchPopularCourses, {})
