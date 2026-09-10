import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  LockKeyhole,
  Play,
  RotateCcw,
  Shuffle,
  Sparkles,
  Users,
} from "lucide-react";

const TEAM_COUNT = 4;
const MINIMUM_PLAYERS = 40;
const MAXIMUM_PLAYERS = 64;

const POSITION_LABELS = {
  GK: "Goalkeeper",
  DEF: "Defender",
  MID: "Midfielder",
  FW: "Forward",
};

const POSITION_SHORT_LABELS = {
  GK: "GK",
  DEF: "DEF",
  MID: "MID",
  FW: "FW",
};

const STATUS_LABELS = {
  DRAFT: "Draft",
  REGISTRATION_OPEN: "Registration Open",
  REGISTRATION_CLOSED: "Registration Closed",
  DRAWING: "Drawing",
  ONGOING: "Ongoing",
  FINISHED: "Finished",
};

const WHEEL_COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#f43f5e",
];

/**
 * ========================================================
 * UTILITIES
 * ========================================================
 */

function shuffleArray(items) {
  const array = [...items];

  for (
    let index = array.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1),
    );

    [array[index], array[randomIndex]] = [
      array[randomIndex],
      array[index],
    ];
  }

  return array;
}

function normalizeTeams(teams) {
  return teams.map((team) => ({
    ...team,
    roster: Array.isArray(team.roster)
      ? team.roster
      : [],
  }));
}

/**
 * ========================================================
 * ELIGIBILITY
 * ========================================================
 */

function getEligibility({
  seasonStatus,
  approvedCount,
  teams,
}) {
  if (
    seasonStatus !==
    "REGISTRATION_CLOSED"
  ) {
    return {
      eligible: false,
      message:
        "Registration harus ditutup sebelum Team Drawing dapat dimulai.",
    };
  }

  if (approvedCount < MINIMUM_PLAYERS) {
    return {
      eligible: false,
      message: `Minimal ${MINIMUM_PLAYERS} approved players diperlukan.`,
    };
  }

  if (approvedCount > MAXIMUM_PLAYERS) {
    return {
      eligible: false,
      message: `Maksimal ${MAXIMUM_PLAYERS} approved players.`,
    };
  }

  if (teams.length !== TEAM_COUNT) {
    return {
      eligible: false,
      message: `Season harus memiliki tepat ${TEAM_COUNT} team.`,
    };
  }

  const invalidName = teams.some(
    (team) =>
      !team.name ||
      !team.name.trim(),
  );

  if (invalidName) {
    return {
      eligible: false,
      message:
        "Semua team harus memiliki nama.",
    };
  }

  const normalizedNames = teams.map(
    (team) =>
      team.name
        .trim()
        .toLowerCase(),
  );

  if (
    new Set(normalizedNames).size !==
    normalizedNames.length
  ) {
    return {
      eligible: false,
      message:
        "Nama team harus berbeda.",
    };
  }

  return {
    eligible: true,
    message:
      "Semua persyaratan drawing terpenuhi.",
  };
}

/**
 * ========================================================
 * BALANCED TEAM SELECTION
 * ========================================================
 */

function selectBalancedTeam(
  teams,
  position,
) {
  if (!teams.length) {
    return null;
  }

  const minimumRosterSize = Math.min(
    ...teams.map(
      (team) =>
        team.roster.length,
    ),
  );

  let candidates = teams.filter(
    (team) =>
      team.roster.length ===
      minimumRosterSize,
  );

  const minimumPositionCount =
    Math.min(
      ...candidates.map(
        (team) =>
          team.roster.filter(
            (player) =>
              player.position ===
              position,
          ).length,
      ),
    );

  candidates = candidates.filter(
    (team) =>
      team.roster.filter(
        (player) =>
          player.position ===
          position,
      ).length ===
      minimumPositionCount,
  );

  return candidates[
    Math.floor(
      Math.random() *
        candidates.length,
    )
  ];
}

