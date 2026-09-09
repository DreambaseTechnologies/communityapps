function EmptyState({
  icon = '○',
  title = 'Belum ada data',
  description,
  action,
  className = '',
}) {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center',
        'rounded-2xl border border-dashed border-slate-200',
        'bg-white px-6 py-12 text-center',
        className,
      ].join(' ')}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-500"
        aria-hidden="true"
      >
        {icon}
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-950">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  )
}

export default EmptyState