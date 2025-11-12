import { usePopularCourses } from '../../hooks/query/usePopularCourses'
import PopularCoursesCard from './PopularCoursesCard'

function PopularCoursesSection({
  navigate,
}: {
  navigate: (path: string) => void
}) {
  const { data: courses = [], isLoading } = usePopularCourses()

  if (isLoading) {
    return (
      <p className="py-8 text-center text-gray-500">인기 강의 불러오는 중...</p>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 sm:gap-10">
      {courses.map((course) => (
        <PopularCoursesCard
          key={course.uuid}
          course={course}
          onClick={() => navigate(course.url_link)}
        />
      ))}
    </div>
  )
}

export default PopularCoursesSection
