import { useState } from 'react'
import {
  Check,
  ChevronDown,
  Clock3,
  UserPlus,
  Users,
  X,
} from 'lucide-react'

import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'
import Modal from '../ui/Modal'

const MOCK_PLAYERS = [
  {
    id: 'player-01',
    name: 'Muhammad Rafli',
    username: '@rafli',
  },
  {
    id: 'player-02',
    name: 'Ardiansyah Putra',
    username: '@ardiansyah',
  },
  {
    id: 'player-03',
    name: 'Kevin Wijaya',
    username: '@kevinw',
  },
  {
    id: 'player-04',
    name: 'Yoga Pratama',
    username: '@yogap',
  },
  {
    id: 'player-05',
    name: 'Fajar Ramadhan',
    username: '@fajar',
  },
  {
    id: 'player-06',
    name: 'Dimas Saputra',
    username: '@dimas',
  },
]

const POSITION_OPTIONS = [
  {
    value: 'GK',
    label: 'GK',
    description: 'Goalkeeper',
  },
  {
    value: 'DEF',
    label: 'DEF',
    description: 'Defender',
  },
  {
    value: 'MID',
    label: 'MID',
    description: 'Midfielder',
  },
  {
    value: 'FW',
    label: 'FW',
    description: 'Forward',
  },
]

const STATUS_CONFIG = {
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

function ParticipantStatusBadge({ status }) {
  const config =
    STATUS_CONFIG[status] ?? STATUS_CONFIG.PENDING

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  )
}

function PositionBadge({ position }) {
  const positionConfig = POSITION_OPTIONS.find(
    (option) => option.value === position,
  )

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-700">
      <span className="tracking-wide">
        {positionConfig?.label ?? position}
      </span>

      {positionConfig?.description && (
        <span className="font-medium text-slate-400">
          {positionConfig.description}
        </span>
      )}
    </span>
  )
}

