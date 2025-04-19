
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import { Card, CardContent } from '../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  MoreHorizontal, 
  CheckCircle, 
  Tag, 
  AlertCircle,
  Clock
} from 'lucide-react'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../components/ui/dropdown-menu'
import { mockTickets, mockMessages } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { Separator } from '../components/ui/separator'

export default function TicketDetail() {
  const { ticketId } = useParams()
  const navigate = useNavigate()
  const { isAdmin } = useAuth()
  const [newMessage, setNewMessage] = useState('')
  
  // Find the ticket
  const ticket = mockTickets.find(t => t.id === ticketId)
  
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
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    // In a real app, we would send this to the API
    console.log('Sending message:', newMessage)
    setNewMessage('')
  }
  
  const handleStatusChange = (status: 'open' | 'closed') => {
    // In a real app, we would update the ticket status
    console.log('Changing status to:', status)
  }
  
  const handlePriorityChange = (priority: 'normal' | 'urgent') => {
    // In a real app, we would update the ticket priority
    console.log('Changing priority to:', priority)
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
          
          {ticket.labels.map(label => (
            <Badge key={label} variant="outline">{label}</Badge>
          ))}
          
          <div className="ml-auto flex items-center gap-2">
            {isAdmin && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Tag className="h-3.5 w-3.5" />
                      Labels
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Technical</DropdownMenuItem>
                    <DropdownMenuItem>General</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      {ticket.priority === 'urgent' ? (
                        <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                      Priority
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handlePriorityChange('normal')}>
                      Normal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePriorityChange('urgent')}>
                      Urgent
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      {ticket.status === 'open' ? (
                        <Clock className="h-3.5 w-3.5" />
                      ) : (
                        <CheckCircle className="h-3.5 w-3.5" />
                      )}
                      Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleStatusChange('open')}>
                      Open
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange('closed')}>
                      Closed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Print</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                {!isAdmin && (
                  <DropdownMenuItem className="text-destructive">
                    Close Ticket
                  </DropdownMenuItem>
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
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{ticket.customerName}</h3>
                <span className="text-xs text-muted-foreground">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm mt-1">{ticket.initialMessage}</p>
            </div>
          </div>
        </div>
        
        {mockMessages
          .filter(m => m.ticketId === ticketId)
          .map((message, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {message.isAdmin ? 'A' : ticket.customerName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {message.isAdmin ? 'Support Agent' : ticket.customerName}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{message.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
      
      {/* Reply box */}
      <div className="p-4 border-t bg-card">
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-between">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}