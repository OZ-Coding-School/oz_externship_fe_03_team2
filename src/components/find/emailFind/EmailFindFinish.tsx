import { useNavigate } from 'react-router'
import Button from '../../common/Button'
import { Check } from 'lucide-react'
import { useRecoveryEmail } from '../../../api/services/find/emailFind'
import { useEffect } from 'react'
import type { FormData } from '../../../pages/EmailFindPage'

interface EmailFindFinishProps {
  formData: FormData
}

export default function EmailFindFinish({ formData }: EmailFindFinishProps) {
  const navigate = useNavigate()
  const { mutate, data, isPending, isError } = useRecoveryEmail()

  useEffect(() => {
    mutate(formData.verify_token)
  }, [])

  return (
    <div className="flex w-full max-w-[23rem] flex-col gap-[1.5rem] pb-[1.5rem]">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-success-100 text-success-600 flex h-[4rem] w-[4rem] items-center justify-center rounded-full">
          <Check size={30} />
        </div>
        <div className="flex flex-col items-center gap-[.5rem]">
          <p className="text-[1.125rem] font-semibold">
            {isPending ? '이메일을 찾는 중...' : '이메일 찾기 완료'}
          </p>
          <p className="text-[.875rem] text-gray-600">
            {isPending
              ? '입력하신 정보로 이메일을 찾는 중입니다'
              : '입력하신 정보로 가입된 이메일을 찾았습니다'}
          </p>
        </div>
      </div>
      <div className="flex h-[10.5rem] flex-col justify-start">
        <div className="flex h-[4.875rem] flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-[1.0625rem]">
          <div className="text-black">
            {/* <p>{data?.data?.email ?? '______@____.___'}</p> */}
            {isPending ? (
              <p>조회 중...</p>
            ) : data ? (
              <p>{data?.data?.email}</p>
            ) : (
              <p>조회 결과가 없습니다.</p>
            )}
            {data && (
              <p className="text-[.875rem] text-gray-500">{data.data.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className="s flex gap-2">
        <button
          onClick={() => navigate('/login')}
          className="bg-success-500 h-12 w-[11.0625rem] rounded-lg text-white"
        >
          로그인하기
        </button>
        <div className="w-[11.1875rem] whitespace-nowrap">
          <Button
            variant="outline"
            size="freeWidthLg"
            onClick={() => navigate('/passwordfind')}
          >
            비밀번호 찾기
          </Button>
        </div>
      </div>
    </div>
  )
}
