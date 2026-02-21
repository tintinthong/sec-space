import { Grant } from '../types';

export const AVAILABLE_GRANTS: Grant[] = [
  {
    id: 'g1',
    title: 'SME Digitalisation Grant',
    provider: 'Government Enterprise Agency',
    amount: 'Up to RM 5,000',
    description: 'Matching grant for SMEs to adopt digital solutions such as electronic Point of Sale systems (e-POS), HR payroll systems, and digital marketing.',
    category: 'Digitalisation',
    matchScore: 95,
    requiresCustomInfo: false, // We have all info (UEN, industry, etc)
    status: 'Available'
  },
  {
    id: 'g2',
    title: 'Market Readiness Assistance (MRA)',
    provider: 'Trade & Export Board',
    amount: 'Up to RM 100,000',
    description: 'Support for companies taking their first steps into overseas markets. Covers market assessment, market entry, and business matching.',
    category: 'Market Expansion',
    matchScore: 65,
    requiresCustomInfo: true,
    customFields: [
      { label: 'Target Country for Expansion', type: 'text' },
      { label: 'Estimated Project Cost (RM)', type: 'currency' }
    ],
    status: 'Available'
  },
  {
    id: 'g3',
    title: 'Green Technology Financing',
    provider: 'Sustainable Tech Fund',
    amount: 'Up to RM 2,000,000',
    description: 'Financing scheme to encourage industries to adopt green technology for energy efficiency and renewable energy.',
    category: 'Innovation',
    matchScore: 40,
    requiresCustomInfo: true,
    customFields: [
      { label: 'Project Technical Description', type: 'text' },
      { label: 'Current Energy Consumption (kWh)', type: 'number' }
    ],
    status: 'Available'
  },
  {
    id: 'g4',
    title: 'Graduate Talent Programme',
    provider: 'Human Capital Corp',
    amount: 'Salary Support (50%)',
    description: 'Funding support to hire local fresh graduates and train them for professional roles within your organization.',
    category: 'Hiring',
    matchScore: 85,
    requiresCustomInfo: false,
    status: 'Available'
  }
];