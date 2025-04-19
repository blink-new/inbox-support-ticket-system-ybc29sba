
import { useState } from 'react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Tag } from 'lucide-react'
import { useToast } from '../hooks/use-toast'

interface TicketLabelDropdownProps {
  labels: string[]
  ticketId: string
  onLabelToggle: (label: string) => void
}

export function TicketLabelDropdown({ labels, ticketId, onLabelToggle }: TicketLabelDropdownProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()
  
  const availableLabels = ['General', 'Technical', 'Billing', 'Account', 'Feature Request']

  const handleLabelToggle = (label: string) => {
    setIsUpdating(true)
    
    // Simulate API call
    setTimeout(() => {
      onLabelToggle(label)
      setIsUpdating(false)
      
      const action = labels.includes(label) ? 'removed from' : 'added to'
      toast({
        title: 'Label Updated',
        description: `"${label}" ${action} ticket.`,
      })
    }, 500)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1" disabled={isUpdating}>
          <Tag className="h-3.5 w-3.5" />
          Labels
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLabels.map(label => (
          <DropdownMenuItem 
            key={label}
            onClick={() => handleLabelToggle(label)}
            className={labels.includes(label) ? 'bg-accent text-accent-foreground' : ''}
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${labels.includes(label) ? 'bg-primary' : 'bg-muted'}`}></div>
              {label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}