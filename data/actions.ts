import { Users, Briefcase, MapPin, Building2, FileText, Landmark, PieChart, ShieldCheck } from 'lucide-react';
import { ActionItem } from '../types';

export const SECRETARIAL_ACTIONS: ActionItem[] = [
  {
    id: 'appoint-director',
    title: 'Appoint New Director',
    description: 'Officially register a new director for your company. This involves legal resolutions, consent forms, and updating the government registry.',
    shortDescription: 'Add a new member to your board of directors.',
    icon: Users,
    category: 'Governance',
    estimatedTime: '2-3 Business Days',
    pricing: {
      basic: 250,
      essential: 'Included',
      pro: 'Included',
      govtFee: 0 // Assumed usually minimal filing fee or included in base
    },
    complexity: 'Medium',
    steps: [
      { title: 'Collect Details', description: 'Obtain full name, residential address, ID/Passport copy, and email of the new director.' },
      { title: 'Prepare Board Resolution', description: 'Draft a resolution in writing for existing directors to approve the appointment.' },
      { title: 'Sign Consent to Act', description: 'The new director must sign Form 45 (Consent to Act as Director).' },
      { title: 'Lodge with Registrar', description: 'Submit the appointment details to the official company registrar (SSM).' },
      { title: 'Update Registers', description: 'Update the company\'s Register of Directors.' }
    ],
    requiredDocuments: [
      'Copy of NRIC/Passport of new director',
      'Residential address proof (if foreign)',
      'Signed Consent to Act (Form 45)',
      'Signed Board Resolution'
    ],
    faq: [
      { question: 'Is there a minimum age?', answer: 'Yes, the director must be at least 18 years old.' },
      { question: 'Can a foreigner be a director?', answer: 'Yes, but companies usually require at least one locally resident director.' }
    ]
  },
  {
    id: 'transfer-shares',
    title: 'Transfer Shares',
    description: 'Facilitate the transfer of ownership from one shareholder to another. Includes stamp duty calculation and share certificate issuance.',
    shortDescription: 'Move equity between shareholders.',
    icon: PieChart,
    category: 'Shares',
    estimatedTime: '5-7 Business Days',
    pricing: {
      basic: 300,
      essential: 'Included',
      pro: 'Included',
      govtFee: 200 // Stamping fee base + variable
    },
    complexity: 'High',
    steps: [
      { title: 'Instrument of Transfer', description: 'Executor and beneficiary sign the Instrument of Transfer.' },
      { title: 'Board Approval', description: 'Directors pass a resolution to approve the transfer.' },
      { title: 'Pay Stamp Duty', description: 'Stamp duty must be paid to the tax authority based on share value.' },
      { title: 'Update Electronic Register', description: 'Lodge the transfer with the business registrar.' },
      { title: 'Issue Certificates', description: 'Cancel old share certificates and issue new ones to the transferee.' }
    ],
    requiredDocuments: [
      'Instrument of Transfer',
      'Notice of Transfer',
      'Original Share Certificate (of seller)',
      'Board Resolution approving transfer',
      'Latest Management Accounts (for valuation)'
    ],
    faq: [
      { question: 'Who pays the stamp duty?', answer: 'Usually the buyer (transferee), unless agreed otherwise.' },
      { question: 'How is stamp duty calculated?', answer: 'It is typically a percentage (e.g., 0.2%) of the purchase price or Net Asset Value, whichever is higher.' }
    ]
  },
  {
    id: 'change-address',
    title: 'Change Company Address',
    description: 'Update your registered office address. This is where all official government mail will be sent.',
    shortDescription: 'Update registered office location.',
    icon: MapPin,
    category: 'Operations',
    estimatedTime: '1-2 Business Days',
    pricing: {
      basic: 200,
      essential: 'Included',
      pro: 'Included',
      govtFee: 0
    },
    complexity: 'Low',
    steps: [
      { title: 'Board Resolution', description: 'Directors pass a resolution to approve the change of registered address.' },
      { title: 'Lodge with Registrar', description: 'File the new address with the government authority.' },
      { title: 'Update Letterheads', description: 'Ensure all official company documents and websites reflect the new address.' }
    ],
    requiredDocuments: [
      'Board Resolution in writing',
      'Proof of new address (Tenancy Agreement or Service Office Agreement)'
    ],
    faq: [
      { question: 'Can I use a P.O. Box?', answer: 'No, a P.O. Box cannot be used as a registered office address. It must be a physical location.' }
    ]
  },
  {
    id: 'open-bank-account',
    title: 'Open Corporate Bank Account',
    description: 'Start the process for a new corporate banking relationship. We prepare the corporate secretarial documents required by the bank.',
    shortDescription: 'Setup a new business banking account.',
    icon: Landmark,
    category: 'Operations',
    estimatedTime: '2-4 Weeks',
    pricing: {
      basic: 200,
      essential: 'Included',
      pro: 'Included',
      govtFee: 0
    },
    complexity: 'High',
    steps: [
      { title: 'Select Bank', description: 'Choose a bank that suits your business needs.' },
      { title: 'Board Resolution', description: 'Pass a specific "Opening of Bank Account" resolution required by the bank.' },
      { title: 'Certify Documents', description: 'Company secretary certifies the M&A and Incorporation Certificate.' },
      { title: 'Bank Interview', description: 'Directors and signatories attend a physical or virtual interview with the banker.' }
    ],
    requiredDocuments: [
      'Certified True Copy of M&A/Constitution',
      'Certified True Copy of BizProfile',
      'Director/Signatory IDs',
      'Bank specific application forms',
      'Board Resolution (Bank format)'
    ],
    faq: [
      { question: 'Do all directors need to be present?', answer: 'Most banks require the physical presence of authorized signatories and at least one director.' }
    ]
  },
  {
    id: 'annual-return',
    title: 'File Annual Return',
    description: 'Mandatory annual filing to confirm the company particulars are up to date and submit financial statements if required.',
    shortDescription: 'Submit mandatory annual filings.',
    icon: FileText,
    category: 'Compliance',
    estimatedTime: '3-5 Business Days',
    pricing: {
      basic: 600,
      essential: 'Included',
      pro: 'Included',
      govtFee: 150 // SSM Filing Fee
    },
    complexity: 'Medium',
    steps: [
      { title: 'Prepare AGM Documents', description: 'Draft Notice of AGM and AGM Minutes.' },
      { title: 'Hold AGM', description: 'Conduct Annual General Meeting to present accounts to shareholders.' },
      { title: 'File Return', description: 'Submit the Annual Return to the registrar.' }
    ],
    requiredDocuments: [
      'Financial Statements (Audited or Unaudited)',
      'AGM Minutes',
      'XBRL Filing (if applicable)'
    ],
    faq: [
      { question: 'When is it due?', answer: 'Usually within 6 or 7 months after the Financial Year End.' }
    ]
  },
  {
    id: 'change-name',
    title: 'Change Company Name',
    description: 'Rebrand your legal entity. Requires checking name availability and passing a special resolution.',
    shortDescription: 'Legally rename your business entity.',
    icon: Building2,
    category: 'Governance',
    estimatedTime: '3-4 Business Days',
    pricing: {
      basic: 500,
      essential: 'Included',
      pro: 'Included',
      govtFee: 0
    },
    complexity: 'Medium',
    steps: [
      { title: 'Name Check', description: 'Ensure the new name is available and not trademarked.' },
      { title: 'EGM Resolution', description: 'Hold an Extraordinary General Meeting (EGM) to pass a Special Resolution (usually 75% vote).' },
      { title: 'Lodge with Registrar', description: 'File the Notice of Resolution and Name Change application.' },
      { title: 'Receive Certificate', description: 'Receive Certificate of Incorporation on Change of Name.' }
    ],
    requiredDocuments: [
      'Special Resolution',
      'Notice of EGM',
      'Minutes of EGM'
    ],
    faq: [
      { question: 'Does my UEN change?', answer: 'No, your Unique Entity Number remains the same.' }
    ]
  },
];