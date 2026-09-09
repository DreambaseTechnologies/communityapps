import {
  useNavigate,
} from 'react-router-dom'

import ActiveSeasonCard from '../../components/common/ActiveSeasonCard'
import CommunityEmptyState from '../../components/common/CommunityEmptyState'
import CurrentCommunityCard from '../../components/common/CurrentCommunityCard'
import RecentActivity from '../../components/common/RecentActivity'
import SeasonEmptyState from '../../components/common/SeasonEmptyState'
import StatCard from '../../components/common/StatCard'

const activities = [
  {
    id: 1,
    type: 'goal',
    title: 'Kamu mencetak 2 goals',
    description: 'Season 08 · Match 4',
    time: '2h ago',
    user: {
      name: 'Muhammad Rafli',
    },
  },
  {
    id: 2,
    type: 'season_joined',
    title: 'Kamu bergabung ke Season 08',
    description: 'Garuda FC Community',
    time: '1d ago',
  },
  {
    id: 3,
    type: 'success',
    title: 'Team assignment berhasil',
    description: 'Kamu mendapatkan Garuda FC',
    time: '2d ago',
  },
]

const currentCommunity = {
  name: 'Garuda FC Community',
  memberCount: 48,
  initials: 'G',
}

const activeSeason = {
  name: 'Season 08',
  status: 'ONGOING',
  date: '14 September 2026',
  location: 'Garuda Arena',
  matchProgress: 'Match 4 of 6',
  team: 'Garuda FC',
}

const statistics = [
  {
    id: 'goals',
    label: 'Goals',
    value: 8,
    type: 'goals',
  },
  {
    id: 'assists',
    label: 'Assists',
    value: 5,
    type: 'assists',
  },
  {
    id: 'saves',
    label: 'Saves',
    value: 12,
    type: 'saves',
  },
  {
    id: 'yellowCards',
    label: 'Yellow',
    value: 1,
    type: 'yellowCards',
  },
  {
    id: 'redCards',
    label: 'Red',
    value: 0,
    type: 'redCards',
  },
]

function HomePage() {
  const navigate = useNavigate()

  const hasCommunity = Boolean(currentCommunity)
  const hasActiveSeason = Boolean(activeSeason)

  const handleCreateCommunity = () => {
    navigate('/community')
  }

  const handleJoinCommunity = () => {
    navigate('/community')
  }

  const handleViewCommunity = () => {
    navigate('/community')
  }

  const handleViewSeason = () => {
    navigate('/community')
  }

  const handleViewSeasons = () => {
    navigate('/community')
  }

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          Good afternoon, Rafli.
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Pantau community, Season, dan performa kamu di
          satu tempat.
        </p>
      </section>

      {/* Current Community */}
      {hasCommunity ? (
        <CurrentCommunityCard
          community={currentCommunity}
          onView={handleViewCommunity}
        />
      ) : (
        <CommunityEmptyState
          onCreate={handleCreateCommunity}
          onJoin={handleJoinCommunity}
        />
      )}

      {/* Active Season */}
      {hasCommunity &&
        (hasActiveSeason ? (
          <ActiveSeasonCard
            season={activeSeason}
            onView={handleViewSeason}
          />
        ) : (
          <SeasonEmptyState
            onViewSeasons={handleViewSeasons}
          />
        ))}

      {/* Quick Stats */}
      {hasCommunity && (
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-extrabold text-slate-950">
              My Statistics
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Statistik kamu di community ini.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
            {statistics.map((stat) => (
              <StatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                type={stat.type}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Activity */}
      <RecentActivity
        activities={activities}
      />
    </div>
  )
}

export default HomePage