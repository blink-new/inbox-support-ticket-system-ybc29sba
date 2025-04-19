
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Inbox, AlertCircle, CheckCircle, ArrowRight, Mail, Shield, Clock, MessageSquare } from 'lucide-react'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    try {
      await login(email, password)
      if (email.includes('admin')) {
        navigate('/admin')
      } else {
        navigate('/customer')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)
    
    try {
      // For demo purposes, we'll just show a success message
      // In a real app, this would create a new user account
      setTimeout(() => {
        setSuccess('Account created successfully! You can now log in.')
        setActiveTab('login')
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Signup failed:', error)
      setError('Failed to create account. Please try again.')
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      title: "Threaded Conversations",
      description: "Keep all communications organized in easy-to-follow conversation threads."
    },
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Notifications",
      description: "Get notified instantly when there are updates to your support tickets."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Admin & Customer Views",
      description: "Dedicated interfaces for both support staff and customers."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Status Tracking",
      description: "Track the status of tickets with clear open/closed indicators."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-8 pb-16 md:pt-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Hero content */}
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <CheckCircle className="h-4 w-4" />
              Simple, effective support ticketing
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Support inbox that <span className="text-primary">works for you</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              A simple, intuitive support ticket system with an email client-inspired interface. 
              Connect with your customers and resolve issues faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={() => setActiveTab('signup')} className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setActiveTab('login')}>
                Sign In
              </Button>
            </div>
          </motion.div>
          
          {/* Right side - Auth card */}
          <motion.div 
            className="flex-1 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-2">
              <CardHeader className="space-y-1">
                <div className="flex justify-center mb-2">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Inbox className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">Support Inbox</CardTitle>
                <CardDescription className="text-center">
                  {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account'}
                </CardDescription>
              </CardHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 w-[90%] mx-auto">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4 pt-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      {success && (
                        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription>{success}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button variant="link" className="p-0 h-auto text-xs" type="button">
                            Forgot password?
                          </Button>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                        />
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Demo accounts:</p>
                        <p>- Admin: admin@example.com (any password)</p>
                        <p>- Customer: customer@example.com (any password)</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup}>
                    <CardContent className="space-y-4 pt-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creating account...' : 'Create account'}
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Streamline Your Customer Support</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our inbox-style support ticket system helps you manage customer inquiries efficiently
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-card border rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Inbox className="h-5 w-5 text-primary" />
              <span className="font-semibold">Support Inbox</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Support Inbox. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}