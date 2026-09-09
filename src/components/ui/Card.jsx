function Card({
  children,
  className = '',
  padding = 'md',
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  const paddingClass = paddings[padding] ?? paddings.md

  return (
    <div
      className={[
        'rounded-2xl bg-white',
        'shadow-sm ring-1 ring-slate-200/80',
        paddingClass,
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card