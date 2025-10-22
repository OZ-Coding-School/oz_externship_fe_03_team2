import { useState } from 'react'
import { Search } from 'lucide-react'
import BookmarkCard from './BookmarkCard'
import useDebounce from '../../hooks/useDebounce'
import { toast } from 'sonner'
import Toast from '../common/toast/Toast'

const COURSES_DATA = [
  {
    type: 'course' as const,
    id: 1,
    title: 'React 완벽 마스터 강의 - 기초부터 고급까지',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    instructor: '김개발',
    platform: 'Inflearn',
    duration: '12:30',
    level: '초급',
    price: 59000,
    originalPrice: 89000,
    tags: ['React', '프론트엔드', 'JavaScript'],
  },
  {
    type: 'course' as const,
    id: 2,
    title: 'Node.js 백엔드 개발 완주 - 실무 프로젝트까지',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    instructor: '박서버',
    platform: 'Udemy',
    duration: '18:45',
    level: '중급',
    price: 79000,
    originalPrice: 120000,
  },
  {
    type: 'course' as const,
    id: 3,
    title: 'Python 데이터 사이언스 마스터클래스',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    instructor: '이데이터',
    platform: 'Inflearn',
    duration: '25:15',
    level: '고급',
    price: 99000,
    originalPrice: 150000,
  },
  {
    type: 'course' as const,
    id: 4,
    title: 'JavaScript ES6+ 완벽 가이드 - 모던 자바스크립트',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
    instructor: '최자바',
    platform: 'Udemy',
    duration: '15:20',
    level: '초급',
    price: 49000,
    originalPrice: 75000,
  },
]

function CourseContents() {
  const [courses, setCourses] = useState(COURSES_DATA)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery)

  const handleBookmarkToggle = (courseId: number) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    )
    toast.custom((t) => (
      <Toast
        id={t}
        title="북마크 삭제"
        message="북마크가 삭제되었습니다"
        type="success"
      />
    ))
  }

  const handleViewClick = (courseId: number) => {
    toast.custom((t) => (
      <Toast
        id={t}
        title="강의보기 클릭"
        message={`강의 id: ${courseId}`}
        type="success"
      />
    ))
  }

  const filterCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      course.instructor
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen rounded-xl border border-gray-200 bg-white p-8">
      <div className="mx-auto max-w-5xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              북마크한 강의
            </h1>
            <p className="text-gray-600">
              나중에 수강할 강의들을 모아두었습니다
            </p>
          </div>
          {/* 검색창 */}
          <div className="w-80 flex-none">
            <div className="relative">
              <input
                type="text"
                placeholder="강의명이나 강사명으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="focus:border-primary-600 w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 text-sm focus:outline-none"
              />
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 북마크 리스트 */}
        <div className="space-y-4">
          {filterCourses.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              {searchQuery
                ? '검색 결과가 없습니다'
                : '북마크한 강의가 없습니다'}
            </div>
          ) : (
            filterCourses.map((course) => (
              <BookmarkCard
                key={course.id}
                data={course}
                onBookmarkToggle={handleBookmarkToggle}
                onViewClick={handleViewClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseContents
