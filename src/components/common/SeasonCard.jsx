
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../ui/Badge";
import Card from "../ui/Card";

const STATUS_CONFIG = {
  DRAFT: {
    label: "Draft",
    variant: "neutral",
  },

  REGISTRATION_OPEN: {
    label: "Registration Open",
    variant: "info",
  },

  REGISTRATION_CLOSED: {
    label: "Registration Closed",
    variant: "warning",
  },

  DRAWING: {
    label: "Drawing",
    variant: "warning",
  },

  ONGOING: {
    label: "Ongoing",
    variant: "success",
  },

  FINISHED: {
    label: "Finished",
    variant: "neutral",
  },
};

function SeasonCard({ season }) {
  const status = STATUS_CONFIG[season.status] ?? STATUS_CONFIG.DRAFT;

  const totalParticipants = season.totalParticipants ?? 0;

  const participants = season.participants ?? 0;

  const participantProgress =
    totalParticipants > 0
      ? Math.min((participants / totalParticipants) * 100, 100)
      : 0;

  return (
    <Link
      to={`/community/season/${season.id}`}
      className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
      aria-label={`Open ${season.name}`}
    >
      <Card
        padding="none"
        className="h-full overflow-hidden transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md"
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={status.variant}>{status.label}</Badge>

                <Badge variant="neutral">Season</Badge>
              </div>

              <h3 className="mt-3 truncate text-lg font-extrabold text-slate-950">
                {season.name}
              </h3>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:bg-slate-100 group-hover:text-slate-700">
              <ChevronRight size={18} />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3">
              <CalendarDays size={17} className="shrink-0 text-slate-400" />

              <span className="text-sm font-medium text-slate-600">
                {season.date}
              </span>
            </div>

            {season.startTime && (
              <div className="flex items-center gap-3">
                <Clock3 size={17} className="shrink-0 text-slate-400" />

                <span className="text-sm font-medium text-slate-600">
                  {season.startTime}
                </span>
              </div>
            )}

            {season.location && (
              <div className="flex items-center gap-3">
                <MapPin size={17} className="shrink-0 text-slate-400" />

                <span className="truncate text-sm font-medium text-slate-600">
                  {season.location}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Users size={17} className="shrink-0 text-slate-400" />

              <span className="text-sm font-medium text-slate-600">
                {participants} / {totalParticipants} participants
              </span>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Registration
              </span>

              <span className="text-xs font-bold text-slate-600">
                {Math.round(participantProgress)}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${participantProgress}%`,
                }}
              />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm font-semibold text-slate-500">
              View Season
            </span>

            <span className="text-sm font-bold text-slate-900 transition-colors group-hover:text-emerald-700">
              Details
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default SeasonCard;
