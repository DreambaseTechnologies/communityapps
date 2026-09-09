import { forwardRef, useId } from 'react'

const Input = forwardRef(
  (
    {
      id,
      label,
      error,
      helperText,
      required = false,
      disabled = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`

    const describedBy = [
      error ? errorId : null,
      !error && helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            {label}

            {required && (
              <span
                className="ml-1 text-red-600"
                aria-hidden="true"
              >
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={[
            'block w-full rounded-lg border bg-white px-4 py-3',
            'text-sm text-slate-900',
            'placeholder:text-slate-400',
            'outline-none',
            'transition',
            'focus:ring-2 focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-200 focus:border-slate-400 focus:ring-slate-100',
            className,
          ].join(' ')}
          {...props}
        />

        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        {!error && helperText && (
          <p
            id={helperId}
            className="mt-2 text-sm text-slate-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input