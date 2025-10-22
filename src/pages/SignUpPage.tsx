import { useEffect, useState } from 'react'
import InputWithLabel from '../components/common/InputWithLabel'
import Header from '../components/layout/Header'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router'
import Gender from '../components/common/signup/Gender'
import Toast from '../components/common/toast/Toast'
import { toast } from 'sonner'
import useDebounce from '../hooks/useDebounce'
import validateAll from '../utils/validators'
import { phoneFormat } from '../utils/phoneFormat'

export interface Form {
  name: string
  nickname: string
  birth: string
  gender: 'male' | 'female' | 'none'
  email: string
  phone: string
  password: string
  passwordConfirm: string
  emailCode: string
  phoneCode: string
}

function SignUpPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<Form>({
    name: '',
    nickname: '',
    birth: '',
    gender: 'none',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    emailCode: '',
    phoneCode: '',
  })

  const [confirm, setConfirm] = useState({
    emailSent: false,
    emailVerify: false,
    phoneSent: false,
    phoneVerify: false,
    nickConfirm: false,
  }) // 인증번호 전송 및 확인

  const [error, setError] = useState<Record<string, string>>({})

  const debounceForm = useDebounce(form)

  useEffect(() => {
    const validator = validateAll(debounceForm)
    setError((prev) => ({ ...prev, ...validator }))
  }, [debounceForm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'birth'
          ? value.replace(/\D/g, '').slice(0, 8)
          : name === 'phone'
            ? value.replace(/\D/g, '').slice(0, 11)
            : name === 'emailCode' || name === 'phoneCode'
              ? value.replace(/\D/g, '').slice(0, 6)
              : value,
    }))

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: '' }))
    }
    if (name === 'nickname') {
      setConfirm((prev) => ({ ...prev, nickConfirm: false }))
    }
    if (name === 'email') {
      setConfirm((prev) => ({ ...prev, emailSent: false, emailVerify: false }))
    }
    if (name === 'phone') {
      setConfirm((prev) => ({ ...prev, phoneSent: false, phoneVerify: false }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateAll(form, true)

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)
      return
    }

    //제출되었으니 초기화
    setForm({
      name: '',
      nickname: '',
      birth: '',
      gender: 'none',
      email: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      emailCode: '',
      phoneCode: '',
    })
    setConfirm({
      emailSent: false,
      emailVerify: false,
      phoneSent: false,
      phoneVerify: false,
      nickConfirm: false,
    })
    setError({})
    toast.custom(() => <Toast title="제출" message="성공" type="success" />)
  }

  //추후 API 연결
  const nicknameConfirm = () => {
    setConfirm((prev) => ({ ...prev, nickConfirm: true }))
    toast.custom(() => <Toast title="닉네임" message="중복" type="success" />)
  }
  const emailSend = () => {
    setConfirm((prev) => ({ ...prev, emailSent: true }))
    toast.custom(() => <Toast title="이메일" message="보냄" type="success" />)
  }
  const emailVerify = () => {
    setConfirm((prev) => ({ ...prev, emailVerify: true }))
    toast.custom(() => <Toast title="이메일" message="코드" type="success" />)
  }
  const phoneSent = () => {
    setConfirm((prev) => ({ ...prev, phoneSent: true }))
    toast.custom(() => <Toast title="폰" message="보냄" type="success" />)
  }
  const phoneVerify = () => {
    setConfirm((prev) => ({ ...prev, phoneVerify: true }))
    toast.custom(() => <Toast title="폰" message="코드" type="success" />)
  }

  const formSubmit = //제출 버튼 disabled
    !error['name'] &&
    form.name &&
    !error['nickname'] &&
    form.nickname &&
    !error['birth'] &&
    form.birth &&
    !error['email'] &&
    form.email &&
    !error['phone'] &&
    form.phone &&
    !error['password'] &&
    form.password &&
    !error['passwordConfirm'] &&
    form.passwordConfirm &&
    form.gender !== 'none' &&
    confirm.emailVerify &&
    confirm.phoneVerify &&
    confirm.nickConfirm

  return (
    <div className="bg-gray-50">
      <Header />
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-9 h-auto w-[30rem] bg-white px-[24px] py-[49px]"
      >
        <h1 className="mb-4 text-center text-3xl font-bold">회원가입</h1>
        <div className="mb-9 flex justify-center gap-4 text-sm font-normal">
          <p className="text-gray-600">이미 계정이 있으신가요?</p>
          <button
            type="button"
            className="text-primary-600 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            로그인하기
          </button>
        </div>
        <div className="mb-9 flex flex-col gap-11">
          <InputWithLabel
            label="이름"
            name="name"
            value={form.name}
            error={error['name']}
            required
            placeholder="이름을 입력해주세요"
            onChange={handleChange}
          />
          <div className="flex items-end gap-3">
            <InputWithLabel
              label="닉네임"
              name="nickname"
              value={form.nickname}
              error={error['nickname']}
              required
              placeholder="닉네임을 입력해주세요"
              onChange={handleChange}
              button={{
                label: '중복확인',
                onClick: nicknameConfirm,
                variant: 'signup',
                size: 'ml',
                disabled: !(form.nickname && !error['nickname']),
              }}
            />
          </div>
          <InputWithLabel
            label="생년월일"
            name="birth"
            value={form.birth}
            error={error['birth']}
            required
            placeholder="8자리 입력해주세요 (ex.20001004)"
            onChange={handleChange}
          />
          <div className="flex flex-col gap-2">
            <Gender
              form={form}
              setForm={setForm}
              error={error}
              setError={setError}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <InputWithLabel
                label="이메일"
                name="email"
                type="email"
                value={form.email}
                error={error['email']}
                required
                description="로그인 시 아이디로 사용합니다."
                placeholder="example@gmail.com"
                onChange={handleChange}
                button={{
                  label: '인증코드전송',
                  onClick: emailSend,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !(form.email && !error['email']),
                }}
              />
            </div>
            <div className="flex items-end gap-3">
              <InputWithLabel
                name="emailCode"
                value={form.emailCode}
                error={error['emailCode']}
                placeholder="전송된 코드를 입력해주세요"
                onChange={handleChange}
                button={{
                  label: '인증코드확인',
                  onClick: emailVerify,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !(
                    form.emailCode &&
                    !error['emailCode'] &&
                    confirm.emailSent
                  ),
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <InputWithLabel
                label="휴대전화"
                name="phone"
                type="tel"
                value={phoneFormat(form.phone)}
                error={error['phone']}
                required
                placeholder="01012345678"
                onChange={handleChange}
                button={{
                  label: '인증코드전송',
                  onClick: phoneSent,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !(form.phone && !error['phone']),
                }}
              />
            </div>
            <div className="flex items-end gap-3">
              <InputWithLabel
                label=""
                name="phoneCode"
                value={form.phoneCode}
                error={error['phoneCode']}
                placeholder="인증번호 6자리를 입력해주세요"
                onChange={handleChange}
                button={{
                  label: '인증코드확인',
                  onClick: phoneVerify,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !(
                    form.phoneCode &&
                    !error['phoneCode'] &&
                    confirm.phoneSent
                  ),
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <InputWithLabel
              label="비밀번호"
              name="password"
              type="password"
              value={form.password}
              error={error['password']}
              required
              description="8~15자의 영문 대소문자, 숫자, 특수문자 포함"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
            />
            <InputWithLabel
              label=""
              name="passwordConfirm"
              type="password"
              value={form.passwordConfirm}
              error={error['passwordConfirm']}
              placeholder="비밀번호를 다시 입력해주세요"
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="submit" size="freeWidthLg" disabled={!formSubmit}>
          가입하기
        </Button>
      </form>
    </div>
  )
}

export default SignUpPage
