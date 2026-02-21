import { LucideIcon } from 'lucide-react';

export type PlanType = 'Basic' | 'Essential' | 'Pro';

export interface ActionStep {
  title: string;
  description: string;
  duration?: string;
}

export interface ActionFeeStructure {
  basic: number; // Fee for Basic plan users
  essential: number | 'Included'; // Fee for Essential plan users
  pro: number | 'Included'; // Fee for Pro plan users
  govtFee: number; // External fees (SSM, Stamping)
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: LucideIcon;
  category: 'Governance' | 'Shares' | 'Operations' | 'Compliance';
  estimatedTime: string;
  pricing: ActionFeeStructure; // Replaces estimatedCost string
  complexity: 'Low' | 'Medium' | 'High';
  steps: ActionStep[];
  requiredDocuments: string[];
  faq: { question: string; answer: string }[];
}

export interface FeeItem {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'PAID' | 'UPCOMING' | 'OVERDUE';
  category: 'Government' | 'Service' | 'One-off';
}

export interface Officer {
  id: string;
  name: string;
  role: 'Director' | 'Shareholder' | 'Secretary';
  email: string;
  isSignatory: boolean;
  shares?: number; // Optional, for shareholders
  avatarInitial?: string;
  isCurrentUser?: boolean;
  nationality?: string;
  phone?: string;
}

export interface Company {
  id: string;
  name: string;
  uen?: string;
  country: string;
  entityType: string;
  status: 'Active' | 'Pending Incorporation';
  currentPlan: PlanType;
  incorporationDate?: string;
  fees: FeeItem[];
  officers: Officer[];
  // Extended Profile Fields
  description?: string;
  industry?: string; // SSIC/MSIC Code or text
  website?: string;
  employeeCount?: number;
  financialYearEnd?: string;
  registeredAddress?: string;
  // New Fields
  taxRefNo?: string;
  mainBank?: string;
  bankAccountNumber?: string;
  companyEmail?: string;
  companyPhone?: string;
}

export interface Signatory {
  id: string;
  name: string;
  avatarInitial: string;
  hasSigned: boolean;
  signedAt?: string;
  isCurrentUser: boolean;
}

export interface Document {
  id: string;
  companyId: string;
  title: string;
  type: 'Resolution' | 'Agreement' | 'Certificate' | 'Filing' | 'Other';
  fileType: 'PDF' | 'DOCX';
  uploadDate: string;
  status: 'Pending Signatures' | 'Completed' | 'Notarized';
  signatories: Signatory[];
  isNotarized: boolean;
  size: string;
  relatedActionId?: string; // Link to specific action
}

export interface Grant {
  id: string;
  title: string;
  provider: string;
  amount: string;
  description: string;
  category: 'Digitalisation' | 'Hiring' | 'Innovation' | 'Market Expansion';
  matchScore: number; // 0-100
  deadline?: string;
  requiresCustomInfo: boolean;
  customFields?: { label: string; type: 'text' | 'number' | 'currency' }[];
  status?: 'Available' | 'Applied' | 'Approved';
}

export type ActionRequestStatus = 'Pending Information' | 'Pending Payment' | 'In Progress' | 'Completed' | 'Cancelled';

export interface ActionRequest {
  id: string;
  actionId: string; // References ActionItem.id
  companyId: string;
  status: ActionRequestStatus;
  submittedAt: string;
  lastUpdated: string;
  formData: Record<string, any>; // Stores the user input from the form
  documents?: Document[]; // Documents generated for this action
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  ACTION_DETAIL = 'ACTION_DETAIL',
  MY_ACTIONS = 'MY_ACTIONS',
  AI_ASSISTANT = 'AI_ASSISTANT',
  COMPANY_PROFILE = 'COMPANY_PROFILE',
  CREATE_COMPANY = 'CREATE_COMPANY',
  FEE_TIMELINE = 'FEE_TIMELINE',
  BILLING = 'BILLING',
  DOCUMENTS = 'DOCUMENTS',
  SETTINGS = 'SETTINGS',
  FUNDRAISING = 'FUNDRAISING'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}