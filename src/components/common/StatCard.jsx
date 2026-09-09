import {
  Goal,
  Hand,
  Medal,
  ShieldAlert,
  Target,
} from 'lucide-react'

const icons = {
  goals: Goal,
  assists: Target,
  saves: Hand,
  yellowCards: Medal,
  redCards: ShieldAlert,
}

const iconStyles = {
  goals: 'bg-emerald-50 text-emerald-700',
  assists: 'bg-blue-50 text-blue-700',
  saves: 'bg-slate-100 text-slate-700',
  yellowCards: 'bg-amber-50 text-amber-700',
  redCards: 'bg-red-50 text-red-700',
}

function StatCard({
  label,
  value = 0,
  type = 'goals',
}) {
  const Icon = icons[type] ?? Goal
  const iconStyle =
    iconStyles[type] ?? iconStyles.goals

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
      <div className="flex items-center justify-between gap-4">
        <div
          className={[
            'flex h-10 w-10 shrink-0 items-center justify-center',
            'rounded-xl',
            iconStyle,
          ].join(' ')}
        >
          <Icon
            size={19}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </span>
      </div>

      <p className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        This community
      </p>
    </div>
  )
}

export default StatCard