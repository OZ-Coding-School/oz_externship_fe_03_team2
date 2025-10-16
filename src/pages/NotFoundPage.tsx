import { useNavigate } from 'react-router'
import Button from '../components/common/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-primary-500 text-[80px] font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        찾으시는 페이지가 없습니다
      </h2>
      <br />
      <p className="mt-2 leading-relaxed text-gray-600">
        방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수
        없습니다.
        <br />
        입력하신 주소가 정확한지 다시 확인해주세요.
      </p>

      <div className="mt-8">
        <Button variant="primary" size="md" onClick={() => navigate('/')}>
          홈으로 가기 →
        </Button>
      </div>
    </div>
  )
}
