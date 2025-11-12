import Button from '../../common/Button'
import InputWithLabel from '../../common/InputWithLabel'
import { UserRoundSearch } from 'lucide-react'
import type { FormData } from '../../../pages/EmailFindPage'
import useDebounce from '../../../hooks/useDebounce'
import { useNavigate } from 'react-router'
import { useFindEmailSendCode } from '../../../api/services/find/emailFind'
import { showToast } from '../../../utils/showToast'
interface UserProfileFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  // React.Dispatch: 함수 타입 (얘를 호출하면 React 상태가 업데이트 된다..는 의미)
  // React.SetStateAction: (상태를 바꿀  때 넣을 수 있는 값의 타입. prev를 이용하든 새 값을 직접 넣든..)
  onNext: () => void
}

export default function UserProfileForm({
  formData,
  setFormData,
  onNext,
}: UserProfileFormProps) {
  const { mutate, isPending } = useFindEmailSendCode()
  const navigate = useNavigate()
  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !phoneReg) {
      showToast(
        '일부 정보가 누락되었습니다. 확인 후 다시 시도해주세요.',
        'warning',
        '주의가 필요합니다'
      )
      return
    }
    mutate(
      { phone_number: formData.phone },
      {
        onSuccess: (data) => {
          setFormData((prev) => ({
            ...prev,
            request_id: data.data.request_id,
            cooldown: data.data.cooldown,
            expires_in: data.data.expires_in,
          }))
          // 인증번호 발송 성공했을 시 저장하여 PhoneAuthentication에서 씀
          onNext()
        },
        onError: () => {
          showToast('재전송 대기 시간이 지나지 않았습니다.', 'error')
        },
      }
    )
  }

  // 전화번호 유효성 검사
  const debouncedPhone = useDebounce(formData.phone)
  const phoneReg =
    debouncedPhone === '' ? true : /^[0-9]{10,11}$/.test(debouncedPhone)
  const phoneError = !phoneReg ? '유효한 전화번호를 입력해주세요.' : ''

  // 이름 유효성 검사
  const debouncedName = useDebounce(formData.name)
  const NameReg =
    debouncedName === '' ? true : /^[가-힣a-zA-Z]{1,10}$/.test(debouncedName)
  const NameError = !NameReg ? '유효한 이름을 입력해주세요.' : ''

  return (
    <div className="flex w-full max-w-[23rem] flex-col items-center justify-center gap-[1.5rem]">
      <div className="flex flex-col items-center gap-[1rem]">
        <div className="bg-primary-100 text-primary-600 flex h-[4rem] w-[4rem] items-center justify-center rounded-full">
          <UserRoundSearch size={30} />
        </div>
        <div className="flex flex-col items-center gap-[.5rem] pb-[1.5rem]">
          <p className="text-[1.125rem] font-semibold">회원 정보 입력</p>
          <p className="text-[.875rem] text-[#4B5563]">
            가입 시 입력한 이름과 휴대폰 번호를 입력해주세요
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-[1.5rem]">
        <InputWithLabel
          label="이름"
          name="name"
          value={formData.name}
          placeholder="실명을 입력해주세요"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value.trim() }))
          }
          error={NameError}
        />
        <InputWithLabel
          label="휴대전화"
          name="phone"
          value={formData.phone}
          placeholder="01012345678"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              phone: e.target.value.trim(),
              expires_in: 0,
              cooldown: 0,
            }))
          }
          error={phoneError}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-1">
        <Button
          size="freeWidthLg"
          onClick={handleSubmit}
          disabled={isPending || formData.cooldown > 0}
        >
          {isPending ? '인증코드 전송 중..' : '다음 단계'}
        </Button>
        <Button size="lg" variant="text" onClick={() => navigate('/login')}>
          로그인으로 돌아가기
        </Button>
      </div>
    </div>
  )
}
