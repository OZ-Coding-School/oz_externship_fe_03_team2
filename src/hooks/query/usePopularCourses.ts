import { useSimpleQuery } from '../../api/Helper/useSimpleQuery'
import { api } from '../../api/client'
import type { Lecture } from '../../types/apiInterface/.ts'

const fetchPopularCourses = async (): Promise<Lecture[]> => {
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
