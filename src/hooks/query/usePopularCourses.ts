import { useSimpleQuery } from '../../api/Helper/useSimpleQuery'
import { api } from '../../api/client'

export interface Lecture {
  id: number
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: { id: number; name: string }[]
  difficulty: string
  original_price: number
  discount_price: number
  platform: string
  average_rating: number
  duration: number
  url_link: string
  is_bookmarked: boolean
}

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
