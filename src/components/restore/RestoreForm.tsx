import InputWithLabel from '../common/InputWithLabel'
import Button from '../common/Button'
import RestoreModal from './RestoreModal'

interface RestoreFormProps {
  email: string
  emailCode: string
  error: Record<string, string>
  emailSent: boolean
  isLoadingSend: boolean
  isLoadingConfirm: boolean
  onChangeEmail: (value: string) => void
  onChangeCode: (value: string) => void
  onSendEmail: () => void
  onConfirmCode: () => void
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
}

export default function RestoreForm({
  email,
  emailCode,
  error,
  isLoadingSend,
  isLoadingConfirm,
  onChangeEmail,
  onChangeCode,
  onSendEmail,
  onConfirmCode,
  onSubmit,
  onClose,
}: RestoreFormProps) {
  return (
    <RestoreModal
      isNext
      title="계정 다시 사용하기"
      subtitle={['입력하신 이메일로 인증번호를 보내드릴게요.']}
      onClose={onClose}
      footer={
        <Button size="freeLogin" type="submit" onClick={onSubmit}>
          확인
        </Button>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <InputWithLabel
          label="이메일"
          name="email"
          type="email"
          value={email}
          required
          placeholder="example@gmail.com"
          onChange={(e) => onChangeEmail(e.target.value)}
          error={error.email}
          button={{
            label: isLoadingSend ? '전송 중...' : '인증코드전송',
            onClick: onSendEmail,
            variant: 'signup',
            size: 'ml',
            disabled: !email || !!error.email || isLoadingSend,
            countdown: 600,
            cooldown: 60,
          }}
        />

        <InputWithLabel
          name="emailCode"
          value={emailCode}
          placeholder="전송된 코드를 입력해주세요"
          onChange={(e) => onChangeCode(e.target.value)}
          error={error.emailCode}
          button={{
            label: isLoadingConfirm ? '확인 중...' : '인증코드확인',
            onClick: onConfirmCode,
            variant: 'signup',
            size: 'ml',
            disabled:
              !emailCode || // 빈 문자열이면 비활성화
              !!error.emailCode || // 에러가 있으면 비활성화
              isLoadingConfirm,
          }}
        />
      </form>
    </RestoreModal>
  )
}
