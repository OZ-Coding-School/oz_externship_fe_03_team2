import { useState } from 'react'
import InputWithLabel from '../components/common/InputWithLabel'
import Header from '../components/layout/Header'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router'
import Gender from '../components/common/signup/Gender'

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
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!form.name) newErrors['name'] = '이름을 입력해주세요'
    if (!form.nickname) newErrors['nickname'] = '닉네임을 입력해주세요'
    if (!form.birth) newErrors['birth'] = '생년월일을 입력해주세요'
    if (!form.email) newErrors['email'] = '이메일을 입력해주세요'
    if (!form.phone) newErrors['phone'] = '핸드폰 번호를 입력해주세요'
    if (!form.password) newErrors['password'] = '비밀번호를 입력해주세요'
    if (!form.passwordConfirm)
      newErrors['passwordConfirm'] = '비밀번호를 확인해주세요'
    if (!form.emailCode) newErrors['emailCode'] = '인증번호를 입력해주세요'
    if (!form.phoneCode) newErrors['phoneCode'] = '인증번호를 입력해주세요'
    if (form.gender === 'none') newErrors['gender'] = '성별을 선택해주세요'

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

  const zmfflr = () => {
    alert('1')
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
                onClick: zmfflr,
                variant: 'signup',
                size: 'ml',
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
                value={form.email}
                error={error['email']}
                required
                description="로그인 시 아이디로 사용합니다."
                placeholder="example@gmail.com"
                onChange={handleChange}
              />
              <Button variant="signup" size="ml">
                인증번호전송
              </Button>
            </div>
            <div className="flex items-end gap-3">
              <InputWithLabel
                name="emailCode"
                value={form.emailCode}
                error={error['emailCode']}
                placeholder="전송된 코드를 입력해주세요"
                onChange={handleChange}
              />
              <Button variant="signup" size="ml">
                인증코드확인
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <InputWithLabel
                label="휴대전화"
                name="phone"
                value={form.phone}
                error={error['phone']}
                required
                placeholder="01012345678"
                onChange={handleChange}
              />
              <Button variant="signup" size="ml">
                인증번호전송
              </Button>
            </div>
            <div className="flex items-end gap-3">
              <InputWithLabel
                label=""
                name="phoneCode"
                value={form.phoneCode}
                error={error['phoneCode']}
                placeholder="인증번호 6자리를 입력해주세요"
                onChange={handleChange}
              />
              <Button variant="signup" size="ml">
                인증코드확인
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <InputWithLabel
              label="비밀번호"
              name="password"
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
