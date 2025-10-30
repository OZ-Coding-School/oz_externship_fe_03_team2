import { useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import StarRatingInput from '../common/StarRatingInput'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  studyName: string
  studyPeriod: string
}

function CompletedStudyReviewModal({
  isOpen,
  onClose,
  studyName,
  studyPeriod,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const handleSubmit = () => {
    onClose()
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
            disabled={rating === 0 || reviewText.trim().length === 0}
          >
            리뷰 등록
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
          <p className="mt-2 text-xs text-gray-500">
            {reviewText.length}/500자
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default CompletedStudyReviewModal
