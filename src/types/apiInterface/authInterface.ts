//회원가입-----------------------
export interface SignUpRequest {
  email: string
  password: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  gender: 'M' | 'F' | ''
  role?: 'user' | 'staff' | 'superuser'
}

export interface SignUpResponse {
  detail: string
}

//닉네임----------------------------
export interface NickNameResponse {
  detail: string
}

//핸드폰 인증-----------------------
export interface PhoneSendRequest {
  phone_number: string
}

export interface PhoneSendResponse {
  detail: string
  data: {
    request_id: string
    expires_in: number
    cooldown: number
    max_attempts: number
  }
}

export interface PhoneConfirmRequest {
  phone_number: string
  code: string
  request_id: string
}

export interface PhoneConfirmResponse {
  detail: string
  data: {
    verify_token: string
    expires_in: number
  }
}

//이메일 인증-----------------------
export interface EmailSendRequest {
  email: string
}

export interface EmailSendResponse {
  detail: string
  purpose: string
  data: {
    request_id: string
    expires_in: number
    cooldown: number
    max_attempts: number
  }
}

export interface EmailConfirmRequest {
  email: string
  verification_code: string
  purpose?: string
  request_id?: string
}

export interface EmailConfirmResponse {
  detail: string
  purpose: string
  data: {
    verify_token: string
    expires_in: number
  }
}

//로그인----------------------------
export interface UserLoginRequest {
  email: string
  password: string
}

export interface UserLoginResponse {
  detail: string
  data: {
    access: string
  }
}

//엑세스 토큰 갱신---------
export interface Refresh {
  detail: string
  data: {
    access_token: string
    token_type: string
    expires_in: number
  }
}

//로그아웃----------------
export interface Logout {
  detail: string
}

//소셜 로그인 - 카카오----------------
export interface KakaoLoginRequest {
  code: string
}

export interface KakaoLoginResponse {
  detail: string
  data: {
    user: {
      id: number
      email: string
      name: string
      nickname: string
      phone_number: string
      birthday: string
      gender: string
      profile_img_url: string
      social_provider: string
    }
    access_token: string
    token_type: string
    access_token_expires_in: number
  }
}

//소셜 로그인 - 네이버----------------
export interface NaverLoginRequest {
  code: string
  state: string
}

export interface NaverLoginResponse {
  detail: string
  data: {
    user: {
      id: number
      email: string
      name: string
      nickname: string
      phone_number: string
      birthday: string
      gender: string
      profile_img_url: string
      social_provider: string
    }
    access_token: string
    token_type: string
    access_token_expires_in: number
  }
}

//오류
export interface Errors {
  error: string
  errors?: {
    email?: string[]
    password?: string[]
    nickname?: string[]
    name?: string[]
    phone_number?: string[]
    birthday?: string[]
    gender?: string[]
    role?: string[]
  }
}
