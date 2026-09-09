import {
  useMemo,
  useState,
} from 'react'

import Tabs from '../../components/ui/Tabs'

import CommunityHeader from '../../components/common/CommunityHeader'
import CommunityActionBar from '../../components/common/CommunityActionBar'
import CommunitySummary from '../../components/common/CommunitySummary'
import CommunityActiveSeason from '../../components/common/CommunityActiveSeason'
import SeasonList from '../../components/common/SeasonList'
import PlayerList from '../../components/common/PlayerList'
import MemberList from '../../components/common/MemberList'
import EditCommunityModal from '../../components/common/EditCommunityModal'
import MemberDetailModal from '../../components/common/MemberDetailModal'
import ChangeMemberRoleModal from '../../components/common/ChangeMemberRoleModal'
import ChangeMemberStatusModal from '../../components/common/ChangeMemberStatusModal'
import AddMemberModal from '../../components/common/AddMemberModal'
import PlayerDetailModal from '../../components/common/PlayerDetailModal'
import EditPlayerModal from '../../components/common/EditPlayerModal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'

const initialCommunity = {
  id: 'community-1',
  name: 'Garuda FC Community',
  slogan: 'One Community. One Passion.',
  memberCount: 48,
  location: 'Balikpapan',
  logo: null,
  banner: null,
  status: 'ACTIVE',
  currentUserRole: 'OWNER',
}

const activeSeason = {
  id: 'season-08',
  name: 'Season 08',
  status: 'ONGOING',
  date: '14 Sep 2026',
  startTime: '19:30',
  location: 'Garuda Arena',
  participants: 48,
  totalParticipants: 48,
  matchProgress: 'Match 4 of 6',
}

const seasons = [
  {
    id: 'season-08',
    name: 'Season 08',
    status: 'ONGOING',
    date: '14 Sep 2026',
    startTime: '19:30',
    location: 'Garuda Arena',
    participants: 48,
    totalParticipants: 48,
    matchProgress: 'Match 4 of 6',
  },
  {
    id: 'season-07',
    name: 'Season 07',
    status: 'FINISHED',
    date: '31 Aug 2026',
    startTime: '19:30',
    location: 'Garuda Arena',
    participants: 44,
    totalParticipants: 44,
    matchProgress: '6 of 6 matches',
  },
  {
    id: 'season-06',
    name: 'Season 06',
    status: 'FINISHED',
    date: '17 Aug 2026',
    startTime: '19:30',
    location: 'Garuda Arena',
    participants: 40,
    totalParticipants: 40,
    matchProgress: '6 of 6 matches',
  },
  {
    id: 'season-09',
    name: 'Season 09',
    status: 'REGISTRATION_OPEN',
    date: '28 Sep 2026',
    startTime: '19:30',
    location: 'Garuda Arena',
    participants: 32,
    totalParticipants: 64,
    matchProgress: 'Registration Open',
  },
]

const initialPlayers = [
  {
    id: 'player-1',
    memberId: 'member-1',
    name: 'Muhammad Rafli',
    username: '@rafli',
    seasons: 7,
    goals: 8,
    titles: 3,
    assists: 5,
    saves: 12,
    yellowCards: 1,
    redCards: 0,
  },
  {
    id: 'player-2',
    memberId: 'member-2',
    name: 'Andi Pratama',
    username: '@andip',
    seasons: 8,
    goals: 14,
    titles: 4,
    assists: 9,
    saves: 0,
    yellowCards: 2,
    redCards: 0,
  },
  {
    id: 'player-3',
    memberId: 'member-3',
    name: 'Fajar Ramadhan',
    username: '@fajar',
    seasons: 6,
    goals: 11,
    titles: 2,
    assists: 7,
    saves: 0,
    yellowCards: 1,
    redCards: 0,
  },
  {
    id: 'player-4',
    memberId: 'member-4',
    name: 'Dimas Saputra',
    username: '@dimas',
    seasons: 5,
    goals: 7,
    titles: 1,
    assists: 4,
    saves: 0,
    yellowCards: 3,
    redCards: 0,
  },
  {
    id: 'player-5',
    memberId: 'member-5',
    name: 'Rizky Maulana',
    username: '@rizky',
    seasons: 4,
    goals: 5,
    titles: 1,
    assists: 3,
    saves: 0,
    yellowCards: 0,
    redCards: 0,
  },
]

