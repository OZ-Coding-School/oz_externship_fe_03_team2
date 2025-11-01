import { useState } from 'react'
import RestoreModal from './RestoreModal'
import InputWithLabel from '../common/InputWithLabel'

interface SEND {
  email: string
  emailCode: string
}

const SEND_STATE: SEND = {
  email: '',
  emailCode: '',
}

function Restore() {
  const [step, setStep] = useState(0)
  const [send, setSend] = useState(SEND_STATE)

  const handleStep = () => {
    setStep(1)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSend((prev) => ({ ...prev, [name]: value }))
  }

  const sendEmail = () => {}
  const sendEmailCode = () => {}
  return (
    <div>
      {step === 0 && (
        <RestoreModal
          isOpen
          title="해당 계정은 탈퇴된 상태예요"
          subtitle={[
            'YYYY년 MM월 DD일 이후, 계정 정보는 완전히 삭제돼요.',
            '계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.',
          ]}
          buttonTitle="계정 다시 사용하기"
          handleStep={handleStep}
        ></RestoreModal>
      )}
      {step === 1 && (
        <RestoreModal
          isOpen
          isNext
          title="계정 다시 사용하기"
          subtitle={['입력하신 이메일로 인증번호를 보내드릴게요.']}
          buttonTitle="확인"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <InputWithLabel
                label="이메일"
                name="email"
                type="email"
                value={send.email}
                required
                description="로그인 시 아이디로 사용합니다."
                placeholder="example@gmail.com"
                onChange={handleChange}
                button={{
                  label: '인증코드전송',
                  onClick: sendEmail,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !send.email,
                }}
              />
            </div>
            <div className="flex items-end gap-3">
              <InputWithLabel
                name="emailCode"
                value={send.emailCode}
                placeholder="전송된 코드를 입력해주세요"
                onChange={handleChange}
                button={{
                  label: '인증코드확인',
                  onClick: sendEmailCode,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !send.emailCode,
                }}
              />
            </div>
          </div>
        </RestoreModal>
      )}
    </div>
  )
}

export default Restore
