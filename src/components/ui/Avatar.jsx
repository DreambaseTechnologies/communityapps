import { useState } from 'react'

const sizes = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
}

function getInitials(name = '') {
  const words = name.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) {
    return '?'
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
}

function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  className = '',
  ...props
}) {
  const [imageError, setImageError] = useState(false)

  const sizeClass = sizes[size] ?? sizes.md
  const initials = getInitials(name)

  const showImage = Boolean(src) && !imageError

  return (
    <div
      className={[
        'relative inline-flex shrink-0 items-center justify-center',
        'overflow-hidden rounded-full',
        'bg-slate-100',
        'font-bold text-slate-700',
        'ring-1 ring-slate-200',
        sizeClass,
        className,
      ].join(' ')}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span aria-hidden="true">
          {initials}
        </span>
      )}
    </div>
  )
}

export default Avatar