const initialMembers = [
  {
    id: 'member-1',
    userId: 'user-1',
    name: 'Muhammad Rafli',
    username: '@rafli',
    role: 'OWNER',
    status: 'ACTIVE',
    isPlayer: true,
    playerId: 'player-1',
    joinedAt: '12 Jan 2025',
  },
  {
    id: 'member-2',
    userId: 'user-2',
    name: 'Andi Pratama',
    username: '@andip',
    role: 'ADMIN',
    status: 'ACTIVE',
    isPlayer: true,
    playerId: 'player-2',
    joinedAt: '15 Jan 2025',
  },
  {
    id: 'member-3',
    userId: 'user-3',
    name: 'Fajar Ramadhan',
    username: '@fajar',
    role: 'MEMBER',
    status: 'ACTIVE',
    isPlayer: true,
    playerId: 'player-3',
    joinedAt: '20 Jan 2025',
  },
  {
    id: 'member-4',
    userId: 'user-4',
    name: 'Dimas Saputra',
    username: '@dimas',
    role: 'MEMBER',
    status: 'ACTIVE',
    isPlayer: true,
    playerId: 'player-4',
    joinedAt: '03 Feb 2025',
  },
  {
    id: 'member-5',
    userId: 'user-5',
    name: 'Rizky Maulana',
    username: '@rizky',
    role: 'MEMBER',
    status: 'ACTIVE',
    isPlayer: true,
    playerId: 'player-5',
    joinedAt: '10 Feb 2025',
  },
  {
    id: 'member-6',
    userId: 'user-6',
    name: 'Budi Santoso',
    username: '@budi',
    role: 'MEMBER',
    status: 'ACTIVE',
    isPlayer: false,
    playerId: null,
    joinedAt: '22 Feb 2025',
  },
]

const tabs = [
  {
    label: 'Overview',
    value: 'overview',
  },
  {
    label: 'Seasons',
    value: 'seasons',
  },
  {
    label: 'Players',
    value: 'players',
  },
  {
    label: 'Members',
    value: 'members',
  },
]

