import { useState } from 'react'
import Button from './common/Button'

const AllData = {
  total: 10,
  items: [
    {
      id: 1,
      message: '오즈코딩스쿨 스터디 모집 공고에 대한 지원자가 있습니다.',
      is_read: false,
      link_url: '/recruitments/12/applications',
      created_at: '2025-10-15 09:00:00',
    },
    {
      id: 2,
      message: '스터디 참여에 대한 알림이 있습니다.',
      is_read: true,
      link_url: '/스터디 링크',
      created_at: '2025-10-14 22:00:00',
    },
    {
      id: 3,
      message: '스터디 참여에 대한 알림이 있습니다.',
      is_read: true,
      link_url: '/스터디 링크',
      created_at: '2025-10-14 22:00:00',
    },
    {
      id: 4,
      message: '스터디 참여에 대한 알림이 있습니다.',
      is_read: false,
      link_url: '/스터디 링크',
      created_at: '2025-10-14 22:00:00',
    },
  ],
}

const NotReadData = {
  total: 10,
  items: [
    {
      id: 1,
      message: '오즈코딩스쿨 스터디 모집 공고에 대한 지원자가 있습니다.',
      is_read: false,
      link_url: '/recruitments/12/applications',
      created_at: '2025-10-15 09:00:00',
    },
    {
      id: 2,
      message: '스터디 참여에 대한 알림이 있습니다.',
      is_read: false,
      link_url: '/스터디 링크',
      created_at: '2025-10-14 22:00:00',
    },
  ],
}

const ReadData = {
  total: 10,
  items: [
    {
      id: 1,
      message: '오즈코딩스쿨 스터디 모집 공고에 대한 지원자가 있습니다.',
      is_read: false,
      link_url: '/recruitments/12/applications',
      created_at: '2025-10-15 09:00:00',
    },
    {
      id: 2,
      message: '스터디 참여에 대한 알림이 있습니다.',
      is_read: false,
      link_url: '/스터디 링크',
      created_at: '2025-10-14 22:00:00',
    },
  ],
}

export function NotiBoard() {
  const [mode, setMode] = useState('all')
  return (
    <div>
      <div className="m-1 flex w-full justify-between">
        <p>알림</p>
        <Button variant="text">모두 읽음</Button>
      </div>
      <div>
        <div>
          <p>전체보기</p>
        </div>
        <div>
          <p>읽지 않음</p>
        </div>
        <div>
          <p>읽음</p>
        </div>
      </div>
    </div>
  )
}
