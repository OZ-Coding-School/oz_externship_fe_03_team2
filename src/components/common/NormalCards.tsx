import { Button } from './Button'

export interface NormalCardProps {
  title: string
  description: string
  size?: string
}

export default function NormalCards({
  title,
  description,
  size = 'w-[24rem] h-auto',
}: NormalCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-lg border-2 border-gray-200 bg-white p-[1.5625rem] select-none ${size} `}
    >
      <p className="text-[1.125rem] font-bold">{title}</p>
      <p className="[word-break:keep-all]">{description}</p>
      <div className="flex justify-end">
        <Button size="sm">더보기</Button>
      </div>
    </div>
  )
}
