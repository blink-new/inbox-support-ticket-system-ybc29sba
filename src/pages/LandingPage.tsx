
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Inbox, CheckCircle, ArrowRight, Mail, Shield, Clock, MessageSquare, ChevronRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Threaded Conversations",
      description: "Keep all communications organized in easy-to-follow conversation threads."
    },
    {
      icon: <Mail className="h-6 w-6 text-white" />,
      title: "Email Notifications",
      description: "Get notified instantly when there are updates to your support tickets."
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Admin & Customer Views",
      description: "Dedicated interfaces for both support staff and customers."
    },
    {
      icon: <Clock className="h-6 w-6 text-white" />,
      title: "Status Tracking",
      description: "Track the status of tickets with clear open/closed indicators."
    }
  ]

  const testimonials = [
    {
      quote: "This support system has transformed how we handle customer inquiries. It's intuitive and efficient.",
      author: "Sarah Johnson",
      role: "Customer Support Manager",
      stars: 5
    },
    {
      quote: "The threaded conversations make it so easy to follow the history of each support ticket.",
      author: "Michael Chen",
      role: "Technical Support Lead",
      stars: 5
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header/Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Inbox className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">Support Inbox</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-primary hover:opacity-90 transition-all"
              >
                Get Started
              </Button>
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
            Support inbox that <span className="gradient-text">works for you</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A simple, intuitive support ticket system with an email client-inspired interface. 
            Connect with your customers and resolve issues faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')} 
              className="gap-2 bg-gradient-primary hover:opacity-90 transition-all"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Sign In
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Screenshot/Preview Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div 
          className="rounded-xl border shadow-lg overflow-hidden bg-card relative"
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
          <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-30"></div>
            <motion.div 
              className="text-center z-10 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border animate-float"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-gradient-primary p-4 rounded-full inline-block mb-4">
                <Inbox className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Streamlined Support</h3>
              <p className="text-muted-foreground">Manage all your customer inquiries in one place</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Streamline Your Customer Support</h2>
            <p className="max-w-2xl mx-auto opacity-90">
              Our inbox-style support ticket system helps you manage customer inquiries efficiently
            </p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition-all card-hover"
                variants={itemVariants}
              >
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-card border rounded-lg p-6 shadow-sm card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
              >
                <div className="flex mb-2">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
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
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-6 bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-xl border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold">Ready to streamline your support?</h2>
          <p className="text-muted-foreground">
            Join thousands of businesses that use Support Inbox to provide exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')} 
              className="gap-2 bg-gradient-primary hover:opacity-90 transition-all"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Sign In
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Inbox className="h-5 w-5 text-white" />
              </div>
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