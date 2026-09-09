import EmptyState from '../ui/EmptyState'
import MemberCard from './MemberCard'

function MemberList({
  members = [],
  search = '',
  role = 'ALL',
  status = 'ALL',
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onViewMember,
}) {
  const normalizedSearch = search.trim().toLowerCase()

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      normalizedSearch === '' ||
      member.name
        ?.toLowerCase()
        .includes(normalizedSearch) ||
      member.username
        ?.toLowerCase()
        .includes(normalizedSearch)

    const matchesRole =
      role === 'ALL' ||
      member.role === role

    const matchesStatus =
      status === 'ALL' ||
      member.status === status

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    )
  })

  return (
    <div className="space-y-5">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px]">
        <div>
          <label
            htmlFor="member-search"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Search Members
          </label>

          <input
            id="member-search"
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange?.(event.target.value)
            }
            placeholder="Search name or @username..."
            className={[
              'block w-full rounded-lg border border-slate-200 bg-white',
              'px-4 py-3 text-sm text-slate-900',
              'placeholder:text-slate-400',
              'outline-none',
              'transition',
              'focus:border-slate-400 focus:ring-2 focus:ring-slate-100',
            ].join(' ')}
          />
        </div>

        <div>
          <label
            htmlFor="member-role-filter"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Role
          </label>

          <select
            id="member-role-filter"
            value={role}
            onChange={(event) =>
              onRoleChange?.(event.target.value)
            }
            className={[
              'block w-full rounded-lg border border-slate-200 bg-white',
              'px-4 py-3 text-sm text-slate-900',
              'outline-none',
              'transition',
              'focus:border-slate-400 focus:ring-2 focus:ring-slate-100',
            ].join(' ')}
          >
            <option value="ALL">
              All Roles
            </option>

            <option value="OWNER">
              Owner
            </option>

            <option value="ADMIN">
              Admin
            </option>

            <option value="MEMBER">
              Member
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="member-status-filter"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Status
          </label>

          <select
            id="member-status-filter"
            value={status}
            onChange={(event) =>
              onStatusChange?.(event.target.value)
            }
            className={[
              'block w-full rounded-lg border border-slate-200 bg-white',
              'px-4 py-3 text-sm text-slate-900',
              'outline-none',
              'transition',
              'focus:border-slate-400 focus:ring-2 focus:ring-slate-100',
            ].join(' ')}
          >
            <option value="ALL">
              All Status
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="SUSPENDED">
              Suspended
            </option>

            <option value="LEFT">
              Left
            </option>
          </select>
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <EmptyState
          title="No members found"
          description="Tidak ada member yang sesuai dengan pencarian atau filter yang dipilih."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onClick={() =>
                onViewMember?.(member)
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MemberList