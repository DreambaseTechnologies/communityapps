import {
  Edit3,
  MapPin,
  Users,
} from 'lucide-react'

import {
  hasCommunityPermission,
} from '../../utils/communityPermissions'

import Avatar from '../ui/Avatar'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import Card from '../ui/Card'

function CommunityHeader({
  community = {
    name: 'Garuda FC Community',
    slogan: 'One Community. One Passion.',
    memberCount: 48,
    location: 'Balikpapan',
    logo: null,
    banner: null,
    status: 'ACTIVE',
    currentUserRole: 'MEMBER',
  },
  onEdit,
}) {
  const canEdit =
    hasCommunityPermission(
      community.currentUserRole,
      'MANAGE_COMMUNITY',
    )

  return (
    <Card
      padding="none"
      className="overflow-hidden"
    >
      {/* Banner */}
      <div className="h-28 bg-slate-950 sm:h-36">
        {community.banner ? (
          <img
            src={community.banner}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.25),_transparent_40%),linear-gradient(135deg,_#020617,_#0f172a)]"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Community information */}
      <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end">
          <div className="shrink-0">
            <Avatar
              src={community.logo}
              name={community.name}
              size="xl"
              className="h-20 w-20 rounded-2xl border-4 border-white bg-white text-2xl shadow-sm sm:h-24 sm:w-24"
            />
          </div>

          <div className="min-w-0 flex-1 pt-1 sm:pb-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                {community.name}
              </h1>

              <Badge variant="success">
                {community.status}
              </Badge>
            </div>

            {community.slogan && (
              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                {community.slogan}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Users
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />

                {community.memberCount} members
              </span>

              {community.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />

                  {community.location}
                </span>
              )}
            </div>
          </div>

          {canEdit && (
            <div className="shrink-0 sm:pb-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={onEdit}
                className="w-full sm:w-auto"
              >
                <Edit3
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />

                Edit Community
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default CommunityHeader