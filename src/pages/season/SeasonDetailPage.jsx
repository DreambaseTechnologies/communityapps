import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import TeamDrawing from "../../components/common/TeamDrawing";
import SeasonParticipants from "../../components/common/SeasonParticipants";
import DrawingEligibilityCard from "../../components/common/DrawingEligibilityCard";

import {
  COMMUNITY_PERMISSIONS,
  COMMUNITY_ROLES,
  hasCommunityPermission,
} from "../../utils/communityPermissions";

/**
 * ========================================================
 * MOCK CURRENT USER
 * ========================================================
 */

const MOCK_CURRENT_USER_ROLE =
  COMMUNITY_ROLES.OWNER;

const MOCK_CURRENT_PLAYER = {
  id: "player-01",
  name: "Muhammad Rafli",
  username: "@rafli",
};

/**
 * ========================================================
 * MOCK PLAYERS
 * ========================================================
 *
 * Player adalah entity tersendiri.
 *
 * Position TIDAK disimpan di Player.
 * Position berada di Season Participation.
 * ========================================================
 */

const BASE_PLAYERS = [
  {
    id: "player-01",
    name: "Muhammad Rafli",
    username: "@rafli",
  },
  {
    id: "player-02",
    name: "Ardiansyah Putra",
    username: "@ardiansyah",
  },
  {
    id: "player-03",
    name: "Kevin Wijaya",
    username: "@kevinw",
  },
  {
    id: "player-04",
    name: "Yoga Pratama",
    username: "@yogap",
  },
  {
    id: "player-05",
    name: "Fajar Ramadhan",
    username: "@fajar",
  },
  {
    id: "player-06",
    name: "Dimas Saputra",
    username: "@dimas",
  },
];

const DEVELOPMENT_PLAYERS = Array.from(
  { length: 37 },
  (_, index) => {
    const number = String(
      index + 7,
    ).padStart(2, "0");

    return {
      id: `player-${number}`,
      name: `Development Player ${number}`,
      username: `@player${number}`,
    };
  },
);

const MOCK_PLAYERS = [
  ...BASE_PLAYERS,
  ...DEVELOPMENT_PLAYERS,
];

/**
 * ========================================================
 * MOCK PARTICIPATIONS
 * ========================================================
 *
 * Position disimpan di participation.
 * ========================================================
 */

const INITIAL_PARTICIPATIONS = [
  {
    id: "participation-01",
    seasonId: "season-08",
    playerId: "player-01",
    status: "REJECTED",
    position: "GK",
    registeredAt: "2026-09-08",
  },
  {
    id: "participation-02",
    seasonId: "season-08",
    playerId: "player-02",
    status: "APPROVED",
    position: "DEF",
    registeredAt: "2026-09-08",
  },
  {
    id: "participation-03",
    seasonId: "season-08",
    playerId: "player-03",
    status: "APPROVED",
    position: "MID",
    registeredAt: "2026-09-09",
  },
  {
    id: "participation-04",
    seasonId: "season-08",
    playerId: "player-04",
    status: "PENDING",
    position: "FW",
    registeredAt: "2026-09-09",
  },
  {
    id: "participation-05",
    seasonId: "season-08",
    playerId: "player-05",
    status: "APPROVED",
    position: "FW",
    registeredAt: "2026-09-09",
  },
  {
    id: "participation-06",
    seasonId: "season-08",
    playerId: "player-06",
    status: "REJECTED",
    position: "DEF",
    registeredAt: "2026-09-09",
  },

  /**
   * ======================================================
   * DEVELOPMENT APPROVED PARTICIPATIONS
   * ======================================================
   *
   * 37 tambahan + 3 approved base = 40 approved.
   * ======================================================
   */

  ...DEVELOPMENT_PLAYERS.map(
    (player, index) => {
      const positions = [
        "GK",
        "DEF",
        "MID",
        "FW",
      ];

      return {
        id: `participation-dev-${String(
          index + 1,
        ).padStart(2, "0")}`,
        seasonId: "season-08",
        playerId: player.id,
        status: "APPROVED",
        position:
          positions[index % positions.length],
        registeredAt: "2026-09-09",
      };
    },
  ),
];

