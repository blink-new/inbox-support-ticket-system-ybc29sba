
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { Search, Filter, Plus } from 'lucide-react'
import { mockTickets } from '../data/mockData'

export default function CustomerView() {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')
  const label = searchParams.get('label')
  
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter tickets based on URL params
  let filteredTickets = [...mockTickets]
  
  if (status) {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === status)
  }
  
  if (priority) {
    filteredTickets = filteredTickets.filter(ticket => ticket.priority === priority)
  }
  
  if (label) {
    filteredTickets = filteredTickets.filter(ticket => ticket.labels.includes(label))
  }
  
  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredTickets = filteredTickets.filter(ticket => 
      ticket.subject.toLowerCase().includes(query) || 
      ticket.lastMessage.toLowerCase().includes(query)
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Support Tickets</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No tickets found</h3>
            <p className="text-muted-foreground mt-1">Create a new ticket to get help from our support team.</p>
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <Link key={ticket.id} to={`/customer/${ticket.id}`}>
              <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{ticket.subject}</h3>
                      <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                        {ticket.status}
                      </Badge>
                      {ticket.priority === 'urgent' && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{ticket.lastMessage}</p>
                    <div className="flex gap-2 mt-2">
                      {ticket.labels.map(label => (
                        <Badge key={label} variant="outline">{label}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(ticket.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}