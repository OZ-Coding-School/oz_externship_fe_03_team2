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
// X-Verify-Token: string  (인라인)

export interface RecoveryEmailResponse {
  detail: string
  data: {
    email: string
  }
}

//- - - - - - - - - - - -
// 비밀번호 재설정 - 토큰 검증 후 새 비밀번호로 변경
export interface RecoveryPasswordRequest {
  new_password: string
  new_password_confirm: string
}
// Response - detail

//- - - - - - - - - - - -
// 이메일 인증코드 전송 (회원가입/정보찾기/정보수정) - 입력된 이메일 주소로 인증코드를 발송 (POST)
export interface EmailVerificationSendCodeRequest {
  email: string
  purpose: 'signup' | 'restore_user'
}

export interface EmailVerificationSendCodeResponse {
  detail: string
  data: {
    expires_in: number
    cooldown: number
  }
}

//- - - - - - - - - - - -
// 이메일 인증코드 확인 - 발송된 인증코드를 검증하여 해당 이메일의 인증 상태를 확정
export interface EmailVerificationConfirmCodeRequest {
  email: string
  code: string
  purpose?: 'signup' | 'restore_user'
  request_id?: string
}

export interface EmailVerificationConfirmCodeResponse {
  detail: string
  data: {
    email: string
    verified: boolean
    purpose?: 'signup' | 'restore_user'
    verification_token: string
    expires_in: number
  }
}
