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

  const [error, setError] = useState<Record<string, string>>({})

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
  }

  const debounceForm = useDebounce(form)

  useEffect(() => {
    const validator = validateAll(debounceForm)
    setError((prev) => ({ ...prev, ...validator }))
  }, [debounceForm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateAll(form, true)

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors)
      return
    }

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
    setError({})
  }

  const handleClick = () => {
    toast.custom(() => <Toast title="클릭" message="잘됨" type="success" />)
  }

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
            className="text-primary-600"
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
                onClick: handleClick,
                variant: 'signup',
                size: 'ml',
                disabled: !form.name,
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
                  onClick: handleClick,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !form.email,
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
                  onClick: handleClick,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !form.emailCode,
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
                value={form.phone}
                error={error['phone']}
                required
                placeholder="01012345678"
                onChange={handleChange}
                button={{
                  label: '인증코드전송',
                  onClick: handleClick,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !form.phone,
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
                  onClick: handleClick,
                  variant: 'signup',
                  size: 'ml',
                  disabled: !form.phoneCode,
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
        <Button type="submit" size="freeWidthLg">
          가입하기
        </Button>
      </form>
    </div>
  )
}

export default SignUpPage
