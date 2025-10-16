import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'md' | 'sm' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  icon?: ReactNode
}

const baseStyles =
  'flex flex-row justify-center items-center font-medium focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 disabled:bg-primary-500',
  secondary:
    'bg-secondary-100 hover:bg-secondary-200 active:bg-secondary-300 disabled:bg-secondary-100',
  outline:
    'border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 disabled:bg-white',
  ghost:
    'border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 disabled:bg-white',
  danger:
    'bg-danger-500 text-white hover:bg-danger-600 active:bg-danger-800 disabled:bg-danger-500',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm min-w-18 rounded-md',
  md: 'px-4 py-2.5 text-sm h-10 min-w-20 rounded-lg',
  lg: 'px-6 py-3 text-base h-12 min-w-24 rounded-lg',
}

function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  children,
  icon,
  ...rest
}: ButtonProps) {
  const variantClass = variantStyles[variant]
  const sizeClass = sizeStyles[size]

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variantClass} ${sizeClass}`}
      {...rest}
    >
      {/* 아이콘이 있으면 왼쪽 */}
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
