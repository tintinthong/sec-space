import React, { useState } from 'react';
import { ArrowRight, Building2, Globe2, Briefcase, CheckCircle2 } from 'lucide-react';
import { Company } from '../types';

interface CreateCompanyProps {
  onComplete: (company: Company) => void;
  onCancel: () => void;
}

export const CreateCompany: React.FC<CreateCompanyProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    entityType: 'Private Limited',
    activity: ''
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = () => {
    // Construct new company object
    const newCompany: Company = {
      id: `c${Date.now()}`,
      name: formData.name,
      country: formData.country,
      entityType: formData.entityType,
      status: 'Pending Incorporation',
      currentPlan: 'Basic', // Default plan for new companies
      fees: [
        {
          id: `f-inc-${Date.now()}`,
          title: 'Incorporation Service',
          description: 'Fee for setting up the new entity.',
          amount: 300,
          currency: 'USD',
          dueDate: new Date().toISOString().split('T')[0],
          status: 'UPCOMING',
          category: 'Service'
        }
      ],
      officers: []
    };
    onComplete(newCompany);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 h-screen flex flex-col justify-center">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between mb-2">
          <span className={`text-sm font-bold ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>Basic Info</span>
          <span className={`text-sm font-bold ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>Jurisdiction</span>
          <span className={`text-sm font-bold ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>Business Activity</span>
          <span className={`text-sm font-bold ${step >= 4 ? 'text-blue-600' : 'text-slate-400'}`}>Review</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-in-out" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Let's start with the basics</h2>
            <p className="text-slate-500 mt-2">What shall we call your new company?</p>
          </div>
          
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Acme Innovations"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Entity Type</label>
              <select 
                value={formData.entityType}
                onChange={(e) => setFormData({...formData, entityType: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Private Limited</option>
                <option>Sole Proprietorship</option>
                <option>Limited Liability Partnership</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Jurisdiction */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe2 size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Where will you be based?</h2>
            <p className="text-slate-500 mt-2">Select the jurisdiction for your incorporation.</p>
          </div>

          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {['Singapore', 'United Kingdom', 'Hong Kong', 'United States'].map((country) => (
              <div 
                key={country}
                onClick={() => setFormData({...formData, country})}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.country === country 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <h3 className="font-bold text-lg text-slate-900">{country}</h3>
                <p className="text-sm text-slate-500 mt-1">Starting from $300</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Activity */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">What does your business do?</h2>
            <p className="text-slate-500 mt-2">Briefly describe your primary business activity.</p>
          </div>

          <div className="max-w-md mx-auto">
             <label className="block text-sm font-medium text-slate-700 mb-1">Business Activity</label>
             <textarea 
                value={formData.activity}
                onChange={(e) => setFormData({...formData, activity: e.target.value})}
                placeholder="e.g. Software development and consulting services..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
             />
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right-8 duration-300">
           <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Ready to Launch?</h2>
            <p className="text-slate-500 mt-2">Review your details before we create your dashboard.</p>
          </div>

          <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <dl className="space-y-4">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <dt className="text-slate-500">Company Name</dt>
                <dd className="font-semibold text-slate-900">{formData.name}</dd>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <dt className="text-slate-500">Jurisdiction</dt>
                <dd className="font-semibold text-slate-900">{formData.country}</dd>
              </div>
               <div className="flex justify-between border-b border-slate-50 pb-2">
                <dt className="text-slate-500">Entity Type</dt>
                <dd className="font-semibold text-slate-900">{formData.entityType}</dd>
              </div>
              <div>
                <dt className="text-slate-500 mb-1">Activity</dt>
                <dd className="font-semibold text-slate-900 text-sm">{formData.activity}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="max-w-4xl mx-auto w-full mt-12 flex justify-between items-center">
        {step > 1 ? (
          <button onClick={handleBack} className="text-slate-500 font-medium hover:text-slate-800 px-6 py-3">
            Back
          </button>
        ) : (
          <button onClick={onCancel} className="text-slate-500 font-medium hover:text-slate-800 px-6 py-3">
            Cancel
          </button>
        )}

        <button 
          onClick={step === 4 ? handleSubmit : handleNext}
          disabled={
            (step === 1 && !formData.name) || 
            (step === 2 && !formData.country) || 
            (step === 3 && !formData.activity)
          }
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 4 ? 'Create Company' : 'Continue'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};