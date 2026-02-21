import { Document } from '../types';

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    companyId: 'c1',
    title: 'Board Resolution - Appointment of Director (Sarah Tan)',
    type: 'Resolution',
    fileType: 'PDF',
    uploadDate: '2024-03-10',
    status: 'Pending Signatures',
    isNotarized: false,
    size: '1.2 MB',
    relatedActionId: 'appoint-director',
    signatories: [
      { id: 'u1', name: 'Alex Chen', avatarInitial: 'A', hasSigned: true, signedAt: '2024-03-10T14:30:00', isCurrentUser: true },
      { id: 'u2', name: 'Sarah Tan', avatarInitial: 'S', hasSigned: false, isCurrentUser: false }
    ]
  },
  {
    id: 'doc-2',
    companyId: 'c1',
    title: 'Electronic Register of Directors',
    type: 'Filing',
    fileType: 'PDF',
    uploadDate: '2024-01-15',
    status: 'Completed',
    isNotarized: false,
    size: '450 KB',
    relatedActionId: 'appoint-director',
    signatories: [
      { id: 'u3', name: 'SecSpace Services', avatarInitial: 'S', hasSigned: true, signedAt: '2024-01-15T09:00:00', isCurrentUser: false }
    ]
  },
  {
    id: 'doc-3',
    companyId: 'c1',
    title: 'Shareholders Agreement 2024',
    type: 'Agreement',
    fileType: 'PDF',
    uploadDate: '2024-02-28',
    status: 'Notarized',
    isNotarized: true,
    size: '3.5 MB',
    signatories: [
      { id: 'u1', name: 'Alex Chen', avatarInitial: 'A', hasSigned: true, signedAt: '2024-03-01T10:00:00', isCurrentUser: true },
      { id: 'u2', name: 'Sarah Tan', avatarInitial: 'S', hasSigned: true, signedAt: '2024-03-02T16:45:00', isCurrentUser: false }
    ]
  },
  {
    id: 'doc-4',
    companyId: 'c1',
    title: 'AGM Minutes 2023',
    type: 'Resolution',
    fileType: 'PDF',
    uploadDate: '2023-12-15',
    status: 'Completed',
    isNotarized: false,
    size: '2.1 MB',
    relatedActionId: 'annual-return',
    signatories: [
      { id: 'u1', name: 'Alex Chen', avatarInitial: 'A', hasSigned: true, signedAt: '2023-12-16T11:20:00', isCurrentUser: true }
    ]
  },
  {
    id: 'doc-5',
    companyId: 'c1',
    title: 'Notice of Transfer of Shares',
    type: 'Filing',
    fileType: 'PDF',
    uploadDate: '2024-03-12',
    status: 'Pending Signatures',
    isNotarized: false,
    size: '890 KB',
    relatedActionId: 'transfer-shares',
    signatories: [
      { id: 'u1', name: 'Alex Chen', avatarInitial: 'A', hasSigned: false, isCurrentUser: true },
      { id: 'u2', name: 'Sarah Tan', avatarInitial: 'S', hasSigned: true, signedAt: '2024-03-12T09:15:00', isCurrentUser: false }
    ]
  }
];