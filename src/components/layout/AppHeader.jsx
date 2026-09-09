import {
  Bell,
} from 'lucide-react'

import Avatar from '../ui/Avatar'

function AppHeader({
  user = {
    name: 'Muhammad Rafli',
    username: '@rafli',
  },
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="truncate text-base font-extrabold tracking-tight text-slate-950">
            Aplikasi Komunitas
          </p>

          <p className="truncate text-[11px] font-medium text-slate-400">
            Sports Community Platform
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className={[
              'relative inline-flex h-10 w-10 items-center justify-center',
              'rounded-xl text-slate-500',
              'transition-colors duration-150',
              'hover:bg-slate-100 hover:text-slate-950',
              'focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-slate-400',
            ].join(' ')}
          >
            <Bell
              size={20}
              strokeWidth={2}
              aria-hidden="true"
            />

            <span
              className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white"
              aria-label="Unread notifications"
            />
          </button>

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-3">
            <Avatar
              name={user.name}
              size="sm"
            />

            <div className="hidden min-w-0 sm:block">
              <p className="max-w-32 truncate text-sm font-bold text-slate-950">
                {user.name}
              </p>

              <p className="max-w-32 truncate text-xs text-slate-500">
                {user.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader