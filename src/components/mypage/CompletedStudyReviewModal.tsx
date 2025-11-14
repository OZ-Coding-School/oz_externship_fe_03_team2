import { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import StarRatingInput from '../common/StarRatingInput'
import {
  useCreateGroupReview,
  useUpdateGroupReview,
} from '../../api/services/mypage/studyGroup'
import { showToast } from '../../utils/showToast'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  studyName: string
  studyPeriod: string
  groupUuid: string
  editingReview?: {
    id: string
    rating: number
    content: string
  } | null
}

function CompletedStudyReviewModal({
  isOpen,
  onClose,
  studyName,
  studyPeriod,
  groupUuid,
  editingReview,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  // 수정 모드인지 확인
  const isEditMode = !!editingReview

  // api훅
  const { mutate: createReview, isPending: isCreate } =
    useCreateGroupReview(groupUuid)
  const { mutate: updateReview, isPending: isUpdate } = useUpdateGroupReview(
    groupUuid,
    editingReview?.id ?? ''
  )

  const isPending = isCreate ?? isUpdate

  // 수정 모드일 떄 기존 데이터로
  useEffect(() => {
    if (isOpen && editingReview) {
      setRating(editingReview.rating)
      setReviewText(editingReview.content)
    } else if (isOpen && !editingReview) {
      // 새 리뷰 작성 모드일때는 초기화
      setRating(0)
      setReviewText('')
    }
  }, [isOpen, editingReview])

  const handleSubmit = () => {
    if (isEditMode) {
      // 수정 모드
      updateReview(
        { star_rating: rating, content: reviewText },
        {
          onSuccess: () => {
            setRating(0)
            setReviewText('')
            onClose()
            showToast('리뷰가 수정되었습니다', 'success', '리뷰 수정 성공')
          },
          onError: () => {
            showToast(
              '리뷰를 수정하는데 오류가 발생했습니다',
              'error',
              '리뷰 수정 실패'
            )
          },
        }
      )
    } else {
      createReview(
        { star_rating: rating, content: reviewText },
        {
          onSuccess: () => {
            setRating(0)
            setReviewText('')
            onClose()
            showToast('리뷰가 등록되었습니다', 'success', '리뷰 등록 성공')
          },
          onError: () => {
            showToast(
              '리뷰 등록하는데 오류가 발생했습니다',
              'error',
              '리뷰 등록 실패'
            )
          },
        }
      )
    }
  }

  const handleCancel = () => {
    setRating(0)
    setReviewText('')
    onClose()
  }

  return (
    <Modal
      title="스터디 리뷰"
      isOpen={isOpen}
      onClose={handleCancel}
      footer={
        <>
          <Button variant="outline" size="md" onClick={handleCancel}>
            취소
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            disabled={
              rating === 0 || reviewText.trim().length === 0 || isPending
            }
          >
            {isPending
              ? isEditMode
                ? '수정 중...'
                : '등록 중...'
              : isEditMode
                ? '리뷰 수정'
                : '리뷰 등록'}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* 스터디인포 */}
        <div>
          <h3 className="font-medium text-gray-900">{studyName}</h3>
          <p className="mt-1 text-sm text-gray-600">{studyPeriod}</p>
        </div>

        {/* 평점 */}
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            평점
          </label>
          <StarRatingInput rating={rating} onRatingChange={setRating} />
        </div>

        {/* 리뷰 내용 */}
        <div>
          <label
            htmlFor="review-content"
            className="mb-3 block text-sm font-medium text-gray-900"
          >
            리뷰 내용
          </label>
          <textarea
            id="review-content"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="스터디에 대한 솔직한 후기를 남겨주세요"
            className="focus:border-primary-500 focus:ring-primary-500 min-h-32 w-full resize-none rounded-lg border border-gray-300 p-3 text-sm font-medium placeholder-gray-400 focus:ring-1 focus:outline-none"
            maxLength={500}
          />
          <p className="mt-1 text-xs text-gray-500">
            {reviewText.length}/500자
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default CompletedStudyReviewModal
