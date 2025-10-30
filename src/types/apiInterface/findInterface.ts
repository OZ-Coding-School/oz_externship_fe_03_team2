//- - - - - - - - - - - -
// 이메일 찾기 - 휴대폰 인증코드 전송 (POST)
export interface FindEmailSendCodeRequest {
  phone_number: string
}

export interface FindEmailSendCodeResponse {
  detail: string
  data: {
    request_id: string
    expires_in: number
    cooldown: number
    max_attempts: number
  }
}

//- - - - - - - - - - - -
// 이메일 찾기 - 휴대폰 인증코드 확인
export interface FindEmailConfirmCodeRequest {
  phone_number: string
  code: string
  request_id: string
}

export interface FindEmailConfirmCodeResponse {
  detail: string
  data: {
    verify_token: string
    expires_in: number
  }
}

//- - - - - - - - - - - -
// 아이디(이메일) 찾기 - 인증코드 확인 후 이메일 반환
export interface RecoveryEmailResponse {
  detail: string
  data: {
    email: string
  }
}

//- - - - - - - - - - - -
// 비밀번호 : 이메일 인증코드 전송 (회원가입/정보찾기/정보수정) - 입력된 이메일 주소로 인증코드를 발송 (POST)
export interface EmailVerificationSendCodeRequest {
  email: string
}

export interface EmailVerificationSendCodeResponse {
  detail: string
  purpose: 'signup' | 'reset_password' | 'restore_user' | 'change_email'
  data: {
    request_id: string
    expires_in: number
    cooldown: number
    max_attempts: number
  }
}

//- - - - - - - - - - - -
// 비밀번호: 이메일 인증코드 확인 - 발송된 인증코드를 검증하여 해당 이메일의 인증 상태를 확정
export interface EmailVerificationConfirmCodeRequest {
  email: string
  verification_code: string
  request_id: string
}

export interface EmailVerificationConfirmCodeResponse {
  detail: string
  purpose: string
  data: {
    verify_token: string
    expires_in: number
  }
}

//- - - - - - - - - - - -
// 비밀번호 재설정 - 토큰 검증 후 새 비밀번호로 변경
export interface RecoveryPasswordBody {
  email: string
  new_password: string
  new_password_confirm: string
}

export interface RecoveryPasswordRequest {
  body: RecoveryPasswordBody
  verifyToken: string
}
// Response - detail

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
