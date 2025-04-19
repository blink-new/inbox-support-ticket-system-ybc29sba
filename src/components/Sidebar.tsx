
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { 
  Inbox, 
  PlusCircle, 
  Tag, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Settings,
  User,
  HelpCircle
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { cn } from '../lib/utils'
import { NewTicketDialog } from './NewTicketDialog'
import { mockTickets } from '../data/mockData'
import { Badge } from './ui/badge'

export function Sidebar() {
  const location = useLocation()
  const { isAdmin, user } = useAuth()
  const basePath = isAdmin ? '/admin' : '/customer'

  // Count tickets for badges
  const openCount = mockTickets.filter(t => t.status === 'open').length
  const urgentCount = mockTickets.filter(t => t.priority === 'urgent').length
  const closedCount = mockTickets.filter(t => t.status === 'closed').length

  const navItems = [
    { 
      label: 'Inbox', 
      icon: <Inbox className="h-4 w-4 mr-2" />, 
      path: basePath,
      active: location.pathname === basePath && !location.search,
      count: mockTickets.length
    },
    { 
      label: 'Open', 
      icon: <Clock className="h-4 w-4 mr-2" />, 
      path: `${basePath}?status=open`,
      active: location.search === '?status=open',
      count: openCount
    },
    { 
      label: 'Urgent', 
      icon: <AlertCircle className="h-4 w-4 mr-2 text-destructive" />, 
      path: `${basePath}?priority=urgent`,
      active: location.search === '?priority=urgent',
      count: urgentCount
    },
    { 
      label: 'Closed', 
      icon: <CheckCircle className="h-4 w-4 mr-2" />, 
      path: `${basePath}?status=closed`,
      active: location.search === '?status=closed',
      count: closedCount
    }
  ]

  const categories = [
    { label: 'General', count: mockTickets.filter(t => t.labels.includes('General')).length },
    { label: 'Technical', count: mockTickets.filter(t => t.labels.includes('Technical')).length },
    { label: 'Billing', count: mockTickets.filter(t => t.labels.includes('Billing')).length },
    { label: 'Account', count: mockTickets.filter(t => t.labels.includes('Account')).length },
    { label: 'Feature Request', count: mockTickets.filter(t => t.labels.includes('Feature Request')).length }
  ]

  return (
    <div className="h-full flex flex-col bg-sidebar-background text-sidebar-foreground p-4">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="font-medium truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>

      <div className="mb-6 mt-4">
        <NewTicketDialog isAdmin={isAdmin} />
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
              item.active 
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <div className="flex items-center">
              {item.icon}
              {item.label}
            </div>
            {item.count > 0 && (
              <Badge variant="outline" className="ml-auto">
                {item.count}
              </Badge>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-6 pt-6 border-t border-sidebar-border">
        <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase">
          Categories
        </div>
        <div className="space-y-1 mt-1">
          {categories.map((category) => (
            <Link 
              key={category.label}
              to={`${basePath}?label=${category.label}`}
              className={cn(
                "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                location.search === `?label=${category.label}`
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2" />
                {category.label}
              </div>
              {category.count > 0 && (
                <Badge variant="outline" className="ml-auto">
                  {category.count}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="mt-auto pt-6 border-t border-sidebar-border">
          <Link 
            to="/admin/settings"
            className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
          <Link 
            to="/admin/help"
            className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Help & Documentation
          </Link>
        </div>
      )}
    </div>
  )
}