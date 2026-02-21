import React, { useState } from 'react';
import { ArrowLeft, Clock, DollarSign, CheckCircle2, FileText, AlertCircle, Play, Info, ArrowRight, X, Lock, Crown } from 'lucide-react';
import { ActionItem } from '../types';

interface ActionDetailProps {
  action: ActionItem;
  onBack: () => void;
  userPlan?: 'Basic' | 'Essential' | 'Pro'; 
  onStartAction: (formData: any) => void;
  onUpgrade?: () => void;
}

export const ActionDetail: React.FC<ActionDetailProps> = ({ action, onBack, userPlan = 'Basic', onStartAction, onUpgrade }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Determine if user is subscribed (not basic)
  const isSubscribed = userPlan !== 'Basic';

  // Helper to display price based on plan
  const getPriceDisplay = () => {
    if (userPlan === 'Basic') return `RM${action.pricing.basic}`;
    if (userPlan === 'Essential') return action.pricing.essential === 'Included' ? 'Included' : `RM${action.pricing.essential}`;
    return action.pricing.pro === 'Included' ? 'Included' : `RM${action.pricing.pro}`;
  };

  const isIncluded = getPriceDisplay() === 'Included';
  const totalEstimated = typeof action.pricing.basic === 'number' ? action.pricing.basic + action.pricing.govtFee : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartAction(formData);
  };

  const renderFormFields = () => {
    if (action.id === 'appoint-director') {
      return (
        <div className="space-y-4">
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">New Director Name</label>
             <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
               onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
             <input required type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Nationality</label>
             <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={e => setFormData({...formData, nationality: e.target.value})} />
          </div>
        </div>
      );
    } else {
       return (
        <div className="space-y-4">
          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Additional Details</label>
             <textarea required rows={4} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
               placeholder={`Please provide details regarding ${action.title}...`}
               onChange={e => setFormData({...formData, details: e.target.value})} />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Left */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-start gap-6">
              <div className={`p-4 rounded-xl shrink-0 ${
                action.category === 'Governance' ? 'bg-purple-100 text-purple-600' :
                action.category === 'Shares' ? 'bg-indigo-100 text-indigo-600' :
                action.category === 'Compliance' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <action.icon size={40} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-3">{action.title}</h1>
                <p className="text-slate-600 text-lg leading-relaxed">{action.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Time Required</span>
                <span className="text-slate-900 font-medium flex items-center gap-2">
                  <Clock size={16} className="text-blue-500" />
                  {action.estimatedTime}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Your Plan ({userPlan})</span>
                <span className={`font-bold flex items-center gap-2 ${isIncluded ? 'text-green-600' : 'text-slate-900'}`}>
                  {isIncluded ? <CheckCircle2 size={16} /> : null}
                  {getPriceDisplay()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Complexity</span>
                <span className={`font-medium px-2 py-0.5 rounded-full inline-block self-start text-sm ${
                  action.complexity === 'High' ? 'bg-red-50 text-red-600' :
                  action.complexity === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {action.complexity}
                </span>
              </div>
            </div>
          </div>

          {/* Locked State OR Form Toggle */}
          {!isSubscribed ? (
             <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Crown size={32} className="text-amber-400" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2">Subscriber Exclusive Feature</h3>
                    <p className="text-slate-300 text-sm mb-4">
                      Executing complex company secretarial actions is reserved for subscribed customers to ensure full legal compliance and support.
                    </p>
                    <button 
                      onClick={onUpgrade}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto md:mx-0"
                    >
                      Upgrade Plan to Unlock <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                {/* Decorative blob */}
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
             </div>
          ) : isFormOpen ? (
            <div className="bg-white rounded-2xl p-8 border border-blue-200 shadow-md animate-in fade-in zoom-in-95">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-slate-900">Start Action Process</h2>
                 <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                   <X size={20} />
                 </button>
               </div>
               
               <form onSubmit={handleSubmit}>
                 <div className="bg-blue-50 p-4 rounded-xl mb-6 flex gap-3 text-sm text-blue-800">
                   <Info size={20} className="shrink-0" />
                   <p>Please provide the initial details below. We will generate the necessary resolutions and documents for your dashboard immediately after submission.</p>
                 </div>
                 
                 {renderFormFields()}

                 <div className="mt-8 flex justify-end gap-3">
                   <button 
                     type="button" 
                     onClick={() => setIsFormOpen(false)}
                     className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit"
                     className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-200"
                   >
                     Submit & Create Request <ArrowRight size={16} />
                   </button>
                 </div>
               </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-blue-600" /> Action Roadmap
              </h2>
              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-6 before:h-full before:w-0.5 before:bg-slate-100">
                {action.steps.map((step, index) => (
                  <div key={index} className="relative pl-12 pb-8 last:pb-0">
                    <div className="absolute left-3.5 -translate-x-1/2 top-0 w-5 h-5 rounded-full bg-white border-4 border-blue-500 box-content"></div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
           <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="text-amber-500" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {action.faq.map((item, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">{item.question}</h4>
                  <p className="text-slate-600 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar - Right */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Cost Preview Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Cost Breakdown</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Professional Fee ({userPlan})</span>
                <span className={`font-semibold ${isIncluded ? 'text-green-600' : 'text-slate-900'}`}>
                  {getPriceDisplay()}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 flex items-center gap-1">Govt. Fees (SSM) <Info size={12} className="text-slate-400" /></span>
                <span className="font-semibold text-slate-900">
                  {action.pricing.govtFee > 0 ? `RM${action.pricing.govtFee}` : 'Waived/Included'}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                <span className="font-bold text-slate-900">Estimated Total</span>
                <span className="text-xl font-bold text-slate-900">
                  {isIncluded ? `RM${action.pricing.govtFee}` : `RM${totalEstimated}`}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg mb-4">
               {isIncluded 
                 ? "Your current plan covers the professional fees for this action. You only pay government disbursements." 
                 : "Upgrade to Essential or Pro to waive professional fees for this action."}
            </div>
            
            {!isFormOpen && (
              <button 
                onClick={() => isSubscribed ? setIsFormOpen(true) : onUpgrade && onUpgrade()}
                className={`w-full font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg ${
                  isSubscribed 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' 
                    : 'bg-slate-800 text-white hover:bg-slate-900 shadow-slate-300'
                }`}
              >
                {isSubscribed ? (
                  <><Play size={18} fill="currentColor" /> Start Process</>
                ) : (
                   <><Lock size={18} /> Unlock Action</>
                )}
              </button>
            )}
          </div>

          {/* Documents Required */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="text-slate-500" /> Required Documents
            </h3>
            <ul className="space-y-3">
              {action.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="min-w-[4px] h-[4px] rounded-full bg-blue-500 mt-2"></div>
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};