export type Course = {
  title: string
  description: string
  date: string
  imageUrl: string
}

// API 연결 전 임시 더미 데이터
export const CoursesData: Course[] = [
  {
    title: 'React 완전 마스터 강의',
    description: '김개발',
    date: '₩59,000원',
    imageUrl:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Python 데이터 사이언스',
    description: '이분석',
    date: '₩99,000원',
    imageUrl:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'AWS 클라우드 아키텍처',
    description: '한클라우드',
    date: '₩129,000원',
    imageUrl:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
  },
]
