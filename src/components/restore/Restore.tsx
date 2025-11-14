import { useState, useEffect } from 'react'
import RestoreStart from './RestoreStart'
import RestoreForm from './RestoreForm'
import SuccessModal from './SuccessModal'
import useDebounce from '../../hooks/useDebounce'
import validateAll from '../../utils/validators'
import { showToast } from '../../utils/showToast'
import {
  useSendRestoreEmailCode,
  useConfirmRestoreEmailCode,
  useRestoreAccount,
} from '../../api/emailRestore'

interface RestoreProps {
  isOpen: boolean
  date: string
  setIsOpen: (isOpen: boolean) => void
}

const INIT_STATE = { email: '', emailCode: '' }

export default function Restore({ isOpen, date, setIsOpen }: RestoreProps) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(INIT_STATE)
  const [error, setError] = useState<Record<string, string>>({})
  const [emailSent, setEmailSent] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoadingSend, setIsLoadingSend] = useState(false)
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false)
  const [requestId, setRequestId] = useState('')
  const [emailVerifyToken, setEmailVerifyToken] = useState('')

  const debounceForm = useDebounce(form, 400)

  const sendEmailMutation = useSendRestoreEmailCode()
  const confirmCodeMutation = useConfirmRestoreEmailCode()
  const restoreMutation = useRestoreAccount()

  useEffect(() => {
    if (!isOpen) return

    const validator = validateAll(debounceForm)
    const trimmedEmail = debounceForm.email.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let emailError = ''
    let codeError = ''

    if (!trimmedEmail) emailError = '이메일을 입력해주세요.'
    else if (!emailRegex.test(trimmedEmail))
      emailError = '이메일 형식이 올바르지 않습니다.'

    // 인증코드 error 체크
    if (debounceForm.emailCode && debounceForm.emailCode.length !== 6) {
      codeError = '6자리 인증코드를 입력해주세요'
    }

    setError((prev) => ({
      ...prev,
      ...validator,
      email: emailError,
      emailCode: codeError,
    }))
  }, [debounceForm, isOpen])

  if (!isOpen) return null

  const handleStep = () => setStep(1)

  /** 1단계: 이메일 인증코드 전송 */
  const sendEmail = async () => {
    if (!form.email.trim()) return showToast('이메일을 입력해주세요.', 'error')
    try {
      setIsLoadingSend(true)
      const res = await sendEmailMutation.mutateAsync(form.email.trim())
      if (res?.data.request_id) {
        setRequestId(res.data.request_id)
        setEmailSent(true)
        showToast('인증코드를 발송하였습니다.', 'success')
      } else {
        showToast('서버 응답이 올바르지 않습니다.', 'warning')
      }
    } catch {
      showToast('이메일 전송 실패', 'error')
    } finally {
      setIsLoadingSend(false)
    }
  }

  /** 2단계: 인증코드 확인 */
  const sendEmailCode = async () => {
    if (!form.email.trim() || !form.emailCode)
      return showToast('이메일과 인증코드를 입력해주세요.', 'error')
    try {
      setIsLoadingConfirm(true)
      const res = await confirmCodeMutation.mutateAsync({
        email: form.email.trim(),
        verification_code: form.emailCode,
        request_id: requestId,
      })
      if (res?.data.email_verify_token) {
        setEmailVerifyToken(res.data.email_verify_token)
        showToast('이메일 인증이 완료되었습니다.', 'success')
      } else {
        showToast('인증 실패', 'error')
      }
    } catch {
      showToast('인증 실패', 'error')
    } finally {
      setIsLoadingConfirm(false)
    }
  }

  /** 3단계: 계정 복구 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailVerifyToken)
      return showToast('이메일 인증이 필요합니다.', 'error')

    restoreMutation.mutate(emailVerifyToken, {
      onSuccess: () => setIsSuccess(true),
      onError: () => showToast('계정 복구 실패', 'error'),
    })
  }

  /** 닫기 */
  const handleClose = () => {
    setIsOpen(false)
    setStep(0)
    setForm(INIT_STATE)
    setError({})
    setEmailSent(false)
    setIsSuccess(false)
    setRequestId('')
    setEmailVerifyToken('')
  }

  /** 입력 변경 */
  const handleChangeEmail = (value: string) =>
    setForm((prev) => ({ ...prev, email: value }))

  const handleChangeCode = (value: string) => {
    const sanitized = value.replace(/\D/g, '').slice(0, 6)
    setForm((prev) => ({
      ...prev,
      emailCode: sanitized,
    }))

    setError((prev) => {
      const newError = { ...prev }
      if (sanitized.length === 6) {
        delete newError.emailCode
      } else if (sanitized.length > 0) {
        newError.emailCode = '6자리 인증코드를 입력해주세요'
      } else {
        delete newError.emailCode
      }
      return newError
    })
  }

  return (
    <>
      {step === 0 && (
        <RestoreStart onNext={handleStep} onClose={handleClose} date={date} />
      )}

      {step === 1 && (
        <RestoreForm
          email={form.email}
          emailCode={form.emailCode}
          error={error}
          emailSent={emailSent}
          isLoadingSend={isLoadingSend}
          isLoadingConfirm={isLoadingConfirm}
          onChangeEmail={handleChangeEmail}
          onChangeCode={handleChangeCode}
          onSendEmail={sendEmail}
          onConfirmCode={sendEmailCode}
          onSubmit={handleSubmit}
          onClose={handleClose}
        />
      )}

      {isSuccess && <SuccessModal onClose={handleClose} />}
    </>
  )
}
