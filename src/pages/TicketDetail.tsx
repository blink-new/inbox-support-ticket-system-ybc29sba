
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { 
  ArrowLeft, 
  Send, 
  MoreHorizontal, 
  CheckCircle, 
  Tag, 
  AlertCircle,
  Clock,
  Download
} from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu'
import { mockTickets, mockMessages } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { TicketStatusDropdown } from '../components/TicketStatusDropdown'
import { TicketPriorityDropdown } from '../components/TicketPriorityDropdown'
import { TicketLabelDropdown } from '../components/TicketLabelDropdown'
import { FileUploadInput } from '../components/FileUploadInput'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { useToast } from '../hooks/use-toast'

export default function TicketDetail() {
  const { ticketId } = useParams()
  const navigate = useNavigate()
  const { isAdmin, user } = useAuth()
  const [newMessage, setNewMessage] = useState('')
  const [ticket, setTicket] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const { toast } = useToast()
  
  useEffect(() => {
    // Find the ticket
    const foundTicket = mockTickets.find(t => t.id === ticketId)
    if (foundTicket) {
      setTicket(foundTicket)
    }
    
    // Find messages for this ticket
    const ticketMessages = mockMessages.filter(m => m.ticketId === ticketId)
    setMessages(ticketMessages)
  }, [ticketId])
  
  if (!ticket) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Ticket not found</h2>
        <Button 
          variant="link" 
          onClick={() => navigate(isAdmin ? '/admin' : '/customer')}
          className="mt-2"
        >
          Back to tickets
        </Button>
      </div>
    )
  }
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() && selectedFiles.length === 0) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newMessageObj = {
        ticketId: ticket.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
        isAdmin: isAdmin,
        attachments: selectedFiles.length > 0 ? selectedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        })) : undefined
      }
      
      // Update messages
      setMessages(prev => [...prev, newMessageObj])
      
      // Update ticket's last message
      const updatedTicket = {
        ...ticket,
        lastMessage: newMessage,
        updatedAt: new Date().toISOString()
      }
      setTicket(updatedTicket)
      
      // Update in mock data
      const ticketIndex = mockTickets.findIndex(t => t.id === ticket.id)
      if (ticketIndex !== -1) {
        mockTickets[ticketIndex] = updatedTicket
      }
      
      // Add to mock messages
      mockMessages.push(newMessageObj)
      
      // Reset form
      setNewMessage('')
      setSelectedFiles([])
      setIsSubmitting(false)
      
      toast({
        title: 'Message Sent',
        description: 'Your message has been sent successfully.',
      })
    }, 1000)
  }
  
  const handleStatusChange = (status: 'open' | 'closed') => {
    const updatedTicket = { ...ticket, status }
    setTicket(updatedTicket)
    
    // Update in mock data
    const ticketIndex = mockTickets.findIndex(t => t.id === ticket.id)
    if (ticketIndex !== -1) {
      mockTickets[ticketIndex] = updatedTicket
    }
  }
  
  const handlePriorityChange = (priority: 'normal' | 'urgent') => {
    const updatedTicket = { ...ticket, priority }
    setTicket(updatedTicket)
    
    // Update in mock data
    const ticketIndex = mockTickets.findIndex(t => t.id === ticket.id)
    if (ticketIndex !== -1) {
      mockTickets[ticketIndex] = updatedTicket
    }
  }
  
  const handleLabelToggle = (label: string) => {
    let updatedLabels
    
    if (ticket.labels.includes(label)) {
      updatedLabels = ticket.labels.filter((l: string) => l !== label)
    } else {
      updatedLabels = [...ticket.labels, label]
    }
    
    const updatedTicket = { ...ticket, labels: updatedLabels }
    setTicket(updatedTicket)
    
    // Update in mock data
    const ticketIndex = mockTickets.findIndex(t => t.id === ticket.id)
    if (ticketIndex !== -1) {
      mockTickets[ticketIndex] = updatedTicket
    }
  }
  
  const handleCloseTicket = () => {
    handleStatusChange('closed')
  }
  
  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files)
  }
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Ticket header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(isAdmin ? '/admin' : '/customer')}
            aria-label="Back to tickets"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">{ticket.subject}</h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
            {ticket.status}
          </Badge>
          
          <Badge variant={ticket.priority === 'urgent' ? 'destructive' : 'outline'}>
            {ticket.priority}
          </Badge>
          
          {ticket.labels.map((label: string) => (
            <Badge key={label} variant="outline">{label}</Badge>
          ))}
          
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {isAdmin && (
              <>
                <TicketLabelDropdown 
                  labels={ticket.labels} 
                  ticketId={ticket.id}
                  onLabelToggle={handleLabelToggle}
                />
                
                <TicketPriorityDropdown
                  priority={ticket.priority}
                  ticketId={ticket.id}
                  onPriorityChange={handlePriorityChange}
                />
                
                <TicketStatusDropdown
                  status={ticket.status}
                  ticketId={ticket.id}
                  onStatusChange={handleStatusChange}
                />
              </>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                {!isAdmin && ticket.status === 'open' && (
                  <ConfirmDialog
                    title="Close Ticket"
                    description="Are you sure you want to close this ticket? This will mark the issue as resolved."
                    actionLabel="Close Ticket"
                    triggerLabel="Close Ticket"
                    triggerVariant="ghost"
                    onConfirm={handleCloseTicket}
                  >
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Close Ticket
                    </DropdownMenuItem>
                  </ConfirmDialog>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Message thread */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback>{ticket.customerName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{ticket.customerName}</h3>
                <span className="text-xs text-muted-foreground">
                  {formatTimestamp(ticket.createdAt)}
                </span>
              </div>
              <p className="text-sm mt-1 whitespace-pre-wrap">{ticket.initialMessage}</p>
            </div>
          </div>
        </div>
        
        {messages.map((message, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>
                    {message.isAdmin ? (user?.name[0] || 'A') : ticket.customerName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      {message.isAdmin ? (user?.name || 'Support Agent') : ticket.customerName}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm mt-1 whitespace-pre-wrap">{message.content}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-muted-foreground">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.attachments.map((attachment: any, i: number) => (
                          <div key={i} className="flex items-center gap-1 bg-muted/50 rounded-md p-1.5 text-xs">
                            <Download className="h-3 w-3" />
                            <span className="truncate max-w-[150px]">{attachment.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Reply box */}
      <div className="p-4 border-t bg-card">
        <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
          <Textarea
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-between items-center">
            <FileUploadInput onFilesSelected={handleFilesSelected} />
            <Button 
              type="submit" 
              disabled={isSubmitting || (!newMessage.trim() && selectedFiles.length === 0)}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Sending...' : 'Send Reply'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}