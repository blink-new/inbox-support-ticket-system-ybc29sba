
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Inbox, CheckCircle, ArrowRight, Mail, Shield, Clock, MessageSquare, Star, Users, Zap, BarChart } from 'lucide-react'
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
      role: "Customer Support Manager at Vercel",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      quote: "The threaded conversations make it so easy to follow the history of each support ticket. We've reduced response time by 45%.",
      author: "Michael Chen",
      role: "Technical Support Lead at Stripe",
      stars: 5,
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]

  const stats = [
    { value: "99.9%", label: "Uptime" },
    { value: "45%", label: "Faster Resolution" },
    { value: "10k+", label: "Active Users" },
    { value: "24/7", label: "Support" }
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
    <div className="min-h-screen bg-gradient-hero subtle-grid">
      {/* Header/Navigation */}
      <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Inbox className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">Inbox</span>
            </div>
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/pricing')}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Pricing
              </Button>
              <Button variant="ghost" onClick={() => navigate('/login')} className="font-medium">Sign In</Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-primary hover:bg-primary/90 text-white transition-colors rounded-lg px-5 py-2 font-medium"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 md:py-28">
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
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Customer support <span className="gradient-text">that scales</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            A modern support ticket system with an email client-inspired interface. 
            Connect with your customers and resolve issues faster.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')} 
              className="gap-2 bg-primary hover:bg-primary/90 text-white transition-colors rounded-lg px-8 py-6 text-base font-medium"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/pricing')}
              className="border-primary text-primary hover:bg-primary/10 transition-colors rounded-lg px-8 py-6 text-base font-medium"
            >
              View Pricing
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Screenshot/Preview Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="rounded-2xl border border-border/40 shadow-soft overflow-hidden bg-card relative"
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
            <div className="text-xs text-muted-foreground flex-1 text-center">inbox.app</div>
          </div>
          <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-30"></div>
            <motion.div 
              className="text-center z-10 glass-card p-8 rounded-xl shadow-lg border animate-float"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-primary p-4 rounded-full inline-block mb-4">
                <Inbox className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Streamlined Support</h3>
              <p className="text-muted-foreground">Manage all your customer inquiries in one place</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Trusted By Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-lg font-medium text-muted-foreground mb-8">TRUSTED BY INNOVATIVE COMPANIES</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div className="h-8 w-auto">
              <svg viewBox="0 0 124 24" fill="currentColor" className="h-full w-auto">
                <path d="M26.69 12.51c0-2.19-1.69-3.83-3.83-3.83-2.21 0-3.83 1.64-3.83 3.83 0 2.21 1.62 3.83 3.83 3.83 2.14 0 3.83-1.62 3.83-3.83zm-6.67 0c0-1.62 1.14-2.76 2.84-2.76 1.62 0 2.84 1.14 2.84 2.76 0 1.64-1.22 2.76-2.84 2.76-1.7 0-2.84-1.12-2.84-2.76zm15.67-3.6h-.94l-2.09 5.27-2.14-5.27h-.96l2.68 6.61h.87l2.58-6.61zm1.66-1.53c.36 0 .65-.3.65-.65 0-.36-.29-.65-.65-.65-.36 0-.65.29-.65.65 0 .36.29.65.65.65zm-.44 1.53v6.61h.87V8.91h-.87zm4.99 0h-.87v6.61h.87v-4.31l3.4 4.31h.85V8.91h-.87v4.24l-3.38-4.24zm10.64 5.74V8.91h-.87v6.61h.87v-.87l.85-.85 2.34 1.72h1.14l-2.84-2.14 2.41-2.41h-1.12l-2.78 2.84V8.91zm8.68-4.87c-2.06 0-3.73 1.64-3.73 3.83 0 2.21 1.67 3.83 3.73 3.83 1.37 0 2.56-.71 3.18-1.85l-.76-.44c-.46.85-1.35 1.35-2.41 1.35-1.53 0-2.74-1.12-2.84-2.58h6.4c.02-.1.02-.21.02-.31-.01-2.19-1.6-3.83-3.59-3.83zm-2.82 3.08c.15-1.37 1.26-2.34 2.82-2.34 1.51 0 2.63.97 2.78 2.34h-5.6zm13.33-3.08c-1.12 0-2.09.52-2.63 1.42V8.91h-.87v9.45h.87v-3.25c.54.9 1.51 1.42 2.63 1.42 2.06 0 3.73-1.62 3.73-3.83 0-2.19-1.67-3.83-3.73-3.83zm-.15 6.69c-1.62 0-2.84-1.12-2.84-2.76 0-1.62 1.22-2.76 2.84-2.76 1.64 0 2.84 1.14 2.84 2.76 0 1.64-1.2 2.76-2.84 2.76zm8.76-6.69c-2.14 0-3.83 1.64-3.83 3.83 0 2.21 1.69 3.83 3.83 3.83 2.14 0 3.83-1.62 3.83-3.83 0-2.19-1.69-3.83-3.83-3.83zm0 6.69c-1.62 0-2.84-1.12-2.84-2.76 0-1.62 1.22-2.76 2.84-2.76 1.62 0 2.84 1.14 2.84 2.76 0 1.64-1.22 2.76-2.84 2.76zm8.09-6.69c-.77 0-1.37.31-1.72.9V8.91h-.87v6.61h.87v-3.4c0-1.22.67-1.94 1.72-1.94.23 0 .46.04.71.13l.33-.83c-.3-.12-.67-.19-1.04-.19zm6.36 6.61c.15-.31.23-.71.23-1.2v-5.41h-.87v5.41c0 .75-.46 1.2-1.22 1.2-.23 0-.44-.04-.65-.15l-.31.77c.33.15.67.23 1.01.23.77 0 1.42-.31 1.81-.85zm3.25-8.14c.36 0 .65-.3.65-.65 0-.36-.29-.65-.65-.65-.36 0-.65.29-.65.65 0 .36.29.65.65.65zm-.44 1.53v6.61h.87V8.91h-.87zm5.84 0h-1.35V7.08h-.87v1.83h-.94v.83h.94v4.7c0 .9.67 1.2 1.35 1.2.31 0 .6-.06.83-.17l-.23-.77c-.15.06-.31.1-.48.1-.33 0-.6-.15-.6-.65v-4.41h1.35v-.83zm4.99-.23c-1.12 0-2.09.52-2.63 1.42V8.91h-.87v9.45h.87v-3.25c.54.9 1.51 1.42 2.63 1.42 2.06 0 3.73-1.62 3.73-3.83 0-2.19-1.67-3.83-3.73-3.83zm-.15 6.69c-1.62 0-2.84-1.12-2.84-2.76 0-1.62 1.22-2.76 2.84-2.76 1.64 0 2.84 1.14 2.84 2.76 0 1.64-1.2 2.76-2.84 2.76z" />
                <path d="M7.5 0C3.36 0 0 3.36 0 7.5v9C0 20.64 3.36 24 7.5 24h9c4.14 0 7.5-3.36 7.5-7.5v-9C24 3.36 20.64 0 16.5 0h-9zm.75 3h7.5c2.9 0 5.25 2.35 5.25 5.25v7.5c0 2.9-2.35 5.25-5.25 5.25h-7.5C5.35 21 3 18.65 3 15.75v-7.5C3 5.35 5.35 3 8.25 3z" />
              </svg>
            </div>
            <div className="h-6 w-auto">
              <svg viewBox="0 0 124 34" fill="currentColor" className="h-full w-auto">
                <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H0V0H13.25C19.4632 0 24.5 5.03679 24.5 11.25V12.75Z" />
                <path d="M37 34C30.3726 34 25 28.6274 25 22C25 15.3726 30.3726 10 37 10C43.6274 10 49 15.3726 49 22C49 28.6274 43.6274 34 37 34Z" />
                <path d="M86.5 24H73.75C67.5368 24 62.5 18.9632 62.5 12.75V11.25C62.5 5.03679 67.5368 0 73.75 0H86.5V24Z" />
                <path d="M62.5 34C55.8726 34 50.5 28.6274 50.5 22C50.5 15.3726 55.8726 10 62.5 10C69.1274 10 74.5 15.3726 74.5 22C74.5 28.6274 69.1274 34 62.5 34Z" />
                <path d="M111.5 34C104.873 34 99.5 28.6274 99.5 22C99.5 15.3726 104.873 10 111.5 10C118.127 10 123.5 15.3726 123.5 22C123.5 28.6274 118.127 34 111.5 34Z" />
                <path d="M111.5 0H124V24H111.5C105.287 24 100.25 18.9632 100.25 12.75V11.25C100.25 5.03679 105.287 0 111.5 0Z" />
              </svg>
            </div>
            <div className="h-7 w-auto">
              <svg viewBox="0 0 124 30" fill="currentColor" className="h-full w-auto">
                <path d="M31.5 16.5C31.5 13.4624 29.0376 11 26 11C22.9624 11 20.5 13.4624 20.5 16.5C20.5 19.5376 22.9624 22 26 22C29.0376 22 31.5 19.5376 31.5 16.5Z" />
                <path d="M59.5 16.5C59.5 13.4624 57.0376 11 54 11C50.9624 11 48.5 13.4624 48.5 16.5C48.5 19.5376 50.9624 22 54 22C57.0376 22 59.5 19.5376 59.5 16.5Z" />
                <path d="M87.5 16.5C87.5 13.4624 85.0376 11 82 11C78.9624 11 76.5 13.4624 76.5 16.5C76.5 19.5376 78.9624 22 82 22C85.0376 22 87.5 19.5376 87.5 16.5Z" />
                <path d="M115.5 16.5C115.5 13.4624 113.038 11 110 11C106.962 11 104.5 13.4624 104.5 16.5C104.5 19.5376 106.962 22 110 22C113.038 22 115.5 19.5376 115.5 16.5Z" />
                <path d="M18 2H34V31H18V2Z" />
                <path d="M46 2H62V31H46V2Z" />
                <path d="M74 2H90V31H74V2Z" />
                <path d="M102 2H118V31H102V2Z" />
                <path d="M0 2H16V31H0V2Z" />
              </svg>
            </div>
            <div className="h-8 w-auto">
              <svg viewBox="0 0 124 30" fill="currentColor" className="h-full w-auto">
                <path d="M17.5029 0H29.5V30H17.5029V0Z" />
                <path d="M0 0H12.0024V30H0V0Z" />
                <path d="M63.4992 11.5C59.9121 11.5 57 14.4121 57 18.0016C57 21.5879 59.9121 24.5 63.5008 24.5C67.0879 24.5 70 21.5879 70 18.0016C70 14.4121 67.0879 11.5 63.4992 11.5Z" />
                <path d="M81.4992 11.5C77.9121 11.5 75 14.4121 75 18.0016C75 21.5879 77.9121 24.5 81.5008 24.5C85.0879 24.5 88 21.5879 88 18.0016C88 14.4121 85.0879 11.5 81.4992 11.5Z" />
                <path d="M99.4992 11.5C95.9121 11.5 93 14.4121 93 18.0016C93 21.5879 95.9121 24.5 99.5008 24.5C103.088 24.5 106 21.5879 106 18.0016C106 14.4121 103.088 11.5 99.4992 11.5Z" />
                <path d="M117.499 11.5C113.912 11.5 111 14.4121 111 18.0016C111 21.5879 113.912 24.5 117.501 24.5C121.088 24.5 124 21.5879 124 18.0016C124 14.4121 121.088 11.5 117.499 11.5Z" />
                <path d="M45.4992 11.5C41.9121 11.5 39 14.4121 39 18.0016C39 21.5879 41.9121 24.5 45.5008 24.5C49.0879 24.5 52 21.5879 52 18.0016C52 14.4121 49.0879 11.5 45.4992 11.5Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Streamline Your Customer Support</h2>
            <p className="max-w-2xl mx-auto opacity-90 text-lg">
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
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all card-hover"
                variants={itemVariants}
              >
                <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="py-24 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              A simple, powerful workflow designed for modern support teams
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Customer Inquiries</h3>
              <p className="text-muted-foreground">
                Customers submit support requests through email, web form, or directly in the app.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Instant Organization</h3>
              <p className="text-muted-foreground">
                Tickets are automatically organized in a clean, threaded conversation interface.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Track & Resolve</h3>
              <p className="text-muted-foreground">
                Monitor status, collaborate with your team, and resolve issues efficiently.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-24 bg-gradient-to-b from-muted/10 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + (0.1 * index) }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center space-y-8 glass-card p-12 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Ready to transform your customer support?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of businesses that use Inbox to provide exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button 
              size="lg" 
              onClick={() => navigate('/pricing')} 
              className="gap-2 bg-primary hover:bg-primary/90 text-white transition-colors rounded-lg px-8 py-6 text-base font-medium"
            >
              View Pricing <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/signup')}
              className="border-primary text-primary hover:bg-primary/10 transition-colors rounded-lg px-8 py-6 text-base font-medium"
            >
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">SLA</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-primary p-2 rounded-lg">
                <Inbox className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold">Inbox</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Inbox, Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}