function CommunityPage() {
  const [community, setCommunity] = useState(
    initialCommunity,
  )

  const [members, setMembers] = useState(
    initialMembers,
  )

  const [players, setPlayers] = useState(
    initialPlayers,
  )

  const [activeTab, setActiveTab] =
    useState('overview')

  const [memberSearch, setMemberSearch] =
    useState('')

  const [memberRole, setMemberRole] =
    useState('ALL')

  const [memberStatus, setMemberStatus] =
    useState('ALL')

  const [playerSearch, setPlayerSearch] =
    useState('')

  const [playerPosition, setPlayerPosition] =
    useState('ALL')

  const [isEditCommunityOpen, setIsEditCommunityOpen] =
    useState(false)

  const [isAddMemberOpen, setIsAddMemberOpen] =
    useState(false)

  const [selectedMember, setSelectedMember] =
    useState(null)

  const [selectedPlayer, setSelectedPlayer] =
    useState(null)

  const [isMemberDetailOpen, setIsMemberDetailOpen] =
    useState(false)

  const [isPlayerDetailOpen, setIsPlayerDetailOpen] =
    useState(false)

  const [isEditPlayerOpen, setIsEditPlayerOpen] =
    useState(false)

  const [isChangeRoleOpen, setIsChangeRoleOpen] =
    useState(false)

  const [isChangeStatusOpen, setIsChangeStatusOpen] =
    useState(false)

  const [isRemoveMemberOpen, setIsRemoveMemberOpen] =
    useState(false)

  const activeMemberCount = useMemo(
    () =>
      members.filter(
        (member) =>
          member.status !== 'LEFT',
      ).length,
    [members],
  )

  const communityWithCount = useMemo(
    () => ({
      ...community,
      memberCount:
        community.memberCount +
        (activeMemberCount -
          initialMembers.filter(
            (member) =>
              member.status !== 'LEFT',
          ).length),
    }),
    [
      community,
      activeMemberCount,
    ],
  )

  const handleEditCommunity = () => {
    setIsEditCommunityOpen(true)
  }

  const handleSaveCommunity = (
    updatedCommunity,
  ) => {
    setCommunity(updatedCommunity)
    setIsEditCommunityOpen(false)
  }

  const handleCreateSeason = () => {
    setActiveTab('seasons')
  }

  const handleManageMembers = () => {
    setActiveTab('members')
  }

  const handleViewSeasons = () => {
    setActiveTab('seasons')
  }

  const handleAddMember = () => {
    setIsAddMemberOpen(true)
  }

  const handleCloseAddMember = () => {
    setIsAddMemberOpen(false)
  }

  const handleAddMemberSubmit = (
    newMember,
  ) => {
    setMembers((currentMembers) => [
      ...currentMembers,
      newMember,
    ])

    setIsAddMemberOpen(false)
    setActiveTab('members')
  }

  const handleViewMember = (
    member,
  ) => {
    setSelectedMember(member)
    setIsMemberDetailOpen(true)
  }

  const handleCloseMemberDetail = () => {
    setIsMemberDetailOpen(false)
    setSelectedMember(null)
  }

  const handleManageRole = (
    member,
  ) => {
    setSelectedMember(member)
    setIsMemberDetailOpen(false)
    setIsChangeRoleOpen(true)
  }

  const handleCloseChangeRole = () => {
    setIsChangeRoleOpen(false)
  }

  const handleSaveRole = (
    memberId,
    role,
  ) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              role,
            }
          : member,
      ),
    )

    setSelectedMember((currentMember) =>
      currentMember
        ? {
            ...currentMember,
            role,
          }
        : currentMember,
    )

    setIsChangeRoleOpen(false)
  }

  const handleManageStatus = (
    member,
  ) => {
    setSelectedMember(member)
    setIsMemberDetailOpen(false)
    setIsChangeStatusOpen(true)
  }

  const handleCloseChangeStatus = () => {
    setIsChangeStatusOpen(false)
  }

  const handleSaveStatus = (
    memberId,
    status,
  ) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              status,
            }
          : member,
      ),
    )

    setSelectedMember((currentMember) =>
      currentMember
        ? {
            ...currentMember,
            status,
          }
        : currentMember,
    )

    setIsChangeStatusOpen(false)
  }

  const handleRemoveMember = (
    member,
  ) => {
    setSelectedMember(member)
    setIsMemberDetailOpen(false)
    setIsRemoveMemberOpen(true)
  }

  const handleCloseRemoveMember = () => {
    setIsRemoveMemberOpen(false)
  }

  const handleConfirmRemoveMember = () => {
    if (!selectedMember) {
      return
    }

    const memberId =
      selectedMember.id

    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              status: 'LEFT',
            }
          : member,
      ),
    )

    setSelectedMember((currentMember) =>
      currentMember
        ? {
            ...currentMember,
            status: 'LEFT',
          }
        : currentMember,
    )

    setIsRemoveMemberOpen(false)
  }

  const handleViewPlayer = (
    player,
  ) => {
    setSelectedPlayer(player)
    setIsPlayerDetailOpen(true)
  }

  const handleClosePlayerDetail = () => {
    setIsPlayerDetailOpen(false)
    setSelectedPlayer(null)
  }

  const handleEditPlayer = (
    player,
  ) => {
    setSelectedPlayer(player)
    setIsPlayerDetailOpen(false)
    setIsEditPlayerOpen(true)
  }

  const handleCloseEditPlayer = () => {
    setIsEditPlayerOpen(false)
  }

  const handleSavePlayer = (
    updatedPlayer,
  ) => {
    const previousPlayer =
      players.find(
        (player) =>
          player.id ===
          updatedPlayer.id,
      )

    if (!previousPlayer) {
      return
    }

    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === updatedPlayer.id
          ? {
              ...player,
              name: updatedPlayer.name,
              username:
                updatedPlayer.username,
              avatar:
                updatedPlayer.avatar ?? null,
            }
          : player,
      ),
    )

    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id ===
        previousPlayer.memberId
          ? {
              ...member,
              name: updatedPlayer.name,
              username:
                updatedPlayer.username,
            }
          : member,
      ),
    )

    setSelectedPlayer(
      (currentPlayer) =>
        currentPlayer &&
        currentPlayer.id ===
          updatedPlayer.id
          ? {
              ...currentPlayer,
              name: updatedPlayer.name,
              username:
                updatedPlayer.username,
              avatar:
                updatedPlayer.avatar ?? null,
            }
          : currentPlayer,
    )

    setIsEditPlayerOpen(false)
    setIsPlayerDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      <CommunityHeader
        community={communityWithCount}
        onEdit={handleEditCommunity}
      />

      <CommunityActionBar
        community={communityWithCount}
        onCreateSeason={handleCreateSeason}
        onManageMembers={handleManageMembers}
        onAddMember={handleAddMember}
        onViewSeasons={handleViewSeasons}
      />

      <Tabs
        items={tabs}
        value={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <CommunityActiveSeason
            season={activeSeason}
          />

          <CommunitySummary
            community={communityWithCount}
            seasons={seasons}
          />
        </div>
      )}

      {activeTab === 'seasons' && (
        <SeasonList
          seasons={seasons}
        />
      )}

      {activeTab === 'players' && (
        <PlayerList
          players={players}
          search={playerSearch}
          position={playerPosition}
          onSearchChange={
            setPlayerSearch
          }
          onPositionChange={
            setPlayerPosition
          }
          onViewPlayer={
            handleViewPlayer
          }
        />
      )}

      {activeTab === 'members' && (
        <MemberList
          members={members}
          search={memberSearch}
          role={memberRole}
          status={memberStatus}
          onSearchChange={
            setMemberSearch
          }
          onRoleChange={
            setMemberRole
          }
          onStatusChange={
            setMemberStatus
          }
          onViewMember={
            handleViewMember
          }
        />
      )}

      <EditCommunityModal
        open={isEditCommunityOpen}
        community={communityWithCount}
        onClose={() =>
          setIsEditCommunityOpen(
            false,
          )
        }
        onSave={handleSaveCommunity}
      />

      <AddMemberModal
        open={isAddMemberOpen}
        onClose={handleCloseAddMember}
        onAdd={
          handleAddMemberSubmit
        }
        existingMembers={members}
      />

      <MemberDetailModal
        open={isMemberDetailOpen}
        member={selectedMember}
        currentUserRole={
          community.currentUserRole
        }
        onClose={
          handleCloseMemberDetail
        }
        onManageRole={
          handleManageRole
        }
        onManageStatus={
          handleManageStatus
        }
        onRemoveMember={
          handleRemoveMember
        }
      />

      <ChangeMemberRoleModal
        open={isChangeRoleOpen}
        member={selectedMember}
        currentUserRole={
          community.currentUserRole
        }
        onClose={
          handleCloseChangeRole
        }
        onSave={handleSaveRole}
      />

      <ChangeMemberStatusModal
        open={isChangeStatusOpen}
        member={selectedMember}
        currentUserRole={
          community.currentUserRole
        }
        onClose={
          handleCloseChangeStatus
        }
        onSave={handleSaveStatus}
      />

      <PlayerDetailModal
        open={isPlayerDetailOpen}
        player={selectedPlayer}
        onClose={
          handleClosePlayerDetail
        }
        onEdit={
          handleEditPlayer
        }
      />

      <EditPlayerModal
        open={isEditPlayerOpen}
        player={selectedPlayer}
        onClose={
          handleCloseEditPlayer
        }
        onSave={handleSavePlayer}
      />

      <ConfirmDialog
        open={isRemoveMemberOpen}
        onClose={
          handleCloseRemoveMember
        }
        onConfirm={
          handleConfirmRemoveMember
        }
        title="Remove Member?"
        description={
          selectedMember
            ? `Keluarkan ${selectedMember.name} dari komunitas? Member akan berstatus LEFT dan seluruh riwayat Season, pertandingan, serta statistik tetap dipertahankan.`
            : ''
        }
        confirmText="Remove Member"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  )
}

export default CommunityPage

