
import { Button } from './ui/button'
import { InboxIcon, PlusCircle } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <InboxIcon className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}