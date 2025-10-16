import { ArrowDown, ArrowUp, UsersRound } from 'lucide-react'

export interface StatCardProps {
  title: string
  headCount: number
  percentage: number
  size?: string
}

export default function StatCards({
  title,
  headCount,
  percentage,
  size = 'w-[24rem] h-auto',
}: StatCardProps) {
  return (
    <div
      className={`flex justify-between rounded-lg border-2 border-gray-200 bg-white p-[1.5625rem] select-none ${size} `}
    >
      <div className="flex flex-col gap-1">
        <p className="text-[.875rem]">{title}</p>
        <p className="text-[1.875rem] font-extrabold">{headCount}</p>
        {percentage > 0 ? (
          <p className="text-success-600 flex items-center gap-1 text-[.875rem]">
            <ArrowUp size={15} /> +{percentage}% 증가
          </p>
        ) : percentage < 0 ? (
          <p className="text-danger-600 flex items-center gap-1 text-[.875rem]">
            <ArrowDown size={15} /> {percentage}% 감소
          </p>
        ) : (
          <p className="text-[.875rem] text-gray-400">
            {percentage}% 변화 없음
          </p>
        )}
      </div>
      <div className="bg-primary-100 text-primary-600 flex h-[3rem] w-[3rem] items-center justify-center self-center rounded-full">
        <UsersRound size={25} />
      </div>
    </div>
  )
}
