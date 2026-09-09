
import {
  CalendarDays,
  Clock3,
  MapPin,
  Trophy,
  Users,
} from 'lucide-react'
import { useParams } from 'react-router-dom'

import SeasonParticipants from '../../components/common/SeasonParticipants'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

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

const STATUS_CONFIG = {
  DRAFT: {
    label: 'Draft',
    variant: 'neutral',
  },

  REGISTRATION_OPEN: {
    label: 'Registration Open',
    variant: 'info',
  },

  REGISTRATION_CLOSED: {
    label: 'Registration Closed',
    variant: 'warning',
  },

  DRAWING: {
    label: 'Drawing',
    variant: 'warning',
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

function SeasonDetailPage() {
  const { seasonId } = useParams()

  const season =
    MOCK_SEASONS[seasonId] ??
    MOCK_SEASONS['season-08']

  const status =
    STATUS_CONFIG[season.status] ??
    STATUS_CONFIG.DRAFT

  const participantProgress =
    season.totalParticipants > 0
      ? Math.min(
          (season.participants /
            season.totalParticipants) *
            100,
          100,
        )
      : 0

  const matchProgress =
    season.totalMatches > 0
      ? Math.min(
          (season.currentMatch /
            season.totalMatches) *
            100,
          100,
        )
      : 0

  return (
    <div className="space-y-6">
      {/* ==================================================
          Season Header
      ================================================== */}
      <Card padding="none">
        <div className="overflow-hidden rounded-2xl">
          <div className="relative min-h-64 bg-slate-950">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950" />

            <div className="relative flex min-h-64 flex-col justify-end p-5 sm:p-7 lg:p-8">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={status.variant}>
                    {status.label}
                  </Badge>

                  <Badge variant="neutral">
                    Season
                  </Badge>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {season.name}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  {season.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ==================================================
          Season Information
      ================================================== */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CalendarDays size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Date
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {season.date}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock3 size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Start Time
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {season.startTime}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <MapPin size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Location
              </p>

              <p className="mt-1 truncate font-bold text-slate-900">
                {season.location || '—'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Users size={20} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Participants
              </p>

              <p className="mt-1 font-bold text-slate-900">
                {season.participants} /{' '}
                {season.totalParticipants}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* ==================================================
          Progress
      ================================================== */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-950">
                Participant Progress
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Progress peserta Season.
              </p>
            </div>

            <span className="text-sm font-extrabold text-emerald-600">
              {Math.round(
                participantProgress,
              )}
              %
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{
                width: `${participantProgress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-400">
            <span>
              {season.participants} approved
            </span>

            <span>
              {season.totalParticipants} target
            </span>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-950">
                Match Progress
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Progress pertandingan Season.
              </p>
            </div>

            <span className="text-sm font-extrabold text-blue-600">
              {season.currentMatch} /{' '}
              {season.totalMatches}
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{
                width: `${matchProgress}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-400">
            <span>
              {season.currentMatch} completed
            </span>

            <span>
              {season.totalMatches} total
            </span>
          </div>
        </Card>
      </div>

      {/* ==================================================
          Participants
      ================================================== */}
      <SeasonParticipants />

      {/* ==================================================
          Season Management Modules
      ================================================== */}
      <Card>
        <div>
          <p className="text-sm font-bold text-slate-950">
            Season Management
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Semua modul yang berhubungan dengan Season
            akan tersedia dari halaman ini.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ModuleCard
            icon={<Users size={20} />}
            title="Participants"
            description="Kelola peserta Season."
          />

          <ModuleCard
            icon={<Users size={20} />}
            title="Teams"
            description="Kelola 4 team Season."
          />

          <ModuleCard
            icon={<Users size={20} />}
            title="Player Drawing"
            description="Random assignment pemain ke team."
          />

          <ModuleCard
            icon={<Trophy size={20} />}
            title="Match Drawing"
            description="Generate urutan 6 pertandingan."
          />

          <ModuleCard
            icon={<CalendarDays size={20} />}
            title="Matches"
            description="Lihat fixture dan status pertandingan."
          />

          <ModuleCard
            icon={<Trophy size={20} />}
            title="Standings & Awards"
            description="Klasemen dan penghargaan Season."
          />
        </div>
      </Card>

      {/* ==================================================
          Navigation
      ================================================== */}
      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() =>
            window.history.back()
          }
        >
          Back to Community
        </Button>
      </div>
    </div>
  )
}

function ModuleCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-slate-300 hover:bg-white">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>
    </div>
  )
}

export default SeasonDetailPage