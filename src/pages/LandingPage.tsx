
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Inbox, CheckCircle, ArrowRight, Mail, Shield, Clock, MessageSquare, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const navigate = useNavigate()

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

  const testimonials = [
    {
      quote: "This support system has transformed how we handle customer inquiries. It's intuitive and efficient.",
      author: "Sarah Johnson",
      role: "Customer Support Manager"
    },
    {
      quote: "The threaded conversations make it so easy to follow the history of each support ticket.",
      author: "Michael Chen",
      role: "Technical Support Lead"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Inbox className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Support Inbox</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
              <Button onClick={() => navigate('/signup')}>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-6"
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
          
          <p className="text-lg text-muted-foreground">
            A simple, intuitive support ticket system with an email client-inspired interface. 
            Connect with your customers and resolve issues faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Button size="lg" onClick={() => navigate('/signup')} className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Screenshot/Preview Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div 
          className="rounded-xl border shadow-lg overflow-hidden bg-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-muted p-2 border-b flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-muted-foreground flex-1 text-center">support-inbox.app</div>
          </div>
          <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-8">
            <div className="text-center">
              <Inbox className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">App interface preview</p>
            </div>
          </div>
        </motion.div>
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
              className="bg-card border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
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
      
      {/* Testimonials */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-card border rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
              >
                <p className="italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6 bg-primary/5 p-8 rounded-xl border">
          <h2 className="text-3xl font-bold">Ready to streamline your support?</h2>
          <p className="text-muted-foreground">
            Join thousands of businesses that use Support Inbox to provide exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate('/signup')} className="gap-2">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </div>
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