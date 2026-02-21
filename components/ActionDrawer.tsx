import React from 'react';
import { X, CheckCircle2, FileText, Download, Clock, CreditCard } from 'lucide-react';
import { ActionRequest, ActionItem } from '../types';
import { SECRETARIAL_ACTIONS } from '../data/actions';
import { MOCK_DOCUMENTS } from '../data/documents';

interface ActionDrawerProps {
  request: ActionRequest | null;
  onClose: () => void;
}

export const ActionDrawer: React.FC<ActionDrawerProps> = ({ request, onClose }) => {
  if (!request) return null;

  const actionDetails = SECRETARIAL_ACTIONS.find(a => a.id === request.actionId);
  // In a real app, documents would be fetched based on request ID. 
  // Here we mock finding documents related to the action type or generic ones.
  const relatedDocs = MOCK_DOCUMENTS.filter(d => d.relatedActionId === request.actionId);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{actionDetails?.title}</h2>
            <p className="text-sm text-slate-500 mt-1">Ref: #{request.id.slice(-6).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Status Tracker */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Status Timeline</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:h-full before:w-0.5 before:bg-slate-200">
              
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-sm flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm">Action Submitted</h4>
                <p className="text-xs text-slate-500 mt-1">{new Date(request.submittedAt).toLocaleString()}</p>
              </div>

              {request.status !== 'Pending Information' && (
                <div className="relative pl-8">
                   <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                   <h4 className="font-semibold text-slate-900 text-sm">Processing</h4>
                   <p className="text-xs text-slate-500 mt-1">Resolutions generated.</p>
                </div>
              )}
            </div>
          </div>

          {/* Submission Data */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Submission Details</h3>
            <dl className="grid grid-cols-1 gap-y-3">
              {Object.entries(request.formData).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs text-slate-500 uppercase">{key}</dt>
                  <dd className="text-sm font-medium text-slate-900 break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Documents */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Documents</h3>
            {relatedDocs.length > 0 ? (
              <div className="space-y-3">
                {relatedDocs.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-blue-300 transition-colors group">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-medium text-slate-900 truncate">{doc.title}</p>
                        <p className="text-xs text-slate-500">{doc.status}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-600 p-2">
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl">
                 <p className="text-sm text-slate-400">Documents are being generated...</p>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50">
           {request.status === 'Pending Payment' && (
             <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2">
               <CreditCard size={18} /> Make Payment
             </button>
           )}
           {request.status === 'In Progress' && (
             <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
               <Clock size={18} /> Awaiting Completion
             </button>
           )}
        </div>
      </div>
    </div>
  );
};