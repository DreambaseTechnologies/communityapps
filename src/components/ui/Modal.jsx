import { useEffect, useId, useRef } from 'react'

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
}) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    requestAnimationFrame(() => {
      dialogRef.current?.focus()
    })

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, closeOnEscape, onClose])

  if (!open) {
    return null
  }

  const sizeClass = sizes[size] ?? sizes.md

  const handleBackdropClick = (event) => {
    if (
      closeOnBackdrop &&
      event.target === event.currentTarget
    ) {
      onClose?.()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={
          description ? descriptionId : undefined
        }
        className={[
          'relative w-full',
          sizeClass,
          'overflow-hidden rounded-2xl bg-white',
          'shadow-xl ring-1 ring-slate-200',
          'outline-none',
        ].join(' ')}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            {title && (
              <h2
                id={titleId}
                className="text-lg font-bold text-slate-950"
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                id={descriptionId}
                className="mt-1 text-sm leading-6 text-slate-500"
              >
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl leading-none text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-5 sm:px-6">
          {children}
        </div>

        {footer && (
          <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal