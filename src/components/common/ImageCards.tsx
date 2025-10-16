export interface ImageCardProps {
  title: string
  description: string
  date: string
  imageUrl: string
  size?: string
}

export default function ImageCards({
  title,
  description,
  date,
  imageUrl,
  size = 'w-[24rem] h-[17.375rem]',
}: ImageCardProps) {
  return (
    <div
      className={`${size} relative rounded-lg duration-300 select-none hover:-translate-y-[.3rem] hover:shadow-[0_0_.9375rem_#00000020] hover:transition-all`}
    >
      <img className="h-full w-full rounded-lg object-cover" src={imageUrl} />
      <div
        className={`absolute bottom-0 flex w-full flex-col gap-3 rounded-b-lg border-2 border-gray-200 bg-white p-[1.5625rem]`}
      >
        <p className="text-[1.125rem] font-bold">{title}</p>
        <p className="[word-break:keep-all]">{description}</p>
        <div className="flex justify-between">
          <p className="text-[.875rem] font-light text-gray-500">{date}</p>
          <button className="text-primary-600 hover:text-primary-700 active:text-primary-800">
            읽어보기
          </button>
        </div>
      </div>
    </div>
  )
}
