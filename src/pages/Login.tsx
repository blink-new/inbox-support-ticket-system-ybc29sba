
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Inbox, AlertCircle, ArrowLeft } from 'lucide-react'
import { Alert, AlertDescription } from '../components/ui/alert'
import { motion } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-hero subtle-grid p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="back-button mb-4" 
          onClick={() => navigate('/landing')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="auth-card">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-2">
                <div className="bg-primary p-3 rounded-full">
                  <Inbox className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              <CardDescription>
                Enter your email to sign in to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="auth-form">
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="auth-form-group">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="auth-input"
                  />
                </div>
                <div className="auth-form-group">
                  <div className="auth-form-label">
                    <Label htmlFor="password">Password</Label>
                    <Button variant="link" className="auth-form-forgot" type="button">
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
                    className="auth-input"
                  />
                </div>
                <div className="demo-notice">
                  <p className="demo-notice-heading">Demo accounts:</p>
                  <p>- Admin: admin@example.com (any password)</p>
                  <p>- Customer: customer@example.com (any password)</p>
                </div>
              </CardContent>
              <CardFooter className="auth-form-footer">
                <Button 
                  type="submit" 
                  className="auth-button" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
                
                <div className="auth-form-link">
                  Don't have an account?{' '}
                  <Link to="/signup" className="auth-form-link-highlight">
                    Sign up
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