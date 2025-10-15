import React from 'react'

type InputWithLabelProps = {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  icon?: React.ReactNode
  disabled?: boolean
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
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
}) => {
  return (
    <div className="flex w-full flex-col">
      {/* Label */}
      <label
        htmlFor={name}
        className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {label}
      </label>

      {/* Input */}
      <div
        className={`flex items-center rounded-md border bg-white px-4 py-2 transition dark:bg-gray-800 ${error ? 'border-danger-500' : 'focus-within:border-primary-500 border-gray-300'} ${disabled ? 'cursor-not-allowed opacity-70' : ''}`}
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
          className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 outline-none dark:text-gray-100"
          autoComplete="off"
        />
      </div>

      {/* 에러 있을때만 */}
      {error && <p className="text-danger-500 mt-1 text-sm">{error}</p>}
    </div>
  )
}

export default InputWithLabel
