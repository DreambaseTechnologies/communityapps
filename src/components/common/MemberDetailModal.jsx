import {
  ShieldCheck,
  UserRound,
  UserX,
} from 'lucide-react'

import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

import {
  hasCommunityPermission,
} from '../../utils/communityPermissions'

const roleConfig = {
  OWNER: {
    label: 'Owner',
    variant: 'primary',
  },

  ADMIN: {
    label: 'Admin',
    variant: 'info',
  },

  MEMBER: {
    label: 'Member',
    variant: 'default',
  },
}

const statusConfig = {
  ACTIVE: {
    label: 'Active',
    variant: 'success',
  },

  SUSPENDED: {
    label: 'Suspended',
    variant: 'warning',
  },

  LEFT: {
    label: 'Left',
    variant: 'danger',
  },
}

function MemberDetailModal({
  open,
  member,
  currentUserRole,
  onClose,
  onManageRole,
  onManageStatus,
  onRemoveMember,
}) {
  if (!member) {
    return null
  }

  const role =
    roleConfig[member.role] ??
    roleConfig.MEMBER

  const status =
    statusConfig[member.status] ??
    statusConfig.ACTIVE

  const isOwner =
    member.role === 'OWNER'

  const isAdmin =
    member.role === 'ADMIN'

  const isMember =
    member.role === 'MEMBER'

  const canManageRole =
    currentUserRole === 'OWNER' &&
    !isOwner &&
    hasCommunityPermission(
      currentUserRole,
      'MANAGE_ADMINS',
    )

  const canManageStatus =
    !isOwner &&
    (
      currentUserRole === 'OWNER' ||
      (
        currentUserRole === 'ADMIN' &&
        isMember
      )
    ) &&
    hasCommunityPermission(
      currentUserRole,
      'MANAGE_MEMBERS',
    )

  const canRemoveMember =
    !isOwner &&
    (
      currentUserRole === 'OWNER' ||
      (
        currentUserRole === 'ADMIN' &&
        isMember
      )
    ) &&
    hasCommunityPermission(
      currentUserRole,
      'MANAGE_MEMBERS',
    )

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Member Details"
      description="Informasi dan pengelolaan member komunitas."
      size="md"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <Avatar
            name={member.name}
            src={member.avatar}
            alt={member.name}
            size="xl"
          />

          <h3 className="mt-4 text-xl font-extrabold text-slate-950">
            {member.name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {member.username}
          </p>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Badge
              variant={role.variant}
            >
              <ShieldCheck
                size={14}
                strokeWidth={2.2}
              />

              {role.label}
            </Badge>

            <Badge
              variant={status.variant}
            >
              {status.label}
            </Badge>

            {member.isPlayer && (
              <Badge variant="success">
                Player
              </Badge>
            )}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <UserRound
                size={17}
                className="text-slate-400"
              />

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Role
              </p>
            </div>

            <p className="mt-2 font-bold text-slate-900">
              {role.label}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Joined
            </p>

            <p className="mt-2 font-bold text-slate-900">
              {member.joinedAt ?? '-'}
            </p>
          </div>
        </div>

        {isOwner ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">
              Owner account
            </p>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Owner tidak dapat dikelola, diubah role,
              diubah status, atau dikeluarkan dari komunitas
              melalui member management.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {canManageRole && (
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={() =>
                  onManageRole?.(member)
                }
              >
                <ShieldCheck size={18} />
                Change Role
              </Button>
            )}

            {canManageStatus && (
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={() =>
                  onManageStatus?.(member)
                }
              >
                <UserRound size={18} />
                Change Status
              </Button>
            )}

            {canRemoveMember && (
              <Button
                variant="danger"
                className="w-full justify-start"
                onClick={() =>
                  onRemoveMember?.(member)
                }
              >
                <UserX size={18} />
                Remove Member
              </Button>
            )}

            {!canManageRole &&
              !canManageStatus &&
              !canRemoveMember && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    No management access
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Kamu tidak memiliki permission untuk
                    mengelola member ini.
                  </p>
                </div>
              )}
          </div>
        )}

        <div className="border-t border-slate-100 pt-5">
          <p className="text-xs leading-5 text-slate-400">
            Mengeluarkan member tidak menghapus riwayat
            Season, pertandingan, maupun statistik yang
            sudah tersimpan.
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default MemberDetailModal