/**
 * ========================================================
 * INITIAL TEAMS
 * ========================================================
 */

const INITIAL_TEAMS = [
  {
    id: "team-a",
    name: "Garuda FC",
    logo: null,
    roster: [],
  },
  {
    id: "team-b",
    name: "Bali United",
    logo: null,
    roster: [],
  },
  {
    id: "team-c",
    name: "Persija",
    logo: null,
    roster: [],
  },
  {
    id: "team-d",
    name: "Persebaya",
    logo: null,
    roster: [],
  },
];

/**
 * ========================================================
 * MOCK SEASON
 * ========================================================
 */

const INITIAL_SEASON = {
  id: "season-08",
  communityId: "community-1",
  name: "Season 08",
  status: "REGISTRATION_CLOSED",

  date: "2026-09-14",
  startTime: "19:30",
  location: "Garuda Arena",

  description:
    "Fourfeo minisoccer Season 08.",

  banner: null,

  totalParticipants: 64,

  teams: INITIAL_TEAMS,

  matchProgress: {
    current: 0,
    total: 6,
  },
};

/**
 * ========================================================
 * FORMATTERS
 * ========================================================
 */

function formatDate(
  value,
) {
  if (!value) {
    return "-";
  }

  const date = new Date(
    `${value}T00:00:00`,
  );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(date);
}

function formatStatus(
  status,
) {
  const labels = {
    DRAFT: "Draft",
    REGISTRATION_OPEN:
      "Registration Open",
    REGISTRATION_CLOSED:
      "Registration Closed",
    DRAWING: "Drawing",
    ONGOING: "Ongoing",
    FINISHED: "Finished",
  };

  return (
    labels[status] ??
    status
  );
}

/**
 * ========================================================
 * STATUS BADGE
 * ========================================================
 */

function SeasonStatusBadge({
  status,
}) {
  const variants = {
    DRAFT: "default",
    REGISTRATION_OPEN:
      "success",
    REGISTRATION_CLOSED:
      "warning",
    DRAWING: "warning",
    ONGOING: "success",
    FINISHED: "default",
  };

  return (
    <Badge
      variant={
        variants[status] ??
        "default"
      }
    >
      {formatStatus(status)}
    </Badge>
  );
}

/**
 * ========================================================
 * INFO ITEM
 * ========================================================
 */

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * ========================================================
 * MAIN PAGE
 * ========================================================
 */

