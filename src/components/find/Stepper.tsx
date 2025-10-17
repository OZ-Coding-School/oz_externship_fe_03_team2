export default function Stepper({ level }: { level: number }) {
  //1단계: 첫 원만 노랑, 나머지 회색
  //2단게: 첫/두번째 원 노랑, 셋째 회색
  //3단계: 다 초록
  //막대색깔 = 오른쪽 원 색

  const getCircleColor = (circleNum: number): string => {
    if (level === 3) return 'bg-success-500'
    if (circleNum <= level) return 'bg-primary-500'
    return 'bg-gray-200'
  }

  return (
    <div>
      <div className="flex items-center gap-1">
        <div
          className={`${getCircleColor(1)} flex h-[2rem] w-[2rem] items-center justify-center rounded-full text-[.875rem] font-bold text-white`}
        >
          1
        </div>
        <div
          className={`${getCircleColor(2)} h-[.25rem] w-[4.6669rem] rounded-full`}
        ></div>
        <div
          className={`${getCircleColor(2)} flex h-[2rem] w-[2rem] items-center justify-center rounded-full text-[.875rem] font-bold text-white`}
        >
          2
        </div>
        <div
          className={`${getCircleColor(3)} h-[.25rem] w-[4.6669rem] rounded-full`}
        ></div>
        <div
          className={`${getCircleColor(3)} flex h-[2rem] w-[2rem] items-center justify-center rounded-full text-[.875rem] font-bold text-white`}
        >
          3
        </div>
      </div>
    </div>
  )
}
