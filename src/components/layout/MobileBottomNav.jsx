import {
  Home,
  Trophy,
  Users,
} from 'lucide-react'
import {
  NavLink,
} from 'react-router-dom'

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

function MobileBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex h-16 max-w-md items-stretch justify-around">
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex min-w-16 flex-1 flex-col',
                  'items-center justify-center gap-1',
                  'rounded-xl text-xs font-semibold',
                  'transition-colors duration-150',
                  'focus-visible:outline-none',
                  'focus-visible:ring-2 focus-visible:ring-slate-400',
                  isActive
                    ? 'text-slate-950'
                    : 'text-slate-500 hover:text-slate-950',
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
      </div>
    </nav>
  )
}

export default MobileBottomNav