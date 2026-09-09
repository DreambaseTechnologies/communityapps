import ActivityItem from './ActivityItem'
import Card from '../ui/Card'
import EmptyState from '../ui/EmptyState'

function RecentActivity({
  activities = [],
  emptyAction,
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-extrabold text-slate-950">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Aktivitas terbaru kamu.
        </p>
      </div>

      {activities.length > 0 ? (
        <Card padding="none">
          <div className="divide-y divide-slate-100">
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                user={activity.user}
              />
            ))}
          </div>
        </Card>
      ) : (
        <EmptyState
          icon="◷"
          title="Belum ada aktivitas"
          description="Aktivitas seperti bergabung Season, hasil pertandingan, dan pencapaian kamu akan muncul di sini."
          action={emptyAction}
        />
      )}
    </section>
  )
}

export default RecentActivity