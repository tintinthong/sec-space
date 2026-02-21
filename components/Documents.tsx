import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  MoreVertical, 
  Check, 
  Clock, 
  PenTool, 
  Stamp, 
  ShieldCheck,
  FileCheck,
  FolderOpen,
  Link as LinkIcon
} from 'lucide-react';
import { Company, Document } from '../types';
import { MOCK_DOCUMENTS } from '../data/documents';
import { SECRETARIAL_ACTIONS } from '../data/actions';

interface DocumentsProps {
  company: Company;
}

export const Documents: React.FC<DocumentsProps> = ({ company }) => {
  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS.filter(d => d.companyId === company.id));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Completed' | 'Notarized'>('All');

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' 
      ? true 
      : filterStatus === 'Pending' 
        ? doc.status === 'Pending Signatures'
        : doc.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getActionName = (actionId?: string) => {
    if (!actionId) return null;
    const action = SECRETARIAL_ACTIONS.find(a => a.id === actionId);
    return action ? action.title : null;
  };

  const handleSignDocument = (docId: string) => {
    // Simulate signing process
    setDocuments(prevDocs => prevDocs.map(doc => {
      if (doc.id !== docId) return doc;
      
      const updatedSignatories = doc.signatories.map(s => 
        s.isCurrentUser ? { ...s, hasSigned: true, signedAt: new Date().toISOString() } : s
      );
      
      const allSigned = updatedSignatories.every(s => s.hasSigned);
      
      return {
        ...doc,
        signatories: updatedSignatories,
        status: allSigned ? 'Completed' : 'Pending Signatures'
      };
    }));
  };

  const handleNotarize = (docId: string) => {
    if (window.confirm("Request Notarization for this document? A fee of RM80 will be charged to the company account.")) {
       setDocuments(prevDocs => prevDocs.map(doc => {
        if (doc.id !== docId) return doc;
        return {
          ...doc,
          isNotarized: true,
          status: 'Notarized'
        };
      }));
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Documents</h1>
          <p className="text-slate-500">Securely manage, sign, and notarize your legal company documents.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors">
          <FolderOpen size={18} /> Upload Document
        </button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          {(['All', 'Pending', 'Completed', 'Notarized'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                filterStatus === status 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex-1 overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-4 pl-2">Document Name</div>
          <div className="col-span-3">Related Action</div>
          <div className="col-span-2">Signatories</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* List Items */}
        <div className="overflow-y-auto flex-1">
          {filteredDocs.length > 0 ? (
            filteredDocs.map(doc => {
              const currentUserSignatory = doc.signatories.find(s => s.isCurrentUser);
              const needsMySignature = currentUserSignatory && !currentUserSignatory.hasSigned;
              const relatedActionName = getActionName(doc.relatedActionId);

              return (
                <div key={doc.id} className="grid grid-cols-12 gap-4 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors items-center group">
                  
                  {/* Name & Icon */}
                  <div className="col-span-4 flex items-start gap-4 pl-2">
                    <div className={`p-2.5 rounded-lg shrink-0 ${
                      doc.isNotarized ? 'bg-amber-100 text-amber-600' : 
                      doc.type === 'Resolution' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {doc.isNotarized ? <Stamp size={20} /> : <FileText size={20} />}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 leading-tight mb-1">{doc.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">{doc.fileType}</span>
                        <span>•</span>
                        <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                        {doc.isNotarized && (
                          <>
                            <span>•</span>
                            <span className="text-amber-600 flex items-center gap-1 font-medium"><ShieldCheck size={10} /> Notarized</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Related Action Context */}
                  <div className="col-span-3">
                    {relatedActionName ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                        <LinkIcon size={10} />
                        {relatedActionName}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">General Document</span>
                    )}
                  </div>

                  {/* Signatories Tracking */}
                  <div className="col-span-2 flex items-center -space-x-2">
                    {doc.signatories.map(sig => (
                      <div key={sig.id} className="relative group/avatar cursor-help">
                        <div className={`
                          w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold
                          ${sig.hasSigned 
                            ? 'bg-green-100 text-green-700 ring-1 ring-green-200' 
                            : 'bg-slate-100 text-slate-400 ring-1 ring-slate-200'}
                        `}>
                          {sig.hasSigned ? <Check size={12} strokeWidth={3} /> : sig.avatarInitial}
                        </div>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          {sig.name} - {sig.hasSigned ? 'Signed' : 'Pending'}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      doc.status === 'Completed' ? 'bg-green-50 text-green-700' :
                      doc.status === 'Notarized' ? 'bg-amber-50 text-amber-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {doc.status === 'Completed' && <FileCheck size={12} />}
                      {doc.status === 'Notarized' && <Stamp size={12} />}
                      {doc.status === 'Pending Signatures' && <Clock size={12} />}
                      {doc.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 text-right flex justify-end gap-2">
                    {needsMySignature ? (
                      <button 
                        onClick={() => handleSignDocument(doc.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors animate-pulse"
                      >
                        <PenTool size={12} /> Sign
                      </button>
                    ) : (
                      <button className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download size={18} />
                      </button>
                    )}
                    
                    <div className="relative group/menu">
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                      
                      {/* Context Menu (Hover based for simplicity) */}
                      <div className="hidden group-hover/menu:block absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-20 overflow-hidden">
                        {!doc.isNotarized && doc.status === 'Completed' && (
                          <button 
                            onClick={() => handleNotarize(doc.id)}
                            className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Stamp size={14} className="text-amber-500"/> Notarize (RM80)
                          </button>
                        )}
                        <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                          <Download size={14} /> Download PDF
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
             <div className="flex flex-col items-center justify-center h-64 text-slate-400">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                 <FileText size={32} className="opacity-50" />
               </div>
               <p>No documents found matching your filters.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};