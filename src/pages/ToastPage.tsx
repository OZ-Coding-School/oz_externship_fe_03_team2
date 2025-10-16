import { toast } from 'sonner'
import Button from '../components/common/Button'
import Toast from '../components/common/toast/Toast'

export default function ToastPage() {
  const handleErrorToast = () => {
    toast.custom((t) => (
      <Toast id={t} title="민섭바보" message="바보 ㅋㅋ" type="error" />
    ))
  }

  const handleSuccessToast = () => {
    toast.custom((t) => (
      <Toast
        id={t}
        title="성공적으로 저장되었습니다"
        message="변경사항이 성공적으로 적용되었습니다."
        type="success"
      />
    ))
  }

  const handleWarningToast = () => {
    toast.custom((t) => (
      <Toast
        id={t}
        title="주의가 필요합니다"
        message="일부 정보가 누락되었습니다. 확인 후 다시 시도해주세요."
        type="warning"
      />
    ))
  }
  return (
    <>
      <Button onClick={handleErrorToast}>에러</Button>
      <Button onClick={handleSuccessToast}>성공</Button>
      <Button onClick={handleWarningToast}>경고</Button>
    </>
  )
}
