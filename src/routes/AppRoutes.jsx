
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import AppShell from '../components/layout/AppShell'
import HomePage from '../pages/home/HomePage'
import CommunityPage from '../pages/community/CommunityPage'
import SeasonDetailPage from '../pages/season/SeasonDetailPage'

function LeaderboardPage() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
        Competition
      </p>

      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        Leaderboard
      </h1>

      <p className="mt-2 text-slate-500">
        Ranking statistik pemain.
      </p>
    </div>
  )
}

function ProfilePage() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
        Account
      </p>

      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950">
        Profile
      </h1>

      <p className="mt-2 text-slate-500">
        Profile dan pengaturan akun.
      </p>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          404
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
          Page Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          Halaman yang kamu cari tidak ditemukan.
        </p>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to="/home"
            replace
          />
        }
      />

      <Route element={<AppShell />}>
        <Route
          path="/home"
          element={<HomePage />}
        />

        <Route
          path="/community"
          element={<CommunityPage />}
        />

        <Route
          path="/community/season/:seasonId"
          element={<SeasonDetailPage />}
        />

        <Route
          path="/leaderboard"
          element={<LeaderboardPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  )
}

export default AppRoutes
