import React, { useState } from 'react';
import { Building, MapPin, Users, Calendar, Hash, Mail, ShieldCheck, PenTool, Plus, Globe, Briefcase, AlertTriangle, CheckCircle2, Phone, Landmark, Receipt, Edit2, Wallet, Save, X, Crown, ArrowRight } from 'lucide-react';
import { Company } from '../types';

interface CompanyProfileProps {
  company: Company;
  onInviteDirector: () => void;
  onUpdateCompany: (updatedCompany: Company) => void;
  onUpgrade?: () => void;
}

export const CompanyProfile: React.FC<CompanyProfileProps> = ({ company, onInviteDirector, onUpdateCompany, onUpgrade }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Company>(company);
  
  const directors = company.officers.filter(o => o.role === 'Director');
  const shareholders = company.officers.filter(o => (o.shares || 0) > 0);
  const isBasicPlan = company.currentPlan === 'Basic';

  // Sync formData if company prop changes externally
  React.useEffect(() => {
    if (!isEditing) {
      setFormData(company);
    }
  }, [company, isEditing]);

  const handleSave = () => {
    onUpdateCompany(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(company);
    setIsEditing(false);
  };

  const handleChange = (field: keyof Company, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate Profile Completeness (Using formData so visuals update in real-time)
  const requiredFields = [
    { key: 'uen', label: 'UEN / Reg Number' },
    { key: 'incorporationDate', label: 'Incorporation Date' },
    { key: 'registeredAddress', label: 'Registered Address' },
    { key: 'industry', label: 'Industry Code' },
    { key: 'description', label: 'Business Description' },
    { key: 'website', label: 'Website' },
    { key: 'companyEmail', label: 'Contact Email' },
    { key: 'companyPhone', label: 'Contact Phone' },
    { key: 'financialYearEnd', label: 'Financial Year End' },
    { key: 'taxRefNo', label: 'Tax Reference No' },
    { key: 'mainBank', label: 'Corporate Bank' },
  ];

  const filledFields = requiredFields.filter(f => {
    const val = formData[f.key as keyof Company];
    return val !== undefined && val !== '';
  });
  
  const completionPercentage = Math.round((filledFields.length / requiredFields.length) * 100);
  const missingFields = requiredFields.filter(f => !filledFields.includes(f));

  const getStrengthMeta = (pct: number) => {
    if (pct === 100) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-50', ring: 'text-green-500', stroke: 'text-green-500' };
    if (pct > 70) return { label: 'Strong', color: 'text-blue-600', bg: 'bg-blue-50', ring: 'text-blue-500', stroke: 'text-blue-500' };
    if (pct > 40) return { label: 'Good', color: 'text-amber-600', bg: 'bg-amber-50', ring: 'text-amber-500', stroke: 'text-amber-500' };
    return { label: 'Weak', color: 'text-red-600', bg: 'bg-red-50', ring: 'text-red-500', stroke: 'text-red-500' };
  };

  const strength = getStrengthMeta(completionPercentage);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Company Profile</h1>
          <p className="text-slate-500">Manage your official entity information.</p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={handleCancel}
                className="bg-white border border-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
              <button 
                onClick={handleSave}
                className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-sm flex items-center gap-2"
              >
                <Save size={16} /> Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-white border border-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Corporate Data */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Identity & Basic Info */}
          <div className={`bg-white rounded-2xl border transition-colors overflow-hidden shadow-sm ${isEditing ? 'border-blue-300 ring-4 ring-blue-50/50' : 'border-slate-200'}`}>
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Building size={20} className="text-slate-500"/> Corporate Identity
              </h3>
              <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${formData.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {formData.status}
              </span>
            </div>
            
            <div className="p-8">
              <div className="flex gap-6 items-start mb-8">
                 <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shrink-0 shadow-lg shadow-blue-100">
                  {formData.name.charAt(0)}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="mb-2">
                       <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Company Name</label>
                       <input 
                         type="text" 
                         value={formData.name}
                         onChange={(e) => handleChange('name', e.target.value)}
                         className="text-xl font-bold text-slate-900 w-full border-b border-slate-300 focus:border-blue-500 focus:outline-none py-1 bg-transparent"
                       />
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{formData.name}</h2>
                  )}
                  
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-500 text-sm bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">{formData.entityType}</span>
                    <span className="text-slate-500 text-sm bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">{formData.country}</span>
                    
                    {/* Subscription Badge */}
                    <div className="ml-auto flex items-center gap-2">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                        isBasicPlan 
                          ? 'bg-slate-100 text-slate-600 border-slate-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                         {isBasicPlan ? null : <Crown size={12} className="fill-amber-500 text-amber-600" />}
                         {formData.currentPlan} Plan
                      </div>
                      {isBasicPlan && onUpgrade && (
                        <button 
                          onClick={onUpgrade}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
                        >
                          Upgrade <ArrowRight size={10} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Hash size={12} /> UEN / Reg Number
                  </span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.uen || ''} 
                      onChange={(e) => handleChange('uen', e.target.value)}
                      className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">{formData.uen || <span className="text-red-400 text-sm italic flex items-center gap-1"><AlertTriangle size={12}/> Required</span>}</p>
                  )}
                </div>
                 <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <Calendar size={12} /> Incorporation Date
                  </span>
                  {isEditing ? (
                    <input 
                      type="date" 
                      value={formData.incorporationDate || ''} 
                      onChange={(e) => handleChange('incorporationDate', e.target.value)}
                      className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">{formData.incorporationDate || <span className="text-slate-400 italic">Not set</span>}</p>
                  )}
                </div>
                 <div className="space-y-1 md:col-span-2">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                    <MapPin size={12} /> Registered Address
                  </span>
                  {isEditing ? (
                    <textarea 
                      value={formData.registeredAddress || ''} 
                      onChange={(e) => handleChange('registeredAddress', e.target.value)}
                      rows={2}
                      className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  ) : (
                    <p className="text-slate-900 font-medium">{formData.registeredAddress || <span className="text-red-400 text-sm italic flex items-center gap-1"><AlertTriangle size={12}/> Required</span>}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Business & Contact */}
          <div className={`bg-white rounded-2xl border transition-colors shadow-sm overflow-hidden ${isEditing ? 'border-blue-300 ring-4 ring-blue-50/50' : 'border-slate-200'}`}>
             <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase size={20} className="text-slate-500"/> Business Details
                </h3>
             </div>

             <div className="p-8 space-y-6">
               <div>
                  <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Description</span>
                  {isEditing ? (
                    <textarea 
                      value={formData.description || ''} 
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={3}
                      className="w-full border border-slate-200 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Describe your business activity..."
                    />
                  ) : (
                    <p className="text-slate-700 leading-relaxed">
                      {formData.description || <span className="text-slate-400 italic">No description provided. Add one to help with grant matching.</span>}
                    </p>
                  )}
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Industry Code (SSIC)</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={formData.industry || ''} 
                        onChange={(e) => handleChange('industry', e.target.value)}
                        className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="font-medium text-slate-900">{formData.industry || <span className="text-red-400 text-sm italic flex items-center gap-1"><AlertTriangle size={12}/> Required for grants</span>}</p>
                    )}
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Website</span>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={formData.website || ''} 
                        onChange={(e) => handleChange('website', e.target.value)}
                        className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="https://..."
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                         <Globe size={14} className="text-slate-400"/>
                         {formData.website ? 
                           <a href={formData.website} target="_blank" rel="noreferrer" className="font-medium text-blue-600 hover:underline">{formData.website}</a> : 
                           <span className="text-slate-400 italic text-sm">Not provided</span>
                         }
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Company Email</span>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={formData.companyEmail || ''} 
                        onChange={(e) => handleChange('companyEmail', e.target.value)}
                        className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400"/>
                        <span className="font-medium text-slate-900">{formData.companyEmail || <span className="text-slate-400 italic text-sm">--</span>}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Company Phone</span>
                     {isEditing ? (
                      <input 
                        type="tel" 
                        value={formData.companyPhone || ''} 
                        onChange={(e) => handleChange('companyPhone', e.target.value)}
                        className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400"/>
                        <span className="font-medium text-slate-900">{formData.companyPhone || <span className="text-slate-400 italic text-sm">--</span>}</span>
                      </div>
                    )}
                  </div>
               </div>
             </div>
          </div>

          {/* Financial & Tax */}
          <div className={`bg-white rounded-2xl border transition-colors shadow-sm overflow-hidden ${isEditing ? 'border-blue-300 ring-4 ring-blue-50/50' : 'border-slate-200'}`}>
             <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Landmark size={20} className="text-slate-500"/> Financial & Tax
                </h3>
             </div>
             <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                   <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                      <Calendar size={12} /> Financial Year End
                   </span>
                   {isEditing ? (
                      <input 
                        type="text" 
                        value={formData.financialYearEnd || ''} 
                        onChange={(e) => handleChange('financialYearEnd', e.target.value)}
                        placeholder="e.g. 31 Dec"
                        className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="font-medium text-slate-900">{formData.financialYearEnd || '31 Dec'}</p>
                    )}
                </div>
                <div>
                   <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                      <Receipt size={12} /> Tax Ref No.
                   </span>
                   {isEditing ? (
                      <input 
                        type="text" 
                        value={formData.taxRefNo || ''} 
                        onChange={(e) => handleChange('taxRefNo', e.target.value)}
                        className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="font-medium text-slate-900">{formData.taxRefNo || <span className="text-slate-400 italic">Not set</span>}</p>
                    )}
                </div>
                 <div>
                   <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5 mb-1">
                      <Wallet size={12} /> Primary Bank
                   </span>
                   {isEditing ? (
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          value={formData.mainBank || ''} 
                          onChange={(e) => handleChange('mainBank', e.target.value)}
                          placeholder="Bank Name"
                          className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                        />
                         <input 
                          type="text" 
                          value={formData.bankAccountNumber || ''} 
                          onChange={(e) => handleChange('bankAccountNumber', e.target.value)}
                          placeholder="Account No."
                          className="w-full border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="font-medium text-slate-900">{formData.mainBank || <span className="text-slate-400 italic">Not set</span>}</p>
                        {formData.bankAccountNumber && <p className="text-xs text-slate-500 mt-0.5">{formData.bankAccountNumber}</p>}
                      </>
                    )}
                </div>
             </div>
          </div>

        </div>

        {/* Right Column: Strength & People */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Profile Strength Card - Always Visible */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col items-center text-center">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Profile Strength</h3>
               
               <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className={`${strength.stroke} transition-all duration-1000 ease-out`} strokeDasharray={`${completionPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${strength.color}`}>{completionPercentage}%</span>
                  </div>
               </div>

               <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${strength.bg} ${strength.color}`}>
                 {strength.label}
               </div>

               {missingFields.length > 0 ? (
                 <div className="w-full text-left bg-slate-50 p-4 rounded-xl">
                   <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">Missing Information:</p>
                   <ul className="space-y-1">
                     {missingFields.slice(0, 3).map(f => (
                       <li key={f.key} className="text-sm text-red-500 flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div> {f.label}
                       </li>
                     ))}
                     {missingFields.length > 3 && (
                       <li className="text-xs text-slate-400 pl-3.5">+ {missingFields.length - 3} more fields</li>
                     )}
                   </ul>
                   {!isEditing && (
                     <button 
                       onClick={() => setIsEditing(true)}
                       className="w-full mt-4 bg-blue-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-blue-700"
                     >
                       Complete Profile
                     </button>
                   )}
                 </div>
               ) : (
                 <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-xl w-full justify-center">
                   <CheckCircle2 size={16} />
                   <span className="font-medium text-sm">Profile Complete!</span>
                 </div>
               )}
            </div>
            
            <div className="bg-blue-50/50 p-4 border-t border-slate-100 text-center">
               <p className="text-xs text-blue-600">
                 Complete profiles have a <strong>3x higher chance</strong> of grant approval.
               </p>
            </div>
          </div>

           {/* Officers / Directors */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Users size={18} className="text-indigo-500"/> Directors
              </h3>
              <button 
                onClick={onInviteDirector}
                className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-100 flex items-center gap-1 transition-colors"
              >
                <Plus size={14} /> Invite
              </button>
            </div>
            
            <ul className="space-y-4">
              {directors.map(officer => (
                <li key={officer.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                  <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                    {officer.avatarInitial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-slate-900 font-bold text-sm truncate block">{officer.name}</span>
                      {officer.isSignatory && <PenTool size={12} className="text-blue-500 shrink-0 mt-1" />}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{officer.email}</div>
                    <div className="flex gap-2 mt-1">
                       {officer.nationality && <span className="text-[10px] bg-slate-100 px-1.5 rounded text-slate-500">{officer.nationality}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Shareholders */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Building size={18} className="text-amber-500"/> Shareholders
            </h3>
             <ul className="space-y-3">
               {shareholders.map(officer => (
                <li key={`sh-${officer.id}`} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center font-bold text-xs">
                      {officer.avatarInitial}
                    </div>
                    <span className="text-slate-900 font-medium text-sm">{officer.name}</span>
                  </div>
                  <span className="text-slate-700 font-bold text-sm">{officer.shares?.toLocaleString()}</span>
                </li>
               ))}
               <li className="pt-2 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-500 uppercase">
                 <span>Total Shares</span>
                 <span>{shareholders.reduce((acc, curr) => acc + (curr.shares || 0), 0).toLocaleString()}</span>
               </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};