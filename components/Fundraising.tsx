import React, { useState } from 'react';
import { TrendingUp, CheckCircle, Zap, AlertCircle, Search, Filter, ArrowRight, X, Lock, Crown } from 'lucide-react';
import { Company, Grant } from '../types';
import { AVAILABLE_GRANTS } from '../data/fundraising';

interface FundraisingProps {
  company: Company;
  onUpgrade?: () => void;
}

export const Fundraising: React.FC<FundraisingProps> = ({ company, onUpgrade }) => {
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [applicationStep, setApplicationStep] = useState<'info' | 'form' | 'success'>('info');

  const isSubscribed = company.currentPlan !== 'Basic';

  const handleApplyClick = (grant: Grant) => {
    if (!isSubscribed) {
      setShowGate(true);
      return;
    }
    setSelectedGrant(grant);
    setIsApplying(true);
    setApplicationStep('info');
  };

  const handleConfirmApply = () => {
    if (selectedGrant?.requiresCustomInfo) {
      setApplicationStep('form');
    } else {
      setApplicationStep('success');
    }
  };

  const handleSubmitCustomForm = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationStep('success');
  };

  const closeApplication = () => {
    setIsApplying(false);
    setSelectedGrant(null);
    setApplicationStep('info');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen relative">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-100 p-2 rounded-lg text-green-700">
             <TrendingUp size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Fundraising & Grants</h1>
        </div>
        <p className="text-slate-500 max-w-3xl">
          Apply for government grants and financing with pre-filled company data.
        </p>
      </header>

      {/* Grant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AVAILABLE_GRANTS.map(grant => (
          <div key={grant.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-lg transition-all group relative overflow-hidden">
            {/* Locked Overlay for visual flair if not subscribed */}
            {!isSubscribed && (
              <div className="absolute top-0 right-0 p-3 z-10">
                <div className="bg-slate-100 p-2 rounded-full text-slate-400">
                  <Lock size={16} />
                </div>
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                {grant.category}
              </span>
              <div className="flex items-center gap-1 text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">
                {grant.matchScore}% Match
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{grant.title}</h3>
            <p className="text-xs text-slate-400 font-semibold mb-3">{grant.provider}</p>
            
            <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">
              {grant.description}
            </p>

            <div className="border-t border-slate-100 pt-4 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-500 text-xs font-medium">Grant Amount</span>
                <span className="text-slate-900 font-bold">{grant.amount}</span>
              </div>
              
              <button 
                onClick={() => handleApplyClick(grant)}
                className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  !isSubscribed 
                    ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                    : grant.requiresCustomInfo 
                      ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200'
                }`}
              >
                {!isSubscribed ? (
                  <>
                    <Lock size={16} /> Unlock Grant
                  </>
                ) : (
                  <>
                    {!grant.requiresCustomInfo && <Zap size={16} fill="currentColor" />}
                    {grant.requiresCustomInfo ? 'View & Apply' : 'One-Click Apply'}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Gate Modal */}
      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Crown size={32} fill="currentColor" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Unlock Government Grants</h2>
            <p className="text-slate-600 mb-8">
              Subscribe to our <strong>Essential</strong> or <strong>Pro</strong> plan to access the full grant database and use our one-click application tools.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => {
                  setShowGate(false);
                  if (onUpgrade) onUpgrade();
                }}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                View Subscription Plans <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => setShowGate(false)}
                className="w-full text-slate-500 font-medium py-2 rounded-lg hover:text-slate-800"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal (Only for subscribed users) */}
      {isApplying && selectedGrant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{selectedGrant.title}</h2>
                <p className="text-sm text-slate-500">{selectedGrant.provider}</p>
              </div>
              <button onClick={closeApplication} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto">
              
              {applicationStep === 'info' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-xl flex gap-4 items-start">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0">
                      <Zap size={20} fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800 text-sm">Fast-Track Application</h4>
                      <p className="text-blue-600 text-sm mt-1">
                        We will automatically attach your Company Profile (UEN: {company.uen}), Financial Statements, and Directors' particulars to this application.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">About this Grant</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{selectedGrant.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-slate-200 rounded-xl">
                      <span className="text-xs text-slate-500 font-bold uppercase">Grant Amount</span>
                      <p className="font-bold text-slate-900 text-lg mt-1">{selectedGrant.amount}</p>
                    </div>
                     <div className="p-4 border border-slate-200 rounded-xl">
                      <span className="text-xs text-slate-500 font-bold uppercase">Processing Time</span>
                      <p className="font-bold text-slate-900 text-lg mt-1">4-6 Weeks</p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      onClick={handleConfirmApply}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2"
                    >
                      {selectedGrant.requiresCustomInfo ? 'Continue to Form' : 'Confirm & Submit'} <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {applicationStep === 'form' && (
                <form onSubmit={handleSubmitCustomForm} className="space-y-6">
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg text-sm mb-4">
                    <AlertCircle size={16} />
                    <span>This grant requires specific project details not in your profile.</span>
                  </div>

                  {selectedGrant.customFields?.map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-slate-700 mb-1">{field.label}</label>
                      <input 
                        required
                        type={field.type === 'currency' || field.type === 'number' ? 'number' : 'text'}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder={field.type === 'currency' ? 'e.g. 5000' : ''}
                      />
                    </div>
                  ))}

                  <div className="flex justify-end pt-4 gap-3">
                    <button 
                      type="button"
                      onClick={() => setApplicationStep('info')}
                      className="text-slate-600 font-medium px-4 py-2 hover:bg-slate-50 rounded-lg"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}

              {applicationStep === 'success' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
                  <p className="text-slate-500 max-w-sm mx-auto mb-8">
                    We have successfully lodged your application for {selectedGrant.title}. You can track the status in your dashboard.
                  </p>
                  <button 
                    onClick={closeApplication}
                    className="bg-slate-100 text-slate-700 font-bold px-6 py-3 rounded-xl hover:bg-slate-200"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};