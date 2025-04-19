
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import Layout from './components/Layout'
import CustomerView from './pages/CustomerView'
import AdminView from './pages/AdminView'
import TicketDetail from './pages/TicketDetail'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import PricingPage from './pages/PricingPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeProvider'

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/landing" replace />
  }
  
  return children
}

function AppRoutes() {
  const { user } = useAuth()
  
  return (
    <Routes>
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      
      <Route path="/" element={
        user ? <Navigate to={user.role === 'admin' ? '/admin' : '/customer'} replace /> : <Navigate to="/landing" replace />
      } />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="customer" element={<CustomerView />} />
        <Route path="customer/:ticketId" element={<TicketDetail />} />
        <Route path="admin" element={<AdminView />} />
        <Route path="admin/:ticketId" element={<TicketDetail />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <Router>
          <Toaster />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App