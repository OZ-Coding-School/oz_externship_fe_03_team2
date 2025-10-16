import { type HTMLAttributes } from 'react'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  imgUrl?: string
  size?: AvatarSize
}

const baseStyles =
  'relative flex items-center justify-center rounded-full font-semibold text-yellow-800 bg-yellow-100 shadow-sm select-none overflow-hidden'

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
}

export default function Avatar({
  name,
  imgUrl,
  size = 'md',
  className = '',
  ...rest
}: AvatarProps) {
  const sizeClass = sizeStyles[size]

  return (
    <div className={`${baseStyles} ${sizeClass} ${className}`} {...rest}>
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span>{name.charAt(0)}</span>
      )}
    </div>
  )
}
