import {
  Home,
  Trophy,
  Users,
} from 'lucide-react'
import {
  NavLink,
} from 'react-router-dom'

import Avatar from '../ui/Avatar'

const navigation = [
  {
    label: 'Home',
    icon: Home,
    to: '/home',
  },
  {
    label: 'Community',
    icon: Users,
    to: '/community',
  },
  {
    label: 'Leaderboard',
    icon: Trophy,
    to: '/leaderboard',
  },
]

function DesktopSidebar({
  user = {
    name: 'Muhammad Rafli',
    username: '@rafli',
  },
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-slate-100 px-6">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-slate-950">
            Aplikasi Komunitas
          </p>

          <p className="mt-0.5 text-xs font-medium text-slate-400">
            Sports Community Platform
          </p>
        </div>
      </div>

      <nav
        className="flex-1 space-y-1 px-3 py-5"
        aria-label="Main navigation"
      >
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-3 py-3',
                  'text-sm font-semibold',
                  'transition-colors duration-150',
                  'focus-visible:outline-none',
                  'focus-visible:ring-2 focus-visible:ring-slate-400',
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950',
                ].join(' ')
              }
            >
              <Icon
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <NavLink
          to="/profile"
          className={[
            'flex items-center gap-3 rounded-xl p-2',
            'transition-colors duration-150',
            'hover:bg-slate-50',
            'focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-slate-400',
          ].join(' ')}
        >
          <Avatar
            name={user.name}
            size="sm"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-slate-950">
              {user.name}
            </p>

            <p className="truncate text-xs text-slate-500">
              {user.username}
            </p>
          </div>
        </NavLink>
      </div>
    </aside>
  )
}

export default DesktopSidebar