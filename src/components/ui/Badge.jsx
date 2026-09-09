const variants = {
  default: 'bg-slate-100 text-slate-700 ring-slate-200',

  primary: 'bg-slate-900 text-white ring-slate-900',

  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',

  warning: 'bg-amber-50 text-amber-700 ring-amber-200',

  danger: 'bg-red-50 text-red-700 ring-red-200',

  info: 'bg-blue-50 text-blue-700 ring-blue-200',

  neutral: 'bg-white text-slate-600 ring-slate-200',
}

const sizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
}

function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}) {
  const variantClasses = variants[variant] ?? variants.default
  const sizeClasses = sizes[size] ?? sizes.sm

  return (
    <span
      className={[
        'inline-flex items-center justify-center',
        'rounded-full',
        'font-semibold',
        'leading-none',
        'ring-1 ring-inset',
        variantClasses,
        sizeClasses,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge