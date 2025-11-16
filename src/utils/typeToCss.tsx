import {
  BadgeAlert,
  Bell,
  CalendarCheck2,
  CalendarClock,
  CalendarPlus,
  Check,
  Plus,
  Star,
  UserRoundPlus,
  X,
} from 'lucide-react'
import type { ReactNode } from 'react'

export const typeToIcon = (type: string): ReactNode => {
  const typeMap: Record<string, ReactNode> = {
    APPLICATIONS_CREATED: <Plus />,
    APPLICATIONS_STATUS_APPROVAL: <Check />,
    APPLICATIONS_STATUS_REJECTION: <X />,
    STUDY_MEMBER_JOINED: <UserRoundPlus />,
    STUDY_REVIEW_REQUEST: <Star />,
    STUDY_SCHEDULE_UPCOMING: <CalendarClock />,
    STUDY_SCHEDULE_TODAY: <CalendarCheck2 />,
    STUDY_RECORD_CREATED: <CalendarPlus />,
    SYSTEM: <BadgeAlert />,
    CUSTOM: <Bell />,
  }
  return typeMap[type]
}

export const typeToColor = (type: string): string => {
  const typeMap: Record<string, string> = {
    APPLICATIONS_CREATED: 'bg-[#DBEAFE] text-[#2563EB]',
    APPLICATIONS_STATUS_APPROVAL: 'bg-[#DCFCE7] text-[#16A34A]',
    APPLICATIONS_STATUS_REJECTION: 'bg-[#FEE2E2] text-[#DC2626]',
    STUDY_MEMBER_JOINED: 'bg-[#F3E8FF] text-[#9333EA]',
    STUDY_REVIEW_REQUEST: 'bg-[#F3E8FF] text-[#9333EA]',
    STUDY_SCHEDULE_UPCOMING: 'bg-[#F3E8FF] text-[#9333EA]',
    STUDY_SCHEDULE_TODAY: 'bg-[#F3E8FF] text-[#9333EA]',
    STUDY_RECORD_CREATED: 'bg-[#F3E8FF] text-[#9333EA]',
    SYSTEM: 'bg-[#e5e7eb] text-[#4b5563]',
    CUSTOM: 'bg-[#fef9c3] text-[#eab308]',
  }
  return typeMap[type]
}
