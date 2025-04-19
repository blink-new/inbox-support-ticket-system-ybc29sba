
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { 
  Inbox, 
  PlusCircle, 
  Tag, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Settings
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { cn } from '../lib/utils'

export function Sidebar() {
  const location = useLocation()
  const { isAdmin } = useAuth()
  const basePath = isAdmin ? '/admin' : '/customer'

  const navItems = [
    { 
      label: 'Inbox', 
      icon: <Inbox className="h-4 w-4 mr-2" />, 
      path: basePath,
      active: location.pathname === basePath
    },
    { 
      label: 'Open', 
      icon: <Clock className="h-4 w-4 mr-2" />, 
      path: `${basePath}?status=open`,
      active: location.pathname.includes(basePath) && location.search === '?status=open'
    },
    { 
      label: 'Closed', 
      icon: <CheckCircle className="h-4 w-4 mr-2" />, 
      path: `${basePath}?status=closed`,
      active: location.pathname.includes(basePath) && location.search === '?status=closed'
    },
    { 
      label: 'Urgent', 
      icon: <AlertCircle className="h-4 w-4 mr-2" />, 
      path: `${basePath}?priority=urgent`,
      active: location.pathname.includes(basePath) && location.search === '?priority=urgent'
    }
  ]

  return (
    <div className="h-full flex flex-col bg-sidebar-background text-sidebar-foreground p-4">
      <div className="mb-8 mt-4">
        <Button 
          className="w-full justify-start bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {isAdmin ? 'New Ticket' : 'Create Ticket'}
        </Button>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
              item.active 
                ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-4 pt-4 border-t border-sidebar-border">
        <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase">
          Labels
        </div>
        <div className="space-y-1 mt-1">
          {['Billing', 'Technical', 'General'].map((label) => (
            <Link 
              key={label}
              to={`${basePath}?label=${label.toLowerCase()}`}
              className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            >
              <Tag className="h-4 w-4 mr-2" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <Link 
            to="/admin/settings"
            className="flex items-center px-3 py-2 text-sm rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </div>
      )}
    </div>
  )
}