
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { PlusCircle } from 'lucide-react'
import { useToast } from '../hooks/use-toast'
import { mockTickets } from '../data/mockData'

interface NewTicketDialogProps {
  isAdmin?: boolean
  onTicketCreated?: (ticket: any) => void
}

export function NewTicketDialog({ isAdmin = false, onTicketCreated }: NewTicketDialogProps) {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState('normal')
  const [label, setLabel] = useState('General')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newTicket = {
        id: `ticket-${Date.now()}`,
        subject,
        status: 'open',
        priority,
        customerName: isAdmin ? 'Customer Name' : 'John Doe',
        customerEmail: isAdmin ? 'customer@example.com' : 'john.doe@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        initialMessage: message,
        lastMessage: message,
        labels: [label]
      }

      // Add to mock data
      mockTickets.unshift(newTicket)

      // Reset form
      setSubject('')
      setMessage('')
      setPriority('normal')
      setLabel('General')
      setIsSubmitting(false)
      setOpen(false)

      // Notify parent component
      if (onTicketCreated) {
        onTicketCreated(newTicket)
      }

      toast({
        title: 'Ticket Created',
        description: 'Your support ticket has been submitted successfully.',
      })
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          {isAdmin ? 'New Ticket' : 'Create Ticket'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Support Ticket</DialogTitle>
          <DialogDescription>
            Fill out the form below to submit a new support ticket. Our team will respond as soon as possible.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide details about your issue..."
                className="min-h-[120px]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="label">Category</Label>
                <Select value={label} onValueChange={setLabel}>
                  <SelectTrigger id="label">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Account">Account</SelectItem>
                    <SelectItem value="Feature Request">Feature Request</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}