import React from 'react';
import { ActionRequest, ActionItem } from '../types';
import { SECRETARIAL_ACTIONS } from '../data/actions';
import { Clock, CheckCircle2, AlertCircle, ArrowRight, Loader2, CreditCard } from 'lucide-react';

interface MyActionsProps {
  actionRequests: ActionRequest[];
  onOpenActionDrawer: (request: ActionRequest) => void;
}

export const MyActions: React.FC<MyActionsProps> = ({ actionRequests, onOpenActionDrawer }) => {
  const getActionDetails = (id: string): ActionItem | undefined => {
    return SECRETARIAL_ACTIONS.find(a => a.id === id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending Payment': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 size={16} />;
      case 'In Progress': return <Loader2 size={16} className="animate-spin" />;
      case 'Pending Payment': return <CreditCard size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const sortedRequests = [...actionRequests].sort((a, b) => 
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">My Actions</h1>
        <p className="text-slate-500">Track the status of your company secretarial requests.</p>
      </header>

      {sortedRequests.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Clock size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">No actions yet</h3>
          <p className="text-slate-500">Start a new process from the Dashboard to see it here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedRequests.map(req => {
            const action = getActionDetails(req.actionId);
            if (!action) return null;

            return (
              <div 
                key={req.id} 
                onClick={() => onOpenActionDrawer(req)}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg shrink-0 ${
                      action.category === 'Governance' ? 'bg-purple-100 text-purple-600' :
                      action.category === 'Shares' ? 'bg-indigo-100 text-indigo-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <action.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{action.title}</h3>
                      <p className="text-sm text-slate-500">Submitted on {new Date(req.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${getStatusColor(req.status)}`}>
                      {getStatusIcon(req.status)}
                      {req.status}
                    </div>
                    <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};