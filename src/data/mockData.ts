
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
  attachments?: {
    name: string
    size: number
    type: string
  }[]
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
    labels: ['General', 'Feedback']
  },
  {
    id: '7',
    subject: 'Problem with payment method',
    status: 'open',
    priority: 'normal',
    customerName: 'David Lee',
    customerEmail: 'david.lee@example.com',
    createdAt: '2023-06-16T13:20:00Z',
    updatedAt: '2023-06-16T15:45:00Z',
    initialMessage: 'I\'m trying to update my payment method but the system keeps rejecting my new credit card. I\'ve verified all the information is correct.',
    lastMessage: 'I\'ve tried with a different card as well, same issue.',
    labels: ['Billing', 'Account']
  },
  {
    id: '8',
    subject: 'Missing features in latest update',
    status: 'open',
    priority: 'normal',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@example.com',
    createdAt: '2023-06-17T09:30:00Z',
    updatedAt: '2023-06-17T11:15:00Z',
    initialMessage: 'After the latest update, I can\'t find the export to PDF feature that I used frequently. Has it been removed or relocated?',
    lastMessage: 'This feature was essential for my workflow, please advise.',
    labels: ['Technical', 'Feature Request']
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
    isAdmin: false,
    attachments: [
      {
        name: 'bank_statement_june.pdf',
        size: 1240000,
        type: 'application/pdf'
      }
    ]
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
    isAdmin: true,
    attachments: [
      {
        name: 'dark_mode_instructions.pdf',
        size: 850000,
        type: 'application/pdf'
      },
      {
        name: 'release_notes_v2.1.txt',
        size: 12500,
        type: 'text/plain'
      }
    ]
  },
  {
    ticketId: '3',
    content: 'Thanks for implementing this! The dark mode looks great.',
    timestamp: '2023-06-12T13:30:00Z',
    isAdmin: false
  },
  {
    ticketId: '4',
    content: 'I\'m getting the following error when trying to authenticate: "Invalid API credentials". I\'ve double-checked my API key and it seems correct.',
    timestamp: '2023-06-13T14:20:00Z',
    isAdmin: false,
    attachments: [
      {
        name: 'error_screenshot.png',
        size: 1450000,
        type: 'image/png'
      }
    ]
  },
  {
    ticketId: '4',
    content: 'Thanks for providing the screenshot. It looks like you might be using our legacy API. We\'ve updated our authentication method recently. Please try using the new API endpoint as described in our documentation: https://api.example.com/v2/auth',
    timestamp: '2023-06-13T16:45:00Z',
    isAdmin: true
  },
  {
    ticketId: '4',
    content: 'I\'ve tried the solution you suggested but still getting the same error.',
    timestamp: '2023-06-14T09:10:00Z',
    isAdmin: false
  },
  {
    ticketId: '5',
    content: 'I need to export all my data for a presentation tomorrow, but the export button isn\'t working. This is urgent as I need this for a client meeting.',
    timestamp: '2023-06-15T08:45:00Z',
    isAdmin: false
  },
  {
    ticketId: '5',
    content: 'I understand the urgency. We\'re experiencing some issues with our export functionality. As a workaround, I\'ve manually generated an export of your data and attached it to this message. Please let me know if this works for you.',
    timestamp: '2023-06-15T10:15:00Z',
    isAdmin: true,
    attachments: [
      {
        name: 'data_export_emily_chen.xlsx',
        size: 2540000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    ]
  },
  {
    ticketId: '5',
    content: 'Please help ASAP, my meeting is tomorrow morning.',
    timestamp: '2023-06-15T11:30:00Z',
    isAdmin: false
  },
  {
    ticketId: '6',
    content: 'Just wanted to say thank you for the excellent customer service. Your team has been very helpful with my questions.',
    timestamp: '2023-06-11T16:30:00Z',
    isAdmin: false
  },
  {
    ticketId: '6',
    content: 'You\'re welcome! We\'re glad we could help. Don\'t hesitate to reach out if you have any other questions in the future.',
    timestamp: '2023-06-11T17:15:00Z',
    isAdmin: true
  },
  {
    ticketId: '7',
    content: 'I\'m trying to update my payment method but the system keeps rejecting my new credit card. I\'ve verified all the information is correct.',
    timestamp: '2023-06-16T13:20:00Z',
    isAdmin: false
  },
  {
    ticketId: '7',
    content: 'I\'m sorry you\'re having trouble updating your payment method. Could you please confirm the card is not expired and that you\'re entering the correct billing address associated with the card?',
    timestamp: '2023-06-16T14:30:00Z',
    isAdmin: true
  },
  {
    ticketId: '7',
    content: 'I\'ve tried with a different card as well, same issue.',
    timestamp: '2023-06-16T15:45:00Z',
    isAdmin: false
  },
  {
    ticketId: '8',
    content: 'After the latest update, I can\'t find the export to PDF feature that I used frequently. Has it been removed or relocated?',
    timestamp: '2023-06-17T09:30:00Z',
    isAdmin: false
  },
  {
    ticketId: '8',
    content: 'The PDF export feature has been temporarily disabled due to some compatibility issues with the new version. We\'re working on fixing it and it should be available again in our next patch update scheduled for next week.',
    timestamp: '2023-06-17T10:45:00Z',
    isAdmin: true
  },
  {
    ticketId: '8',
    content: 'This feature was essential for my workflow, please advise.',
    timestamp: '2023-06-17T11:15:00Z',
    isAdmin: false
  }
];