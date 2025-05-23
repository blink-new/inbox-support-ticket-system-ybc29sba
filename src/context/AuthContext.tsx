
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'customer'
  avatarUrl?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // Try to get user from localStorage on initial load
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = async (email: string, password: string) => {
    // Mock login for prototype
    if (email.includes('admin')) {
      setUser({
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin',
        avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
      })
    } else {
      setUser({
        id: '2',
        name: 'John Doe',
        email: email,
        role: 'customer',
        avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=27AE60&color=fff'
      })
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup for prototype
    // In a real app, this would create a new user in the database
    
    // For demo purposes, we'll just simulate a successful signup
    // and then log the user in
    const isAdmin = email.includes('admin')
    
    setUser({
      id: Math.random().toString(36).substring(2, 9), // Generate random ID
      name: name,
      email: email,
      role: isAdmin ? 'admin' : 'customer',
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${isAdmin ? '0D8ABC' : '27AE60'}&color=fff`
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login,
      signup,
      logout,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}