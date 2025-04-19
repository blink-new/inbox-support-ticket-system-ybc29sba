
import { useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { AlertCircle, Clock } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

interface TicketPriorityDropdownProps {
  priority: 'normal' | 'urgent'
  ticketId: string
  onPriorityChange: (priority: 'normal' | 'urgent') => void
}

export function TicketPriorityDropdown({ priority, ticketId, onPriorityChange }: TicketPriorityDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handlePriorityChange = (newPriority: 'normal' | 'urgent') => {
    if (priority === newPriority) return
    
    setIsUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      onPriorityChange(newPriority)
      setIsUpdating(false)
      
      toast({
        title: 'Priority Updated',
        description: `Ticket priority changed to ${newPriority}.`,
      })
    }, 500)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1" disabled={isUpdating}>
          {priority === 'urgent' ? (
            <AlertCircle className="h-3.5 w-3.5 text-destructive" />
          ) : (
            <Clock className="h-3.5 w-3.5" />
          )}
          Priority
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handlePriorityChange('normal')}
          className={priority === 'normal' ? 'bg-accent text-accent-foreground' : ''}
        >
          <Clock className="h-3.5 w-3.5 mr-2" />
          Normal
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handlePriorityChange('urgent')}
          className={priority === 'urgent' ? 'bg-accent text-accent-foreground' : ''}
        >
          <AlertCircle className="h-3.5 w-3.5 mr-2 text-destructive" />
          Urgent
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}