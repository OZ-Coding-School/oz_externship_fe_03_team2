import { useQuery } from '@tanstack/react-query'
import { api } from '../../api/client'
import type { GetPopularCoursesResponse } from '../../mocks/handlers'
import type { AxiosResponse } from 'axios'

const fetchPopularCourses = async (): Promise<
  GetPopularCoursesResponse['results']
> => {
  const response: AxiosResponse<GetPopularCoursesResponse> = await api.get(
    '/v1/lectures',
    { params: { ordering: 'rating' } }
  )

  return response.data.results.slice(0, 3)
}

export const usePopularCourses = () => {
  return useQuery({
    queryKey: ['popularCourses'],
    queryFn: fetchPopularCourses,
  })
}
