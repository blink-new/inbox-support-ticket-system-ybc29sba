
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Card } from '../components/ui/card'
import { 
  Search, 
  Filter, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react'
import { mockTickets } from '../data/mockData'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'

export default function AdminView() {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')
  const label = searchParams.get('label')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Filter tickets based on URL params and active tab
  let filteredTickets = [...mockTickets]
  
  if (status) {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === status)
  } else if (activeTab === 'open') {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === 'open')
  } else if (activeTab === 'closed') {
    filteredTickets = filteredTickets.filter(ticket => ticket.status === 'closed')
  }
  
  if (priority) {
    filteredTickets = filteredTickets.filter(ticket => ticket.priority === priority)
  } else if (activeTab === 'urgent') {
    filteredTickets = filteredTickets.filter(ticket => ticket.priority === 'urgent')
  }
  
  if (label) {
    filteredTickets = filteredTickets.filter(ticket => ticket.labels.includes(label))
  }
  
  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredTickets = filteredTickets.filter(ticket => 
      ticket.subject.toLowerCase().includes(query) || 
      ticket.lastMessage.toLowerCase().includes(query) ||
      ticket.customerName.toLowerCase().includes(query) ||
      ticket.customerEmail.toLowerCase().includes(query)
    )
  }

  // Stats
  const openCount = mockTickets.filter(t => t.status === 'open').length
  const urgentCount = mockTickets.filter(t => t.priority === 'urgent').length
  const closedCount = mockTickets.filter(t => t.status === 'closed').length

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Support Inbox</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Open Tickets</p>
            <p className="text-2xl font-bold">{openCount}</p>
          </div>
          <Clock className="h-8 w-8 text-blue-500 opacity-80" />
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Urgent Tickets</p>
            <p className="text-2xl font-bold">{urgentCount}</p>
          </div>
          <AlertCircle className="h-8 w-8 text-red-500 opacity-80" />
        </Card>
        <Card className="p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Closed Tickets</p>
            <p className="text-2xl font-bold">{closedCount}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
        </Card>
      </div>
      
      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tickets, customers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No tickets found</h3>
            <p className="text-muted-foreground mt-1">Adjust your filters to see more results.</p>
          </div>
        ) : (
          filteredTickets.map(ticket => (
            <Link key={ticket.id} to={`/admin/${ticket.id}`}>
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
                    <div className="flex items-center gap-2 mt-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{ticket.customerName}</span>
                      <div className="flex gap-2">
                        {ticket.labels.map(label => (
                          <Badge key={label} variant="outline">{label}</Badge>
                        ))}
                      </div>
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