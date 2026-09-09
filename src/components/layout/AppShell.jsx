import {
  Outlet,
} from 'react-router-dom'

import AppHeader from './AppHeader'
import DesktopSidebar from './DesktopSidebar'
import MobileBottomNav from './MobileBottomNav'

function AppShell({
  user = {
    name: 'Muhammad Rafli',
    username: '@rafli',
  },
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DesktopSidebar
        user={user}
      />

      <div className="lg:pl-64">
        <AppHeader
          user={user}
        />
      </div>

      <main className="min-h-screen lg:pl-64">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:pb-8">
          <Outlet />
        </div>
      </main>

      <MobileBottomNav />
    </div>
  )
}

export default AppShell