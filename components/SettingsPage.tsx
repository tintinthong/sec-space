import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Calendar, FileSignature, Receipt, ShieldAlert, Check, Save } from 'lucide-react';
import { Company } from '../types';

interface SettingsPageProps {
  company: Company;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ElementType;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ company }) => {
  const [email, setEmail] = useState('alex@technova.my');
  const [isSaved, setIsSaved] = useState(false);
  
  const [settings, setSettings] = useState<{ [key: string]: NotificationSetting[] }>({
    compliance: [
      { 
        id: 'deadlines', 
        title: 'Statutory Deadlines', 
        description: 'Get alerted 30 days and 7 days before Annual Return or Tax filing due dates.', 
        enabled: true,
        icon: Calendar 
      },
      { 
        id: 'regulatory', 
        title: 'Regulatory Changes', 
        description: 'Updates on new laws (e.g., SSM, ACRA) that affect your business entity.', 
        enabled: true,
        icon: ShieldAlert 
      }
    ],
    documents: [
      { 
        id: 'signing_req', 
        title: 'Signature Requests', 
        description: 'Receive an email immediately when a document requires your digital signature.', 
        enabled: true,
        icon: FileSignature 
      },
      { 
        id: 'doc_completed', 
        title: 'Document Completion', 
        description: 'Notify when all parties have signed a resolution or agreement.', 
        enabled: false,
        icon: Check 
      }
    ],
    billing: [
      { 
        id: 'invoice', 
        title: 'New Invoices & Renewal', 
        description: 'Alerts when annual retainer or service fees are generated.', 
        enabled: true,
        icon: Receipt 
      }
    ]
  });

  const toggleSetting = (category: string, id: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Notification Settings</h1>
        <p className="text-slate-500">Manage how and when we communicate important company updates to you.</p>
      </header>

      {/* Primary Contact */}
      <section className="mb-10 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Mail className="text-blue-600" size={20} /> Primary Contact Email
        </h2>
        <div className="flex gap-4 items-center">
          <div className="flex-1 max-w-md">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
            />
            <p className="text-xs text-slate-400 mt-2">This email will receive all mandatory statutory notices regardless of settings.</p>
          </div>
        </div>
      </section>

      {/* Notification Preferences */}
      <div className="space-y-6">
        {Object.entries(settings).map(([category, items]) => (
          <section key={category} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
              <span className="capitalize font-bold text-slate-700">{category} Notifications</span>
            </div>
            
            <div className="divide-y divide-slate-100">
              {(items as NotificationSetting[]).map((item) => (
                <div key={item.id} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className={`mt-1 p-2 rounded-lg shrink-0 ${item.enabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                    <item.icon size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      
                      {/* Toggle Switch */}
                      <button 
                        onClick={() => toggleSetting(category, item.id)}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                          item.enabled ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      >
                        <span 
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                            item.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`} 
                        />
                      </button>
                    </div>
                    <p className="text-sm text-slate-500 pr-12">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Save Action */}
      <div className="fixed bottom-8 right-8 z-10">
        <button 
          onClick={handleSave}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105
            ${isSaved 
              ? 'bg-green-500 text-white' 
              : 'bg-slate-900 text-white hover:bg-slate-800'}
          `}
        >
          {isSaved ? <Check size={20} /> : <Save size={20} />}
          {isSaved ? 'Preferences Saved' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};