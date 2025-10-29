// 헤더 알림

// 쿼리파라미터 is_read: boolean
export interface NotiItem {
  id: number
  message: string
  is_read: boolean
  link_url: string
  created_at: string
}

export interface NotificationResponse {
  total: number
  items: NotiItem[]
}

// error: Detail
