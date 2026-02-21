import React, { useState } from 'react';
import { Check, Shield, Star, Crown, Zap, Info } from 'lucide-react';

interface FeeRowProps {
  label: string;
  basic: string;
  essential: string;
  pro: string;
  header?: boolean;
}

const FeeRow: React.FC<FeeRowProps> = ({ label, basic, essential, pro, header }) => (
  <div className={`grid grid-cols-4 py-3 px-4 ${header ? 'bg-slate-50 font-bold text-slate-900 border-y border-slate-200' : 'border-b border-slate-50 hover:bg-slate-50/50'}`}>
    <div className={`col-span-1 ${header ? '' : 'text-slate-700 font-medium'}`}>{label}</div>
    <div className="col-span-1 text-center text-slate-600 text-sm flex justify-center items-center">{basic}</div>
    <div className="col-span-1 text-center text-slate-600 text-sm flex justify-center items-center">{essential === 'Included' ? <Check className="text-green-500" size={18} /> : essential}</div>
    <div className="col-span-1 text-center text-slate-600 text-sm flex justify-center items-center">{pro === 'Included' ? <Check className="text-green-500" size={18} /> : pro}</div>
  </div>
);

export const Billing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plans' | 'payment'>('plans');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Plans & Pricing</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Transparent pricing for every stage of your business. Choose a plan that suits your compliance needs.
        </p>
      </header>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Basic */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col relative">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900">Basic</h3>
            <p className="text-sm text-slate-500 mt-1">Pay-as-you-go for new startups.</p>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-bold text-slate-900">RM40</span>
            <span className="text-slate-500">/mth</span>
            <div className="text-xs text-slate-400 mt-1">Billed RM480 annually</div>
          </div>
          <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors mb-6">
            Current Plan
          </button>
          <ul className="space-y-3 text-sm text-slate-600 flex-grow">
            <li className="flex gap-2"><Check size={16} className="text-blue-500 shrink-0" /> Named Company Secretary</li>
            <li className="flex gap-2"><Check size={16} className="text-blue-500 shrink-0" /> Standard Constitution</li>
            <li className="flex gap-2"><Zap size={16} className="text-amber-500 shrink-0" /> Actions chargeable per request</li>
          </ul>
        </div>

        {/* Essential */}
        <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 flex flex-col relative shadow-xl transform md:-translate-y-2">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
            MOST POPULAR
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Essential <Star size={16} className="fill-blue-500 text-blue-500" />
            </h3>
            <p className="text-sm text-slate-500 mt-1">All-inclusive for growing SMEs.</p>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-bold text-slate-900">RM100</span>
            <span className="text-slate-500">/mth</span>
            <div className="text-xs text-slate-400 mt-1">Billed RM1,200 annually</div>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors mb-6 shadow-md shadow-blue-200">
            Upgrade Now
          </button>
          <ul className="space-y-3 text-sm text-slate-600 flex-grow">
            <li className="flex gap-2"><Check size={16} className="text-blue-500 shrink-0" /> Annual Return Submission Included</li>
            <li className="flex gap-2"><Check size={16} className="text-blue-500 shrink-0" /> Unlimited Standard Resolutions</li>
            <li className="flex gap-2"><Check size={16} className="text-blue-500 shrink-0" /> Free CTCs (Basic set)</li>
          </ul>
        </div>

        {/* Pro */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col relative bg-gradient-to-b from-slate-50 to-white">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Pro <Crown size={16} className="fill-amber-400 text-amber-500" />
            </h3>
            <p className="text-sm text-slate-500 mt-1">Complete peace of mind.</p>
          </div>
          <div className="mb-6">
            <span className="text-3xl font-bold text-slate-900">RM180</span>
            <span className="text-slate-500">/mth</span>
            <div className="text-xs text-slate-400 mt-1">Billed RM2,160 annually</div>
          </div>
          <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors mb-6">
            Contact Sales
          </button>
          <ul className="space-y-3 text-sm text-slate-600 flex-grow">
            <li className="flex gap-2"><Check size={16} className="text-blue-500 shrink-0" /> Priority Support</li>
            <li className="flex gap-2"><Check size={16} className="text-blue-500 shrink-0" /> Audited Report Filing Included</li>
            <li className="flex gap-2"><Check size={16} className="text-blue-500 shrink-0" /> 2 Sets Free CTCs / year</li>
          </ul>
        </div>
      </div>

      {/* Detailed Fee Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">Fee Schedule Breakdown</h2>
          <p className="text-sm text-slate-500">Compare specific charges across plans. Government fees (SSM) are charged separately unless stated.</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Table Header */}
            <div className="grid grid-cols-4 py-4 px-4 bg-white font-bold text-slate-500 uppercase text-xs tracking-wider border-b border-slate-200">
              <div className="col-span-1">Service / Action</div>
              <div className="col-span-1 text-center">Basic</div>
              <div className="col-span-1 text-center text-blue-600">Essential</div>
              <div className="col-span-1 text-center text-amber-600">Pro</div>
            </div>

            {/* Annual Compliance */}
            <FeeRow label="Annual Compliance" basic="" essential="" pro="" header />
            <FeeRow label="Annual Return Submission" basic="RM600" essential="Included" pro="Included" />
            <FeeRow label="Filing Audited Report" basic="RM250" essential="Included" pro="Included" />

            {/* Common Resolutions */}
            <FeeRow label="Standard Resolutions" basic="" essential="" pro="" header />
            <FeeRow label="Appoint/Resign Director" basic="RM250" essential="Included" pro="Included" />
            <FeeRow label="Transfer Shares" basic="RM300" essential="Included" pro="Included" />
            <FeeRow label="Change Address" basic="RM200" essential="Included" pro="Included" />
            <FeeRow label="Open Bank Account" basic="RM200" essential="Included" pro="Included" />
            <FeeRow label="Change Company Name" basic="RM500" essential="Included" pro="Included" />
            <FeeRow label="Change Business Nature" basic="RM200" essential="Included" pro="Included" />
            
            {/* Misc */}
            <FeeRow label="Miscellaneous" basic="" essential="" pro="" header />
            <FeeRow label="CTC (Certified True Copy)" basic="RM6 / sig" essential="RM6 / sig" pro="2 Free Sets/yr" />
            <FeeRow label="Beneficial Ownership Decl." basic="RM150" essential="Included" pro="Included" />
            <FeeRow label="Asset Write Off" basic="RM200" essential="Included" pro="Included" />
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-start gap-2">
           <Info size={16} className="shrink-0 mt-0.5" />
           <p>
             <strong>External Government Fees:</strong> SSM Filing Fees (RM150/annum), Constitution Fee (RM200), Stamping Fee (RM200), etc. are external costs paid to the government and are not included in the plan subscription unless explicitly stated.
           </p>
        </div>
      </div>

    </div>
  );
};