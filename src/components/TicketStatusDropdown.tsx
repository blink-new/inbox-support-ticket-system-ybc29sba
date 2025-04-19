
import { useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { CheckCircle, Clock } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

interface TicketStatusDropdownProps {
  status: 'open' | 'closed'
  ticketId: string
  onStatusChange: (status: 'open' | 'closed') => void
}

export function TicketStatusDropdown({ status, ticketId, onStatusChange }: TicketStatusDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleStatusChange = (newStatus: 'open' | 'closed') => {
    if (status === newStatus) return
    
    setIsUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      onStatusChange(newStatus)
      setIsUpdating(false)
      
      toast({
        title: 'Status Updated',
        description: `Ticket status changed to ${newStatus}.`,
      })
    }, 500)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1" disabled={isUpdating}>
          {status === 'open' ? (
            <Clock className="h-3.5 w-3.5" />
          ) : (
            <CheckCircle className="h-3.5 w-3.5" />
          )}
          Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => handleStatusChange('open')}
          className={status === 'open' ? 'bg-accent text-accent-foreground' : ''}
        >
          <Clock className="h-3.5 w-3.5 mr-2" />
          Open
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleStatusChange('closed')}
          className={status === 'closed' ? 'bg-accent text-accent-foreground' : ''}
        >
          <CheckCircle className="h-3.5 w-3.5 mr-2" />
          Closed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}