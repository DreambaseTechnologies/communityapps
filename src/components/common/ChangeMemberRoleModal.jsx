import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import Button from '../ui/Button'
import Modal from '../ui/Modal'

import {
  hasCommunityPermission,
} from '../../utils/communityPermissions'

const ROLE_OPTIONS = [
  {
    value: 'MEMBER',
    label: 'Member',
    description:
      'Member biasa yang dapat mengikuti aktivitas komunitas dan Season.',
  },
  {
    value: 'ADMIN',
    label: 'Admin',
    description:
      'Admin dapat membantu mengelola member, player, Season, team, drawing, match, live match, dan statistik.',
  },
]

function ChangeMemberRoleModal({
  open,
  member,
  currentUserRole,
  onClose,
  onSave,
}) {
  const [role, setRole] = useState(
    member?.role ?? 'MEMBER',
  )

  const [isSaving, setIsSaving] =
    useState(false)

  useEffect(() => {
    if (!open || !member) {
      return
    }

    setRole(member.role ?? 'MEMBER')
    setIsSaving(false)
  }, [open, member])

  if (!member) {
    return null
  }

  const canManageRole =
    currentUserRole === 'OWNER' &&
    member.role !== 'OWNER' &&
    hasCommunityPermission(
      currentUserRole,
      'MANAGE_ADMINS',
    )

  const isChanged =
    role !== member.role

  const handleSave = async () => {
    if (!canManageRole || !isChanged) {
      return
    }

    setIsSaving(true)

    try {
      await onSave?.(
        member.id,
        role,
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Change Member Role"
      description="Ubah role member dalam komunitas."
      size="md"
      closeOnBackdrop={!isSaving}
      closeOnEscape={!isSaving}
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={
              !canManageRole ||
              !isChanged ||
              isSaving
            }
          >
            {isSaving
              ? 'Saving...'
              : 'Save Role'}
          </Button>
        </div>
      }
    >
      {!canManageRole ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <p className="font-semibold text-red-900">
                You cannot change this role
              </p>

              <p className="mt-1 text-sm leading-6 text-red-700">
                Hanya Owner yang dapat mengubah role
                member. Owner tidak dapat diubah menjadi
                Admin atau Member.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-600 ring-1 ring-slate-200">
              <UserRound size={20} />
            </div>

            <div className="min-w-0">
              <p className="truncate font-bold text-slate-950">
                {member.name}
              </p>

              <p className="mt-0.5 truncate text-sm text-slate-500">
                {member.username}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-900">
              Select Role
            </p>

            <div className="space-y-2">
              {ROLE_OPTIONS.map(
                (option) => {
                  const isSelected =
                    role === option.value

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={isSaving}
                      onClick={() =>
                        setRole(
                          option.value,
                        )
                      }
                      className={[
                        'flex w-full items-start gap-3 rounded-xl border p-4 text-left',
                        'transition-colors duration-150',
                        'focus-visible:outline-none',
                        'focus-visible:ring-2 focus-visible:ring-slate-400',
                        isSelected
                          ? 'border-slate-950 bg-slate-50'
                          : 'border-slate-200 bg-white hover:bg-slate-50',
                        'disabled:cursor-not-allowed disabled:opacity-60',
                      ].join(' ')}
                    >
                      <div
                        className={[
                          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                          isSelected
                            ? 'border-slate-950'
                            : 'border-slate-300',
                        ].join(' ')}
                      >
                        {isSelected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
                        )}
                      </div>

                      <div className="flex min-w-0 flex-1 gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-600 ring-1 ring-slate-200">
                          <ShieldCheck size={17} />
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900">
                            {option.label}
                          </p>

                          <p className="mt-1 text-sm leading-5 text-slate-500">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                },
              )}
            </div>
          </div>

          {isChanged && (
            <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2
                size={19}
                className="mt-0.5 shrink-0 text-emerald-600"
              />

              <div>
                <p className="text-sm font-semibold text-emerald-900">
                  Role change ready
                </p>

                <p className="mt-1 text-sm leading-5 text-emerald-700">
                  Role akan diubah dari{' '}
                  <span className="font-bold">
                    {member.role}
                  </span>{' '}
                  menjadi{' '}
                  <span className="font-bold">
                    {role}
                  </span>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

export default ChangeMemberRoleModal