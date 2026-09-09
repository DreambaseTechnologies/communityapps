import {
  Plus,
  Users,
} from 'lucide-react'

import Button from '../ui/Button'
import EmptyState from '../ui/EmptyState'

function CommunityEmptyState({
  onCreate,
  onJoin,
}) {
  return (
    <EmptyState
      icon={
        <Users
          size={24}
          strokeWidth={2}
          aria-hidden="true"
        />
      }
      title="Belum ada community"
      description="Buat community sendiri atau bergabung ke community yang sudah ada untuk mulai bermain."
      action={
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            variant="primary"
            size="md"
            onClick={onCreate}
            className="w-full sm:w-auto"
          >
            <Plus
              size={17}
              strokeWidth={2}
              aria-hidden="true"
            />

            Create Community
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={onJoin}
            className="w-full sm:w-auto"
          >
            <Users
              size={17}
              strokeWidth={2}
              aria-hidden="true"
            />

            Join Community
          </Button>
        </div>
      }
    />
  )
}

export default CommunityEmptyState