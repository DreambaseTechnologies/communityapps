import EmptyState from '../ui/EmptyState'
import PlayerCard from './PlayerCard'

function PlayerList({
  players = [],
  search = '',
  position = 'ALL',
  onSearchChange,
  onPositionChange,
  onViewPlayer,
}) {
  const normalizedSearch =
    search.trim().toLowerCase()

  const filteredPlayers = players.filter(
    (player) => {
      const matchesSearch =
        normalizedSearch === '' ||
        player.name
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        player.username
          ?.toLowerCase()
          .includes(normalizedSearch)

      const matchesPosition =
        position === 'ALL' ||
        player.position === position

      return (
        matchesSearch &&
        matchesPosition
      )
    },
  )

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_200px]">
        <div>
          <label
            htmlFor="player-search"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Search Players
          </label>

          <input
            id="player-search"
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange?.(
                event.target.value,
              )
            }
            placeholder="Search name or @username..."
            className={[
              'block w-full rounded-lg border border-slate-200 bg-white',
              'px-4 py-3 text-sm text-slate-900',
              'placeholder:text-slate-400',
              'outline-none',
              'transition',
              'focus:border-slate-400 focus:ring-2 focus:ring-slate-100',
            ].join(' ')}
          />
        </div>

        <div>
          <label
            htmlFor="player-position-filter"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Position
          </label>

          <select
            id="player-position-filter"
            value={position}
            onChange={(event) =>
              onPositionChange?.(
                event.target.value,
              )
            }
            className={[
              'block w-full rounded-lg border border-slate-200 bg-white',
              'px-4 py-3 text-sm text-slate-900',
              'outline-none',
              'transition',
              'focus:border-slate-400 focus:ring-2 focus:ring-slate-100',
            ].join(' ')}
          >
            <option value="ALL">
              All Positions
            </option>

            <option value="Goalkeeper">
              Goalkeeper
            </option>

            <option value="Outfield">
              Outfield
            </option>
          </select>
        </div>
      </div>

      {filteredPlayers.length === 0 ? (
        <EmptyState
          title="No players found"
          description="Tidak ada player yang sesuai dengan pencarian atau posisi yang dipilih."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPlayers.map(
            (player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={() =>
                  onViewPlayer?.(player)
                }
              />
            ),
          )}
        </div>
      )}
    </div>
  )
}

export default PlayerList