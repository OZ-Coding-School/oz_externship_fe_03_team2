import React, { useEffect, useState } from 'react'
import Button from './Button'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'text'
type ButtonSize = 'md' | 'sm' | 'lg' | 'freeWidthLg' | 'freeWidthMd'

type InputWithLabelProps = {
  label?: string
  name: string
  type?: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  icon?: React.ReactNode
  disabled?: boolean
  description?: string
  required?: boolean
  button?: {
    label: string
    onClick: () => void
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: React.ReactNode
    disabled?: boolean
    countdown?: number
  }
}

function InputWithLabel({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  icon,
  disabled = false,
  description,
  required = false,
  button,
}: InputWithLabelProps) {
  const [time, setTime] = useState(button?.countdown || 0)
  const [isCountingDown, setIsCountingDown] = useState(false)

  // 타이머
  useEffect(() => {
    if (!isCountingDown || time < 0) return

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsCountingDown(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isCountingDown, time])

  const handleButtonClick = () => {
    if (button?.countdown) {
      setTime(button.countdown)
      setIsCountingDown(true)
    }
    button?.onClick()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${minutes}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex w-full flex-col">
      {label && (
        <div className="mb-2 flex h-6 items-center gap-5 text-sm font-medium">
          {/* Label */}
          <label htmlFor={name} className="text-gray-700">
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </label>

          {description && (
            <span className="text-primary-500">{description}</span>
          )}
        </div>
      )}

      {/* input + button(선택) */}
      <div className="flex items-stretch gap-2">
        <div className="flex-1">
          <div
            className={`flex h-10 items-center rounded-md border bg-white px-4 py-2 transition ${error ? 'border-danger-500' : 'focus-within:border-primary-500 border-gray-300'} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {icon && <span className="mr-2 text-gray-500">{icon}</span>}
            <input
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none"
              autoComplete="off"
            />
          </div>
        </div>

        {/* 버튼 */}
        {button && (
          <Button
            type="button"
            variant={button.variant || 'primary'}
            size={button.size || 'md'}
            icon={button.icon}
            onClick={handleButtonClick}
            disabled={button.disabled}
          >
            {isCountingDown && time > 0
              ? `재전송 (${formatTime(time)})`
              : button.label}
          </Button>
        )}
      </div>

      {/* 에러 있을때만 */}
      {error && <p className="text-danger-500 mt-1 text-sm">{error}</p>}
    </div>
  )
}

export default InputWithLabel
