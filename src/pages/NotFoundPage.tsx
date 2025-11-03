import { useNavigate } from 'react-router'
import Button from '../components/common/Button'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Header from '../components/layout/Header'

export default function NotFoundPage() {
  useDocumentTitle('404 Not Found')
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="mt-20 flex min-h-screen flex-col items-center bg-gray-50 px-6 text-center">
        <h1 className="text-primary-500 text-[80px] font-bold">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          찾으시는 페이지가 없습니다
        </h2>

        <p className="mt-4 leading-relaxed whitespace-pre-line text-gray-600">
          {`방문하시려는 페이지의 주소가 잘못 입력되었거나, 삭제되어 사용하실 수 없습니다.
        입력하신 주소가 정확한지 다시 한 번 확인해 주세요.`}
        </p>

        <div className="mt-8">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/', { replace: true })}
          >
            홈으로 가기 →
          </Button>
        </div>
      </div>
    </>
  )
}
