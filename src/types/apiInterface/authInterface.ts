// 사용자 회원 가입

export interface SignupRequestBody {
  email: string
  password: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  gender: 'male' | 'female' | 'other' | 'unknown'
  role?: 'user' | 'staff' | 'superuser'
}

export interface User {
  id: number
  email: string
  password: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  gender: 'male' | 'female' | 'other' | 'unknown'
  role?: 'user' | 'staff' | 'superuser'
  profile_image_url?: string
  created_at: string
}

export interface SignupResponse {
  detail: string
  data: {
    user: User
  }
}

// - - - - - - - -
// 닉네임 중복 확인

export interface CheckNicknameResponse {
  detail: string
  data: {
    nickname: string
    available: boolean
    reason?: string
    // 중복된 경우 response의 reason이 duplicate | reserved '등'이라서 일단 string으로 해놓음
  }
}

// - - - - - - - - -
// 이메일 인증코드 전송
export interface EmailSendCodeRequest {
  email: string
  purpose: 'signup' | 'restore_user'
}

export interface EmailSendCodeResponse {
  detail: string
  data: {
    expires_in: number
    cooldown: number
  }
}

// 이메일 인증코드 확인
export interface EmailConfirmCodeRequest {
  email: string
  code: number
  purpose?: 'signup' | 'restore_user'
  request_id?: string
}

export interface EmailConfirmCodeResponse {
  detail: string
  data: {
    email: string
    verified: boolean
    purpose: string
    verification_token?: string
    expires_in?: number
  }
}

// - - - -- - - --
//  휴대폰 인증코드 전송 (회원가입/아이디 찾기) - 공개용
export interface PhonePublicSendCodeRequest {
  phone_number: string
  purpose: 'signup' | 'find_email'
}

export interface PhoneSendCodeResponse {
  // 얘는 휴대폰 인증코드 전송(휴대폰번호 변경) - 인증용의 response랑 똑같으니 둘 다 이 타입 쓰면 됨
  detail: string
  data: {
    request_id: string
    expires_in: number
    cooldown: number
    max_attempts: number
  }
}

// 휴대폰 인증코드 확인 (회원가입/아이디찾기) - 공개용
export interface PhonePublicConfirmCodeRequest {
  phone_number: string
  purpose: 'signup' | 'find_email'
  code: string
  request_id: string //본문필드에 request_id 관련 내용은 없는데 추후 확인해볼 것
}

export interface PhoneConfirmCodeResponse {
  // 얘도 4-4 response랑 같음
  detail: string
  data: {
    verify_token: string
    expires_in: number
  }
}

// 휴대폰 인증코드 전송 (휴대폰 번호 변경)- 인증용
export interface PhoneChangeSendCodeRequest {
  phone_number: string
}

// 휴대폰 인증코드 확인 (휴대폰 번호 변경) - 인증용
export interface PhoneChangeConfirmCodeRequest {
  phone_number: string
  code: string
  request_id: string
}

// - - - - - - - - - - - -
// 사용자 로그인
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  detail: string
  data: {
    access_token: string
    token_type: string
    user: Pick<User, 'id' | 'email' | 'nickname'>
  }
}

// - - - - - - - - - - -
// 액세스 토큰 갱신
// 쿠키에서 토큰 가져와서 request는 타입 지정 필요 없음 (void로 하면 됨)
export interface RefreshResponse {
  detail: string
  data: {
    access_token: string
    token_type: string
    expires_in: number
  }
}

//- - - - - - - - - - - -
// 로그아웃
// 얘는 request도 토큰에서 가져와서 타입 지정 필요 없고
// response도 detail로 하면 됨

// - - - - - - - - - - - - - -
// 13. 소셜 회원가입, 로그인 (카카오)
export interface SocialKakaoRequest {
  // 카카오 인증 흐름: 프론트엔드 → 카카오 OAuth 인증 → access_token 발급 → 해당 토큰을 서버에 전달하여 사용자 정보 검증 및 JWT 발급
  access_token: string
}

export interface SocialLoginResponse {
  detail: string
  data: {
    user: User
    access_token: string
    token_type: string
    access_token_expires_in: number
  }
}

// - - - - - - - - - - - - - -
// 14. 소셜 회원가입, 로그인 (네이버))
export interface SocialNaverRequest {
  code: string
  state: string
}

// - - - - - - - - - - - - - -
// 단순한 에러 응답
export interface SimpleError {
  error: string
}

// 복잡한 에러 응답
export interface ComplexErrors {
  error: string
  errors?: {
    [field: string]: string[]
    // string들이 모인 배열이다..
  }
}

// 단순한 응답
export interface Detail {
  detail: string
}
