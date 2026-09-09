
import {
  Award,
  CalendarDays,
  Edit3,
  Goal,
  Hand,
  Shield,
  Trophy,
  UserRound,
} from 'lucide-react'

import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

function PlayerDetailModal({
  open,
  player,
  onClose,
  onEdit,
}) {
  if (!player) {
    return null
  }

  const statistics = [
    {
      label: 'Goals',
      value: player.goals ?? 0,
      icon: Goal,
    },
    {
      label: 'Assists',
      value: player.assists ?? 0,
      icon: Hand,
    },
    {
      label: 'Saves',
      value: player.saves ?? 0,
      icon: Shield,
    },
    {
      label: 'Yellow Cards',
      value: player.yellowCards ?? 0,
      icon: Shield,
    },
    {
      label: 'Red Cards',
      value: player.redCards ?? 0,
      icon: Shield,
    },
  ]

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Player Details"
      description="Profil dan statistik player dalam komunitas."
      size="lg"
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              onEdit?.(player)
            }
          >
            <Edit3 size={17} />
            Edit Player
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar
            name={player.name}
            src={player.avatar}
            alt={player.name}
            size="xl"
          />

          <h3 className="mt-4 text-xl font-extrabold text-slate-950">
            {player.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {player.username}
          </p>

          {player.position && (
            <div className="mt-3">
              <Badge variant="info">
                <Shield size={14} />
                {player.position}
              </Badge>

              <p className="mt-2 text-xs text-slate-400">
                Current Season Position
              </p>
            </div>
          )}

          {player.titles > 0 && (
            <div className="mt-3">
              <Badge variant="warning">
                <Trophy size={14} />
                {player.titles} Titles
              </Badge>
            </div>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={17}
                className="text-slate-400"
              />

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Seasons
              </p>
            </div>

            <p className="mt-2 text-2xl font-extrabold text-slate-950">
              {player.seasons ?? 0}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Trophy
                size={17}
                className="text-slate-400"
              />

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Titles
              </p>
            </div>

            <p className="mt-2 text-2xl font-extrabold text-slate-950">
              {player.titles ?? 0}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <UserRound
                size={17}
                className="text-slate-400"
              />

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Player
              </p>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-950">
              Community Player
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Goal
              size={18}
              className="text-slate-500"
            />

            <h4 className="text-base font-bold text-slate-950">
              Season Statistics
            </h4>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Statistik dihitung dari event pertandingan
            player dalam komunitas ini.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {statistics.map(
              ({
                label,
                value,
                icon: Icon,
              }) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon
                        size={17}
                        className="text-slate-400"
                      />

                      <p className="text-sm font-semibold text-slate-600">
                        {label}
                      </p>
                    </div>

                    <p className="text-xl font-extrabold text-slate-950">
                      {value}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Shield
              size={18}
              className="text-slate-500"
            />

            <h4 className="text-base font-bold text-slate-950">
              Community Player
            </h4>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Player dapat memiliki posisi yang berbeda
            pada setiap Season. Statistik player tetap
            tersimpan dalam konteks komunitas ini dan
            tidak digabungkan dengan komunitas lain.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <div className="flex items-center gap-2">
            <Trophy
              size={18}
              className="text-slate-500"
            />

            <h4 className="text-base font-bold text-slate-950">
              Career Summary
            </h4>
          </div>

          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Community Seasons
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Jumlah Season yang pernah diikuti.
                  </p>
                </div>

                <p className="text-xl font-extrabold text-slate-950">
                  {player.seasons ?? 0}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Championship Titles
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Jumlah Season yang dimenangkan.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Award
                    size={18}
                    className="text-slate-400"
                  />

                  <p className="text-xl font-extrabold text-slate-950">
                    {player.titles ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PlayerDetailModal
