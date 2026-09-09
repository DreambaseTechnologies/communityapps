import {
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

const roleConfig = {
  OWNER: {
    label: 'Owner',
    variant: 'primary',
  },

  ADMIN: {
    label: 'Admin',
    variant: 'info',
  },

  MEMBER: {
    label: 'Member',
    variant: 'default',
  },
}

const statusConfig = {
  ACTIVE: {
    label: 'Active',
    variant: 'success',
  },

  SUSPENDED: {
    label: 'Suspended',
    variant: 'warning',
  },

  LEFT: {
    label: 'Left',
    variant: 'danger',
  },
}

function MemberCard({
  member,
  onClick,
}) {
  const role =
    roleConfig[member.role] ??
    roleConfig.MEMBER

  const status =
    statusConfig[member.status] ??
    statusConfig.ACTIVE

  const isClickable =
    typeof onClick === 'function'

  const handleKeyDown = (event) => {
    if (!isClickable) {
      return
    }

    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Card
      padding="md"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={[
        'transition-all duration-150',
        isClickable
          ? [
              'cursor-pointer',
              'hover:-translate-y-0.5',
              'hover:shadow-md',
              'hover:ring-slate-300',
              'focus-visible:outline-none',
              'focus-visible:ring-2',
              'focus-visible:ring-slate-400',
              'focus-visible:ring-offset-2',
            ].join(' ')
          : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-4">
        <Avatar
          name={member.name}
          src={member.avatar}
          alt={member.name}
          size="lg"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-bold text-slate-950">
              {member.name}
            </h3>

            {member.isPlayer && (
              <Badge
                variant="success"
                size="sm"
              >
                Player
              </Badge>
            )}
          </div>

          <p className="mt-1 truncate text-sm text-slate-500">
            {member.username}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge
              variant={role.variant}
              size="sm"
            >
              <ShieldCheck
                size={13}
                strokeWidth={2.2}
              />

              {role.label}
            </Badge>

            <Badge
              variant={status.variant}
              size="sm"
            >
              {status.label}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <UserRound
            size={16}
            className="shrink-0 text-slate-400"
          />

          <div className="min-w-0">
            <p className="text-xs text-slate-400">
              Role
            </p>

            <p className="truncate text-sm font-semibold text-slate-700">
              {role.label}
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-400">
            Joined
          </p>

          <p className="truncate text-sm font-semibold text-slate-700">
            {member.joinedAt ?? '-'}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default MemberCard