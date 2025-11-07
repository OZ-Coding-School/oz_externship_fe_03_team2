// 내 정보 조회 - - - - - - - - - - - -
export interface MeResponse {
  id: number
  email: string
  nickname: string
  name: string
  phone_number: string
  birthday: string
  profile_img_url: string | null
  created_at: string
}

// 내 정보 수정 - - - - - - - - - - - -
export interface UpdateMeRequest {
  nickname?: string
  profile_img_url?: string | null
  phone_number?: string
  phone_verify_token?: string
}
// 응답 = MeResponse

// 내 정보 수정 (비밀번호 변경) - - - - - -
export interface UpdatePasswordRequest {
  current_password: string
  new_password: string
  new_password_confirm: string
}

// 비밀번호 변경 성공
export interface UpdatePasswordResponse {
  detail: string
}

// 비밀번호 변경 실패
export interface PasswordChangeErrorResponse {
  error: string
}

// 회원 탈퇴 - - - - - - - - - - - - -
export interface MeWithDrawRequest {
  reason: string
  reason_detail: string
}

export interface MeWithDrawResponse {
  detail: string
}

// 북마크한 강의 목록 조희 - - - - - - - -
// 강의
export interface LectureInfo {
  id: number
  uuid: string
  title: string
  instructor: string
  thumbnail_img_url: string
  categories: LectureCategory[]
  platform: string
  difficulty: 'EASY' | 'NORMAL' | 'HARD'
  duration: string
  original_price: number
  discount_price: number
  average_rating: number | string
  url_link: string
  is_bookmarked?: boolean
}

// 카테고리
export interface LectureCategory {
  id: number
  name: string
}

export interface LectureBookmark {
  id: number
  lecture_info: LectureInfo
  created_at: string
}

export interface LectureBookmarksParameter {
  page?: number
  page_size?: number
  search?: string
}

export interface LectureBookmarksResponse {
  detail: string
  data: {
    count: number
    next: string | null
    previous: string | null
    results: LectureBookmark[]
  }
}

// 강의 북마크 삭제 - - - - - - - - -  - - -
// 파라미터 lecture_id: number 인라인으로
// response: detail

// 스터디 구인 공고 북마크 - - - - - - - - - -
export interface BookmarksStudyParameter {
  page?: number
  limit?: number
  search?: string
}

export interface StudyCourse {
  name: string
  instructor: string
}

export interface StudyJobs {
  id: number
  uuid: string
  title: string
  introduction: string
  thumbnail: string
  max_headcount: number
  start_at: string
  end_at: string
  status: 'PENDING' | 'ONGOING' | 'ENDED'
  courses: StudyCourse[]
  tags: string[]
  views: number
  bookmark_count: number
  bookmarked_at: string
}

export interface BookmarksStudyResponse {
  results: StudyJobs[]
  page: number
  limit: number
  total_count: number
  has_next: boolean
}

// 스터디 구인 공고 북마크 추가/삭제 - - - - - -
export interface ToggleBookmarksStudyRequest {
  action?: string
}

export interface ToggleBookmarksStudyResponse {
  id: number
  title: string
  is_bookmarked: boolean
  bookmark_count: number
}

// 내가 지원한 공고 내역 조회 - - - - - - - - -
export interface MyApplicationParameter {
  status?: string
  cursor?: string
}

export interface Application {
  id: number
  status: string
  created_at: string
  recruitment_title: string
  thumbnail: string | null
  expected_headcount: number
  deadline: string
}

export interface MyApplicationResponse {
  items: Application[]
  next_cursor: string | null
}

export interface DetailApplicationResponse {
  id: number
  status: string
  created_at: string
  self_introduction: string
  motivation: string
  objective: string
  available_time: string
  has_study_experience: boolean
  study_experience: string | null
  recruitment: {
    id: number
    title: string
    thumbnail: string | null
    expected_headcount: number
    deadline: string
  }
}