function RegistrationModal({
  open,
  onClose,
  onSubmit,
}) {
  const [position, setPosition] = useState('')
  const [error, setError] = useState('')

  const handleClose = () => {
    setPosition('')
    setError('')
    onClose()
  }

  const handleSubmit = () => {
    if (!position) {
      setError('Pilih posisi kamu untuk Season ini.')
      return
    }

    onSubmit({
      position,
    })

    setPosition('')
    setError('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Register Season"
    >
      <div className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Pilih posisi kamu
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Posisi berlaku khusus untuk Season ini dan dapat
            berbeda di Season berikutnya.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {POSITION_OPTIONS.map((option) => {
            const selected = position === option.value

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setPosition(option.value)
                  setError('')
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  selected
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-lg font-black tracking-tight ${
                      selected
                        ? 'text-emerald-700'
                        : 'text-slate-900'
                    }`}
                  >
                    {option.label}
                  </span>

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      selected
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {selected && <Check size={13} />}
                  </div>
                </div>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  {option.description}
                </p>
              </button>
            )
          })}
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Season Position
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Posisi ini hanya digunakan untuk Season yang sedang
            kamu ikuti. Kamu tetap bisa memilih posisi berbeda
            pada Season berikutnya.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
          >
            Submit Registration
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function RegistrationStatusCard({
  participation,
}) {
  if (!participation) {
    return null
  }

  if (participation.status === 'PENDING') {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Clock3 size={19} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-extrabold text-amber-900">
                Waiting for Approval
              </p>

              <ParticipantStatusBadge status="PENDING" />
            </div>

            <p className="mt-1 text-sm leading-6 text-amber-800/80">
              Pendaftaran kamu sudah dikirim dan sedang menunggu
              approval dari Owner atau Admin.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <PositionBadge
                position={participation.position}
              />

              <span className="text-xs font-medium text-amber-700">
                Registered {participation.registeredAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (participation.status === 'APPROVED') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Check size={19} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-extrabold text-emerald-900">
                Already Registered
              </p>

              <ParticipantStatusBadge status="APPROVED" />
            </div>

            <p className="mt-1 text-sm leading-6 text-emerald-800/80">
              Kamu sudah di-approve sebagai participant Season
              ini.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <PositionBadge
                position={participation.position}
              />

              <span className="text-xs font-medium text-emerald-700">
                Registered {participation.registeredAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (participation.status === 'REJECTED') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <X size={19} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-extrabold text-red-900">
                Registration Rejected
              </p>

              <ParticipantStatusBadge status="REJECTED" />
            </div>

            <p className="mt-1 text-sm leading-6 text-red-800/80">
              Pendaftaran sebelumnya ditolak. Selama registration
              masih dibuka, kamu dapat mendaftar kembali.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <PositionBadge
                position={participation.position}
              />

              <span className="text-xs font-medium text-red-700">
                Previous registration · {participation.registeredAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

function ParticipantRow({
  player,
  participation,
  currentPlayerId,
  canManage,
  onApprove,
  onReject,
}) {
  const isCurrentPlayer = player.id === currentPlayerId
  const isPending = participation.status === 'PENDING'

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar
          name={player.name}
          size="md"
        />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-bold text-slate-900">
              {player.name}
            </p>

            {isCurrentPlayer && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                You
              </span>
            )}
          </div>

          <p className="mt-0.5 text-xs text-slate-500">
            {player.username}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <PositionBadge position={participation.position} />

        <ParticipantStatusBadge
          status={participation.status}
        />

        {canManage && isPending && (
          <>
            <Button
              type="button"
              size="sm"
              onClick={() => onApprove(participation.id)}
              className="gap-1.5"
            >
              <Check size={15} />
              Approve
            </Button>

            <Button
              type="button"
              size="sm"
              variant="danger"
              onClick={() => onReject(participation.id)}
              className="gap-1.5"
            >
              <X size={15} />
              Reject
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

function RegistrationSummary({
  approvedCount,
  pendingCount,
  rejectedCount,
  maximumParticipants,
  seasonStatus,
}) {
  const remainingSlots = Math.max(
    maximumParticipants - approvedCount,
    0,
  )

  const isFull = remainingSlots === 0
  const registrationOpen =
    seasonStatus === 'REGISTRATION_OPEN'

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Registration Summary
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900">
            Participant capacity
          </p>
        </div>

        {registrationOpen && !isFull ? (
          <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            Registration Open
          </span>
        ) : isFull ? (
          <span className="inline-flex w-fit items-center rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
            Season Full
          </span>
        ) : (
          <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            Registration Closed
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Approved
          </p>

          <p className="mt-1 text-xl font-black text-slate-950">
            {approvedCount}
            <span className="ml-1 text-sm font-bold text-slate-400">
              / {maximumParticipants}
            </span>
          </p>
        </div>

        <div className="rounded-xl bg-amber-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-600">
            Pending
          </p>

          <p className="mt-1 text-xl font-black text-amber-700">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-xl bg-red-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-red-500">
            Rejected
          </p>

          <p className="mt-1 text-xl font-black text-red-600">
            {rejectedCount}
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">
            Slots Left
          </p>

          <p className="mt-1 text-xl font-black text-emerald-700">
            {remainingSlots}
          </p>
        </div>
      </div>

      {isFull && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs font-medium leading-5 text-red-700">
          Kapasitas Season sudah penuh. Player baru tidak dapat
          melakukan registration sampai ada perubahan kapasitas
          atau participant yang tidak lagi berstatus APPROVED.
        </p>
      )}
    </div>
  )
}

function getRegistrationMessage({
  registrationCode,
  seasonStatus,
  registrationReason,
}) {
  if (registrationCode === 'NOT_PLAYER') {
    return 'Not a Player'
  }

  if (registrationCode === 'SEASON_FULL') {
    return 'Season Full'
  }

  if (seasonStatus === 'DRAFT') {
    return 'Registration Not Open'
  }

  if (seasonStatus === 'REGISTRATION_CLOSED') {
    return 'Registration Closed'
  }

  if (seasonStatus === 'DRAWING') {
    return 'Drawing in Progress'
  }

  if (seasonStatus === 'ONGOING') {
    return 'Season Ongoing'
  }

  if (seasonStatus === 'FINISHED') {
    return 'Season Finished'
  }

  if (registrationCode === 'PENDING') {
    return 'Waiting for Approval'
  }

  if (registrationCode === 'APPROVED') {
    return 'Already Registered'
  }

  if (registrationCode === 'REJECTED') {
    return 'Register Season'
  }

  if (registrationReason) {
    return registrationReason
  }

  return 'Registration Unavailable'
}

function SeasonParticipants({
  seasonId,
  seasonStatus,
  participations,
  currentPlayerId,
  canManage,
  canRegister,
  registrationReason,
  registrationCode,
  approvedCount,
  pendingCount,
  rejectedCount,
  maximumParticipants,
  onRegister,
  onApprove,
  onReject,
}) {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
    useState(false)

  const [statusFilter, setStatusFilter] = useState('ALL')

  const seasonParticipations = participations.filter(
    (participation) => participation.seasonId === seasonId,
  )

  const playerMap = Object.fromEntries(
    MOCK_PLAYERS.map((player) => [player.id, player]),
  )

  const currentPlayerParticipation = seasonParticipations.find(
    (participation) =>
      participation.playerId === currentPlayerId,
  )

  const filteredParticipations =
    statusFilter === 'ALL'
      ? seasonParticipations
      : seasonParticipations.filter(
          (participation) =>
            participation.status === statusFilter,
        )

  const isFull = approvedCount >= maximumParticipants

  const handleRegistrationSubmit = ({ position }) => {
    if (!canRegister || isFull) {
      return
    }

    onRegister({
      position,
    })
  }

  const showRegistrationStatus =
    Boolean(currentPlayerParticipation) &&
    currentPlayerParticipation.status !== 'REJECTED'

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Users size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Season Participants
              </p>

              <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950">
                Players
              </h2>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Participant Season terpisah dari data Player. Posisi
            yang dipilih di sini hanya berlaku untuk Season ini.
          </p>
        </div>

        {canRegister ? (
          <Button
            type="button"
            onClick={() => setIsRegistrationModalOpen(true)}
            disabled={isFull}
            className="gap-2"
          >
            <UserPlus size={17} />
            Register Season
          </Button>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Registration
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {getRegistrationMessage({
                registrationCode,
                seasonStatus,
                registrationReason,
              })}
            </p>

            {registrationCode === 'NOT_PLAYER' && (
              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-400">
                Kamu harus menjadi Player di Community ini sebelum
                bisa mengikuti Season.
              </p>
            )}
          </div>
        )}
      </div>

      <RegistrationSummary
        approvedCount={approvedCount}
        pendingCount={pendingCount}
        rejectedCount={rejectedCount}
        maximumParticipants={maximumParticipants}
        seasonStatus={seasonStatus}
      />

      {showRegistrationStatus && (
        <div className="mt-5">
          <RegistrationStatusCard
            participation={currentPlayerParticipation}
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="ALL">All Participants</option>
            <option value="APPROVED">Approved</option>
            <option value="PENDING">Pending</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        <p className="text-xs font-medium text-slate-400">
          {filteredParticipations.length} participant
          {filteredParticipations.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {filteredParticipations.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <EmptyState
              title="No participants"
              description="Belum ada participant dengan filter yang dipilih."
            />
          </div>
        ) : (
          filteredParticipations.map((participation) => {
            const player = playerMap[participation.playerId]

            if (!player) {
              return null
            }

            return (
              <ParticipantRow
                key={participation.id}
                player={player}
                participation={participation}
                currentPlayerId={currentPlayerId}
                canManage={canManage}
                onApprove={onApprove}
                onReject={onReject}
              />
            )
          })
        )}
      </div>

      <RegistrationModal
        open={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </section>
  )
}

export default SeasonParticipants