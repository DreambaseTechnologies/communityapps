import {
  ChevronRight,
  Users,
} from 'lucide-react'

import Button from '../ui/Button'
import Card from '../ui/Card'

function CurrentCommunityCard({
  community = {
    name: 'Garuda FC Community',
    memberCount: 48,
    initials: 'G',
  },
  onView,
}) {
  return (
    <Card padding="none">
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-xl font-extrabold text-white">
          {community.initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Current Community
          </p>

          <h2 className="mt-1 truncate text-xl font-extrabold text-slate-950">
            {community.name}
          </h2>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <Users
              size={15}
              strokeWidth={2}
              aria-hidden="true"
            />

            <span>
              {community.memberCount} members
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onView}
          className="w-full sm:w-auto"
        >
          View Community

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

export default CurrentCommunityCard