import {
  Goal,
  Shield,
  Trophy,
} from 'lucide-react'

import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

function PlayerCard({
  player,
  onClick,
}) {
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
          name={player.name}
          src={player.avatar}
          alt={player.name}
          size="lg"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-bold text-slate-950">
              {player.name}
            </h3>

            <Badge
              variant={
                player.position === 'Goalkeeper'
                  ? 'info'
                  : 'default'
              }
            >
              <Shield size={13} />
              {player.position}
            </Badge>
          </div>

          <p className="mt-1 truncate text-sm text-slate-500">
            {player.username}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Goal
              size={15}
              className="text-slate-400"
            />

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Goals
            </p>
          </div>

          <p className="mt-1 text-lg font-extrabold text-slate-950">
            {player.goals ?? 0}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Trophy
              size={15}
              className="text-slate-400"
            />

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Titles
            </p>
          </div>

          <p className="mt-1 text-lg font-extrabold text-slate-950">
            {player.titles ?? 0}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Shield
              size={15}
              className="text-slate-400"
            />

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Seasons
            </p>
          </div>

          <p className="mt-1 text-lg font-extrabold text-slate-950">
            {player.seasons ?? 0}
          </p>
        </div>
      </div>
    </Card>
  )
}

export default PlayerCard