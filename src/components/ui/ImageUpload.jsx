import {
  useEffect,
  useId,
  useState,
} from 'react'

import {
  ImagePlus,
  Trash2,
  Upload,
} from 'lucide-react'

const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024

const aspectStyles = {
  square: 'aspect-square',
  banner: 'aspect-[3/1]',
}

function ImageUpload({
  label,
  value = null,
  onChange,
  variant = 'square',
  helperText = 'JPG, PNG, atau WEBP. Maksimal 5 MB.',
  disabled = false,
}) {
  const inputId = useId()

  const [preview, setPreview] =
    useState(value)

  const [error, setError] =
    useState('')

  useEffect(() => {
    setPreview(value)

    setError('')
  }, [value])

  useEffect(() => {
    return () => {
      if (
        preview?.startsWith('blob:')
      ) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const validateFile = (file) => {
    if (!file) {
      return false
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError(
        'Format file harus JPG, PNG, atau WEBP.',
      )

      return false
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        'Ukuran file maksimal 5 MB.',
      )

      return false
    }

    return true
  }

  const handleFileChange = (
    event,
  ) => {
    const file =
      event.target.files?.[0]

    event.target.value = ''

    if (!file) {
      return
    }

    setError('')

    if (!validateFile(file)) {
      return
    }

    const objectUrl =
      URL.createObjectURL(file)

    setPreview(objectUrl)

    onChange?.({
      file,
      preview: objectUrl,
    })
  }

  const handleRemove = () => {
    setError('')
    setPreview(null)

    onChange?.({
      file: null,
      preview: null,
    })
  }

  const hasImage = Boolean(preview)

  const aspectClass =
    aspectStyles[variant] ??
    aspectStyles.square

  if (variant === 'banner') {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            {label}
          </label>
        )}

        <div
          className={[
            'relative overflow-hidden rounded-2xl',
            'border border-slate-200',
            'bg-slate-100',
            aspectClass,
          ].join(' ')}
        >
          {hasImage ? (
            <img
              src={preview}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-200">
                <ImagePlus
                  size={22}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </div>

              <p className="mt-3 text-sm font-bold text-slate-800">
                Upload community banner
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Gunakan gambar landscape agar hasil terlihat optimal.
              </p>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-slate-950/70 to-transparent px-4 pb-4 pt-10">
            <label
              htmlFor={inputId}
              className={[
                'inline-flex cursor-pointer items-center gap-2',
                'rounded-lg bg-white px-3 py-2',
                'text-xs font-bold text-slate-900',
                'shadow-sm',
                'transition-colors duration-150',
                'hover:bg-slate-100',
                'focus-within:ring-2',
                'focus-within:ring-white',
                disabled
                  ? 'pointer-events-none opacity-50'
                  : '',
              ].join(' ')}
            >
              <Upload
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />

              {hasImage
                ? 'Change Banner'
                : 'Upload Banner'}
            </label>

            {hasImage && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled}
                className={[
                  'inline-flex items-center gap-2',
                  'rounded-lg bg-red-600 px-3 py-2',
                  'text-xs font-bold text-white',
                  'shadow-sm',
                  'transition-colors duration-150',
                  'hover:bg-red-700',
                  'focus-visible:outline-none',
                  'focus-visible:ring-2',
                  'focus-visible:ring-red-300',
                  'disabled:pointer-events-none',
                  'disabled:opacity-50',
                ].join(' ')}
              >
                <Trash2
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                />

                Remove
              </button>
            )}
          </div>
        </div>

        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={disabled}
          className="sr-only"
        />

        <div className="mt-2 flex items-start justify-between gap-4">
          <p className="text-xs text-slate-500">
            {helperText}
          </p>

          {error && (
            <p className="text-right text-xs font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          {label}
        </label>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div
          className={[
            'relative shrink-0 overflow-hidden rounded-2xl',
            'border border-slate-200 bg-slate-100',
            'h-28 w-28',
          ].join(' ')}
        >
          {hasImage ? (
            <img
              src={preview}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-400">
              <ImagePlus
                size={28}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <label
              htmlFor={inputId}
              className={[
                'inline-flex cursor-pointer items-center gap-2',
                'rounded-lg bg-slate-950 px-3 py-2',
                'text-xs font-bold text-white',
                'transition-colors duration-150',
                'hover:bg-slate-800',
                'focus-within:ring-2',
                'focus-within:ring-slate-400',
                'focus-within:ring-offset-2',
                disabled
                  ? 'pointer-events-none opacity-50'
                  : '',
              ].join(' ')}
            >
              <Upload
                size={15}
                strokeWidth={2}
                aria-hidden="true"
              />

              {hasImage
                ? 'Change Photo'
                : 'Upload Photo'}
            </label>

            {hasImage && (
              <button
                type="button"
                onClick={handleRemove}
                disabled={disabled}
                className={[
                  'inline-flex items-center gap-2',
                  'rounded-lg bg-white px-3 py-2',
                  'text-xs font-bold text-red-600',
                  'ring-1 ring-inset ring-slate-200',
                  'transition-colors duration-150',
                  'hover:bg-red-50',
                  'focus-visible:outline-none',
                  'focus-visible:ring-2',
                  'focus-visible:ring-red-300',
                  'disabled:pointer-events-none',
                  'disabled:opacity-50',
                ].join(' ')}
              >
                <Trash2
                  size={15}
                  strokeWidth={2}
                  aria-hidden="true"
                />

                Remove
              </button>
            )}
          </div>

          <p className="mt-3 text-xs leading-5 text-slate-500">
            {helperText}
          </p>

          {error && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>

      <input
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={disabled}
        className="sr-only"
      />
    </div>
  )
}

export default ImageUpload