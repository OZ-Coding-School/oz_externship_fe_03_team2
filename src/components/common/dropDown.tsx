import { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

interface Option {
  text: string
  icon?: React.ReactNode
}

export interface DropDownProps {
  label?: string
  placeholder: string
  options: Option[]
  xButton?: boolean
  // xButton에 관한 내용 없을 시 그냥 false가 기본값으로 먹힘
  onSelect?: (value: string) => void
  size?: 'sm' | 'md' | 'lg' | 'wFree'
  border?: boolean
  required?: boolean
  onXButtonClick?: () => void
}

export function DropDown({
  label,
  placeholder,
  options,
  xButton = false,
  onSelect,
  size = 'md',
  border = false,
  required = false,
  onXButtonClick,
}: DropDownProps) {
  const [dropDownState, setDropDownState] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>()

  const sizeStyles = {
    sm: {
      container: 'w-[25rem]',
      dropDown: 'w-[22rem]',
      height: 'h-10',
    },
    md: {
      container: 'w-[37rem]',
      dropDown: 'w-[34rem]',
      height: 'h-11',
    },
    lg: {
      container: 'w-[50rem]',
      dropDown: 'w-[47rem]',
      height: 'h-12',
    },
    wFree: {
      container: 'w-full',
      dropDown: 'w-full',
      height: 'h-9',
    },
  }

  const currentSize = sizeStyles[size]

  return (
    <div
      className={`flex flex-col ${border && `h-36 rounded-md border border-gray-200 bg-white p-6`} ${currentSize.container} select-none`}
    >
      {label && (
        <div className="my-1 flex w-full items-start justify-between">
          <label className="text-sm font-medium">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
          {xButton && (
            <button onClick={onXButtonClick} type="button">
              <X />
            </button>
          )}
        </div>
      )}
      <div
        tabIndex={0}
        onBlur={() => setDropDownState(false)}
        className="relative"
      >
        <div
          aria-expanded={dropDownState}
          onClick={() => setDropDownState(!dropDownState)}
          className={`flex ${currentSize.dropDown} ${
            currentSize.height
          } relative items-center justify-between rounded-lg border px-4 py-3 ${
            dropDownState ? 'border-gray-400' : 'border-gray-200'
          }`}
        >
          <p
            className={`text-sm font-light ${dropDownState ? 'text-black' : 'text-gray-500'}`}
          >
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
            className={`absolute rounded-lg border border-gray-200 bg-white shadow-md ${currentSize.dropDown} z-10 max-h-48 overflow-x-hidden overflow-y-auto text-sm`}
          >
            {options?.map((option) => (
              <div
                key={option.text}
                role="option"
                aria-selected={selectedOption === option.text}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setDropDownState(false)
                  setSelectedOption(option.text)
                  onSelect?.(option.text)
                }}
                className={`flex items-center ${currentSize.dropDown} ${
                  currentSize.height
                } px-4 py-3 font-light hover:bg-gray-50 active:bg-gray-100 ${option.icon && 'gap-2.5'}`}
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
