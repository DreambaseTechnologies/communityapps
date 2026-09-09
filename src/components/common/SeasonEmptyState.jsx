import {
  CalendarPlus,
  Trophy,
} from 'lucide-react'

import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'

function SeasonEmptyState({
  onViewSeasons,
}) {
  return (
    <EmptyState
      icon={
        <Trophy
          size={24}
          strokeWidth={2}
          aria-hidden="true"
        />
      }
      title="Belum ada Season aktif"
      description="Belum ada Season yang sedang berjalan di community ini. Lihat Season untuk mengetahui event berikutnya."
      action={
        <Button
          variant="secondary"
          size="md"
          onClick={onViewSeasons}
        >
          <CalendarPlus
            size={17}
            strokeWidth={2}
            aria-hidden="true"
          />

          View Seasons
        </Button>
      }
    />
  )
}

export default SeasonEmptyState