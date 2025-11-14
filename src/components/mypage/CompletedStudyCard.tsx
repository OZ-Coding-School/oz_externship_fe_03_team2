import { Calendar, Users, Edit, Clock } from 'lucide-react'
import Badge from '../common/Badge'
import Button from '../common/Button'
import {
  calculateDurationFormat,
  yearMonthFormat,
} from '../../utils/dateFormat'
import type { StudyGroups } from '../../types/apiInterface/mypageInterface'
import StarRating from '../common/StarRating'
import { useState } from 'react'
import CompletedStudyReviewModal from './CompletedStudyReviewModal'
import { useGetGroupReviews } from '../../api/services/mypage/studyGroup'

interface CompletedStudyCardProps {
  study?: StudyGroups
  isLoading?: boolean
}

function CompletedStudyCard({ study, isLoading }: CompletedStudyCardProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  // 각 카드에서 개별적으로 리뷰 조회
  const { data: reviewData } = useGetGroupReviews(
    study?.uuid ?? '',
    undefined,
    !!study?.uuid // study.uuid가 있을 때만 실행
  )

  // 내가 작성한 리뷰 찾기
  const myReview = reviewData?.results?.find((review) => review.is_mine)
  const myRating = myReview ? myReview.rating : 0

  const handleReviewClick = () => {
    setIsReviewModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex max-w-95.5 animate-pulse flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        {/* 이미지 스켈레톤 */}
        <div className="h-54 w-full bg-gray-200" />

        {/* 컨텐츠 영역 스켈레톤 */}
        <div className="flex flex-1 flex-col p-5">
          {/* 헤더 */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="h-7 w-2/3 rounded bg-gray-200" />
            <div className="h-6 w-16 rounded bg-gray-200" />
          </div>

          {/* 정보 */}
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="h-5 w-48 rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="h-5 w-40 rounded bg-gray-200" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <div className="h-5 w-32 rounded bg-gray-200" />
            </div>
          </div>

          {/* 리뷰 영역 */}
          <div className="mt-auto">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mt-2 h-20 w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!study) return

  return (
    <>
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
            {myReview ? (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <StarRating rating={myRating} />
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <p className="line-clamp-2 min-h-10 text-sm text-gray-700">
                  {myReview.content || '리뷰 내용이 없습니다.'}
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-primary-800 mb-3 text-center text-sm">
                    아직 리뷰를 작성하지 않았습니다
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="freeWidthMd"
                  onClick={handleReviewClick}
                >
                  리뷰 작성
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/*리뷰모달 */}
      <CompletedStudyReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        studyName={study.name}
        studyPeriod={`${calculateDurationFormat(study.start_at, study.end_at)} · ${yearMonthFormat(study.end_at)}`}
        groupUuid={study.uuid}
      />
    </>
  )
}

export default CompletedStudyCard
