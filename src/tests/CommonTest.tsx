import Button from '../components/common/Button'
import {
  Globe,
  Heart,
  Lock,
  Mail,
  MapPin,
  Plus,
  Send,
  Trash2,
  User,
} from 'lucide-react'
import InputWithLabel from '../components/common/InputWithLabel'
import { useState } from 'react'
import Toast from '../components/common/toast/Toast'
import { toast } from 'sonner'
import { DropDown } from '../components/common/dropDown'

function CommonTest() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    verifyCode: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSendCode = () => {
    if (!formData.email) {
      toast.custom((t) => (
        <Toast
          id={t}
          title="입력 오류"
          message="이메일을 입력해주세요"
          type="error"
        />
      ))
      return
    }
    setIsEmailSent(true)
    toast.custom((t) => (
      <Toast
        id={t}
        title="전송 완료"
        message="인증번호가 전송되었습니다!"
        type="success"
      />
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.fullname) newErrors['fullname'] = '이름을 입력해주세요'
    if (!formData.email) newErrors['email'] = '이메일을 입력해주세요'
    if (!formData.password) newErrors['password'] = '비밀번호를 입력해주세요'
    if (isEmailSent && !formData.verifyCode)
      newErrors['verifyCode'] = '인증번호를 입력해주세요'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    toast.custom((t) => (
      <Toast
        id={t}
        title="성공!"
        message="회원가입이 완료되었습니다"
        type="success"
      />
    ))
    setFormData({ fullname: '', email: '', password: '', verifyCode: '' })
    setIsEmailSent(false)
    setErrors({})
  }

  return (
    <div className="w-full bg-white">
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="mb-8 text-2xl font-bold">버튼 컴포넌트 (Button.tsx)</h1>

        {/* primary */}
        <section className="mb-5">
          <h2 className="mb-4 text-lg font-semibold">primary 버튼</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">
              스몰
            </Button>
            <Button variant="primary" size="md">
              미디움
            </Button>
            <Button variant="primary" size="lg">
              라지
            </Button>
            <Button variant="primary" size="md" disabled>
              disabled
            </Button>
            <Button variant="primary" size="md" icon={<Plus size={18} />}>
              아이콘
            </Button>
          </div>
        </section>

        {/* secondary */}
        <section className="mb-5">
          <h2 className="mb-4 text-lg font-semibold">secondary 버튼</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="sm">
              스몰
            </Button>
            <Button variant="secondary" size="md">
              미디움
            </Button>
            <Button variant="secondary" size="lg">
              라지
            </Button>
            <Button variant="secondary" size="md" disabled>
              disabled
            </Button>
            <Button variant="secondary" size="md" icon={<Heart size={18} />}>
              아이콘
            </Button>
          </div>
        </section>

        {/* outline */}
        <section className="mb-5">
          <h2 className="mb-4 text-lg font-semibold">outline 버튼</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="sm">
              스몰
            </Button>
            <Button variant="outline" size="md">
              미디움
            </Button>
            <Button variant="outline" size="lg">
              라지
            </Button>
            <Button variant="outline" size="md" disabled>
              disabled
            </Button>
            <Button variant="outline" size="md" icon={<Plus size={18} />}>
              아이콘
            </Button>
          </div>
        </section>

        {/* Ghost Variant */}
        <section className="mb-5">
          <h2 className="mb-4 text-lg font-semibold">ghost 버튼</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="ghost" size="sm">
              스몰
            </Button>
            <Button variant="ghost" size="md">
              미디움
            </Button>
            <Button variant="ghost" size="lg">
              라지
            </Button>
            <Button variant="ghost" size="md" disabled>
              disabled
            </Button>
            <Button variant="ghost" size="md" icon={<Heart size={18} />}>
              아이콘
            </Button>
          </div>
        </section>

        {/* Danger Variant */}
        <section className="mb-5">
          <h2 className="mb-4 text-lg font-semibold">danger 버튼</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="danger" size="sm">
              스몰
            </Button>
            <Button variant="danger" size="md">
              미디움
            </Button>
            <Button variant="danger" size="lg">
              라지
            </Button>
            <Button variant="danger" size="md" disabled>
              disabled
            </Button>
            <Button variant="danger" size="md" icon={<Trash2 size={18} />}>
              아이콘
            </Button>
          </div>
        </section>

        {/* Text Variant */}
        <section className="mb-5">
          <h2 className="mb-4 text-lg font-semibold">text 버튼</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="text" size="sm">
              스몰
            </Button>
            <Button variant="text" size="md">
              미디움
            </Button>
            <Button variant="text" size="lg">
              라지
            </Button>
            <Button variant="text" size="md" disabled>
              disabled
            </Button>
            <Button variant="text" size="md" icon={<Plus size={18} />}>
              아이콘
            </Button>
          </div>
        </section>

        {/* full width sizes */}
        <section className="mb-5">
          <h2 className="mb-4 text-lg font-semibold">풀사이즈 버튼</h2>
          <div className="flex min-w-[500px] flex-col gap-4">
            <Button variant="primary" size="freeWidthMd">
              ull width medium
            </Button>
            <Button variant="secondary" size="freeWidthLg">
              ull width large
            </Button>
            <Button variant="outline" size="freeWidthMd">
              ull width outline
            </Button>
          </div>
        </section>

        {/* button types */}
        <section className="mb-4">
          <h2 className="mb-4 text-lg font-semibold">button types</h2>
          <div className="flex min-w-[500px] flex-wrap gap-4">
            <Button type="button">Button</Button>
            <Button type="submit" variant="primary">
              submit 버튼
            </Button>
            <Button type="reset" variant="secondary">
              reset 버튼
            </Button>
          </div>
        </section>

        <hr className="my-8" />

        <h1 className="mb-8 text-2xl font-bold">
          InputWithLabel 컴포넌트 (InputWithLabel.tsx)
        </h1>

        {/* 인풋 + 라벨 (회원가입 예시) */}
        <section className="max-w-xl rounded-lg border bg-gray-50 p-6">
          <h2 className="mb-6 text-lg font-semibold">회원가입</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputWithLabel
              label="이름"
              name="fullname"
              type="text"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="홍길동"
              icon={<User size={18} />}
              error={errors['fullname']}
              required
            />
            <InputWithLabel
              label="이메일"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              icon={<Mail size={18} />}
              error={errors['email']}
              button={{
                label: '인증번호 전송',
                onClick: handleSendCode,
                variant: 'danger',
                icon: <Send size={18} />,
              }}
              required
            />

            <InputWithLabel
              name="verifyCode"
              type="text"
              value={formData.verifyCode}
              onChange={handleChange}
              placeholder="인증번호 입력"
              error={errors['verifyCode']}
              description="Check your email"
            />

            <InputWithLabel
              label="비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호 입력"
              icon={<Lock size={18} />}
              error={errors['password']}
              description="8자리 이상 입력하세요"
              required
            />
            <div className="mt-5">
              <Button variant="primary" size="freeWidthMd" type="submit">
                가입하기
              </Button>
            </div>
          </form>
        </section>

        <hr className="my-8" />

        <h1 className="mb-8 text-2xl font-bold">
          DropDown 컴포넌트 (DropDown.tsx)
        </h1>

        {/* DropDown Examples */}
        <section className="space-y-12">
          <div>
            <h2 className="mb-4 text-lg font-semibold">스몰 사이즈</h2>
            <DropDown
              title="지역"
              placeholder="지역 선택"
              size="sm"
              options={[
                { text: '서울', icon: <MapPin size={16} /> },
                { text: '경기' },
                { text: '인천' },
                { text: '부산' },
              ]}
              onSelect={(value) => {
                setFormData((prev) => ({ ...prev, country: value }))
                toast.custom((t) => (
                  <Toast
                    id={t}
                    title="선택 완료"
                    message={`${value}를 선택했습니다`}
                    type="success"
                  />
                ))
              }}
            />
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">미디움 사이즈</h2>
            <DropDown
              title="언어 선택"
              placeholder="언어를 선택하세요"
              size="md"
              options={[
                { text: '한국어', icon: <Globe size={16} /> },
                { text: '영어' },
                { text: '일본어' },
                { text: '중국어' },
              ]}
              onSelect={(value) => {
                setFormData((prev) => ({ ...prev, language: value }))
                toast.custom((t) => (
                  <Toast
                    id={t}
                    title="언어 변경"
                    message={`${value}로 설정되었습니다`}
                    type="success"
                  />
                ))
              }}
            />
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold">라지 사이즈</h2>
            <DropDown
              title="카테고리 선택"
              placeholder="카테고리를 선택하세요"
              size="lg"
              options={[
                { text: '카테고리1', icon: <Plus size={18} /> },
                { text: '카테고리2', icon: <Heart size={18} /> },
                { text: '카테고리3', icon: <MapPin size={18} /> },
                { text: '카테고리4', icon: <Globe size={18} /> },
                { text: '카테고리5', icon: <Trash2 size={18} /> },
              ]}
              xButton
              border
              onSelect={(value) => {
                toast.custom((t) => (
                  <Toast
                    id={t}
                    title="카테고리 선택"
                    message={`${value} 선택했습니다`}
                    type="success"
                  />
                ))
              }}
            />
          </div>
          <div className="w-70">
            <h2>title/border 없음 + w-full</h2>
            <DropDown
              placeholder="w-full"
              size="wFree"
              options={[
                { text: 'w-full' },
                { text: '제목 없음' },
                { text: '제목 없음' },
                { text: '제목 없음' },
                { text: '제목 없음' },
                { text: '제목 없음' },
                { text: '제목 없음' },
              ]}
            />
          </div>
          <div className="w-150">
            <h2>w-full : 겉 div로 조절..</h2>
            <DropDown
              placeholder="제목 없음"
              size="wFree"
              options={[{ text: '제목 없음' }, { text: 'w-free' }]}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default CommonTest
