import { Company } from '../types';

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'c1',
    name: 'TechNova Solutions Sdn. Bhd.',
    uen: '202112345K',
    country: 'Malaysia',
    entityType: 'Sendirian Berhad',
    status: 'Active',
    currentPlan: 'Basic',
    incorporationDate: '2021-08-15',
    description: 'TechNova provides SaaS solutions for logistics and supply chain management, focusing on last-mile delivery optimization using AI-driven routing.',
    industry: '62011 - Development of software for logistics',
    website: 'https://technova.my',
    employeeCount: 12,
    financialYearEnd: '31 December',
    registeredAddress: '71 Ayer Rajah Crescent, #02-10, Singapore 139951',
    taxRefNo: 'C2388192-01',
    mainBank: 'Maybank Islamic',
    bankAccountNumber: '5123 4567 8901',
    companyEmail: 'admin@technova.my',
    companyPhone: '+60 3-7722 5555',
    officers: [
      {
        id: 'u1',
        name: 'Alex Chen',
        role: 'Director',
        email: 'alex@technova.my',
        isSignatory: true,
        shares: 6000,
        avatarInitial: 'A',
        isCurrentUser: true,
        nationality: 'Malaysian',
        phone: '+60 12-345 6789'
      },
      {
        id: 'u2',
        name: 'Sarah Tan',
        role: 'Director',
        email: 'sarah.tan@technova.my',
        isSignatory: true,
        shares: 4000,
        avatarInitial: 'S',
        nationality: 'Singaporean'
      },
      {
        id: 'u3',
        name: 'SecSpace Services',
        role: 'Secretary',
        email: 'compliance@secspace.com',
        isSignatory: false,
        avatarInitial: 'S'
      }
    ],
    fees: [
      {
        id: 'f1',
        title: 'Incorporation Fee',
        description: 'One-time government registration fee and professional service charge.',
        amount: 1399,
        currency: 'RM',
        dueDate: '2021-08-15',
        status: 'PAID',
        category: 'One-off'
      },
      {
        id: 'f2',
        title: 'Annual Company Secretary Retainer (2022)',
        description: 'Annual fee for acting as named company secretary.',
        amount: 480,
        currency: 'RM',
        dueDate: '2022-08-15',
        status: 'PAID',
        category: 'Service'
      },
      {
        id: 'f3',
        title: 'Annual Return Filing Fee (2022)',
        description: 'SSM filing fee for Annual Return.',
        amount: 150,
        currency: 'RM',
        dueDate: '2022-09-30',
        status: 'PAID',
        category: 'Government'
      },
      {
        id: 'f6',
        title: 'Annual Company Secretary Retainer (2024)',
        description: 'Upcoming renewal for secretarial services.',
        amount: 480,
        currency: 'RM',
        dueDate: '2024-08-15',
        status: 'UPCOMING',
        category: 'Service'
      }
    ]
  },
  {
    id: 'c2',
    name: 'GreenLeaf Ventures Ltd',
    country: 'United Kingdom',
    entityType: 'Private Limited by Shares',
    status: 'Pending Incorporation',
    currentPlan: 'Essential',
    // Missing fields to demonstrate profile completion
    financialYearEnd: '31 March',
    officers: [
      {
        id: 'u1-uk',
        name: 'Alex Chen',
        role: 'Director',
        email: 'alex@greenleaf.co.uk',
        isSignatory: true,
        shares: 100,
        avatarInitial: 'A',
        isCurrentUser: true
      },
      {
        id: 'u4',
        name: 'Marcus Reynolds',
        role: 'Director',
        email: 'm.reynolds@greenleaf.co.uk',
        isSignatory: true,
        shares: 0,
        avatarInitial: 'M'
      }
    ],
    fees: [
      {
        id: 'f1-uk',
        title: 'Companies House Registration',
        description: 'Official incorporation fee.',
        amount: 12,
        currency: 'GBP',
        dueDate: '2023-11-01',
        status: 'PAID',
        category: 'Government'
      },
      {
        id: 'f2-uk',
        title: 'Incorporation Service Fee',
        description: 'Professional assistance for setting up the entity.',
        amount: 150,
        currency: 'GBP',
        dueDate: '2023-11-01',
        status: 'PAID',
        category: 'Service'
      }
    ]
  }
];