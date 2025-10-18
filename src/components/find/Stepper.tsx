export default function Stepper({ level }: { level: number }) {
  const getCircleColor = (circleNum: number): string => {
    if (level === 3) return 'bg-success-500'
    if (circleNum <= level) return 'bg-primary-500'
    return 'bg-gray-200'
  }
  const getTextColor = (circleNum: number): string => {
    if (level === 3) return 'text-white'
    if (circleNum <= level) return 'text-white'
    return 'text-black'
  }

  return (
    <div className="flex w-full max-w-[23rem] flex-col items-center gap-2">
      <div className="flex w-full items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <div
            className={`${getCircleColor(1)} flex h-[2rem] w-[2rem] items-center justify-center rounded-full text-[.875rem] ${getTextColor(1)}`}
          >
            1
          </div>
          <p className="text-[.75rem] text-gray-500">정보입력</p>
        </div>

        <div
          className={`${getCircleColor(2)} relative bottom-3 h-[.25rem] max-w-[4.6669rem] flex-1 rounded-full`}
        ></div>

        <div className="flex flex-col items-center gap-2">
          <div
            className={`${getCircleColor(2)} flex h-[2rem] w-[2rem] items-center justify-center rounded-full p-2 text-[.875rem] ${getTextColor(2)}`}
          >
            2
          </div>
          <p className="text-[.75rem] text-gray-500">휴대폰인증</p>
        </div>

        <div
          className={`${getCircleColor(3)} relative bottom-3 h-[.25rem] max-w-[4.6669rem] flex-1 rounded-full`}
        ></div>

        <div className="flex flex-col items-center gap-2">
          <div
            className={`${getCircleColor(3)} flex h-[2rem] w-[2rem] items-center justify-center rounded-full p-2 text-[.875rem] ${getTextColor(3)}`}
          >
            3
          </div>
          <p className="text-[.75rem] text-gray-500">결과확인</p>
        </div>
      </div>
      {/* <div className="flex w-full max-w-[18.0625rem] justify-between px-13 text-[.75rem] text-gray-500 lg:p-0"> */}
      {/* <div className="flex w-full  items-center justify-between text-[.75rem] text-gray-500 lg:max-w-[18rem]"> */}
      {/* <div className="flex w-full flex-1 items-center justify-between text-[.75rem] text-gray-500  ">
        <p>정보입력</p>
        <p>휴대폰인증</p>
        <p>결과확인</p> */}
      <div className="flex w-full flex-1/4 items-center justify-around text-[.75rem] text-gray-500"></div>
    </div>
  )
}
