import { useEffect, useState } from 'react'
import RestoreStart from './RestoreStart'
import RestoreForm from './RestoreForm'
import SuccessModal from './SuccessModal'
import useDebounce from '../../hooks/useDebounce'
import validateAll from '../../utils/validators'
import { showToast } from '../../utils/showToast'

interface SEND {
  email: string
  emailCode: string
}

interface RestoreProps {
  isOpen: boolean
  date: string
  setIsOpen: (isOpen: boolean) => void
}

const SEND_STATE: SEND = {
  email: '',
  emailCode: '',
}

export default function Restore({ isOpen, date, setIsOpen }: RestoreProps) {
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

  const handleStep = () => setStep(1)

  const handleClose = () => {
    setIsOpen(false)
    setStep(0)
    setSend(SEND_STATE)
    setError({})
    setEmailSent(false)
    setIsSuccess(false)
  }

  const sendEmail = () => {
    showToast('성공', 'success', '인증코드전송')
    setEmailSent(true)
  }

  const sendEmailCode = () => {
    console.log('인증코드 확인') // API 연결 시 수정
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSuccess(true)
  }

  if (!isOpen) return null

  return (
    <div>
      {step === 0 && (
        <RestoreStart onNext={handleStep} onClose={handleClose} date={date} />
      )}

      {step === 1 && (
        <RestoreForm
          email={send.email}
          emailCode={send.emailCode}
          error={error}
          onChangeEmail={(value) =>
            setSend((prev) => ({ ...prev, email: value }))
          }
          onChangeCode={(value) =>
            setSend((prev) => ({ ...prev, emailCode: value }))
          }
          onSendEmail={sendEmail}
          onConfirmCode={sendEmailCode}
          onSubmit={handleSubmit}
          onClose={handleClose}
          isLoadingSend={false}
          isLoadingConfirm={false}
          emailSent={emailSent}
        />
      )}

      {isSuccess && <SuccessModal onClose={handleClose} />}
    </div>
  )
}
