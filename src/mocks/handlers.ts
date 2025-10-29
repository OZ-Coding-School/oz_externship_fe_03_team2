import { http, HttpResponse, type HttpHandler } from 'msw'
import type { UserType } from '../store/useUserStore'
import { type FindEmailSendCodeRequest } from '../types/apiInterface/findInterface'

const url = import.meta.env.VITE_API_BASE_URL

// 1. 타입정의
// API 명세서의 "요청 Body"와 "응답"을 그대로 복사해서 타입으로 만들기

// type 요청이름Request = {
//   // 명세서의 요청 Body 필드 그대로 복사
// }

// type 응답이름Response = {
//   // 명세서의 응답 필드 그대로 복사
// }

// 2. 더미데이터
// API 명세서의 응답 예시를 그대로 복사

// const mock데이터: 응답이름Response = {
//   // 응답 예시 그대로 복사
// }

// 3. 핸들러 추가
// handlers 배열에 추가

// export const handlers: HttpHandler[] = [
//   // 기존 핸들러들...

//   // 새 핸들러 추가
//   http.메서드<never, 요청타입>( //제네릭이 있는경우 (없을경우 타입지정 안해도됨, 아래 여러예시 참고)
//     `${url}/엔드포인트`,
//     async ({ request }) => {
//       const data = await request.json() //요청 값이 있을때만

//       // 필요하면 검증 로직 추가
//       // if (조건) {
//       //   return HttpResponse.json({ message: '에러' }, { status: 400 })
//       // }

//       return HttpResponse.json<응답타입>(mock데이터)
//     }
//   ),
// ]

// 로그인
type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  access_token: string
  user: UserType
}

// 프로필 수정
type UpdateProfileRequest = {
  nickname?: string
  profile_image_url?: string
  phone_number?: string
  verify_token?: string
}

// 비밀번호 변경
type PasswordChangeRequest = {
  current_password: string
  new_password: string
  new_password_confirm: string
}

// 이메일 인증
type EmailVerificationRequest = {
  email: string
}

type EmailVerificationResponse = {
  message: string
  verify_token: string
}

// ===================================
// 더미 데이터
let mockUser: UserType = {
  id: 1,
  email: 'test@test.com',
  nickname: '김개발',
  profile_image_url: 'https://oz.com/image/ozdev.png',
  phone_number: '01012345678',
}

// 핸들러 배열
export const handlers: HttpHandler[] = [
  // 로그인
  http.post<never, LoginRequest>(
    `${url}/v1/auth/login`,
    async ({ request }) => {
      const { email, password } = await request.json()

      if (email === 'test@test.com' && password === 'Qwe123@@') {
        return HttpResponse.json<LoginResponse>({
          access_token: 'mock_access_token_' + Date.now(),
          user: mockUser,
        })
      }

      return HttpResponse.json(
        { message: '이메일 또는 비밀번호가 잘못되었습니다' },
        { status: 409 }
      )
    }
  ),

  // 로그아웃
  http.post(`${url}/v1/auth/logout`, () => {
    return HttpResponse.json({ message: '로그아웃 되었습니다' })
  }),

  // 토큰 갱신
  http.post(`${url}/v1/auth/refresh`, () => {
    return HttpResponse.json({
      access_token: 'mock_refreshed_token_' + Date.now(),
    })
  }),

  // 내 정보 조회
  http.get(`${url}/v1/me`, ({ request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: '인증이 필요합니다' },
        { status: 401 }
      )
    }

    return HttpResponse.json<UserType>(mockUser)
  }),

  // 내 정보 수정 - 일반 정보
  http.patch<never, UpdateProfileRequest>(
    `${url}/v1/me`,
    async ({ request }) => {
      const updates = await request.json()

      mockUser = {
        ...mockUser,
        ...updates,
      }

      return HttpResponse.json<UserType>(mockUser)
    }
  ),

  // 내 정보 수정 - 비밀번호 변경
  http.patch<never, PasswordChangeRequest>(
    `${url}/v1/me/password`,
    async ({ request }) => {
      const { current_password, new_password, new_password_confirm } =
        await request.json()

      if (current_password === 'current') {
        return HttpResponse.json(
          { message: '현재 비밀번호가 일치하지 않습니다' },
          { status: 400 }
        )
      }

      if (new_password !== new_password_confirm) {
        return HttpResponse.json(
          { message: '새 비밀번호가 일치하지 않습니다' },
          { status: 400 }
        )
      }

      return HttpResponse.json({ message: '비밀번호가 변경되었습니다' })
    }
  ),

  // 이메일 인증코드 전송
  http.post<never, EmailVerificationRequest>(
    `${url}/v1/email-verifications/email-change/send-code`,
    async ({ request }) => {
      const { email } = await request.json()

      if (email === 'abc@test.com') {
        return HttpResponse.json(
          { message: '이미 사용 중인 이메일입니다' },
          { status: 409 }
        )
      }

      return HttpResponse.json<EmailVerificationResponse>({
        message: '인증 코드가 전송되었습니다',
        verify_token: 'mock_verify_token_' + Date.now(),
      })
    }
  ),

  // 이메일 찾기 - 휴대폰 인증코드 전송 (POST)
  http.post<never, FindEmailSendCodeRequest>(
    `${url}/v1/phone-verifications/find-email/send-code`,
    async ({ request }) => {
      const { phone_number } = await request.json()

      if (phone_number.length < 10) {
        return HttpResponse.json(
          { message: '휴대폰 번호 형식이 올바르지 않습니다.' },
          { status: 400 }
        )
      }
      return HttpResponse.json({ message: '인증 코드가 전송되었습니다' })
    }
  ),
]
