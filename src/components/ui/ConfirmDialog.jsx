import Button from './Button'
import Modal from './Modal'

const variants = {
  danger: {
    icon: '!',
    iconClass:
      'bg-red-50 text-red-600 ring-red-100',
    confirmVariant: 'danger',
  },

  warning: {
    icon: '!',
    iconClass:
      'bg-amber-50 text-amber-600 ring-amber-100',
    confirmVariant: 'primary',
  },

  info: {
    icon: 'i',
    iconClass:
      'bg-blue-50 text-blue-600 ring-blue-100',
    confirmVariant: 'primary',
  },
}

function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Konfirmasi',
  description = 'Apakah kamu yakin ingin melanjutkan tindakan ini?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}) {
  const config = variants[variant] ?? variants.danger

  const handleConfirm = async () => {
    if (loading) {
      return
    }

    await onConfirm?.()
  }

  return (
    <Modal
      open={open}
      onClose={loading ? undefined : onClose}
      title={title}
      size="sm"
      closeOnBackdrop={!loading}
      closeOnEscape={!loading}
    >
      <div className="flex gap-4">
        <div
          className={[
            'flex h-11 w-11 shrink-0 items-center justify-center',
            'rounded-full ring-1 ring-inset',
            'text-sm font-extrabold',
            config.iconClass,
          ].join(' ')}
          aria-hidden="true"
        >
          {config.icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {cancelText}
        </Button>

        <Button
          variant={config.confirmVariant}
          onClick={handleConfirm}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {loading && (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden="true"
            />
          )}

          {loading ? 'Processing...' : confirmText}
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog