// 헤더 알림

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
  user_id: number
  type_display: string
  //이거뭐임
  content: string
  type:
    | 'APPLICATION_CREATED'
    | 'APPLICATION_STATUS_APPROVAL'
    | 'APPLICATION_STATUS_REJECTION'
    | 'STUDY_MEMBER_JOINED'
    | 'STUDY_REVIEW_REQUEST'
    | 'STUDY_SCHEDULE_UPCOMING'
    | 'STUDY_SCHEDULE_TODAY'
    | 'STUDY_RECORD_CREATED'
    | 'SYSTEM'
    | 'CUSTOM'
  is_read: boolean
  back_url_link: string
  user: number
  //이거 뭐임
  //이중에서 보낸 사람 이름은 뭐지?
  //created_at 왜 없지
}

// 알림 목록 조회
// export interface NotificationResponse {
//   total: number
//   items: NotiItem[]
// }

export interface NotificationResponse {
  count: number
  next: string
  previous: string
  results: NotiItem[]
}

// - - -
