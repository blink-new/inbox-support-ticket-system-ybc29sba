
import { useState, useEffect } from 'react'
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
import { NewTicketDialog } from '../components/NewTicketDialog'
import { EmptyState } from '../components/EmptyState'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'

export default function AdminView() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status')
  const priority = searchParams.get('priority')
  const label = searchParams.get('label')
  
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [tickets, setTickets] = useState(mockTickets)
  const [filteredTickets, setFilteredTickets] = useState(mockTickets)
  
  // Apply filters whenever tickets or search params change
  useEffect(() => {
    let result = [...tickets]
    
    if (status) {
      result = result.filter(ticket => ticket.status === status)
    } else if (activeTab === 'open') {
      result = result.filter(ticket => ticket.status === 'open')
    } else if (activeTab === 'closed') {
      result = result.filter(ticket => ticket.status === 'closed')
    }
    
    if (priority) {
      result = result.filter(ticket => ticket.priority === priority)
    } else if (activeTab === 'urgent') {
      result = result.filter(ticket => ticket.priority === 'urgent')
    }
    
    if (label) {
      result = result.filter(ticket => ticket.labels.includes(label))
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(ticket => 
        ticket.subject.toLowerCase().includes(query) || 
        ticket.lastMessage.toLowerCase().includes(query) ||
        ticket.customerName.toLowerCase().includes(query) ||
        ticket.customerEmail.toLowerCase().includes(query)
      )
    }
    
    setFilteredTickets(result)
  }, [tickets, status, priority, label, searchQuery, activeTab])

  // Update URL when tab changes
  useEffect(() => {
    if (activeTab === 'open') {
      searchParams.set('status', 'open')
      searchParams.delete('priority')
    } else if (activeTab === 'closed') {
      searchParams.set('status', 'closed')
      searchParams.delete('priority')
    } else if (activeTab === 'urgent') {
      searchParams.set('priority', 'urgent')
      searchParams.delete('status')
    } else {
      searchParams.delete('status')
      searchParams.delete('priority')
    }
    setSearchParams(searchParams)
  }, [activeTab])

  // Update active tab when URL params change
  useEffect(() => {
    if (status === 'open') {
      setActiveTab('open')
    } else if (status === 'closed') {
      setActiveTab('closed')
    } else if (priority === 'urgent') {
      setActiveTab('urgent')
    } else {
      setActiveTab('all')
    }
  }, [status, priority])

  const handleTicketCreated = (newTicket: any) => {
    setTickets(prev => [newTicket, ...prev])
  }

  const handleFilterChange = (filterType: string, value: string | null) => {
    if (value) {
      searchParams.set(filterType, value)
    } else {
      searchParams.delete(filterType)
    }
    setSearchParams(searchParams)
  }

  const clearFilters = () => {
    setSearchParams({})
    setSearchQuery('')
    setActiveTab('all')
  }

  // Stats
  const openCount = tickets.filter(t => t.status === 'open').length
  const urgentCount = tickets.filter(t => t.priority === 'urgent').length
  const closedCount = tickets.filter(t => t.status === 'closed').length

  const hasActiveFilters = status || priority || label || searchQuery

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Support Inbox</h1>
        <NewTicketDialog isAdmin onTicketCreated={handleTicketCreated} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setActiveTab('open')}>
          <div>
            <p className="text-sm text-muted-foreground">Open Tickets</p>
            <p className="text-2xl font-bold">{openCount}</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
            <Clock className="h-6 w-6 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setActiveTab('urgent')}>
          <div>
            <p className="text-sm text-muted-foreground">Urgent Tickets</p>
            <p className="text-2xl font-bold">{urgentCount}</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
        </Card>
        <Card className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setActiveTab('closed')}>
          <div>
            <p className="text-sm text-muted-foreground">Closed Tickets</p>
            <p className="text-2xl font-bold">{closedCount}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Tickets</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Status</DropdownMenuLabel>
              <DropdownMenuItem 
                className={status === 'open' ? 'bg-accent text-accent-foreground' : ''}
                onClick={() => handleFilterChange('status', 'open')}
              >
                Open
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={status === 'closed' ? 'bg-accent text-accent-foreground' : ''}
                onClick={() => handleFilterChange('status', 'closed')}
              >
                Closed
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Priority</DropdownMenuLabel>
              <DropdownMenuItem 
                className={priority === 'normal' ? 'bg-accent text-accent-foreground' : ''}
                onClick={() => handleFilterChange('priority', 'normal')}
              >
                Normal
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={priority === 'urgent' ? 'bg-accent text-accent-foreground' : ''}
                onClick={() => handleFilterChange('priority',  'urgent')}
              >
                Urgent
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Category</DropdownMenuLabel>
              {['General', 'Technical', 'Billing', 'Account', 'Feature Request'].map(category => (
                <DropdownMenuItem 
                  key={category}
                  className={label === category ? 'bg-accent text-accent-foreground' : ''}
                  onClick={() => handleFilterChange('label', category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            {hasActiveFilters && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={clearFilters} className="text-primary justify-center font-medium">
                  Clear All Filters
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {status && (
            <Badge variant="outline" className="flex items-center gap-1">
              Status: {status}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => handleFilterChange('status', null)}
              >
                <span className="sr-only">Remove</span>
                ×
              </Button>
            </Badge>
          )}
          
          {priority && (
            <Badge variant="outline" className="flex items-center gap-1">
              Priority: {priority}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => handleFilterChange('priority', null)}
              >
                <span className="sr-only">Remove</span>
                ×
              </Button>
            </Badge>
          )}
          
          {label && (
            <Badge variant="outline" className="flex items-center gap-1">
              Category: {label}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => handleFilterChange('label', null)}
              >
                <span className="sr-only">Remove</span>
                ×
              </Button>
            </Badge>
          )}
          
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {searchQuery}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0" 
                onClick={() => setSearchQuery('')}
              >
                <span className="sr-only">Remove</span>
                ×
              </Button>
            </Badge>
          )}
          
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={clearFilters}>
              Clear All
            </Button>
          )}
        </div>
      )}
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4 w-full sm:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <EmptyState
            title="No tickets found"
            description="Adjust your filters to see more results."
          />
        ) : (
          filteredTickets.map(ticket => (
            <Link key={ticket.id} to={`/admin/${ticket.id}`}>
              <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium">{ticket.subject}</h3>
                      <Badge variant={ticket.status === 'open' ? 'default' : 'secondary'}>
                        {ticket.status}
                      </Badge>
                      {ticket.priority === 'urgent' && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{ticket.lastMessage}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <div className="flex items-center gap-1 text-sm">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span>{ticket.customerName}</span>
                      </div>
                      {ticket.labels.map(label => (
                        <Badge key={label} variant="outline">{label}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap ml-4">
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