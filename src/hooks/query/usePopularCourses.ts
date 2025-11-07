import { useSimpleQuery } from '../../api/Helper/useSimpleQuery'
import { api } from '../../api/client'

type Lecture = {
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

  const sorted = [...lectures]
    .sort((a, b) => b.average_rating - a.average_rating)
    .slice(0, 3)

  return sorted
}

export const usePopularCourses = () =>
  useSimpleQuery(['popularCourses'], fetchPopularCourses, {})
