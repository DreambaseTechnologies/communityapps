
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
    icon: Clock3,
  },
  APPROVED: {
    label: 'Approved',
    variant: 'success',
    icon: CheckCircle2,
  },
  REJECTED: {
    label: 'Rejected',
    variant: 'danger',
    icon: XCircle,
  },
}

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

function SummaryItem({ label, value, variant }) {
  const config = PARTICIPANT_STATUS[variant]
  const Icon = config?.icon

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
            {value}
          </p>
        </div>

        {Icon ? (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
            <Icon size={19} strokeWidth={2} aria-hidden="true" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

function ParticipantRow({
  participation,
  canManage,
  onApprove,
  onReject,
}) {
  const player = participation.player

  const statusConfig =
    PARTICIPANT_STATUS[participation.status] ?? PARTICIPANT_STATUS.PENDING

  const isPending = participation.status === 'PENDING'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
      <div className="flex items-start gap-3">
        <Avatar
          src={player.avatar}
          name={player.name}
          size="md"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate font-bold text-slate-950">
                  {player.name}
                </h3>

                <Badge variant={statusConfig.variant}>
                  {statusConfig.label}
                </Badge>
              </div>

              <p className="mt-0.5 text-sm text-slate-500">
                {player.username}
              </p>
            </div>

            {canManage && isPending ? (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => onApprove?.(participation.id)}
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-sm font-bold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                  aria-label={`Approve ${player.name}`}
                >
                  <CheckCircle2 size={16} strokeWidth={2.25} aria-hidden="true" />
                  <span>Approve</span>
                </button>

                <button
                  type="button"
                  onClick={() => onReject?.(participation.id)}
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 text-sm font-bold text-red-700 transition hover:border-red-300 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  aria-label={`Reject ${player.name}`}
                >
                  <XCircle size={16} strokeWidth={2.25} aria-hidden="true" />
                  <span>Reject</span>
                </button>
              </div>
            ) : null}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Position
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {participation.position}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Registered
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {participation.registeredAt}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Season Position
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {participation.position}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SeasonParticipants({
  seasonId,
  participations = [],
  canManage = false,
  onApprove,
  onReject,
}) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('ALL')

  const seasonParticipations = useMemo(() => {
    if (!seasonId) {
      return []
    }

    return participations.filter(
      (participation) => participation.seasonId === seasonId,
    )
  }, [participations, seasonId])

  const summary = useMemo(() => {
    return {
      approved: seasonParticipations.filter(
        (participation) => participation.status === 'APPROVED',
      ).length,

      pending: seasonParticipations.filter(
        (participation) => participation.status === 'PENDING',
      ).length,

      rejected: seasonParticipations.filter(
        (participation) => participation.status === 'REJECTED',
      ).length,
    }
  }, [seasonParticipations])

  const filteredParticipations = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return seasonParticipations.filter((participation) => {
      const player = participation.player

      if (!player) {
        return false
      }

      const matchesSearch =
        !normalizedSearch ||
        player.name.toLowerCase().includes(normalizedSearch) ||
        player.username.toLowerCase().includes(normalizedSearch)

      const matchesStatus =
        activeFilter === 'ALL' ||
        participation.status === activeFilter

      return matchesSearch && matchesStatus
    })
  }, [activeFilter, search, seasonParticipations])

  return (
    <section className="mt-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
          Registration
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
              Participants
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Daftar pemain yang terdaftar pada Season ini.
            </p>
          </div>

          <div className="text-sm font-semibold text-slate-500">
            {seasonParticipations.length} participants
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <SummaryItem
          label="Approved"
          value={summary.approved}
          variant="APPROVED"
        />

        <SummaryItem
          label="Pending"
          value={summary.pending}
          variant="PENDING"
        />

        <SummaryItem
          label="Rejected"
          value={summary.rejected}
          variant="REJECTED"
        />
      </div>

      <Card className="mt-5 overflow-hidden p-0">
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search player..."
              aria-label="Search participants"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setActiveFilter(option.value)}
                  className={[
                    'shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition',
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                  ].join(' ')}
                  aria-pressed={isActive}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-3 p-4 sm:p-5">
          {filteredParticipations.length > 0 ? (
            filteredParticipations.map((participation) => (
              <ParticipantRow
                key={participation.id}
                participation={participation}
                canManage={canManage}
                onApprove={onApprove}
                onReject={onReject}
              />
            ))
          ) : (
            <EmptyState
              icon={
                seasonParticipations.length === 0
                  ? UserRound
                  : Search
              }
              title={
                seasonParticipations.length === 0
                  ? 'No participants yet'
                  : 'No participants found'
              }
              description={
                seasonParticipations.length === 0
                  ? 'Belum ada pemain yang terdaftar pada Season ini.'
                  : 'Coba ubah kata pencarian atau filter status.'
              }
            />
          )}
        </div>
      </Card>
    </section>
  )
}

export default SeasonParticipants