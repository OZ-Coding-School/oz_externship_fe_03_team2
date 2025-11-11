export interface ImageCardProps {
  title: string
  description: string
  date: string
  imageUrl: string
  size?: string
  onClick?: () => void
}

export default function ImageCards({
  title,
  description,
  date,
  imageUrl,
  onClick,
  size = 'w-[389.33px] h-[387.88px]',
}: ImageCardProps) {
  return (
    <div
      className={`${size} relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-transform duration-300 select-none hover:-translate-y-[.3rem] hover:shadow-[0_0_.9375rem_#00000020]`}
    >
      <div className="h-[217.86px] w-full">
        <img
          className="h-full w-full object-cover"
          src={imageUrl}
          alt={title}
        />
      </div>
      <div
        className={`absolute bottom-0 flex w-full flex-col gap-3 rounded-b-lg border-2 border-gray-200 bg-white p-[1.5625rem]`}
      >
        <p className="text-[1.125rem] font-bold">{title}</p>
        <p className="[word-break:keep-all]">{description}</p>
        <div className="flex justify-between">
          <p className="text-[.875rem] font-light text-gray-500">{date}</p>
        </div>
      </div>
    </div>
  )
}
