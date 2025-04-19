
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from './components/ui/toaster'
import Layout from './components/Layout'
import CustomerView from './pages/CustomerView'
import AdminView from './pages/AdminView'
import TicketDetail from './pages/TicketDetail'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeProvider'

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <Router>
          <Toaster />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/customer" replace />} />
              <Route path="customer" element={<CustomerView />} />
              <Route path="customer/:ticketId" element={<TicketDetail />} />
              <Route path="admin" element={<AdminView />} />
              <Route path="admin/:ticketId" element={<TicketDetail />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App