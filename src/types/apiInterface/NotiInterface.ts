// 헤더 알림

export interface NotificationParams {
  is_read?: boolean
}

export interface NotiItem {
  id: number
  message: string
  is_read: boolean
  link_url: string
  created_at: string
}
// 알림 목록 조회
export interface NotificationResponse {
  total: number
  items: NotiItem[]
}

// - - -
