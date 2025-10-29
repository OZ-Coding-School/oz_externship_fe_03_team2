import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'text'
  | 'signup'
  | 'login'
  | 'success'
  | 'gray'

type ButtonSize =
  | 'md'
  | 'sm'
  | 'lg'
  | 'ml'
  | 'freeWidthLg'
  | 'freeWidthMd'
  | 'freeLogin'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  icon?: ReactNode
}

const baseStyles =
  'flex flex-row justify-center items-center whitespace-nowrap font-medium focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

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
  text: 'text-primary-600 hover:text-primary-700 active:text-primary-800',
  signup:
    'text-primary-600 bg-primary-100 hover:bg-primary-200 active:bg-primary-300 disabled:text-gray-800 disabled:bg-gray-300',
  login:
    'bg-secondary-200 hover:bg-secondary-300 active:bg-secondary-400 disabled:bg-secondary-200 text-[#303030]',
  success:
    'bg-success-500 text-white hover:bg-success-600 active:bg-success-800 disabled:bg-success-500',
  gray: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gary-800 disabled:bg-gray-500',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 h-9 text-sm min-w-18 rounded-md',
  md: 'px-4 py-2.5 text-sm h-10 min-w-20 rounded-lg',
  ml: 'px-6 py-3 text-base h-10 min-w-24 rounded-lg',
  lg: 'px-6 py-3 text-base h-12 min-w-24 rounded-lg',
  freeWidthMd: 'px-4 py-2.5 text-sm h-10 min-w-full rounded-lg',
  freeWidthLg: 'px-4 py-2.5 text-sm h-12 min-w-full rounded-lg',
  freeLogin: 'px-4 py-2.5 text-base h-12 min-w-full rounded-lg',
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
      className={`${baseStyles} ${variantClass} ${sizeClass} `}
      {...rest}
    >
      {/* 아이콘이 있으면 왼쪽 */}
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      {children}
    </button>
  )
}

export default Button