function SeasonDetailPage() {
  const { seasonId } =
    useParams();

  /**
   * ======================================================
   * SEASON STATE
   * ======================================================
   *
   * Season menjadi owner dari data team + roster.
   * ======================================================
   */

  const [
    season,
    setSeason,
  ] = useState(() => ({
    ...INITIAL_SEASON,
    id:
      seasonId ??
      INITIAL_SEASON.id,
    teams: INITIAL_TEAMS.map(
      (team) => ({
        ...team,
        roster: [],
      }),
    ),
  }));

  const [
    participations,
    setParticipations,
  ] = useState(
    INITIAL_PARTICIPATIONS,
  );

  const [
    drawingLocked,
    setDrawingLocked,
  ] = useState(false);

  /**
   * ======================================================
   * PERMISSION
   * ======================================================
   */

  const canManageParticipants =
    hasCommunityPermission(
      MOCK_CURRENT_USER_ROLE,
      COMMUNITY_PERMISSIONS
        .MANAGE_SEASONS,
    );

  /**
   * ======================================================
   * PARTICIPATION COUNTS
   * ======================================================
   */

  const approvedParticipations =
    useMemo(
      () =>
        participations.filter(
          (participation) =>
            participation.status ===
            "APPROVED",
        ),
      [participations],
    );

  const pendingParticipations =
    useMemo(
      () =>
        participations.filter(
          (participation) =>
            participation.status ===
            "PENDING",
        ),
      [participations],
    );

  const rejectedParticipations =
    useMemo(
      () =>
        participations.filter(
          (participation) =>
            participation.status ===
            "REJECTED",
        ),
      [participations],
    );

  const approvedCount =
    approvedParticipations.length;

  const pendingCount =
    pendingParticipations.length;

  const rejectedCount =
    rejectedParticipations.length;

  /**
   * ======================================================
   * PLAYER MAP
   * ======================================================
   */

  const playersById = useMemo(
    () =>
      Object.fromEntries(
        MOCK_PLAYERS.map(
          (player) => [
            player.id,
            player,
          ],
        ),
      ),
    [],
  );

  /**
   * ======================================================
   * REGISTRATION STATE
   * ======================================================
   */

  const registrationState =
    useMemo(() => {
      if (
        drawingLocked
      ) {
        return {
          canRegister: false,
          code: "DRAWING_LOCKED",
          reason:
            "Drawing sudah dikunci.",
        };
      }

      if (
        season.status !==
        "REGISTRATION_OPEN"
      ) {
        return {
          canRegister: false,
          code: "REGISTRATION_CLOSED",
          reason:
            "Registration sedang tidak dibuka.",
        };
      }

      const currentParticipation =
        participations.find(
          (participation) =>
            participation.playerId ===
              MOCK_CURRENT_PLAYER.id &&
            participation.seasonId ===
              season.id &&
            (
              participation.status ===
                "PENDING" ||
              participation.status ===
                "APPROVED"
            ),
        );

      if (
        currentParticipation
      ) {
        return {
          canRegister: false,
          code: "ALREADY_REGISTERED",
          reason:
            "Player sudah memiliki registration aktif di Season ini.",
        };
      }

      if (
        approvedCount >=
        season.totalParticipants
      ) {
        return {
          canRegister: false,
          code: "CAPACITY_FULL",
          reason:
            "Kapasitas participant sudah penuh.",
        };
      }

      return {
        canRegister: true,
        code: "READY",
        reason:
          "Player dapat melakukan registration.",
      };
    }, [
      approvedCount,
      drawingLocked,
      participations,
      season.id,
      season.status,
      season.totalParticipants,
    ]);

  /**
   * ======================================================
   * REGISTER PLAYER
   * ======================================================
   */

  const handleRegister = ({
    position,
  }) => {
    if (
      !registrationState.canRegister
    ) {
      return;
    }

    const duplicate =
      participations.some(
        (participation) =>
          participation.playerId ===
            MOCK_CURRENT_PLAYER.id &&
          participation.seasonId ===
            season.id &&
          (
            participation.status ===
              "PENDING" ||
            participation.status ===
              "APPROVED"
          ),
      );

    if (duplicate) {
      return;
    }

    if (
      approvedCount >=
      season.totalParticipants
    ) {
      return;
    }

    const rejectedParticipation =
      participations.find(
        (participation) =>
          participation.playerId ===
            MOCK_CURRENT_PLAYER.id &&
          participation.seasonId ===
            season.id &&
          participation.status ===
            "REJECTED",
      );

    if (
      rejectedParticipation
    ) {
      setParticipations(
        (current) =>
          current.map(
            (
              participation,
            ) =>
              participation.id ===
              rejectedParticipation.id
                ? {
                    ...participation,
                    status: "PENDING",
                    position,
                    registeredAt:
                      new Date()
                        .toISOString()
                        .slice(
                          0,
                          10,
                        ),
                  }
                : participation,
          ),
      );

      return;
    }

    setParticipations(
      (current) => [
        ...current,
        {
          id: `participation-${Date.now()}`,
          seasonId: season.id,
          playerId:
            MOCK_CURRENT_PLAYER.id,
          status: "PENDING",
          position,
          registeredAt:
            new Date()
              .toISOString()
              .slice(
                0,
                10,
              ),
        },
      ],
    );
  };

  /**
   * ======================================================
   * UPDATE PARTICIPANT STATUS
   * ======================================================
   */

  const handleUpdateParticipantStatus =
    (
      participationId,
      status,
    ) => {
      if (
        !canManageParticipants
      ) {
        return;
      }

      if (
        drawingLocked
      ) {
        return;
      }

      if (
        ![
          "APPROVED",
          "REJECTED",
        ].includes(status)
      ) {
        return;
      }

      setParticipations(
        (current) =>
          current.map(
            (
              participation,
            ) =>
              participation.id ===
              participationId
                ? {
                    ...participation,
                    status,
                  }
                : participation,
          ),
      );
    };

  /**
   * ======================================================
   * TEAM STATE PERSISTENCE
   * ======================================================
   *
   * Dipanggil oleh TeamDrawing setiap kali:
   *
   * - nama team berubah
   * - roster player bertambah
   * - drawing dimulai
   *
   * Dengan demikian TeamDrawing tidak menjadi
   * owner data Season.
   * ======================================================
   */

  const handleTeamsChange = (
    nextTeams,
  ) => {
    if (
      drawingLocked
    ) {
      return;
    }

    setSeason(
      (currentSeason) => ({
        ...currentSeason,
        teams: nextTeams.map(
          (team) => ({
            ...team,
            roster:
              Array.isArray(
                team.roster,
              )
                ? [
                    ...team.roster,
                  ]
                : [],
          }),
        ),
      }),
    );
  };

  /**
   * ======================================================
   * DRAWING COMPLETE
   * ======================================================
   *
   * Ini adalah commit final hasil drawing.
   * ======================================================
   */

  const handleDrawingComplete =
    (
      drawingResult,
    ) => {
      if (
        !canManageParticipants
      ) {
        return;
      }

      if (
        drawingLocked
      ) {
        return;
      }

      const normalizedTeams =
        drawingResult.map(
          (team) => ({
            ...team,
            roster:
              Array.isArray(
                team.roster,
              )
                ? [
                    ...team.roster,
                  ]
                : [],
          }),
        );

      /**
       * Persist final roster ke Season.
       */
      setSeason(
        (currentSeason) => ({
          ...currentSeason,
          teams:
            normalizedTeams,
        }),
      );

      /**
       * Drawing sudah tidak boleh
       * diulang / dimodifikasi.
       */
      setDrawingLocked(
        true,
      );
    };

  /**
   * ======================================================
   * TEAM ROSTER SUMMARY
   * ======================================================
   */

  const totalAssignedPlayers =
    useMemo(
      () =>
        season.teams.reduce(
          (total, team) =>
            total +
            (
              Array.isArray(
                team.roster,
              )
                ? team.roster
                    .length
                : 0
            ),
          0,
        ),
      [season.teams],
    );

  /**
   * ======================================================
   * MATCH PROGRESS
   * ======================================================
   */

  const matchProgress =
    season.matchProgress ??
    {
      current: 0,
      total: 6,
    };

  const matchProgressPercent =
    matchProgress.total >
    0
      ? Math.round(
          (matchProgress.current /
            matchProgress.total) *
            100,
        )
      : 0;

  /**
   * ======================================================
   * RENDER
   * ======================================================
   */

  return (
    <div className="space-y-6 pb-10">
      {/* ==================================================
          BACK
          ================================================== */}

      <Link
        to="/community"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Community
      </Link>

      {/* ==================================================
          HEADER
          ================================================== */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div className="relative min-h-[220px] bg-slate-950">
          {season.banner ? (
            <img
              src={season.banner}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-950 to-slate-900" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          <div className="relative flex min-h-[220px] flex-col justify-end p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <SeasonStatusBadge
                status={
                  season.status
                }
              />

              {drawingLocked && (
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                  Drawing Locked
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {season.name}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              {season.description}
            </p>
          </div>
        </div>

        {/* ==================================================
            SEASON INFO
            ================================================== */}

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
          <InfoItem
            icon={CalendarDays}
            label="Date"
            value={formatDate(
              season.date,
            )}
          />

          <InfoItem
            icon={Clock3}
            label="Start Time"
            value={`${season.startTime} WIB`}
          />

          <InfoItem
            icon={MapPin}
            label="Location"
            value={
              season.location ||
              "-"
            }
          />

          <InfoItem
            icon={Users}
            label="Participants"
            value={`${approvedCount} / ${season.totalParticipants}`}
          />
        </div>
      </section>

      {/* ==================================================
          QUICK SUMMARY
          ================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Users size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Approved
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950">
                {approvedCount}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Users size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Pending
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950">
                {pendingCount}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Assigned
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950">
                {totalAssignedPlayers}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Trophy size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Matches
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950">
                {matchProgress.current} /{" "}
                {matchProgress.total}
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* ==================================================
          MATCH PROGRESS
          ================================================== */}

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Competition Progress
            </p>

            <h2 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950">
              Match Progress
            </h2>
          </div>

          <p className="text-sm font-bold text-slate-600">
            {matchProgress.current}{" "}
            of{" "}
            {matchProgress.total}{" "}
            matches
          </p>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{
              width: `${matchProgressPercent}%`,
            }}
          />
        </div>
      </Card>

      {/* ==================================================
          DRAWING ELIGIBILITY
          ================================================== */}

      <DrawingEligibilityCard
        approvedCount={
          approvedCount
        }
        maximumParticipants={
          season.totalParticipants
        }
        seasonStatus={
          season.status
        }
      />

      {/* ==================================================
          TEAM DRAWING
          ================================================== */}

      <TeamDrawing
        seasonStatus={
          season.status
        }
        approvedCount={
          approvedCount
        }
        approvedParticipations={
          approvedParticipations
        }
        players={
          MOCK_PLAYERS
        }
        teams={season.teams}
        drawingLocked={
          drawingLocked
        }
        onTeamsChange={
          handleTeamsChange
        }
        onDrawingComplete={
          handleDrawingComplete
        }
      />

      {/* ==================================================
          PARTICIPANTS
          ================================================== */}

      <SeasonParticipants
        seasonId={season.id}
        seasonStatus={
          season.status
        }
        participations={
          participations
        }
        currentPlayerId={
          MOCK_CURRENT_PLAYER?.id ??
          null
        }
        canManage={
          canManageParticipants &&
          !drawingLocked
        }
        canRegister={
          registrationState.canRegister &&
          !drawingLocked
        }
        registrationReason={
          drawingLocked
            ? "Drawing sudah dikunci. Registration tidak dapat diubah."
            : registrationState.reason
        }
        registrationCode={
          drawingLocked
            ? "DRAWING_LOCKED"
            : registrationState.code
        }
        approvedCount={
          approvedCount
        }
        pendingCount={
          pendingCount
        }
        rejectedCount={
          rejectedCount
        }
        maximumParticipants={
          season.totalParticipants
        }
        playersById={
          playersById
        }
        onRegister={
          handleRegister
        }
        onApprove={(
          participationId,
        ) =>
          handleUpdateParticipantStatus(
            participationId,
            "APPROVED",
          )
        }
        onReject={(
          participationId,
        ) =>
          handleUpdateParticipantStatus(
            participationId,
            "REJECTED",
          )
        }
      />

      {/* ==================================================
          DEBUG / STATE SUMMARY
          ================================================== */}

      {drawingLocked && (
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Season State
              </p>

              <h2 className="mt-1 text-lg font-extrabold text-slate-950">
                Drawing Result Persisted
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Hasil roster sekarang berada di
                Season state dan siap digunakan
                oleh module Match.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {season.teams.map(
                (team) => (
                  <div
                    key={team.id}
                    className="rounded-xl bg-slate-50 px-3 py-2 text-center"
                  >
                    <p className="truncate text-xs font-bold text-slate-500">
                      {team.name}
                    </p>

                    <p className="mt-1 text-lg font-black text-slate-950">
                      {
                        team.roster
                          .length
                      }
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default SeasonDetailPage;