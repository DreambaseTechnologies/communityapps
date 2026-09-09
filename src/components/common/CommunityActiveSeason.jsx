import {
  CalendarDays,
  ChevronRight,
  MapPin,
  Trophy,
} from 'lucide-react'

import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'

function CommunityActiveSeason({
  season = {
    name: 'Season 08',
    status: 'ONGOING',
    date: '14 September 2026',
    location: 'Garuda Arena',
    matchProgress: 'Match 4 of 6',
  },
  onView,
}) {
  return (
    <Card padding="none">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">
              Active Season
            </p>

            <h3 className="mt-1 text-xl font-extrabold text-slate-950">
              {season.name}
            </h3>
          </div>

          <Badge variant="success">
            {season.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 px-5 py-5 sm:grid-cols-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <CalendarDays
              size={19}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-400">
              Date
            </p>

            <p className="mt-0.5 truncate text-sm font-bold text-slate-900">
              {season.date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <MapPin
              size={19}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-400">
              Location
            </p>

            <p className="mt-0.5 truncate text-sm font-bold text-slate-900">
              {season.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Trophy
              size={19}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-400">
              Progress
            </p>

            <p className="mt-0.5 truncate text-sm font-bold text-slate-900">
              {season.matchProgress}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-100 px-5 py-4 sm:px-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={onView}
        >
          View Season

          <ChevronRight
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </div>
    </Card>
  )
}

export default CommunityActiveSeason