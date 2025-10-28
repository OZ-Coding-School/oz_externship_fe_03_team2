import { Spinner } from './Spinner'

export function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-[17.375rem] w-[53.375rem] flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-[25px]">
        <div className="flex flex-col items-center">
          <Spinner />
          <div className="text-secondary-900 my-2 w-[384px] text-center text-xl font-semibold not-italic select-none">
            데이터를 불러오고 있습니다
          </div>
          <div className="text-secondary-500 text-center text-base font-normal not-italic select-none">
            잠시만 기다려주세요...
          </div>
        </div>
      </div>
    </div>
  )
}
