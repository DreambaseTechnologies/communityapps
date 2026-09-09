import LoadingSpinner from './LoadingSpinner'

function LoadingState({
  title = 'Loading...',
  description = 'Mohon tunggu sebentar.',
  size = 'lg',
  className = '',
}) {
  return (
    <div
      className={[
        'flex min-h-64 flex-col items-center justify-center',
        'rounded-2xl bg-white px-6 py-12 text-center',
        'ring-1 ring-slate-200/80',
        className,
      ].join(' ')}
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner
        size={size}
        label={title}
      />

      <h2 className="mt-5 text-lg font-bold text-slate-950">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  )
}

export default LoadingState