// 스터디 그룹 목록 조회 - - - - - - - -
export interface StudyGroups {
  id: number
  name: string
  current_headcount: number
  max_headcount: number
  is_leader: boolean
  profile_img_url: string
  start_at: string
  end_at: string
  status: 'PENDING' | 'ONGOING' | 'ENDED'
  lectures: Lecture[]
}

export interface Lecture {
  id: number
  title: string
  instructor: string
}

export interface StudyGroupsResponse {
  status: number
  message: string
  data: {
    study_groups: StudyGroups[]
  }
}

// 스터디 그룹 상세 조회 - - - - - - - -
export interface StudyGroupMember {
  id: number
  nickname: string
  is_leader: boolean
}

export interface StudyGroupLectures {
  thumbnail_img_url: string
  title: string
  instructor: string
  url_link: string
}

export interface DetailStudyGroupResponse {
  status: number
  message: string
  data: {
    id: number
    name: string
    current_headcount: number
    max_headcount: number
    members: StudyGroupMember[]
    profile_img_url: string
    start_at: string
    end_at: string
    status: string
    lectures: StudyGroupLectures[]
  }
}

// 스터디 그룹 리뷰 작성 - - - - - - - - - -
export interface StudyGroupReviewRequest {
  star_rating: number
  content: string
}

export interface StudyGroupReviewResponse {
  status: number
  message: string
  data: {
    id: number
    study_group_id: number
    user: {
      id: number
      nickname: string
    }
    star_rating: number
    content: string
    created_at: string
    updated_at: string
  }
}

// 스터디 그룹 리뷰 수정 - - - - - - - - - -
export interface UpdateStudyGroupReviewRequest {
  star_rating?: number
  content?: string
}

export interface UpdateStudyGroupReviewResponse {
  status: number
  message: string
  detail: {
    id: number
    study_group_id: number
    user: { id: number; nickname: string }
    star_rating: number
    content: string
    created_at: string
    updated_at: string
  }
}

// 스터디 그룹 리뷰 그룹별 리뷰 목록 조회 - - - - -
export interface ReviewsByStudyGroupParameter {
  limit?: number
  offset?: number
  sort?: string
  rating?: number
  group_id: number
}

export interface Review {
  id: number
  user: { id: number; nickname: string }
  star_rating: number
  content: string
  created_at: string
}
export interface ReviewsByStudyGroupResponse {
  status: number
  message: string
  data: {
    count: number
    next: string | null
    previous: string | null
    results: Review[]
  }
}

// S3 File Upload 공용 파일 업로드
export interface File {
  file_name: string
  content_type: string
  file_size: number
}

export interface PresignedRequest {
  object_type: 'recruit' | 'study_note' | 'study_group' | 'profile'
  files: File[]
}

export interface PresignedData {
  url: string
  fields: {
    key: string
    policy: string
    'x-amz-signature': string
  }
  file_url: string
  expires_in: number
}

export interface PresignedResponse {
  detail: string
  data: PresignedData[]
}

// presigned Error Type
export interface PresignedError {
  error: {
    [field: string]: string
  }
}

// 휴대폰 변경 인증코드 전송 요청
export interface PhoneVerificationSendRequest {
  phone_number: string
}

// 휴대폰 변경 인증코드 전송 응답
export interface PhoneVerificationSendResponse {
  detail: string
  data: {
    request_id: string
    expires_in: number
    cooldown: number
    max_attempts: number
  }
}

// 휴대폰 변경 인증코드 확인 요청
export interface PhoneVerificationConfirmRequest {
  phone_number: string
  request_id: string
  code: string
}

// 휴대폰 변경 인증코드 확인 응답
export interface PhoneVerificationConfirmResponse {
  detail: string
  data: {
    phone_verify_token: string
  }
}

// 프로필 업데이트 응답
export interface UpdateProfileResponse {
  detail: string
  data: MeResponse
}
