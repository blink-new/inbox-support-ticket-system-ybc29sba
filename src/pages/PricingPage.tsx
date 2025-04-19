
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Inbox, CheckCircle, ArrowLeft, ArrowRight, X, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { Switch } from '../components/ui/switch'
import { Label } from '../components/ui/label'

export default function PricingPage() {
  const navigate = useNavigate()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const pricingPlans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses just getting started',
      price: billingCycle === 'monthly' ? 29 : 290,
      features: [
        'Up to 3 support agents',
        '500 tickets per month',
        'Email notifications',
        'Basic reporting',
        '24-hour support',
      ],
      limitations: [
        'No custom branding',
        'No API access',
        'No priority support',
      ],
      cta: 'Start Free Trial',
      popular: false,
      color: 'from-blue-400 to-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
      iconColor: 'text-blue-500',
    },
    {
      name: 'Professional',
      description: 'Ideal for growing teams with more demands',
      price: billingCycle === 'monthly' ? 79 : 790,
      features: [
        'Up to 10 support agents',
        'Unlimited tickets',
        'Email & SMS notifications',
        'Advanced reporting',
        'Priority support',
        'Custom branding',
        'API access',
      ],
      limitations: [],
      cta: 'Get Started',
      popular: true,
      color: 'from-primary to-secondary',
      bgColor: 'bg-primary/5 dark:bg-primary/10',
      iconColor: 'text-primary',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      price: billingCycle === 'monthly' ? 199 : 1990,
      features: [
        'Unlimited support agents',
        'Unlimited tickets',
        'All notification channels',
        'Custom reporting',
        '24/7 priority support',
        'Custom branding',
        'Advanced API access',
        'Dedicated account manager',
        'SLA guarantees',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-purple-500 to-accent',
      bgColor: 'bg-purple-50 dark:bg-purple-900/10',
      iconColor: 'text-accent',
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

      {/* Back button */}
      <div className="container mx-auto px-4 pt-8">
        <Button 
          variant="ghost" 
          className="pl-0 flex items-center gap-1 text-primary" 
          onClick={() => navigate('/landing')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Button>
      </div>

      {/* Pricing Header */}
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <div className="flex items-center">
              <Switch 
                checked={billingCycle === 'yearly'} 
                onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                className="data-[state=checked]:bg-gradient-primary"
              />
            </div>
            <span className={`text-sm font-medium flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium dark:bg-green-900/30 dark:text-green-400">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 mx-auto w-max">
                  <span className="bg-gradient-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card className={`border-2 ${plan.popular ? 'border-primary shadow-lg' : ''} h-full flex flex-col`}>
                <CardHeader className={`${plan.bgColor} rounded-t-lg`}>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="font-medium">What's included:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className={`h-5 w-5 ${plan.iconColor} shrink-0 mt-0.5`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <>
                        <p className="font-medium text-muted-foreground pt-2">Limitations:</p>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start gap-2 text-muted-foreground">
                              <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full bg-gradient-to-r ${plan.color} text-white hover:opacity-90`}
                    onClick={() => navigate('/signup')}
                  >
                    {plan.cta}
                    {plan.name !== 'Enterprise' && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes to your billing will be prorated.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What happens after my trial ends?</h3>
              <p className="text-muted-foreground">After your 14-day trial, you'll be automatically switched to your selected plan. We'll send you a reminder before charging your card.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Do you offer discounts for nonprofits?</h3>
              <p className="text-muted-foreground">Yes, we offer special pricing for nonprofit organizations. Please contact our sales team for more information.</p>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How do I cancel my subscription?</h3>
              <p className="text-muted-foreground">You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.</p>
            </div>
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
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground">
            Join thousands of businesses that use Support Inbox to provide exceptional customer service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')} 
              className="gap-2 bg-gradient-primary hover:opacity-90 transition-all"
            >
              Start Your Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Contact Sales
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