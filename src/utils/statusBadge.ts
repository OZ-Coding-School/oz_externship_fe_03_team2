export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'APPLIED':
      return { variant: 'primary' as const, text: '대기중' }
    case 'APPROVED':
      return { variant: 'success' as const, text: '승인됨' }
    case 'REJECTED':
      return { variant: 'danger' as const, text: '거절됨' }
    default:
      return { variant: 'primary' as const, text: '대기중' }
  }
}
