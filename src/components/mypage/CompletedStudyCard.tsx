import { Calendar, Users, Edit, Clock } from 'lucide-react'
import Badge from '../common/Badge'
import Button from '../common/Button'
import {
  calculateDurationFormat,
  yearMonthFormat,
} from '../../utils/dateFormat'
import { type Lecture } from '../../types/apiInterface/mypageInterface'
import StarRating from '../common/StarRating'

export interface StudyGroup {
  id: number
  name: string
  current_headcount: number
  max_headcount: number
  is_leader: boolean
  profile_img_url: string
  start_at: string
  end_at: string
  status: string
  lectures: Lecture[]
  review_count: number
  star_rating_average: number
  is_reviewed: boolean
}

interface CompletedStudyCardProps {
  study: StudyGroup
}

export default function CompletedStudyCard({ study }: CompletedStudyCardProps) {
  return (
    <div className="flex max-w-95.5 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md">
      <div className="h-54 w-full overflow-hidden bg-gray-100">
        {study.profile_img_url ? (
          <img
            src={study.profile_img_url}
            alt={study.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
            Image
          </div>
        )}
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex flex-1 flex-col p-5">
        {/* 헤더 */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900">{study.name}</h3>
          {study.is_leader && (
            <Badge variant="primary" size="page">
              리더
            </Badge>
          )}
        </div>

        {/* 정보 */}
        <div className="mb-4 flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              기간: {calculateDurationFormat(study.start_at, study.end_at)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>종료: {yearMonthFormat(study.end_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>참여자: {study.current_headcount}명</span>
          </div>
        </div>

        {/* 리뷰 영역 */}
        <div className="mt-auto">
          {study.is_reviewed ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <StarRating rating={study.star_rating_average} />
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <p className="line-clamp-2 text-sm text-gray-700">
                {study.is_leader &&
                  '강의가 정말 도움이 되었습니다. 멤버들과의 협업도 원활했고 많은 것을 배울 수 있었어요.'}
              </p>
            </div>
          ) : (
            <>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-primary-800 mb-3 text-center text-sm">
                  아직 리뷰를 작성하지 않았습니다
                </p>
              </div>
              <Button variant="primary" size="freeWidthMd">
                리뷰 작성
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
