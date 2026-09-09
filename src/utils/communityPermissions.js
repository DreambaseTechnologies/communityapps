const COMMUNITY_ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
}

const COMMUNITY_PERMISSIONS = {
  MANAGE_COMMUNITY: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  MANAGE_MEMBERS: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  MANAGE_ADMINS: [
    COMMUNITY_ROLES.OWNER,
  ],

  MANAGE_PLAYERS: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  MANAGE_SEASONS: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  MANAGE_TEAMS: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  MANAGE_DRAWING: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  MANAGE_MATCHES: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  MANAGE_LIVE_MATCH: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  MANAGE_STATISTICS: [
    COMMUNITY_ROLES.OWNER,
    COMMUNITY_ROLES.ADMIN,
  ],

  TRANSFER_OWNERSHIP: [
    COMMUNITY_ROLES.OWNER,
  ],

  DELETE_COMMUNITY: [
    COMMUNITY_ROLES.OWNER,
  ],
}

function hasCommunityPermission(
  role,
  permission,
) {
  if (!role || !permission) {
    return false
  }

  const allowedRoles =
    COMMUNITY_PERMISSIONS[permission]

  if (!allowedRoles) {
    return false
  }

  return allowedRoles.includes(role)
}

function isOwner(role) {
  return role === COMMUNITY_ROLES.OWNER
}

function isAdmin(role) {
  return role === COMMUNITY_ROLES.ADMIN
}

function isOwnerOrAdmin(role) {
  return (
    isOwner(role) ||
    isAdmin(role)
  )
}

function isMember(role) {
  return role === COMMUNITY_ROLES.MEMBER
}

export {
  COMMUNITY_ROLES,
  COMMUNITY_PERMISSIONS,
  hasCommunityPermission,
  isOwner,
  isAdmin,
  isOwnerOrAdmin,
  isMember,
}