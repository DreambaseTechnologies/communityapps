
import {
  CalendarDays,
  ChevronLeft,
  Clock3,
  MapPin,
  Trophy,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import SeasonParticipants from '../../components/common/SeasonParticipants'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import {
  COMMUNITY_PERMISSIONS,
  COMMUNITY_ROLES,
  hasCommunityPermission,
} from '../../utils/communityPermissions'

const MOCK_CURRENT_USER_ROLE = COMMUNITY_ROLES.OWNER

const MOCK_SEASONS = {
  'season-08': {
    id: 'season-08',
    name: 'Season 08',
    status: 'ONGOING',
    date: '14 Sep 2026',
    startTime: '19:30',
    location: 'Garuda Arena',
    description:
      'Fourfeo community dengan format 4 team dan 6 pertandingan.',
    participants: 48,
    totalParticipants: 48,
    currentMatch: 4,
    totalMatches: 6,
  },
}

const MOCK_PLAYERS = {
  'player-01': {
    id: 'player-01',
    name: 'Muhammad Rafli',
    username: '@rafli',
    avatar: '',
  },
  'player-02': {
    id: 'player-02',
    name: 'Ardiansyah Putra',
    username: '@ardiansyah',
    avatar: '',
  },
  'player-03': {
    id: 'player-03',
    name: 'Kevin Wijaya',
    username: '@kevinw',
    avatar: '',
  },
  'player-04': {
    id: 'player-04',
    name: 'Yoga Pratama',
    username: '@yogap',
    avatar: '',
  },
  'player-05': {
    id: 'player-05',
    name: 'Fajar Ramadhan',
    username: '@fajar',
    avatar: '',
  },
  'player-06': {
    id: 'player-06',
    name: 'Dimas Saputra',
    username: '@dimas',
    avatar: '',
  },
}

const INITIAL_PARTICIPATIONS = [
  {
    id: 'participation-01',
    seasonId: 'season-08',
    playerId: 'player-01',
    status: 'APPROVED',
    position: 'Goalkeeper',
    registeredAt: '8 Sep 2026',
  },
  {
    id: 'participation-02',
    seasonId: 'season-08',
    playerId: 'player-02',
    status: 'APPROVED',
    position: 'Outfield',
    registeredAt: '8 Sep 2026',
  },
  {
    id: 'participation-03',
    seasonId: 'season-08',
    playerId: 'player-03',
    status: 'APPROVED',
    position: 'Outfield',
    registeredAt: '9 Sep 2026',
  },
  {
    id: 'participation-04',
    seasonId: 'season-08',
    playerId: 'player-04',
    status: 'PENDING',
    position: 'Outfield',
    registeredAt: '9 Sep 2026',
  },
  {
    id: 'participation-05',
    seasonId: 'season-08',
    playerId: 'player-05',
    status: 'APPROVED',
    position: 'Outfield',
    registeredAt: '9 Sep 2026',
  },
  {
    id: 'participation-06',
    seasonId: 'season-08',
    playerId: 'player-06',
    status: 'REJECTED',
    position: 'Outfield',
    registeredAt: '9 Sep 2026',
  },
]

const STATUS_CONFIG = {
  DRAFT: {
    label: 'Draft',
    variant: 'neutral',
  },
  REGISTRATION_OPEN: {
    label: 'Registration Open',
    variant: 'success',
  },
  REGISTRATION_CLOSED: {
    label: 'Registration Closed',
    variant: 'warning',
  },
  DRAWING: {
    label: 'Drawing',
    variant: 'info',
  },
  ONGOING: {
    label: 'Ongoing',
    variant: 'success',
  },
  FINISHED: {
    label: 'Finished',
    variant: 'neutral',
  },
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={19} strokeWidth={2} aria-hidden="true" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-slate-900">
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

function ProgressCard({ label, current, total, description }) {
  const percentage =
    total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>

          <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
            {current}
            <span className="text-base font-bold text-slate-400">
              {' '}
              / {total}
            </span>
          </p>
        </div>

        <span className="text-sm font-extrabold text-emerald-600">
          {percentage}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-500">{description}</p>
    </Card>
  )
}

function ManagementCard({
  icon: Icon,
  title,
  description,
  status = 'Coming Soon',
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={20} strokeWidth={2} aria-hidden="true" />
        </div>

        <Badge variant="neutral">{status}</Badge>
      </div>

      <h3 className="mt-4 font-bold text-slate-950">{title}</h3>

      <p className="mt-1 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  )
}

function SeasonDetailPage() {
  const { seasonId } = useParams()
  const navigate = useNavigate()

  const [participations, setParticipations] = useState(
    INITIAL_PARTICIPATIONS,
  )

  const season =
    MOCK_SEASONS[seasonId] ?? MOCK_SEASONS['season-08']

  const statusConfig =
    STATUS_CONFIG[season.status] ?? STATUS_CONFIG.DRAFT

  const canManageParticipants = hasCommunityPermission(
    MOCK_CURRENT_USER_ROLE,
    COMMUNITY_PERMISSIONS.MANAGE_SEASONS,
  )

  const seasonParticipations = participations.map((participation) => ({
    ...participation,
    player: MOCK_PLAYERS[participation.playerId] ?? null,
  }))

  const handleUpdateParticipantStatus = (participationId, status) => {
    if (!canManageParticipants) {
      return
    }

    setParticipations((currentParticipations) =>
      currentParticipations.map((participation) => {
        if (participation.id !== participationId) {
          return participation
        }

        return {
          ...participation,
          status,
        }
      }),
    )
  }

  const handleApproveParticipant = (participationId) => {
    handleUpdateParticipantStatus(participationId, 'APPROVED')
  }

  const handleRejectParticipant = (participationId) => {
    handleUpdateParticipantStatus(participationId, 'REJECTED')
  }

  return (
    <div className="mx-auto w-full max-w-6xl pb-24">
      <button
        type="button"
        onClick={() => navigate('/community')}
        className="mb-5 inline-flex items-center gap-2 rounded-lg text-sm font-bold text-slate-600 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
      >
        <ChevronLeft size={18} aria-hidden="true" />
        Back to Community
      </button>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusConfig.variant}>
                {statusConfig.label}
              </Badge>

              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
                Season
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {season.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              {season.description}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <Trophy
              size={22}
              className="text-emerald-400"
              aria-hidden="true"
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Competition
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                4 Teams · 6 Matches
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          icon={CalendarDays}
          label="Date"
          value={season.date}
        />

        <InfoCard
          icon={Clock3}
          label="Start Time"
          value={season.startTime}
        />

        <InfoCard
          icon={MapPin}
          label="Location"
          value={season.location}
        />

        <InfoCard
          icon={Users}
          label="Participants"
          value={`${season.participants} / ${season.totalParticipants}`}
        />
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        <ProgressCard
          label="Participant Registration"
          current={season.participants}
          total={season.totalParticipants}
          description="Jumlah peserta yang sudah terdaftar pada Season ini."
        />

        <ProgressCard
          label="Match Progress"
          current={season.currentMatch}
          total={season.totalMatches}
          description="Progress pertandingan yang sudah dimainkan."
        />
      </section>

      <SeasonParticipants
        seasonId={season.id}
        participations={seasonParticipations}
        canManage={canManageParticipants}
        onApprove={handleApproveParticipant}
        onReject={handleRejectParticipant}
      />

      <section className="mt-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
            Season Management
          </p>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
            Competition Modules
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Modul yang akan digunakan untuk mengelola jalannya Season.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ManagementCard
            icon={Users}
            title="Participants"
            description="Kelola peserta dan status pendaftaran Season."
            status="Active"
          />

          <ManagementCard
            icon={Users}
            title="Teams"
            description="Kelola empat team yang bertanding pada Season."
          />

          <ManagementCard
            icon={Users}
            title="Player Drawing"
            description="Pembagian pemain secara random dan seimbang."
          />

          <ManagementCard
            icon={Trophy}
            title="Match Drawing"
            description="Atur urutan enam pertandingan tanpa pairing duplikat."
          />

          <ManagementCard
            icon={CalendarDays}
            title="Matches"
            description="Lihat fixture dan status seluruh pertandingan."
          />

          <ManagementCard
            icon={Trophy}
            title="Standings & Awards"
            description="Klasemen, statistik, champion, dan penghargaan Season."
          />
        </div>
      </section>
    </div>
  )
}

export default SeasonDetailPage
