import {
  CalendarDays,
  Clock3,
  MapPin,
  Trophy,
  Users,
} from 'lucide-react'

import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'

const MOCK_SEASON = {
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
  const season = MOCK_SEASON

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
      {/* Header */}
      <Card padding="none">
        <div className="overflow-hidden rounded-2xl">
          <div className="relative min-h-64 bg-slate-950">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950" />

            <div className="relative flex min-h-64 flex-col justify-end p-5 sm:p-7 lg:p-8">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant={status.variant}
                  >
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

      {/* Season Information */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <CalendarDays size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Date
              </p>

              <p className="mt-1 text-sm font-bold text-slate-950">
                {season.date}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Clock3 size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Start Time
              </p>

              <p className="mt-1 text-sm font-bold text-slate-950">
                {season.startTime}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <MapPin size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Location
              </p>

              <p className="mt-1 truncate text-sm font-bold text-slate-950">
                {season.location}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Users size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Participants
              </p>

              <p className="mt-1 text-sm font-bold text-slate-950">
                {season.participants} /{' '}
                {season.totalParticipants}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-950">
                Participant Progress
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Jumlah peserta Season saat ini.
              </p>
            </div>

            <Users
              size={20}
              className="shrink-0 text-slate-400"
            />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-600">
                Participants
              </span>

              <span className="font-extrabold text-slate-950">
                {season.participants} /{' '}
                {season.totalParticipants}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{
                  width: `${participantProgress}%`,
                }}
              />
            </div>
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

            <Trophy
              size={20}
              className="shrink-0 text-slate-400"
            />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-600">
                Matches
              </span>

              <span className="font-extrabold text-slate-950">
                {season.currentMatch} /{' '}
                {season.totalMatches}
              </span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all"
                style={{
                  width: `${matchProgress}%`,
                }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Season Modules */}
      <Card>
        <div>
          <p className="text-base font-bold text-slate-950">
            Season Management
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Semua aktivitas Season akan dikelola dari
            halaman ini.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">
              Participants
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Pendaftaran dan peserta Season.
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">
              Teams
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Empat team yang bertanding.
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">
              Player Drawing
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Pembagian peserta ke team.
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">
              Match Drawing
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Penentuan urutan enam pertandingan.
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">
              Matches
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Jadwal dan hasil pertandingan.
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-900">
              Standings & Awards
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Klasemen, statistik, dan penghargaan.
            </p>
          </div>
        </div>
      </Card>

      {/* Temporary Action */}
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

export default SeasonDetailPage

