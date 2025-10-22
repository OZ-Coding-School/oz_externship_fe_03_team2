type BadgeVariant = 'default' | 'primary' | 'success' | 'danger' | 'pupple'
type BadgeSize = 'sm' | 'page' | 'md' | 'lg'
type BadgeRadius = 'sm' | 'full'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  radius?: BadgeRadius
  children: React.ReactNode
}

const defaultStyles = 'inline-flex items-center select-none'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800',
  primary: 'bg-primary-100 text-primary-800',
  success: 'bg-success-100 text-success-800',
  danger: 'bg-[#FEE2E2] text-danger-800',
  pupple: 'bg-[#F3E8FF] text-[#6B21A8]',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs not-italic font-normal',
  page: 'px-2 py-1 text-xs not-italic font-normal',
  md: 'px-2.5 py-1 text-sm not-italic font-normal',
  lg: 'px-3 py-1.5 text-base not-italic font-normal',
}

const radiusStyles: Record<BadgeRadius, string> = {
  sm: 'rounded-sm',
  full: 'rounded-full',
}

export default function Badge({
  variant = 'primary',
  size = 'sm',
  radius = 'full',
  children,
}: BadgeProps) {
  const variantClass = variantStyles[variant]
  const sizeClass = sizeStyles[size]
  const radiusClass = radiusStyles[radius]
  return (
    <span
      className={`${defaultStyles} ${variantClass} ${sizeClass} ${radiusClass}`}
    >
      {children}
    </span>
  )
}
