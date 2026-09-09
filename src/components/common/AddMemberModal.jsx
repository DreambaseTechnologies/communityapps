import { useState } from 'react'
import {
  Search,
  UserPlus,
  UserRound,
} from 'lucide-react'

import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

function AddMemberModal({
  open,
  onClose,
  onAdd,
  existingMembers = [],
}) {
  const [username, setUsername] =
    useState('')

  const [selectedUser, setSelectedUser] =
    useState(null)

  const [hasSearched, setHasSearched] =
    useState(false)

  const [error, setError] =
    useState('')

  const mockUsers = [
    {
      id: 'user-7',
      name: 'Ardiansyah Putra',
      username: '@ardiansyah',
      avatar: null,
    },
    {
      id: 'user-8',
      name: 'Kevin Wijaya',
      username: '@kevinw',
      avatar: null,
    },
    {
      id: 'user-9',
      name: 'Yoga Pratama',
      username: '@yogap',
      avatar: null,
    },
  ]

  const handleSearch = () => {
    const normalizedUsername =
      username
        .trim()
        .toLowerCase()

    setSelectedUser(null)
    setError('')
    setHasSearched(true)

    if (!normalizedUsername) {
      setError(
        'Masukkan username terlebih dahulu.',
      )
      return
    }

    const formattedUsername =
      normalizedUsername.startsWith('@')
        ? normalizedUsername
        : `@${normalizedUsername}`

    const existingMember =
      existingMembers.find(
        (member) =>
          member.username?.toLowerCase() ===
          formattedUsername,
      )

    if (existingMember) {
      setError(
        'User tersebut sudah menjadi member komunitas.',
      )
      return
    }

    const user =
      mockUsers.find(
        (item) =>
          item.username.toLowerCase() ===
          formattedUsername,
      )

    if (!user) {
      setError(
        'User tidak ditemukan. Coba username lain.',
      )
      return
    }

    setSelectedUser(user)
  }

  const handleAdd = () => {
    if (!selectedUser) {
      return
    }

    onAdd?.({
      id: `member-${Date.now()}`,
      name: selectedUser.name,
      username: selectedUser.username,
      avatar: selectedUser.avatar,
      role: 'MEMBER',
      status: 'ACTIVE',
      isPlayer: false,
      joinedAt: 'Today',
    })

    handleClose()
  }

  const handleClose = () => {
    setUsername('')
    setSelectedUser(null)
    setHasSearched(false)
    setError('')
    onClose?.()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Member"
      description="Tambahkan user ke dalam komunitas."
      size="md"
    >
      <div className="space-y-5">
        <div>
          <label
            htmlFor="add-member-username"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Username
          </label>

          <div className="flex gap-2">
            <input
              id="add-member-username"
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(
                  event.target.value,
                )
                setHasSearched(false)
                setSelectedUser(null)
                setError('')
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch()
                }
              }}
              placeholder="@username"
              className={[
                'min-w-0 flex-1 rounded-lg border border-slate-200 bg-white',
                'px-4 py-3 text-sm text-slate-900',
                'placeholder:text-slate-400',
                'outline-none',
                'transition',
                'focus:border-slate-400 focus:ring-2 focus:ring-slate-100',
              ].join(' ')}
            />

            <Button
              variant="secondary"
              onClick={handleSearch}
            >
              <Search size={17} />
              Search
            </Button>
          </div>

          {error && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {error}
            </p>
          )}
        </div>

        {hasSearched &&
          !error &&
          selectedUser && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                User Found
              </p>

              <div className="flex items-center gap-3">
                <Avatar
                  name={selectedUser.name}
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  size="md"
                />

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-950">
                    {selectedUser.name}
                  </p>

                  <p className="mt-0.5 text-sm text-slate-500">
                    {selectedUser.username}
                  </p>
                </div>

                <UserRound
                  size={19}
                  className="shrink-0 text-emerald-600"
                />
              </div>

              <Button
                variant="success"
                className="mt-4 w-full"
                onClick={handleAdd}
              >
                <UserPlus size={18} />
                Add to Community
              </Button>
            </div>
          )}

        {!hasSearched && (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-400 ring-1 ring-slate-200">
              <UserPlus size={20} />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              Search by username
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Masukkan @username user yang ingin
              ditambahkan ke komunitas.
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default AddMemberModal