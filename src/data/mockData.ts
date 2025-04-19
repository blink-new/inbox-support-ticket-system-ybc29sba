
// Mock data for the prototype

export type Ticket = {
  id: string
  subject: string
  status: 'open' | 'closed'
  priority: 'normal' | 'urgent'
  customerName: string
  customerEmail: string
  createdAt: string
  updatedAt: string
  initialMessage: string
  lastMessage: string
  labels: string[]
}

export type Message = {
  ticketId: string
  content: string
  timestamp: string
  isAdmin: boolean
}

export const mockTickets: Ticket[] = [
  {
    id: '1',
    subject: 'Unable to access my account',
    status: 'open',
    priority: 'urgent',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T14:45:00Z',
    initialMessage: 'I\'m trying to log in to my account but it keeps saying my password is incorrect. I\'ve tried resetting it multiple times but I\'m not receiving the reset email.',
    lastMessage: 'I\'ve checked my spam folder as well, still no reset email.',
    labels: ['Account', 'Technical']
  },
  {
    id: '2',
    subject: 'Billing question about my subscription',
    status: 'open',
    priority: 'normal',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    createdAt: '2023-06-14T09:15:00Z',
    updatedAt: '2023-06-14T16:20:00Z',
    initialMessage: 'I was charged twice for my monthly subscription. Can you please help me get a refund for the duplicate charge?',
    lastMessage: 'I\'ve attached my bank statement showing both charges.',
    labels: ['Billing']
  },
  {
    id: '3',
    subject: 'Feature request: Dark mode',
    status: 'closed',
    priority: 'normal',
    customerName: 'Alex Johnson',
    customerEmail: 'alex.johnson@example.com',
    createdAt: '2023-06-10T11:45:00Z',
    updatedAt: '2023-06-12T13:30:00Z',
    initialMessage: 'I would love to see a dark mode option in the app. It would be much easier on the eyes when using it at night.',
    lastMessage: 'Thanks for implementing this! The dark mode looks great.',
    labels: ['Feature Request']
  },
  {
    id: '4',
    subject: 'Integration with third-party service',
    status: 'open',
    priority: 'normal',
    customerName: 'Sam Wilson',
    customerEmail: 'sam.wilson@example.com',
    createdAt: '2023-06-13T14:20:00Z',
    updatedAt: '2023-06-14T09:10:00Z',
    initialMessage: 'I\'m trying to integrate your API with our CRM system but I\'m getting authentication errors. Can you help me troubleshoot?',
    lastMessage: 'I\'ve tried the solution you suggested but still getting the same error.',
    labels: ['Technical', 'API']
  },
  {
    id: '5',
    subject: 'Can\'t export my data',
    status: 'open',
    priority: 'urgent',
    customerName: 'Emily Chen',
    customerEmail: 'emily.chen@example.com',
    createdAt: '2023-06-15T08:45:00Z',
    updatedAt: '2023-06-15T11:30:00Z',
    initialMessage: 'I need to export all my data for a presentation tomorrow, but the export button isn\'t working. This is urgent as I need this for a client meeting.',
    lastMessage: 'Please help ASAP, my meeting is tomorrow morning.',
    labels: ['Technical', 'Urgent']
  },
  {
    id: '6',
    subject: 'Thank you for the great service',
    status: 'closed',
    priority: 'normal',
    customerName: 'Michael Brown',
    customerEmail: 'michael.brown@example.com',
    createdAt: '2023-06-11T16:30:00Z',
    updatedAt: '2023-06-11T17:15:00Z',
    initialMessage: 'Just wanted to say thank you for the excellent customer service. Your team has been very helpful with my questions.',
    lastMessage: 'You\'re welcome! We\'re glad we could help.',
    labels: ['Feedback', 'General']
  }
];

export const mockMessages: Message[] = [
  {
    ticketId: '1',
    content: 'I\'ve checked our system and I can see that reset emails are being sent to your address. Could you please check your spam folder?',
    timestamp: '2023-06-15T11:30:00Z',
    isAdmin: true
  },
  {
    ticketId: '1',
    content: 'I\'ve checked my spam folder as well, still no reset email.',
    timestamp: '2023-06-15T14:45:00Z',
    isAdmin: false
  },
  {
    ticketId: '2',
    content: 'I\'m sorry to hear about the double charge. I can see the duplicate transaction in our system. I\'ve initiated a refund which should appear in your account within 3-5 business days.',
    timestamp: '2023-06-14T10:20:00Z',
    isAdmin: true
  },
  {
    ticketId: '2',
    content: 'I\'ve attached my bank statement showing both charges.',
    timestamp: '2023-06-14T16:20:00Z',
    isAdmin: false
  },
  {
    ticketId: '3',
    content: 'Thanks for the suggestion! We\'re actually working on a dark mode feature right now and it should be available in our next update.',
    timestamp: '2023-06-10T13:15:00Z',
    isAdmin: true
  },
  {
    ticketId: '3',
    content: 'That\'s great to hear! Looking forward to it.',
    timestamp: '2023-06-11T09:30:00Z',
    isAdmin: false
  },
  {
    ticketId: '3',
    content: 'We\'ve just released the update with dark mode. You can enable it in your settings. Let us know what you think!',
    timestamp: '2023-06-12T11:45:00Z',
    isAdmin: true
  },
  {
    ticketId: '3',
    content: 'Thanks for implementing this! The dark mode looks great.',
    timestamp: '2023-06-12T13:30:00Z',
    isAdmin: false
  }
];