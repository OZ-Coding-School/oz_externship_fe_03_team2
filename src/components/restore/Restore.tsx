import { useEffect, useState } from 'react'
import RestoreModal from './RestoreModal'
import InputWithLabel from '../common/InputWithLabel'
import Button from '../common/Button'
import useDebounce from '../../hooks/useDebounce'
import validateAll from '../../utils/validators'
import { showToast } from '../../utils/showToast'
import SuccessModal from './SuccessModal'

interface SEND {
  email: string
  emailCode: string
}

interface RestoreProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const SEND_STATE: SEND = {
  email: '',
  emailCode: '',
}

function Restore({ isOpen, setIsOpen }: RestoreProps) {
  const [step, setStep] = useState(0)
  const [send, setSend] = useState(SEND_STATE)
  const [error, setError] = useState<Record<string, string>>({})
  const [emailSent, setEmailSent] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const debounceForm = useDebounce(send, 500)
  useEffect(() => {
    if (!isOpen) return
    const validator = validateAll(debounceForm)
    setError((prev) => ({ ...prev, ...validator }))
  }, [debounceForm, isOpen])

  if (!isOpen) return null

  const handleStep = () => {
    setStep(1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'emailCode') {
      setSend((prev) => ({
        ...prev,
        [name]: value.replace(/\D/g, '').slice(0, 6),
      }))
    } else {
      setSend((prev) => ({ ...prev, [name]: value }))
    }

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('제출')
    setIsSuccess(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setStep(0)
    setSend(SEND_STATE)
    setError({})
    setEmailSent(false)
    setIsSuccess(false)
  }

  const sendEmail = () => {
    console.log('보냄')
    showToast('성공', 'success', '인증코드전송')
    setEmailSent(true)
  }
  const sendEmailCode = () => {
    console.log('코드')
  }

  const footer = () => {
    const stepBool = step === 1
    return (
      <Button
        size="freeLogin"
        onClick={stepBool ? handleSubmit : handleStep}
        type={stepBool ? 'submit' : 'button'}
      >
        {stepBool ? '확인' : '계정 다시 사용하기'}
      </Button>
    )
  }
  return (
    <div>
      {step === 0 && (
        <RestoreModal
          title="해당 계정은 탈퇴된 상태예요"
          subtitle={[
            'YYYY년 MM월 DD일 이후, 계정 정보는 완전히 삭제돼요.',
            '계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.',
          ]}
          footer={footer()}
          onClose={handleClose}
        ></RestoreModal>
      )}

      {step === 1 && (
        <RestoreModal
          isNext
          title="계정 다시 사용하기"
          subtitle={['입력하신 이메일로 인증번호를 보내드릴게요.']}
          footer={footer()}
          onClose={handleClose}
        >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex items-end gap-3">
              <InputWithLabel
                label="이메일"
                name="email"
                type="email"
                value={send.email}
                required
                placeholder="example@gmail.com"
                onChange={handleChange}
                error={error.email}
                button={{
                  label: '인증코드전송',
                  onClick: sendEmail,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !(send.email && !error['email']),
                  countdown: 600,
                  cooldown: 60,
                }}
              />
            </div>
            <div className="flex items-end gap-3">
              <InputWithLabel
                name="emailCode"
                value={send.emailCode}
                placeholder="전송된 코드를 입력해주세요"
                onChange={handleChange}
                error={error.emailCode}
                button={{
                  label: '인증코드확인',
                  onClick: sendEmailCode,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !(
                    send.emailCode &&
                    !error['emailCode'] &&
                    emailSent
                  ),
                }}
              />
            </div>
          </form>
        </RestoreModal>
      )}
      {isSuccess && <SuccessModal onClose={handleClose} />}
    </div>
  )
}

export default Restore
