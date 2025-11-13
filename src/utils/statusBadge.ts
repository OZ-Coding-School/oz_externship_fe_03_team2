import type { ApplicationStatus } from '../types/apiInterface/mypageInterface'

export const getStatusBadge = (status: ApplicationStatus) => {
  switch (status) {
    case 'PENDING':
      return { variant: 'primary' as const, text: '대기중' }
    case 'APPROVED':
      return { variant: 'success' as const, text: '승인됨' }
    case 'REJECTED':
      return { variant: 'danger' as const, text: '거절됨' }
    case 'CANCELED':
      return { variant: 'danger' as const, text: '취소됨' }
    default:
      return { variant: 'primary' as const, text: '대기중' }
  }
}
