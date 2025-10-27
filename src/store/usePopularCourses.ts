import { useQuery } from '@tanstack/react-query'
import { CoursesData } from '../components/mainpage/CoursesData.ts'
// import { api } from '../api/client' // 백엔드 완성 시 주석 해제

// 실제 API 완성되면 아래 함수로 교체
// const fetchPopularLectures = async () => {
//   const { data } = await api.get('/api/v1/lectures', {
//     params: { ordering: 'rating' },
//   })
//   return data.results.slice(0, 3)
// }

// 지금은 mock 데이터 사용
const fetchPopularLecturesMock = async () => {
  await new Promise((r) => setTimeout(r, 300)) // 로딩 확인용
  return CoursesData.map((course, i) => ({
    uuid: i.toString(),
    title: course.title,
    instructor_name: course.description,
    price: course.date,
    thumbnail_url: course.imageUrl,
  }))
}

export const usePopularLectures = () => {
  return useQuery({
    queryKey: ['popularLectures'],
    queryFn: fetchPopularLecturesMock,
  })
}
