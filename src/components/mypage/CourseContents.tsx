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
    lecture_info: {
      uuid: 'uuid-001',
      title: 'React 완벽 마스터 강의 - 기초부터 고급까지',
      instructor: '김개발',
      thumbnail_img_url:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      platform: 'Inflearn',
      description: 'React의 기초부터 고급 기술까지 완벽하게 마스터하는 강의',
      difficulty: 'BEGINNER' as const, // BEGINNER, NORMAL, ADVANCED
      duration: '12:30',
      original_price: 89000,
      discount_price: 59000,
      average_rating: 4.8,
      url_link: 'https://inflearn.com/course/react-perfect',
    },
    created_at: '2025-10-01T12:00:00Z',
  },
  {
    type: 'course' as const,
    id: 2,
    lecture_info: {
      uuid: 'uuid-002',
      title: 'Node.js 백엔드 개발 완주 - 실무 프로젝트까지',
      instructor: '박서버',
      thumbnail_img_url:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      platform: 'Udemy',
      description: 'Node.js를 활용한 백엔드 개발 실무 프로젝트',
      difficulty: 'NORMAL' as const,
      duration: '18:45',
      original_price: 120000,
      discount_price: 79000,
      average_rating: 4.5,
      url_link: 'https://udemy.com/course/nodejs-backend',
    },
    created_at: '2025-10-02T14:30:00Z',
  },
  {
    type: 'course' as const,
    id: 3,
    lecture_info: {
      uuid: 'uuid-003',
      title: 'Python 데이터 사이언스 마스터클래스',
      instructor: '이데이터',
      thumbnail_img_url:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      platform: 'Inflearn',
      description: 'Python을 활용한 데이터 분석 및 머신러닝 실무',
      difficulty: 'ADVANCED' as const,
      duration: '25:15',
      original_price: 150000,
      discount_price: 99000,
      average_rating: 4.9,
      url_link: 'https://inflearn.com/course/python-data-science',
    },
    created_at: '2025-10-03T09:15:00Z',
  },
  {
    type: 'course' as const,
    id: 4,
    lecture_info: {
      uuid: 'uuid-004',
      title: 'JavaScript ES6+ 완벽 가이드 - 모던 자바스크립트',
      instructor: '최자바',
      thumbnail_img_url:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      platform: 'Udemy',
      description: 'ES6+의 모든 기능을 활용한 모던 JavaScript 완벽 가이드',
      difficulty: 'BEGINNER' as const,
      duration: '15:20',
      original_price: 75000,
      discount_price: 49000,
      average_rating: 4.7,
      url_link: 'https://udemy.com/course/javascript-es6',
    },
    created_at: '2025-10-04T16:45:00Z',
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
      course.lecture_info.title
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase()) ||
      course.lecture_info.instructor
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
