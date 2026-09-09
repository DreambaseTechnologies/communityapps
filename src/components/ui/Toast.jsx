import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const ToastContext = createContext(null)

const variants = {
  success: {
    icon: '✓',
    container:
      'border-emerald-200 bg-emerald-50 text-emerald-950',
    icon:
      'bg-emerald-100 text-emerald-700',
  },

  error: {
    icon: '!',
    container:
      'border-red-200 bg-red-50 text-red-950',
    icon:
      'bg-red-100 text-red-700',
  },

  warning: {
    icon: '!',
    container:
      'border-amber-200 bg-amber-50 text-amber-950',
    icon:
      'bg-amber-100 text-amber-700',
  },

  info: {
    icon: 'i',
    container:
      'border-blue-200 bg-blue-50 text-blue-950',
    icon:
      'bg-blue-100 text-blue-700',
  },
}

function ToastItem({
  toast,
  onRemove,
}) {
  const variant = variants[toast.type] ?? variants.info

  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemove(toast.id)
    }, toast.duration)

    return () => {
      clearTimeout(timeout)
    }
  }, [toast.id, toast.duration, onRemove])

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        'pointer-events-auto flex w-full max-w-sm items-start gap-3',
        'rounded-xl border p-4 shadow-lg',
        'animate-[slideIn_180ms_ease-out]',
        variant.container,
      ].join(' ')}
    >
      <div
        className={[
          'flex h-7 w-7 shrink-0 items-center justify-center',
          'rounded-full text-xs font-extrabold',
          variant.icon,
        ].join(' ')}
        aria-hidden="true"
      >
        {variant.icon}
      </div>

      <div className="min-w-0 flex-1">
        {toast.title && (
          <p className="text-sm font-bold">
            {toast.title}
          </p>
        )}

        <p
          className={[
            'text-sm leading-5',
            toast.title ? 'mt-0.5' : '',
          ].join(' ')}
        >
          {toast.message}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        aria-label="Close notification"
        className="shrink-0 text-lg leading-none opacity-50 transition-opacity hover:opacity-100"
      >
        ×
      </button>
    </div>
  )
}

function ToastProvider({
  children,
}) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((current) =>
      current.filter((toast) => toast.id !== id),
    )
  }, [])

  const addToast = useCallback(
    ({
      type = 'info',
      title,
      message,
      duration = 4000,
    }) => {
      const id =
        globalThis.crypto?.randomUUID?.() ??
        `${Date.now()}-${Math.random()}`

      setToasts((current) => [
        ...current,
        {
          id,
          type,
          title,
          message,
          duration,
        },
      ])

      return id
    },
    [],
  )

  const success = useCallback(
    (message, options = {}) =>
      addToast({
        ...options,
        type: 'success',
        message,
      }),
    [addToast],
  )

  const error = useCallback(
    (message, options = {}) =>
      addToast({
        ...options,
        type: 'error',
        message,
      }),
    [addToast],
  )

  const warning = useCallback(
    (message, options = {}) =>
      addToast({
        ...options,
        type: 'warning',
        message,
      }),
    [addToast],
  )

  const info = useCallback(
    (message, options = {}) =>
      addToast({
        ...options,
        type: 'info',
        message,
      }),
    [addToast],
  )

  const value = useMemo(
    () => ({
      success,
      error,
      warning,
      info,
      removeToast,
    }),
    [
      success,
      error,
      warning,
      info,
      removeToast,
    ],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-end gap-3 sm:left-auto sm:max-w-sm"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error(
      'useToast must be used inside ToastProvider',
    )
  }

  return context
}

export {
  ToastProvider,
  useToast,
}