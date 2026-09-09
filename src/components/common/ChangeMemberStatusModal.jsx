import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  UserRound,
} from 'lucide-react'

import Button from '../ui/Button'
import Modal from '../ui/Modal'

import {
  hasCommunityPermission,
} from '../../utils/communityPermissions'

const STATUS_OPTIONS = [
  {
    value: 'ACTIVE',
    label: 'Active',
    description:
      'Member dapat menggunakan fitur komunitas secara normal.',
  },
  {
    value: 'SUSPENDED',
    label: 'Suspended',
    description:
      'Member tetap tercatat di komunitas tetapi sementara tidak aktif.',
  },
  {
    value: 'LEFT',
    label: 'Left',
    description:
      'Member sudah keluar dari komunitas. Riwayat tetap dipertahankan.',
  },
]

function ChangeMemberStatusModal({
  open,
  member,
  currentUserRole,
  onClose,
  onSave,
}) {
  const [status, setStatus] = useState(
    member?.status ?? 'ACTIVE',
  )

  const [isSaving, setIsSaving] =
    useState(false)

  useEffect(() => {
    if (!open || !member) {
      return
    }

    setStatus(member.status ?? 'ACTIVE')
    setIsSaving(false)
  }, [open, member])

  if (!member) {
    return null
  }

  const canManageStatus =
    member.role !== 'OWNER' &&
    (
      currentUserRole === 'OWNER' ||
      (
        currentUserRole === 'ADMIN' &&
        member.role === 'MEMBER'
      )
    ) &&
    hasCommunityPermission(
      currentUserRole,
      'MANAGE_MEMBERS',
    )

  const isChanged =
    status !== member.status

  const handleSave = async () => {
    if (!canManageStatus || !isChanged) {
      return
    }

    setIsSaving(true)

    try {
      await onSave?.(
        member.id,
        status,
      )
    } finally {
      setIsSaving(false)
    }
  }

  const currentStatus =
    STATUS_OPTIONS.find(
      (option) =>
        option.value === status,
    ) ?? STATUS_OPTIONS[0]

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Change Member Status"
      description="Ubah status keanggotaan member dalam komunitas."
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
              !canManageStatus ||
              !isChanged ||
              isSaving
            }
          >
            {isSaving
              ? 'Saving...'
              : 'Save Status'}
          </Button>
        </div>
      }
    >
      {!canManageStatus ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex gap-3">
            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <div>
              <p className="font-semibold text-red-900">
                You cannot change this member's status
              </p>

              <p className="mt-1 text-sm leading-6 text-red-700">
                Owner tidak dapat dikelola oleh member lain.
                Admin hanya dapat mengelola status Member.
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
              Member Status
            </p>

            <div className="space-y-2">
              {STATUS_OPTIONS.map(
                (option) => {
                  const isSelected =
                    status === option.value

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={isSaving}
                      onClick={() =>
                        setStatus(
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

                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-900">
                          {option.label}
                        </p>

                        <p className="mt-1 text-sm leading-5 text-slate-500">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  )
                },
              )}
            </div>
          </div>

          <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <div>
              <p className="text-sm font-semibold text-emerald-900">
                History is preserved
              </p>

              <p className="mt-1 text-sm leading-5 text-emerald-700">
                Mengubah status member tidak menghapus
                riwayat Season, pertandingan, maupun
                statistik yang sudah tersimpan.
              </p>
            </div>
          </div>

          {isChanged && (
            <div className="rounded-lg bg-slate-100 px-4 py-3">
              <p className="text-sm text-slate-600">
                Status akan diubah dari{' '}
                <span className="font-bold text-slate-900">
                  {member.status}
                </span>{' '}
                menjadi{' '}
                <span className="font-bold text-slate-900">
                  {currentStatus.label}
                </span>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </Modal>
  )
}

export default ChangeMemberStatusModal