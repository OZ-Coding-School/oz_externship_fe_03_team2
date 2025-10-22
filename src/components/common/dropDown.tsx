import { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

interface Option {
  text: string
  icon?: React.ReactNode
}

export interface DropDownProps {
  title?: string
  placeholder: string
  options: Option[]
  xButton?: boolean
  // xButton에 관한 내용 없을 시 그냥 false가 기본값으로 먹힘
  onSelect?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export function DropDown({
  title,
  placeholder,
  options,
  xButton = false,
  onSelect,
  size = 'md',
}: DropDownProps) {
  const [dropDownState, setDropDownState] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>()

  const sizeStyles = {
    sm: {
      container: 'w-[25rem]',
      dropDown: 'w-[21.875rem]',
      height: 'h-[2.5rem]',
    },
    md: {
      container: 'w-[37rem]',
      dropDown: 'w-[33.875rem]',
      height: 'h-[2.875rem]',
    },
    lg: {
      container: 'w-[50rem]',
      dropDown: 'w-[46.875rem]',
      height: 'h-[3.25rem]',
    },
  }

  const currentSize = sizeStyles[size]

  return (
    <div
      className={`flex flex-col justify-between border border-gray-200 bg-white ${currentSize.container} h-[8.75rem] rounded-md p-[1.5625rem] select-none`}
    >
      <div className="flex w-full items-start justify-between">
        <p className="text-center text-[1.125rem] font-[500]">{title}</p>
        <span>{xButton && <X />}</span>
      </div>
      <div
        tabIndex={0}
        onBlur={() => setDropDownState(false)}
        className="relative"
      >
        <div
          onClick={() => setDropDownState(!dropDownState)}
          className={`flex ${currentSize.dropDown} ${
            currentSize.height
          } relative items-center justify-between rounded-lg border-[.0938rem] border-gray-200 px-[1.0625rem] py-[.8125rem] ${
            dropDownState && 'border-gray-400'
          }`}
        >
          <p className="text-[.875rem] font-light text-gray-500">
            {selectedOption || placeholder}
          </p>
          {dropDownState ? (
            <ChevronUp size={15} color="gray" />
          ) : (
            <ChevronDown size={15} color="gray" />
          )}
        </div>
        {dropDownState && (
          <div
            className={`absolute rounded-lg border-[.0938rem] border-gray-200 bg-white shadow-[0_0.25rem_0.5rem_#00000020] top-[${currentSize.height}] ${currentSize.dropDown} z-10 max-h-[12rem] overflow-x-hidden overflow-y-auto`}
          >
            {options?.map((option) => (
              <div
                key={option.text}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setDropDownState(false)
                  setSelectedOption(option.text)
                  onSelect?.(option.text)
                }}
                className={`flex items-center ${currentSize.dropDown} ${
                  currentSize.height
                } px-[1.0625rem] py-[.8125rem] font-light hover:bg-gray-50 active:bg-gray-100 ${option.icon && 'gap-2.5'}`}
              >
                <span>{option.icon}</span>
                <span>{option.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
