// 닉네임 관련 상태 초기화
export const INIT_NICKNAME_CHECK = {
  needsCheck: false,
  completed: false,
  isUse: false,
}

// 인증코드 관련 상태 초기화
export const INITL_VERIFICATION = {
  showInput: false,
  code: '',
  isVerified: false,
  requestId: '',
  verifyToken: '',
  errorMessage: '',
}
