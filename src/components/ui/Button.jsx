import { forwardRef } from 'react'

const variants = {
  primary:
    'bg-slate-950 text-white shadow-sm hover:bg-slate-800 focus-visible:ring-slate-400',

  secondary:
    'bg-white text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus-visible:ring-slate-400',

  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',

  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-400',

  success:
    'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-400',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      type = 'button',
      className = '',
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const variantClasses = variants[variant] ?? variants.primary
    const sizeClasses = sizes[size] ?? sizes.md

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={[
          'inline-flex items-center justify-center gap-2',
          'rounded-lg',
          'font-semibold',
          'transition-colors',
          'duration-150',
          'outline-none',
          'focus-visible:ring-2',
          'focus-visible:ring-offset-2',
          'disabled:pointer-events-none',
          'disabled:opacity-50',
          variantClasses,
          sizeClasses,
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button