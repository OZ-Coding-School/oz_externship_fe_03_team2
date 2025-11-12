import { useEffect, useState } from 'react'
import InputWithLabel from '../components/common/InputWithLabel'
import Header from '../components/layout/Header'
import Button from '../components/common/Button'
import { Link, useNavigate } from 'react-router'
import Gender from '../components/signup/Gender'
import useDebounce from '../hooks/useDebounce'
import validateAll from '../utils/validators'
import { phoneFormat } from '../utils/phoneFormat'
import {
  useEmailConfirm,
  useEmailSend,
  useNickNameConfirm,
  usePhoneConfirm,
  usePhoneSend,
  useSignUp,
} from '../api/services/Auth'
import { birthdayFormat2 } from '../utils/dateFormat'
import { showToast } from '../utils/showToast'
import useDocumentTitle from '../hooks/useDocumentTitle'

export interface Form {
  name: string
  nickname: string
  birthday: string
  gender: 'M' | 'F' | ''
  email: string
  phone_number: string
  password: string
  passwordConfirm: string
  emailCode: string
  phoneCode: string
}

interface REQUEST_ID {
  emailRequestId: string
  emailExpiresIn: number
  emailCooldown: number
  phoneRequestId: string
  phoneExpiresIn: number
  phoneCooldown: number
}

interface VERIFYTOKEN {
  emailToken: string
  phoneToken: string
}

const FORM_STATE: Form = {
  name: '',
  nickname: '',
  birthday: '',
  gender: '',
  email: '',
  phone_number: '',
  password: '',
  passwordConfirm: '',
  emailCode: '',
  phoneCode: '',
}

const CONFIRM_STATE = {
  emailSent: false,
  emailVerify: false,
  phoneSent: false,
  phoneVerify: false,
  nickConfirm: false,
}

const REQUEST_STATE: REQUEST_ID = {
  emailRequestId: '',
  emailExpiresIn: 0,
  emailCooldown: 0,
  phoneRequestId: '',
  phoneExpiresIn: 0,
  phoneCooldown: 0,
}

const VERIFYTOKEN_STATE: VERIFYTOKEN = {
  emailToken: '',
  phoneToken: '',
}

const switchInput = (name: string, value: string): string => {
  const numberOnly = value.replace(/\D/g, '')

  switch (name) {
    case 'birthday':
      return numberOnly.slice(0, 8)
    case 'phone_number':
      return numberOnly.slice(0, 11)
    case 'emailCode':
    case 'phoneCode':
      return numberOnly.slice(0, 6)
    default:
      return value
  }
}

function SignUpPage() {
  useDocumentTitle('회원가입')
  const navigate = useNavigate()

  const [form, setForm] = useState<Form>(FORM_STATE)
  const [confirm, setConfirm] = useState(CONFIRM_STATE) // 인증번호 전송 및 확인
  const [requestId, setRequestId] = useState(REQUEST_STATE)
  const [error, setError] = useState<Record<string, string>>({})
  const [checkNickname, setCheckNickname] = useState(false)
  const [verifyToken, setVerifyToken] = useState(VERIFYTOKEN_STATE)

  const {
    data: nickNameData,
    error: nicknameError,
    isError: isNicknameError,
  } = useNickNameConfirm(form.nickname, checkNickname)
  const { mutate: signUp, isPending: isSignup } = useSignUp()
  const { mutate: sendEmail } = useEmailSend()
  const { mutate: confirmEmail } = useEmailConfirm()
  const { mutate: sendPhone } = usePhoneSend()
  const { mutate: confirmPhone } = usePhoneConfirm()

  useEffect(() => {
    if (checkNickname) {
      if (nickNameData) {
        setConfirm((prev) => ({ ...prev, nickConfirm: true }))
        showToast(nickNameData.detail, 'success', '닉네임 중복 확인')
        setCheckNickname(false)
      } else if (isNicknameError) {
        showToast(
          nicknameError?.response?.data?.error || '닉네임 확인 실패',
          'error',
          '닉네임 중복 확인'
        )
        setCheckNickname(false)
      }
    }
  }, [checkNickname, nickNameData, isNicknameError, nicknameError])

  const debounceForm = useDebounce(form, 500)
  useEffect(() => {
    const validator = validateAll(debounceForm)
    setError((prev) => ({ ...prev, ...validator }))
  }, [debounceForm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: switchInput(name, value),
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
    if (name === 'phone_number') {
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

    signUp(
      {
        body: {
          name: form.name,
          nickname: form.nickname,
          birthday: birthdayFormat2(form.birthday),
          gender: form.gender,
          email: form.email,
          phone_number: form.phone_number,
          password: form.password,
        },
        headers: {
          'X-Email-Verify-Token': verifyToken.emailToken,
          'X-Phone-Verify-Token': verifyToken.phoneToken,
        },
      },
      {
        onSuccess: (data) => {
          setForm(FORM_STATE)
          setConfirm(CONFIRM_STATE)
          setRequestId(REQUEST_STATE)
          setError({})
          showToast(`${data.detail}`, 'success', '회원가입')
          navigate('/login')
        },
        onError: (error) => {
          showToast(`${error.response?.data.error}`, 'error', '회원가입')
          if (error.response?.data.errors) {
            const APIError = error.response.data.errors
            const APIErrors: Record<string, string> = {}

            Object.entries(APIError).forEach(([key, value]) => {
              if (value && value.length > 0) {
                APIErrors[key] = value[0]
              }
            })
            setError(APIErrors)
          }
        },
      }
    )
  }

  //닉네임 중복 확인--------------
  const nicknameConfirm = () => {
    setCheckNickname(true)
  }
  //이메일 코드 전송--------
  const emailSend = () => {
    sendEmail(
      { email: form.email },
      {
        onSuccess: (data) => {
          setConfirm((prev) => ({ ...prev, emailSent: true }))
          setRequestId((prev) => ({
            ...prev,
            emailRequestId: data.data.request_id,
            emailExpiresIn: data.data.expires_in,
            emailCooldown: data.data.cooldown,
          }))
          console.log(requestId.emailCooldown)
          showToast(`${data.detail}`, 'success', '이메일 코드 전송')
        },
        onError: (error) => {
          showToast(
            `${error.response?.data.error}`,
            'error',
            '이메일 코드 전송'
          )
        },
      }
    )
  }
  //이메일 코드 확인----------
  const emailVerify = () => {
    confirmEmail(
      {
        email: form.email,
        verification_code: form.emailCode,
        request_id: requestId.emailRequestId,
      },
      {
        onSuccess: (data) => {
          setConfirm((prev) => ({ ...prev, emailVerify: true }))
          setVerifyToken((prev) => ({
            ...prev,
            emailToken: data.data.email_verify_token,
          }))
          showToast(`${data.detail}`, 'success', '이메일 코드 확인')
        },
        onError: (error) => {
          showToast(
            `${error.response?.data.error}`,
            'error',
            '이메일 코드 확인'
          )
        },
      }
    )
  }
  //핸드폰 코드 전송--------
  const phoneSent = () => {
    sendPhone(
      { phone_number: form.phone_number },
      {
        onSuccess: (data) => {
          setConfirm((prev) => ({ ...prev, phoneSent: true }))
          setRequestId((prev) => ({
            ...prev,
            phoneRequestId: data.data.request_id,
            phoneExpiresIn: data.data.expires_in,
            phoneCooldown: data.data.cooldown,
          }))
          showToast(`${data.detail}`, 'success', '핸드폰 코드 전송')
        },
        onError: (error) => {
          showToast(
            `${error.response?.data.error}`,
            'error',
            '핸드폰 코드 전송'
          )
        },
      }
    )
  }
  //핸드폰 코드 확인----------
  const phoneVerify = () => {
    confirmPhone(
      {
        phone_number: form.phone_number,
        code: form.phoneCode,
        request_id: requestId.phoneRequestId,
      },
      {
        onSuccess: (data) => {
          setConfirm((prev) => ({ ...prev, phoneVerify: true }))
          setVerifyToken((prev) => ({
            ...prev,
            phoneToken: data.data.phone_verify_token,
          }))
          showToast(`${data.detail}`, 'success', '핸드폰 코드 확인')
        },
        onError: (error) => {
          showToast(
            `${error.response?.data.error}`,
            'error',
            '핸드폰 코드 확인'
          )
        },
      }
    )
  }

  const isFormValid = () => {
    const requiredFields = [
      'name',
      'nickname',
      'birthday',
      'email',
      'phone_number',
      'password',
      'passwordConfirm',
    ] as const
    const hasAllFields = requiredFields.every(
      (field) => form[field] && !error[field]
    )
    const hasGender = form.gender !== ''
    const hasVerifications =
      confirm.emailVerify && confirm.phoneVerify && confirm.nickConfirm

    return hasAllFields && hasGender && hasVerifications
  }

  const formSubmit = isFormValid()

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
          <Link to={'/login'} className="text-primary-600 cursor-pointer">
            로그인하기
          </Link>
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
                size: 'signup',
                disabled: !(form.nickname && !error['nickname']),
              }}
            />
          </div>
          <InputWithLabel
            label="생년월일"
            name="birthday"
            value={birthdayFormat2(form.birthday)}
            error={error['birthday']}
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
                  size: 'signup',
                  disabled: !(form.email && !error['email']),
                  countdown: requestId.emailExpiresIn,
                  cooldown: requestId.emailCooldown,
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
                  size: 'signup',
                  disabled: !(
                    form.emailCode &&
                    !error['emailCode'] &&
                    confirm.emailSent &&
                    !confirm.emailVerify
                  ),
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-3">
              <InputWithLabel
                label="휴대전화"
                name="phone_number"
                type="tel"
                value={phoneFormat(form.phone_number)}
                error={error['phone_number']}
                required
                placeholder="01012345678"
                onChange={handleChange}
                button={{
                  label: '인증코드전송',
                  onClick: phoneSent,
                  variant: 'signup',
                  size: 'signup',
                  disabled: !(form.phone_number && !error['phone_number']),
                  countdown: requestId.phoneExpiresIn,
                  cooldown: requestId.phoneCooldown,
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
                  size: 'signup',
                  disabled: !(
                    form.phoneCode &&
                    !error['phoneCode'] &&
                    confirm.phoneSent &&
                    !confirm.phoneVerify
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
        <Button
          type="submit"
          size="freeWidthLg"
          disabled={!formSubmit && isSignup}
        >
          가입하기
        </Button>
      </form>
    </div>
  )
}

export default SignUpPage
