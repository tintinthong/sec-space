import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  MessageSquareText, 
  Building, 
  FileStack, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Plus,
  CreditCard,
  CalendarClock,
  TrendingUp,
  ClipboardList
} from 'lucide-react';
import { AppView, Company } from '../types';

interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  companies: Company[];
  selectedCompany: Company;
  onSelectCompany: (company: Company) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onChangeView, 
  companies, 
  selectedCompany, 
  onSelectCompany 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItemClass = (view: AppView) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${
      currentView === view 
        ? 'bg-blue-50 text-blue-700 font-medium' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-20">
      {/* Brand Header */}
      <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-2 text-blue-600">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">S</div>
        <span className="text-xl font-bold text-slate-900">SecSpace</span>
      </div>

      {/* Company Switcher */}
      <div className="p-4 border-b border-slate-100 relative">
        <div 
          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-md bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
              {selectedCompany.name.charAt(0)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-slate-900 truncate">{selectedCompany.name}</span>
              <span className="text-xs text-slate-500 truncate">{selectedCompany.country}</span>
            </div>
          </div>
          <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute left-4 right-4 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Companies</div>
            {companies.map(company => (
              <div 
                key={company.id}
                className={`flex items-center gap-3 px-3 py-2 mx-1 rounded-lg cursor-pointer ${
                  selectedCompany.id === company.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                }`}
                onClick={() => {
                  onSelectCompany(company);
                  setIsDropdownOpen(false);
                  onChangeView(AppView.DASHBOARD);
                }}
              >
                <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-bold">
                  {company.name.charAt(0)}
                </div>
                <span className="text-sm truncate">{company.name}</span>
              </div>
            ))}
            <div className="h-px bg-slate-100 my-1"></div>
            <div 
              className="flex items-center gap-2 px-3 py-2 mx-1 rounded-lg text-blue-600 hover:bg-blue-50 cursor-pointer"
              onClick={() => {
                onChangeView(AppView.CREATE_COMPANY);
                setIsDropdownOpen(false);
              }}
            >
              <Plus size={16} />
              <span className="text-sm font-medium">Add New Company</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div 
          className={navItemClass(AppView.DASHBOARD)}
          onClick={() => onChangeView(AppView.DASHBOARD)}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div 
          className={navItemClass(AppView.MY_ACTIONS)}
          onClick={() => onChangeView(AppView.MY_ACTIONS)}
        >
          <ClipboardList size={20} />
          <span>My Actions</span>
        </div>
        
        <div 
          className={navItemClass(AppView.FEE_TIMELINE)}
          onClick={() => onChangeView(AppView.FEE_TIMELINE)}
        >
          <CalendarClock size={20} />
          <span>Fee Timeline</span>
        </div>

        <div 
          className={navItemClass(AppView.FUNDRAISING)}
          onClick={() => onChangeView(AppView.FUNDRAISING)}
        >
          <TrendingUp size={20} />
          <span>Fundraising</span>
        </div>

        <div 
          className={navItemClass(AppView.AI_ASSISTANT)}
          onClick={() => onChangeView(AppView.AI_ASSISTANT)}
        >
          <MessageSquareText size={20} />
          <span>AI Assistant</span>
        </div>

        <div 
          className={navItemClass(AppView.COMPANY_PROFILE)}
          onClick={() => onChangeView(AppView.COMPANY_PROFILE)}
        >
          <Building size={20} />
          <span>Company Profile</span>
        </div>

        <div 
          className={navItemClass(AppView.BILLING)}
          onClick={() => onChangeView(AppView.BILLING)}
        >
          <CreditCard size={20} />
          <span>Billing</span>
        </div>

        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-8 mb-2 px-4">
          Documents
        </div>

        <div 
          className={navItemClass(AppView.DOCUMENTS)}
          onClick={() => onChangeView(AppView.DOCUMENTS)}
        >
          <FileStack size={20} />
          <span>My Documents</span>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <div 
          className={navItemClass(AppView.SETTINGS)}
          onClick={() => onChangeView(AppView.SETTINGS)}
        >
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer mt-1">
          <LogOut size={20} />
          <span>Log Out</span>
        </div>
      </div>
    </div>
  );
};