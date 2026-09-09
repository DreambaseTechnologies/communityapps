import {
  CalendarPlus,
  UserPlus,
  Users,
} from 'lucide-react'

import Button from '../ui/Button'
import Card from '../ui/Card'

import {
  hasCommunityPermission,
} from '../../utils/communityPermissions'

function CommunityActionBar({
  community,
  onCreateSeason,
  onManageMembers,
  onAddMember,
  onViewSeasons,
}) {
  const canManageMembers =
    hasCommunityPermission(
      community?.currentUserRole,
      'MANAGE_MEMBERS',
    )

  const canManageSeasons =
    hasCommunityPermission(
      community?.currentUserRole,
      'MANAGE_SEASONS',
    )

  const isMember =
    community?.currentUserRole === 'MEMBER'

  return (
    <Card
      padding="sm"
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
    >
      {canManageSeasons && (
        <Button
          variant="primary"
          onClick={onCreateSeason}
        >
          <CalendarPlus size={18} />
          Create Season
        </Button>
      )}

      {canManageMembers && (
        <>
          <Button
            variant="secondary"
            onClick={onAddMember}
          >
            <UserPlus size={18} />
            Add Member
          </Button>

          <Button
            variant="secondary"
            onClick={onManageMembers}
          >
            <Users size={18} />
            Manage Members
          </Button>
        </>
      )}

      {isMember && (
        <Button
          variant="secondary"
          onClick={onViewSeasons}
        >
          View Seasons
        </Button>
      )}
    </Card>
  )
}

export default CommunityActionBar