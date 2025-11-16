// 헤더 알림

import type { ReactNode } from 'react'

export interface NotificationParams {
  is_read?: boolean
}

// export interface NotiItem {
//   id: number
//   message: string
//   is_read: boolean
//   link_url: string
//   created_at: string
// }

export interface NotiItem {
  id: number
  type?:
    | 'APPLICATIONS_CREATED'
    | 'APPLICATIONS_STATUS_APPROVAL'
    | 'APPLICATIONS_STATUS_REJECTION'
    | 'STUDY_MEMBER_JOINED'
    | 'STUDY_REVIEW_REQUEST'
    | 'STUDY_SCHEDULE_UPCOMING'
    | 'STUDY_SCHEDULE_TODAY'
    | 'STUDY_RECORD_CREATED'
    | 'SYSTEM'
    | 'CUSTOM'
  content: string
  created_at: string
  back_url_link: string
  is_read: boolean
  user_id?: number
  type_display?: string
  user?: number
}

// 알림 목록 조회
// export interface NotificationResponse {
//   total: number
//   items: NotiItem[]
// }

export interface NotificationResponse {
  count: number
  next: string | null
  previous: string | null
  results: NotiItem[]
}

// - - -
