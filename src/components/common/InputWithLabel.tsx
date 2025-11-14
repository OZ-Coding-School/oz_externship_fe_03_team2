import React, { useEffect } from 'react'
import Button from './Button'
import { useCountdown } from '../../hooks/useCountdown'
import { timeFormat } from '../../utils/timeFormat'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'text'
  | 'signup'
type ButtonSize =
  | 'md'
  | 'sm'
  | 'lg'
  | 'ml'
  | 'freeWidthLg'
  | 'freeWidthMd'
  | 'signup'

type InputButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  label: string
  onClick: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: React.ReactNode
  disabled?: boolean
  countdown?: number
  cooldown?: number
  start?: number
}

type InputWithLabelProps = {
  label?: string
  name: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  icon?: React.ReactNode
  disabled?: boolean
  description?: string
  required?: boolean
  maxLength?: number
  button?: InputButtonProps
}

function InputWithLabel({
  label,
  name,
  type = 'text',
  value = '',
  onChange,
  onBlur,
  placeholder,
  error,
  icon,
  disabled = false,
  description,
  required = false,
  maxLength,
  button,
}: InputWithLabelProps) {
  const { time, isRunning, start } = useCountdown(button?.countdown || 0)

  useEffect(() => {
    if (button?.start && button?.countdown && button.countdown > 0) {
      start(button.countdown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [button?.start, button?.countdown])

  const handleButtonClick = () => {
    button?.onClick()
  }

  const countdown = button?.countdown || 0
  const cooldown = button?.cooldown || countdown
  const isCooldown = time > countdown - cooldown

  return (
    <div className="flex w-full flex-col">
      {label && (
        <div className="mb-2 flex h-6 items-center gap-5 text-sm font-medium">
          <label htmlFor={name} className="text-gray-700">
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </label>
          {description && (
            <span className="text-primary-500">{description}</span>
          )}
        </div>
      )}

      <div className="flex items-stretch gap-2">
        <div className="flex-1">
          <div
            className={`flex h-10 items-center rounded-md border bg-white px-4 py-2 transition ${
              error
                ? 'border-danger-500'
                : 'focus-within:border-primary-500 border-gray-300'
            } ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
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
              maxLength={maxLength}
            />
          </div>
        </div>

        {button && (
          <Button
            type={button.type || 'button'}
            variant={button.variant || 'primary'}
            size={button.size || 'md'}
            icon={button.icon}
            onClick={handleButtonClick}
            disabled={button.disabled || (isRunning && isCooldown)}
          >
            {isRunning && time > 0
              ? `재전송 (${timeFormat(time)})`
              : button.label}
          </Button>
        )}
      </div>

      {error && <p className="text-danger-500 mt-1 text-sm">{error}</p>}
    </div>
  )
}

export default InputWithLabel
