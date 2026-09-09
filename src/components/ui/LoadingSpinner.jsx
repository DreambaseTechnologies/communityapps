const sizes = {
  xs: 'h-3 w-3 border-2',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-2',
  xl: 'h-10 w-10 border-2',
}

function LoadingSpinner({
  size = 'md',
  label = 'Loading',
  className = '',
}) {
  const sizeClass = sizes[size] ?? sizes.md

  return (
    <span
      role="status"
      aria-label={label}
      className={[
        'inline-block shrink-0',
        'animate-spin rounded-full',
        'border-slate-200 border-t-slate-900',
        sizeClass,
        className,
      ].join(' ')}
    />
  )
}

export default LoadingSpinner