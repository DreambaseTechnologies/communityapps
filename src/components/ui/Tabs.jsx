import { useId } from 'react'

function Tabs({
  items = [],
  value,
  onChange,
  className = '',
}) {
  const generatedId = useId()

  if (items.length === 0) {
    return null
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Tabs"
        className="flex w-full gap-1 overflow-x-auto border-b border-slate-200"
      >
        {items.map((item, index) => {
          const itemValue = item.value ?? item.label
          const isActive = value === itemValue
          const tabId = `${generatedId}-tab-${index}`
          const panelId = `${generatedId}-panel-${index}`

          return (
            <button
              key={itemValue}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => onChange?.(itemValue)}
              className={[
                'relative shrink-0 px-4 py-3',
                'text-sm font-semibold',
                'transition-colors duration-150',
                'outline-none',
                'focus-visible:ring-2 focus-visible:ring-slate-400',
                'disabled:cursor-not-allowed disabled:opacity-40',
                isActive
                  ? 'text-slate-950'
                  : 'text-slate-500 hover:text-slate-800',
              ].join(' ')}
            >
              {item.label}

              {isActive && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-950" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs