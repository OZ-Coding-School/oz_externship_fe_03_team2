export interface ErrorResponse {
  message: string
  code?: string
}

export interface ErrorInfo {
  title: string
  message: string
}

// 상태코드 에러 메세지
export const ERROR_MESSAGES: Record<number, ErrorInfo> = {
  400: { title: '입력 오류', message: '요청 데이터가 올바르지 않습니다' },
  401: { title: '인증 실패', message: '다시 로그인해주세요' },
  403: { title: '접근 거부', message: '접근 권한이 없습니다' },
  404: { title: '요청 실패', message: '요청한 리소스를 찾을 수 없습니다' },
  409: { title: '요청 실패', message: '이미 존재하는 데이터입니다' },
  500: { title: '서버 오류', message: '서버에 문제가 발생했습니다' },
}

// 네트워크 에러 메시지
export const NETWORK_ERROR_MESSAGES: Record<string, ErrorInfo> = {
  ECONNABORTED: {
    title: '요청 시간 초과',
    message: '요청이 시간 초과되었습니다',
  },
  ENOTFOUND: { title: '네트워크 오류', message: '서버에 연결할 수 없습니다' },
  ECONNREFUSED: { title: '연결 거부', message: '서버가 요청을 거부했습니다' },
  ERR_NETWORK: {
    title: '네트워크 오류',
    message: '네트워크 연결을 확인해주세요',
  },
}
