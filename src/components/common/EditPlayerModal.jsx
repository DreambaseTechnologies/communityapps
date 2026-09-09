
import { useEffect, useState } from 'react'
import {
  Save,
  UserRound,
} from 'lucide-react'

import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Modal from '../ui/Modal'

function EditPlayerModal({
  open,
  player,
  onClose,
  onSave,
}) {
  const [name, setName] =
    useState('')

  const [username, setUsername] =
    useState('')

  const [avatar, setAvatar] =
    useState(null)

  const [errors, setErrors] =
    useState({})

  useEffect(() => {
    if (!open || !player) {
      return
    }

    setName(player.name ?? '')
    setUsername(player.username ?? '')
    setAvatar(player.avatar ?? null)
    setErrors({})
  }, [open, player])

  if (!player) {
    return null
  }

  const validate = () => {
    const nextErrors = {}

    if (!name.trim()) {
      nextErrors.name =
        'Nama player wajib diisi.'
    }

    if (!username.trim()) {
      nextErrors.username =
        'Username wajib diisi.'
    } else if (
      !username
        .trim()
        .startsWith('@')
    ) {
      nextErrors.username =
        'Username harus diawali dengan @.'
    }

    setErrors(nextErrors)

    return (
      Object.keys(nextErrors).length === 0
    )
  }

  const handleSubmit = () => {
    if (!validate()) {
      return
    }

    onSave?.({
      ...player,
      name: name.trim(),
      username: username.trim(),
      avatar,
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Player"
      description="Ubah informasi profil player dalam komunitas."
      size="md"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
          <Avatar
            name={name || player.name}
            src={avatar}
            alt={name || player.name}
            size="lg"
          />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              Player Profile
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Informasi profil player mengikuti akun
              dan membership komunitas.
            </p>
          </div>
        </div>

        <Input
          label="Name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Player name"
          required
          error={errors.name}
        />

        <Input
          label="Username"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          placeholder="@username"
          required
          error={errors.username}
        />

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex gap-3">
            <UserRound
              size={19}
              className="mt-0.5 shrink-0 text-slate-400"
            />

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Position is Season-specific
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Posisi player tidak bersifat permanen.
                Player dapat memilih posisi yang berbeda
                setiap mengikuti Season.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex gap-3">
            <UserRound
              size={19}
              className="mt-0.5 shrink-0 text-slate-400"
            />

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Statistics are protected
              </p>

              <p className="mt-1 text-sm leading-5 text-slate-500">
                Goals, assists, saves, yellow cards, dan
                red cards tidak dapat diedit dari profil.
                Statistik berasal dari event pertandingan.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleSubmit}
          >
            <Save size={17} />
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default EditPlayerModal