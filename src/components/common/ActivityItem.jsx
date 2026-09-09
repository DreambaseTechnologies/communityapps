import {
  Award,
  CalendarCheck,
  CircleCheck,
  Goal,
  ShieldAlert,
  Trophy,
} from 'lucide-react'

import Avatar from '../ui/Avatar'

const activityConfig = {
  goal: {
    icon: Goal,
    iconClass:
      'bg-emerald-50 text-emerald-700',
  },

  season_joined: {
    icon: CalendarCheck,
    iconClass:
      'bg-blue-50 text-blue-700',
  },

  season_finished: {
    icon: Trophy,
    iconClass:
      'bg-amber-50 text-amber-700',
  },

  award: {
    icon: Award,
    iconClass:
      'bg-amber-50 text-amber-700',
  },

  card: {
    icon: ShieldAlert,
    iconClass:
      'bg-red-50 text-red-700',
  },

  success: {
    icon: CircleCheck,
    iconClass:
      'bg-emerald-50 text-emerald-700',
  },
}

function ActivityItem({
  type = 'success',
  title,
  description,
  time,
  user,
}) {
  const config =
    activityConfig[type] ?? activityConfig.success

  const Icon = config.icon

  return (
    <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
      {user ? (
        <Avatar
          src={user.avatar}
          name={user.name}
          size="sm"
        />
      ) : (
        <div
          className={[
            'flex h-9 w-9 shrink-0 items-center justify-center',
            'rounded-full',
            config.iconClass,
          ].join(' ')}
        >
          <Icon
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">
          {title}
        </p>

        {description && (
          <p className="mt-1 truncate text-xs text-slate-500">
            {description}
          </p>
        )}
      </div>

      {time && (
        <span className="shrink-0 text-xs font-medium text-slate-400">
          {time}
        </span>
      )}
    </div>
  )
}

export default ActivityItem