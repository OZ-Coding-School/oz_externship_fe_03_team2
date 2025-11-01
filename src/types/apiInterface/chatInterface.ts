export interface ChatType {
  status: string
  code: string
  message: string
  data: {
    messages: Chat[]
    pagination: {
      page: number
      page_size: number
      total_count: number
    }
  } | null
}

export interface Chat {
  id: number
  sender_id: number
  sender_nickname: string
  study_group_id: number
  content: string
  file_url: null
  is_read: boolean
  created_at: string
}
