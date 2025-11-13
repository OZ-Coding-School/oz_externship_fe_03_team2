import type { ApplicationStatus } from '../types/apiInterface/mypageInterface'

export type BadgeVariant = 'primary' | 'success' | 'danger'

// 반환 타입 정의
export interface StatusBadgeConfig {
  variant: BadgeVariant
  text: string
}

// 지원 상태에 따른 뱃지 설정 반환
export function getApplicationStatusBadge(
  status: ApplicationStatus
): StatusBadgeConfig {
  switch (status) {
    case 'PENDING':
      return { variant: 'primary', text: '대기중' }
    case 'APPROVED':
      return { variant: 'success', text: '승인됨' }
    case 'REJECTED':
      return { variant: 'danger', text: '거절됨' }
    case 'CANCELED':
      return { variant: 'danger', text: '취소됨' }
    default:
      return { variant: 'primary', text: '대기중' }
  }
}
