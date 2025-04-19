
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Inbox, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { Alert, AlertDescription } from '../components/ui/alert'
import { motion } from 'framer-motion'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)
    
    try {
      await signup(name, email, password)
      setSuccess('Account created successfully!')
      
      // Redirect to the appropriate dashboard after a short delay
      setTimeout(() => {
        if (email.includes('admin')) {
          navigate('/admin')
        } else {
          navigate('/customer')
        }
      }, 1500)
    } catch (error) {
      console.error('Signup failed:', error)
      setError('Failed to create account. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-4 pl-0 flex items-center gap-1 text-primary" 
          onClick={() => navigate('/landing')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-2">
                <div className="bg-primary p-3 rounded-full">
                  <Inbox className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to get started
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSignup}>
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
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-primary/20 focus:border-primary"
                  />
                </div>
                
                <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Demo accounts:</p>
                  <p>- Include "admin" in your email to create an admin account</p>
                  <p>- Any other email will create a customer account</p>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white transition-colors" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}