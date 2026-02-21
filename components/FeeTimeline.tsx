import React from 'react';
import { Company, FeeItem } from '../types';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface FeeTimelineProps {
  company: Company;
}

export const FeeTimeline: React.FC<FeeTimelineProps> = ({ company }) => {
  // Sort fees by date
  const sortedFees = [...company.fees].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  const getStatusColor = (status: FeeItem['status']) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-700 border-green-200';
      case 'UPCOMING': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'OVERDUE': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: FeeItem['status']) => {
    switch (status) {
      case 'PAID': return <Check size={14} className="stroke-[3]" />;
      case 'UPCOMING': return <Clock size={14} className="stroke-[3]" />;
      case 'OVERDUE': return <AlertCircle size={14} className="stroke-[3]" />;
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Fee Timeline</h1>
        <p className="text-slate-500">Transparent roadmap of your past and upcoming company payments.</p>
      </header>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>

        <div className="space-y-8">
          {sortedFees.map((fee, index) => {
            const date = new Date(fee.dueDate);
            const isPast = date < new Date() && fee.status === 'PAID';

            return (
              <div key={fee.id} className="relative flex gap-8 group">
                {/* Timeline Node */}
                <div className={`
                  relative z-10 w-16 h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 border-4 transition-colors
                  ${isPast ? 'bg-white border-slate-200 text-slate-400' : 'bg-white border-blue-100 text-slate-900 shadow-sm'}
                  ${fee.status === 'OVERDUE' ? '!border-red-100' : ''}
                `}>
                  <span className="text-xs font-bold uppercase">{date.toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-lg font-bold">{date.getDate()}</span>
                  <span className="text-xs text-slate-400">{date.getFullYear()}</span>
                </div>

                {/* Content Card */}
                <div className="flex-1">
                  <div className={`
                    p-6 rounded-2xl border transition-all hover:shadow-md
                    ${fee.status === 'PAID' ? 'bg-slate-50 border-slate-200 opacity-75 grayscale-[0.5] hover:grayscale-0 hover:opacity-100' : 'bg-white border-slate-200'}
                    ${fee.status === 'OVERDUE' ? 'border-red-300 bg-red-50/10' : ''}
                  `}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-3 items-center">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border flex items-center gap-1.5 ${getStatusColor(fee.status)}`}>
                          {getStatusIcon(fee.status)}
                          {fee.status}
                        </span>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{fee.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-lg font-bold text-slate-900">{fee.currency} {fee.amount.toFixed(2)}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1">{fee.title}</h3>
                    <p className="text-slate-600 text-sm">{fee.description}</p>
                    
                    {fee.status !== 'PAID' && (
                      <button className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        Pay Now <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">&gt;</div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Projection Note */}
      <div className="mt-12 p-4 bg-blue-50 text-blue-800 rounded-xl text-center text-sm border border-blue-100">
        Fees are projected based on current regulatory requirements and your subscription plan. Prices subject to change.
      </div>
    </div>
  );
};