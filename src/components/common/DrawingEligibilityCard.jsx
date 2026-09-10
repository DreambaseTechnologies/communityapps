import {
  AlertCircle,
  CheckCircle2,
  LockKeyhole,
  Users,
} from "lucide-react";

/**
 * ========================================================
 * CONSTANTS
 * ========================================================
 */

const MINIMUM_PLAYERS = 40;
const MAXIMUM_PLAYERS = 64;

/**
 * ========================================================
 * MAIN COMPONENT
 * ========================================================
 */

function DrawingEligibilityCard({
  approvedCount = 0,
  maximumParticipants = MAXIMUM_PLAYERS,
  seasonStatus,
}) {
  const hasMinimumPlayers =
    approvedCount >= MINIMUM_PLAYERS;

  const hasMaximumPlayers =
    approvedCount <=
    Math.min(
      maximumParticipants,
      MAXIMUM_PLAYERS,
    );

  const registrationClosed =
    seasonStatus ===
    "REGISTRATION_CLOSED";

  const isEligible =
    registrationClosed &&
    hasMinimumPlayers &&
    hasMaximumPlayers;

  /**
   * ======================================================
   * STATUS
   * ======================================================
   */

  const statusTitle = isEligible
    ? "Season Siap untuk Drawing"
    : "Drawing Belum Dapat Dimulai";

  const statusDescription =
    isEligible
      ? "Semua persyaratan Team Drawing sudah terpenuhi. Kamu dapat memulai proses pembagian player ke 4 team."
      : "Pastikan registration sudah ditutup dan jumlah approved player memenuhi batas Team Drawing.";

  return (
    <section
      className={`rounded-2xl border p-5 sm:p-6 ${
        isEligible
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-white"
      }`}
    >
      {/* ==================================================
          HEADER
          ================================================== */}

      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            isEligible
              ? "bg-emerald-100 text-emerald-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {isEligible ? (
            <CheckCircle2
              size={21}
              strokeWidth={2.5}
            />
          ) : (
            <LockKeyhole
              size={20}
            />
          )}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Team Drawing Eligibility
          </p>

          <h2
            className={`mt-1 text-lg font-extrabold tracking-tight ${
              isEligible
                ? "text-emerald-950"
                : "text-slate-950"
            }`}
          >
            {statusTitle}
          </h2>

          <p
            className={`mt-1 text-sm leading-6 ${
              isEligible
                ? "text-emerald-800/70"
                : "text-slate-500"
            }`}
          >
            {statusDescription}
          </p>
        </div>
      </div>

      {/* ==================================================
          REQUIREMENTS
          ================================================== */}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {/* REGISTRATION */}

        <Requirement
          icon={LockKeyhole}
          label="Registration"
          value={
            registrationClosed
              ? "Closed"
              : "Belum Closed"
          }
          valid={
            registrationClosed
          }
        />

        {/* MINIMUM */}

        <Requirement
          icon={Users}
          label="Minimum Player"
          value={`${approvedCount} / ${MINIMUM_PLAYERS}`}
          valid={
            hasMinimumPlayers
          }
        />

        {/* MAXIMUM */}

        <Requirement
          icon={Users}
          label="Maximum Player"
          value={`${approvedCount} / ${Math.min(
            maximumParticipants,
            MAXIMUM_PLAYERS,
          )}`}
          valid={
            hasMaximumPlayers
          }
        />
      </div>

      {/* ==================================================
          WARNING
          ================================================== */}

      {!isEligible && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0 text-amber-600"
          />

          <div>
            <p className="text-xs font-extrabold text-amber-900">
              Persyaratan belum terpenuhi
            </p>

            <p className="mt-1 text-xs leading-5 text-amber-800/80">
              {!registrationClosed &&
                "Tutup registration terlebih dahulu. "}

              {!hasMinimumPlayers &&
                `Masih membutuhkan ${
                  MINIMUM_PLAYERS -
                  approvedCount
                } approved player untuk mencapai minimum ${MINIMUM_PLAYERS}. `}

              {!hasMaximumPlayers &&
                `Jumlah approved player melebihi batas maksimum ${Math.min(
                  maximumParticipants,
                  MAXIMUM_PLAYERS,
                )}.`}
            </p>
          </div>
        </div>
      )}

      {/* ==================================================
          READY MESSAGE
          ================================================== */}

      {isEligible && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/70 px-4 py-3">
          <CheckCircle2
            size={16}
            className="shrink-0 text-emerald-600"
          />

          <p className="text-xs font-bold text-emerald-800">
            {approvedCount} approved player siap
            masuk proses Team Drawing.
          </p>
        </div>
      )}
    </section>
  );
}

/**
 * ========================================================
 * REQUIREMENT
 * ========================================================
 */

function Requirement({
  icon: Icon,
  label,
  value,
  valid,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          valid
            ? "bg-emerald-100 text-emerald-600"
            : "bg-slate-100 text-slate-400"
        }`}
      >
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <div className="mt-0.5 flex items-center gap-1.5">
          <p className="truncate text-sm font-extrabold text-slate-800">
            {value}
          </p>

          {valid && (
            <CheckCircle2
              size={13}
              className="shrink-0 text-emerald-500"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DrawingEligibilityCard;