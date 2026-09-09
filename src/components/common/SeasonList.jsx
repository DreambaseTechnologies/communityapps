import EmptyState from '../ui/EmptyState'

import SeasonCard from './SeasonCard'

function SeasonList({
  seasons = [],
  onViewSeason,
}) {
  if (seasons.length === 0) {
    return (
      <EmptyState
        icon="🏆"
        title="Belum ada Season"
        description="Community ini belum memiliki Season. Season yang dibuat akan muncul di sini."
      />
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {seasons.map((season) => (
        <SeasonCard
          key={season.id}
          season={season}
          onView={() => onViewSeason?.(season)}
        />
      ))}
    </div>
  )
}

export default SeasonList