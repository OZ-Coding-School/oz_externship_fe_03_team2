import Button from '../../common/Button'
import InputWithLabel from '../../common/InputWithLabel'
import { UserRoundSearch } from 'lucide-react'
import Toast from '../../common/toast/Toast'
import { toast } from 'sonner'
import type { FormData } from '../TestPage'

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
  const handleSubmit = () => {
    if (!formData.name || !formData.phone) {
      toast.custom((t) => (
        <Toast
          id={t}
          title="주의가 필요합니다"
          message="일부 정보가 누락되었습니다. 확인 후 다시 시도해주세요."
          type="warning"
        />
      ))
      return
    }
    onNext()
  }

  return (
    <div>
      <div className="bg-primary-200 text-primary-600 flex h-[4rem] w-[4rem] items-center justify-center rounded-full">
        <UserRoundSearch size={25} />
      </div>
      <h2>회원 정보 입력</h2>
      <p>가입 시 입력한 이름과 휴대폰 번호를 입력해주세요</p>
      <InputWithLabel
        label="이름"
        name="name"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <InputWithLabel
        label="휴대전화"
        name="phone"
        value={formData.phone}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, phone: e.target.value }))
        }
      />
      <Button onClick={handleSubmit}>다음 단계</Button>
      <button>로그인으로 돌아가기</button>
    </div>
  )
}