/**
 * ========================================================
 * POSITION SUMMARY
 * ========================================================
 */

function getPositionSummary(roster) {
  return {
    GK: roster.filter(
      (player) =>
        player.position === "GK",
    ).length,

    DEF: roster.filter(
      (player) =>
        player.position === "DEF",
    ).length,

    MID: roster.filter(
      (player) =>
        player.position === "MID",
    ).length,

    FW: roster.filter(
      (player) =>
        player.position === "FW",
    ).length,
  };
}

/**
 * ========================================================
 * ELIGIBILITY ITEM
 * ========================================================
 */

function EligibilityItem({
  label,
  value,
  valid,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            valid
              ? "bg-emerald-100 text-emerald-600"
              : "bg-slate-200 text-slate-500"
          }`}
        >
          {valid ? (
            <Check size={17} />
          ) : (
            <Users size={17} />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
            {value}
          </p>
        </div>
      </div>

      <span
        className={`text-xs font-black ${
          valid
            ? "text-emerald-600"
            : "text-slate-400"
        }`}
      >
        {valid ? "READY" : "WAIT"}
      </span>
    </div>
  );
}

/**
 * ========================================================
 * TEAM CONFIGURATION
 * ========================================================
 */

function TeamConfiguration({
  teams,
  disabled,
  onChange,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Season Configuration
          </p>

          <h3 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950">
            Team Names
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Nama team hanya berlaku untuk Season ini.
          </p>
        </div>

        {disabled && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
            <LockKeyhole size={13} />
            Locked
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3"
          >
            <label
              htmlFor={`team-name-${team.id}`}
              className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400"
            >
              Team {index + 1}
            </label>

            <input
              id={`team-name-${team.id}`}
              type="text"
              value={team.name}
              maxLength={40}
              disabled={disabled}
              onChange={(event) =>
                onChange(
                  team.id,
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ========================================================
 * ACTIVE PLAYER
 * ========================================================
 */

function ActivePlayerCard({
  player,
  playerInfo,
  drawingNumber,
  totalPlayers,
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl sm:p-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-emerald-400">
          <Users size={13} />

          Player {drawingNumber} /{" "}
          {totalPlayers}
        </div>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
          Player Yang Akan Di-draw
        </p>

        <h3 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          {playerInfo?.name ??
            "Unknown Player"}
        </h3>

        <div className="mt-3 flex items-center justify-center gap-2">
          {playerInfo?.username && (
            <span className="text-xs font-semibold text-slate-400">
              {playerInfo.username}
            </span>
          )}

          <span className="h-1 w-1 rounded-full bg-slate-700" />

          <span className="rounded-lg bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-300">
            {
              POSITION_LABELS[
                player?.position
              ]
            }
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * ========================================================
 * RESULT
 * ========================================================
 */

function DrawResult({
  player,
  playerInfo,
  team,
}) {
  if (!team) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
      <div className="text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-emerald-600">
          Hasil Draw
        </p>

        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div>
            <p className="text-lg font-black text-slate-950">
              {playerInfo?.name ??
                player?.playerId}
            </p>

            <p className="mt-0.5 text-xs font-semibold text-slate-500">
              {
                POSITION_SHORT_LABELS[
                  player?.position
                ]
              }
            </p>
          </div>

          <ChevronRight
            size={20}
            className="rotate-90 text-emerald-500 sm:rotate-0"
          />

          <div className="rounded-xl bg-emerald-600 px-5 py-2.5">
            <p className="text-base font-black text-white">
              {team.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ========================================================
 * TEAM WHEEL
 * ========================================================
 */

function TeamWheel({
  teams,
  spinning,
  wheelRotation,
}) {
  const gradient = useMemo(() => {
    const stops = teams
      .map((_, index) => {
        const start =
          index * 25;
        const end =
          start + 25;

        return `${WHEEL_COLORS[index]} ${start}% ${end}%`;
      })
      .join(", ");

    return `conic-gradient(from -45deg, ${stops})`;
  }, [teams]);

  return (
    <div className="relative mx-auto w-full max-w-[430px]">
      {/* FIXED ARROW */}

      <div className="absolute -top-5 left-1/2 z-40 -translate-x-1/2">
        <div className="h-0 w-0 border-l-[15px] border-r-[15px] border-t-[28px] border-l-transparent border-r-transparent border-t-slate-950 drop-shadow-xl" />
      </div>

      {/* WHEEL */}

      <div
        className="relative aspect-square rounded-full border-[10px] border-slate-950 shadow-[0_20px_80px_rgba(15,23,42,0.2)]"
        style={{
          transform: `rotate(${wheelRotation}deg)`,
          transition: spinning
            ? "transform 2.9s cubic-bezier(0.12, 0.78, 0.08, 1)"
            : "transform 0.2s ease-out",
          background: gradient,
        }}
      >
        {/* DIVIDERS */}

        <div className="pointer-events-none absolute inset-0 rounded-full">
          <span className="absolute left-1/2 top-0 h-1/2 w-[2px] origin-bottom -translate-x-1/2 bg-white/40" />

          <span className="absolute left-1/2 top-0 h-1/2 w-[2px] origin-bottom -translate-x-1/2 rotate-90 bg-white/40" />

          <span className="absolute left-1/2 top-0 h-1/2 w-[2px] origin-bottom -translate-x-1/2 rotate-180 bg-white/40" />

          <span className="absolute left-1/2 top-0 h-1/2 w-[2px] origin-bottom -translate-x-1/2 rotate-[270deg] bg-white/40" />
        </div>

        {/* LABELS */}

        {teams.map(
          (team, index) => {
            const angle =
              index * 90;

            return (
              <div
                key={team.id}
                className="pointer-events-none absolute inset-0"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div
                  className="absolute left-1/2 top-[8%] w-[45%] -translate-x-1/2 text-center"
                  style={{
                    transform: `rotate(${-angle}deg)`,
                  }}
                >
                  <span className="inline-block max-w-[130px] truncate rounded-lg bg-black/20 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white drop-shadow-md sm:max-w-[150px] sm:text-xs">
                    {team.name}
                  </span>
                </div>
              </div>
            );
          },
        )}

        {/* CENTER */}

        <div className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-[6px] border-slate-950 bg-slate-950 shadow-2xl sm:h-36 sm:w-36">
          {spinning ? (
            <>
              <RotateCcw
                size={30}
                className="animate-spin text-emerald-400"
              />

              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-400">
                Spinning
              </p>
            </>
          ) : (
            <>
              <Shuffle
                size={28}
                className="text-emerald-400"
              />

              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                Team Draw
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ========================================================
 * TEAM ROSTER
 * ========================================================
 */

function TeamRosterCard({
  team,
  playersById,
}) {
  const positionSummary =
    getPositionSummary(
      team.roster,
    );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-extrabold text-slate-950">
            {team.name}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Season roster
          </p>
        </div>

        <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-emerald-50 px-3 text-sm font-black text-emerald-700">
          {team.roster.length}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {Object.entries(
          POSITION_SHORT_LABELS,
        ).map(
          ([position, label]) => (
            <div
              key={position}
              className="rounded-lg bg-slate-50 px-2 py-1.5 text-center"
            >
              <p className="text-[10px] font-bold text-slate-400">
                {label}
              </p>

              <p className="mt-0.5 text-xs font-black text-slate-700">
                {
                  positionSummary[
                    position
                  ]
                }
              </p>
            </div>
          ),
        )}
      </div>

      <div className="mt-4 space-y-2">
        {team.roster.length ===
        0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-3 py-7 text-center">
            <p className="text-xs font-semibold text-slate-400">
              Belum ada player
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Player muncul setelah berhasil di-draw.
            </p>
          </div>
        ) : (
          team.roster.map(
            (
              player,
              index,
            ) => {
              const playerInfo =
                playersById[
                  player.playerId
                ];

              return (
                <div
                  key={
                    player.participationId
                  }
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[10px] font-black text-slate-400">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-800">
                      {playerInfo?.name ??
                        player.playerId}
                    </p>

                    <p className="mt-0.5 truncate text-[10px] font-semibold text-slate-400">
                      {playerInfo?.username ??
                        ""}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-md bg-white px-1.5 py-1 text-[10px] font-black text-slate-500">
                    {
                      POSITION_SHORT_LABELS[
                        player.position
                      ]
                    }
                  </span>
                </div>
              );
            },
          )
        )}
      </div>
    </div>
  );
}

/**
 * ========================================================
 * MAIN
 * ========================================================
 */

function TeamDrawing({
  seasonStatus,
  approvedCount,
  approvedParticipations = [],
  players = [],
  teams = [],
  drawingLocked = false,
  onTeamsChange,
  onDrawingComplete,
}) {
  const [configuredTeams, setConfiguredTeams] =
    useState(() =>
      normalizeTeams(teams),
    );

  const [drawingOrder, setDrawingOrder] =
    useState([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [currentPlayer, setCurrentPlayer] =
    useState(null);

  const [lastDrawResult, setLastDrawResult] =
    useState(null);

  const [spinning, setSpinning] =
    useState(false);

  const [drawingStarted, setDrawingStarted] =
    useState(false);

  const [drawingCompleted, setDrawingCompleted] =
    useState(false);

  const [wheelRotation, setWheelRotation] =
    useState(0);

  /**
   * Parent Season adalah source of truth.
   *
   * Saat component pertama kali menerima teams yang
   * memiliki roster, roster tersebut dipertahankan.
   */
  useEffect(() => {
    if (
      !drawingStarted &&
      !spinning
    ) {
      setConfiguredTeams(
        normalizeTeams(teams),
      );
    }
  }, [
    teams,
    drawingStarted,
    spinning,
  ]);

  const playersById = useMemo(
    () =>
      Object.fromEntries(
        players.map((player) => [
          player.id,
          player,
        ]),
      ),
    [players],
  );

  const eligibility = useMemo(
    () =>
      getEligibility({
        seasonStatus,
        approvedCount,
        teams: configuredTeams,
      }),
    [
      seasonStatus,
      approvedCount,
      configuredTeams,
    ],
  );

  const totalPlayers =
    drawingOrder.length;

  const currentParticipation =
    currentPlayer ??
    drawingOrder[currentIndex] ??
    null;

  const currentPlayerInfo =
    currentParticipation
      ? playersById[
          currentParticipation.playerId
        ]
      : null;

  const assignedPlayerCount =
    configuredTeams.reduce(
      (total, team) =>
        total +
        team.roster.length,
      0,
    );

  const isAllPlayersDrawn =
    drawingStarted &&
    totalPlayers > 0 &&
    assignedPlayerCount ===
      totalPlayers &&
    currentIndex >=
      totalPlayers &&
    !spinning;

  const canConfigureTeams =
    !drawingStarted &&
    !drawingLocked;

  const canStartDrawing =
    eligibility.eligible &&
    !drawingStarted &&
    !drawingLocked;

  const canSpin =
    drawingStarted &&
    !drawingLocked &&
    !drawingCompleted &&
    !spinning &&
    Boolean(
      currentParticipation,
    );

  /**
   * ======================================================
   * PERSIST TO SEASON
   * ======================================================
   *
   * Setiap perubahan roster langsung dikirim ke parent.
   */

  const commitTeams = (
    nextTeams,
  ) => {
    const normalized =
      normalizeTeams(nextTeams);

    setConfiguredTeams(
      normalized,
    );

    if (onTeamsChange) {
      onTeamsChange(
        normalized,
      );
    }
  };

  /**
   * ======================================================
   * TEAM NAME
   * ======================================================
   */

  const handleTeamNameChange = (
    teamId,
    name,
  ) => {
    if (!canConfigureTeams) {
      return;
    }

    commitTeams(
      configuredTeams.map(
        (team) =>
          team.id === teamId
            ? {
                ...team,
                name,
              }
            : team,
      ),
    );
  };

  /**
   * ======================================================
   * START
   * ======================================================
   */

  const handleStartDrawing = () => {
    if (!canStartDrawing) {
      return;
    }

    if (
      approvedParticipations.length !==
      approvedCount
    ) {
      return;
    }

    /**
     * Roster kosong ketika drawing dimulai.
     */
    const emptyTeams =
      configuredTeams.map(
        (team) => ({
          ...team,
          roster: [],
        }),
      );

    commitTeams(
      emptyTeams,
    );

    const randomizedOrder =
      shuffleArray(
        approvedParticipations,
      );

    setDrawingOrder(
      randomizedOrder,
    );

    setCurrentIndex(0);

    setCurrentPlayer(
      randomizedOrder[0] ??
        null,
    );

    setLastDrawResult(null);

    setDrawingStarted(true);

    setDrawingCompleted(false);

    setWheelRotation(0);
  };

  /**
   * ======================================================
   * SPIN
   * ======================================================
   */

  const handleSpin = () => {
    if (!canSpin) {
      return;
    }

    const player =
      currentParticipation;

    const selectedTeam =
      selectBalancedTeam(
        configuredTeams,
        player.position ??
          "MID",
      );

    if (!selectedTeam) {
      return;
    }

    const teamIndex =
      configuredTeams.findIndex(
        (team) =>
          team.id ===
          selectedTeam.id,
      );

    if (teamIndex < 0) {
      return;
    }

    /**
     * Wheel segment:
     *
     * Team 0 = center 0°
     * Team 1 = center 90°
     * Team 2 = center 180°
     * Team 3 = center 270°
     *
     * Arrow = 0°.
     */
    const targetAngle =
      -(teamIndex * 90);

    const currentNormalized =
      ((wheelRotation % 360) +
        360) %
      360;

    const targetNormalized =
      ((targetAngle % 360) +
        360) %
      360;

    let delta =
      targetNormalized -
      currentNormalized;

    if (delta < 0) {
      delta += 360;
    }

    const extraTurns =
      5 +
      Math.floor(
        Math.random() * 2,
      );

    const finalRotation =
      wheelRotation +
      extraTurns * 360 +
      delta;

    setLastDrawResult(null);

    setSpinning(true);

    setWheelRotation(
      finalRotation,
    );

    window.setTimeout(() => {
      /**
       * Roster assignment baru dilakukan setelah
       * animation selesai.
       */
      const nextTeams =
        configuredTeams.map(
          (team) =>
            team.id ===
            selectedTeam.id
              ? {
                  ...team,
                  roster: [
                    ...team.roster,
                    {
                      participationId:
                        player.id,
                      playerId:
                        player.playerId,
                      position:
                        player.position ??
                        "MID",
                    },
                  ],
                }
              : team,
        );

      /**
       * Update lokal + Season parent.
       */
      commitTeams(
        nextTeams,
      );

      /**
       * Hasil berasal dari target yang sama dengan
       * segment wheel.
       */
      setLastDrawResult({
        player,
        team: selectedTeam,
      });

      setSpinning(false);

      window.setTimeout(
        () => {
          const nextIndex =
            currentIndex + 1;

          if (
            nextIndex <
            drawingOrder.length
          ) {
            setCurrentIndex(
              nextIndex,
            );

            setCurrentPlayer(
              drawingOrder[
                nextIndex
              ],
            );
          } else {
            setCurrentIndex(
              nextIndex,
            );

            setCurrentPlayer(
              null,
            );
          }
        },
        1000,
      );
    }, 2900);
  };

  /**
   * ======================================================
   * LOCK DRAWING
   * ======================================================
   */

  const handleCompleteDrawing =
    () => {
      if (
        !isAllPlayersDrawn ||
        drawingCompleted
      ) {
        return;
      }

      const assignedIds =
        configuredTeams.flatMap(
          (team) =>
            team.roster.map(
              (player) =>
                player.participationId,
            ),
        );

      const approvedIds =
        new Set(
          approvedParticipations.map(
            (participation) =>
              participation.id,
          ),
        );

      /**
       * Semua approved harus masuk tepat satu kali.
       */
      if (
        assignedIds.length !==
        approvedIds.size
      ) {
        return;
      }

      if (
        new Set(assignedIds)
          .size !==
        assignedIds.length
      ) {
        return;
      }

      if (
        !assignedIds.every(
          (id) =>
            approvedIds.has(id),
        )
      ) {
        return;
      }

      /**
       * Roster balance max difference 1.
       */
      const rosterSizes =
        configuredTeams.map(
          (team) =>
            team.roster.length,
        );

      const smallest =
        Math.min(
          ...rosterSizes,
        );

      const largest =
        Math.max(
          ...rosterSizes,
        );

      if (
        largest -
          smallest >
        1
      ) {
        return;
      }

      /**
       * Parent menerima hasil final.
       */
      if (onDrawingComplete) {
        onDrawingComplete(
          normalizeTeams(
            configuredTeams,
          ),
        );
      }

      setDrawingCompleted(
        true,
      );
    };

  /**
   * ======================================================
   * RENDER
   * ======================================================
   */

  return (
    <section className="space-y-5">
      {/* HEADER */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Shuffle size={19} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Competition Setup
                </p>

                <h2 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950">
                  Team Drawing
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              Approved player akan di-draw satu
              per satu. Hasil assignment langsung
              menjadi bagian dari Season roster.
            </p>
          </div>

          {drawingLocked && (
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              <LockKeyhole size={14} />
              Drawing Locked
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-3">
          <EligibilityItem
            label="Season Status"
            value={
              STATUS_LABELS[
                seasonStatus
              ] ??
              seasonStatus
            }
            valid={
              seasonStatus ===
              "REGISTRATION_CLOSED"
            }
          />

          <EligibilityItem
            label="Approved Players"
            value={`${approvedCount} / ${MAXIMUM_PLAYERS}`}
            valid={
              approvedCount >=
                MINIMUM_PLAYERS &&
              approvedCount <=
                MAXIMUM_PLAYERS
            }
          />

          <EligibilityItem
            label="Teams"
            value={`${configuredTeams.length} Teams`}
            valid={
              configuredTeams.length ===
              TEAM_COUNT
            }
          />
        </div>
      </div>

      {/* TEAM CONFIGURATION */}

      <TeamConfiguration
        teams={configuredTeams}
        disabled={
          !canConfigureTeams
        }
        onChange={
          handleTeamNameChange
        }
      />

      {/* START */}

      {!drawingStarted &&
        !drawingLocked && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={17}
                    className="text-emerald-600"
                  />

                  <p className="text-sm font-extrabold text-emerald-950">
                    {eligibility.eligible
                      ? "Season siap untuk drawing"
                      : "Drawing belum dapat dimulai"}
                  </p>
                </div>

                <p className="mt-1 max-w-xl text-sm leading-6 text-emerald-800/70">
                  {eligibility.message}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  handleStartDrawing
                }
                disabled={
                  !canStartDrawing
                }
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Play size={17} />
                Start Drawing
              </button>
            </div>
          </div>
        )}

      {/* DRAWING */}

      {drawingStarted && (
        <>
          {currentParticipation && (
            <ActivePlayerCard
              player={
                currentParticipation
              }
              playerInfo={
                currentPlayerInfo
              }
              drawingNumber={
                Math.min(
                  currentIndex + 1,
                  totalPlayers,
                )
              }
              totalPlayers={
                totalPlayers
              }
            />
          )}

          {lastDrawResult && (
            <DrawResult
              player={
                lastDrawResult.player
              }
              playerInfo={
                playersById[
                  lastDrawResult
                    .player
                    .playerId
                ]
              }
              team={
                lastDrawResult.team
              }
            />
          )}

          {/* WHEEL */}

          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Team Selection
              </p>

              <h3 className="mt-1 text-xl font-black tracking-tight text-slate-950">
                Player ini masuk team mana?
              </h3>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                Arrow adalah indikator hasil.
                Segment team yang tepat berada di
                bawah arrow ketika wheel berhenti
                adalah team player.
              </p>
            </div>

            <div className="mt-10">
              <TeamWheel
                teams={
                  configuredTeams
                }
                spinning={
                  spinning
                }
                wheelRotation={
                  wheelRotation
                }
              />
            </div>

            {/* LEGEND */}

            <div className="mx-auto mt-7 grid max-w-xl grid-cols-2 gap-2 sm:grid-cols-4">
              {configuredTeams.map(
                (team, index) => (
                  <div
                    key={team.id}
                    className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          WHEEL_COLORS[
                            index
                          ],
                      }}
                    />

                    <span
                      className="truncate text-xs font-bold text-slate-700"
                      title={
                        team.name
                      }
                    >
                      {team.name}
                    </span>
                  </div>
                ),
              )}
            </div>

            {/* SPIN */}

            {!isAllPlayersDrawn && (
              <div className="mx-auto mt-7 max-w-lg">
                <button
                  type="button"
                  onClick={
                    handleSpin
                  }
                  disabled={
                    !canSpin
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {spinning ? (
                    <>
                      <RotateCcw
                        size={18}
                        className="animate-spin"
                      />
                      Wheel sedang berputar...
                    </>
                  ) : (
                    <>
                      <Play
                        size={18}
                      />
                      Spin — Tentukan Team
                    </>
                  )}
                </button>
              </div>
            )}

            {/* PROGRESS */}

            <div className="mx-auto mt-6 max-w-lg">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">
                  Drawing Progress
                </span>

                <span className="text-slate-700">
                  {
                    assignedPlayerCount
                  }{" "}
                  / {totalPlayers}
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${
                      totalPlayers
                        ? Math.min(
                            (assignedPlayerCount /
                              totalPlayers) *
                              100,
                            100,
                          )
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ROSTER */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Season Roster
                </p>

                <h3 className="mt-1 text-lg font-extrabold text-slate-950">
                  Player Yang Sudah Masuk Team
                </h3>
              </div>

              <p className="text-xs font-semibold text-slate-500">
                {
                  assignedPlayerCount
                }{" "}
                / {totalPlayers} assigned
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {configuredTeams.map(
                (team) => (
                  <TeamRosterCard
                    key={team.id}
                    team={team}
                    playersById={
                      playersById
                    }
                  />
                ),
              )}
            </div>
          </div>

          {/* COMPLETE */}

          {isAllPlayersDrawn && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Check
                      size={19}
                      className="text-emerald-600"
                      strokeWidth={
                        3
                      }
                    />

                    <p className="text-sm font-extrabold text-emerald-950">
                      Semua Player Sudah Di-drawing
                    </p>
                  </div>

                  <p className="mt-1 text-sm leading-6 text-emerald-800/70">
                    Hasil drawing sudah tersimpan
                    pada Season state. Review roster
                    sebelum menguncinya.
                  </p>
                </div>

                {!drawingCompleted ? (
                  <button
                    type="button"
                    onClick={
                      handleCompleteDrawing
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-fit"
                  >
                    <LockKeyhole
                      size={17}
                    />
                    Lock Drawing
                  </button>
                ) : (
                  <div className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-black text-white sm:w-fit">
                    <Check size={17} />
                    Drawing Locked
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default TeamDrawing;