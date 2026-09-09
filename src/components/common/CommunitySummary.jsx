import {
  CalendarDays,
  ShieldCheck,
  Users,
} from 'lucide-react'

import Badge from '../ui/Badge'
import Card from '../ui/Card'

function CommunitySummary({
  summary = {
    memberCount: 48,
    seasonCount: 8,
    status: 'ACTIVE',
  },
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Members
            </p>

            <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              {summary.memberCount}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Users
              size={20}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Active community members
        </p>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Seasons
            </p>

            <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
              {summary.seasonCount}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <CalendarDays
              size={20}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Completed and active Seasons
        </p>
      </Card>

      <Card>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Community Status
            </p>

            <div className="mt-3">
              <Badge variant="success">
                {summary.status}
              </Badge>
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <ShieldCheck
              size={20}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Community is currently active
        </p>
      </Card>
    </div>
  )
}

export default CommunitySummary