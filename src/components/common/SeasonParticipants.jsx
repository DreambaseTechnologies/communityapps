
import {
  CheckCircle2,
  Clock3,
  Search,
  UserRound,
  XCircle,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import EmptyState from '../ui/EmptyState'

const PARTICIPANT_STATUS = {
  PENDING: {
    label: 'Pending',
    variant: 'warning',
  },

  APPROVED: {
    label: 'Approved',
    variant: 'success',
  },

  REJECTED: {
    label: 'Rejected',
    variant: 'danger',
  },
}

/**
 * ========================================================
 * Mock Player Profiles
 * ========================================================
 *
 * Player profile adalah data yang melekat pada Player.
 *
 * Position TIDAK disimpan di sini karena position
 * merupakan data Season Participation.
 */
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

/**
 * ========================================================
 * Mock Season Participation
 * ========================================================
 *
 * Ini adalah data yang menghubungkan Player dengan Season.
 *
 * Position berada DI SINI karena setiap Season pemain
 * dapat memilih posisi yang berbeda.
 */
const MOCK_PARTICIPATIONS = [
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

const FILTER_OPTIONS = [
  {
    value: 'ALL',
    label: 'All',
  },

  {
    value: 'APPROVED',
    label: 'Approved',
  },

  {
    value: 'PENDING',
    label: 'Pending',
  },

  {
    value: 'REJECTED',
    label: 'Rejected',
  },
]

function SeasonParticipants() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] =
    useState('ALL')

  /**
   * ======================================================
   * Current Season Participations
   * ======================================================
   *
   * Nantinya seasonId ini berasal dari halaman Season.
   * Untuk sekarang kita menggunakan Season 08 sebagai mock.
   */
  const seasonId = 'season-08'

  const seasonParticipations = useMemo(() => {
    return MOCK_PARTICIPATIONS
      .filter(
        (participation) =>
          participation.seasonId === seasonId,
      )
      .map((participation) => ({
        ...participation,
        player:
          MOCK_PLAYERS[
            participation.playerId
          ] ?? null,
      }))
      .filter(
        (participation) =>
          participation.player !== null,
      )
  }, [seasonId])

  const summary = useMemo(() => {
    return {
      total: seasonParticipations.length,

      approved:
        seasonParticipations.filter(
          (participation) =>
            participation.status ===
            'APPROVED',
        ).length,

      pending:
        seasonParticipations.filter(
          (participation) =>
            participation.status ===
            'PENDING',
        ).length,

      rejected:
        seasonParticipations.filter(
          (participation) =>
            participation.status ===
            'REJECTED',
        ).length,
    }
  }, [seasonParticipations])

  const filteredParticipants = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase()

    return seasonParticipations.filter(
      (participation) => {
        const player =
          participation.player

        const matchesSearch =
          !normalizedSearch ||
          player.name
            .toLowerCase()
            .includes(normalizedSearch) ||
          player.username
            .toLowerCase()
            .includes(normalizedSearch)

        const matchesStatus =
          statusFilter === 'ALL' ||
          participation.status ===
            statusFilter

        return (
          matchesSearch &&
          matchesStatus
        )
      },
    )
  }, [
    seasonParticipations,
    search,
    statusFilter,
  ])

  return (
    <Card>
      {/* ==================================================
          Header
      ================================================== */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-950">
            Participants
          </p>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            Peserta yang mendaftar untuk Season ini.
            Position berlaku khusus untuk Season.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex">
          <SummaryItem
            label="Approved"
            value={summary.approved}
            icon={
              <CheckCircle2 size={16} />
            }
            variant="success"
          />

          <SummaryItem
            label="Pending"
            value={summary.pending}
            icon={<Clock3 size={16} />}
            variant="warning"
          />

          <SummaryItem
            label="Rejected"
            value={summary.rejected}
            icon={
              <XCircle size={16} />
            }
            variant="danger"
          />
        </div>
      </div>

      {/* ==================================================
          Filters
      ================================================== */}
      <div className="mt-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search participant..."
            aria-label="Search participant"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {FILTER_OPTIONS.map(
            (option) => {
              const isActive =
                statusFilter ===
                option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setStatusFilter(
                      option.value,
                    )
                  }
                  className={[
                    'h-11 shrink-0 rounded-xl border px-4 text-sm font-semibold transition',
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50',
                  ].join(' ')}
                >
                  {option.label}
                </button>
              )
            },
          )}
        </div>
      </div>

      {/* ==================================================
          Participant List
      ================================================== */}
      <div className="mt-6">
        {filteredParticipants.length ===
        0 ? (
          <EmptyState
            icon={<UserRound size={22} />}
            title="No participants found"
            description="Tidak ada participant yang sesuai dengan pencarian atau filter."
          />
        ) : (
          <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
            {filteredParticipants.map(
              (participation) => (
                <ParticipantRow
                  key={participation.id}
                  participation={
                    participation
                  }
                />
              ),
            )}
          </div>
        )}
      </div>
    </Card>
  )
}

function ParticipantRow({
  participation,
}) {
  const player = participation.player

  const status =
    PARTICIPANT_STATUS[
      participation.status
    ] ?? PARTICIPANT_STATUS.PENDING

  return (
    <div className="flex flex-col gap-4 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar
          src={player.avatar}
          name={player.name}
          size="md"
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate font-bold text-slate-900">
              {player.name}
            </p>

            <Badge variant={status.variant}>
              {status.label}
            </Badge>
          </div>

          <p className="mt-0.5 text-sm text-slate-500">
            {player.username}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:flex sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Current Season Position
          </p>

          <p className="mt-0.5 font-semibold text-slate-700">
            {participation.position}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Registered
          </p>

          <p className="mt-0.5 font-semibold text-slate-700">
            {participation.registeredAt}
          </p>
        </div>
      </div>
    </div>
  )
}

function SummaryItem({
  label,
  value,
  icon,
  variant,
}) {
  const variantClasses = {
    success:
      'bg-emerald-50 text-emerald-700',

    warning:
      'bg-amber-50 text-amber-700',

    danger:
      'bg-red-50 text-red-700',
  }

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 sm:min-w-28">
      <div className="flex items-center gap-1.5">
        <span
          className={[
            'flex h-6 w-6 items-center justify-center rounded-lg',
            variantClasses[variant] ??
              variantClasses.success,
          ].join(' ')}
        >
          {icon}
        </span>

        <span className="text-xs font-semibold text-slate-500">
          {label}
        </span>
      </div>

      <p className="mt-1 text-lg font-extrabold text-slate-950">
        {value}
      </p>
    </div>
  )
}

export default SeasonParticipants