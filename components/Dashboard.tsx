import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { SECRETARIAL_ACTIONS } from '../data/actions';
import { ActionItem } from '../types';

interface DashboardProps {
  onSelectAction: (action: ActionItem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Governance', 'Shares', 'Operations', 'Compliance'];

  const filteredActions = SECRETARIAL_ACTIONS.filter(action => {
    const matchesSearch = action.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          action.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || action.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Company Matters</h1>
        <p className="text-slate-500">Manage all your corporate secretarial needs in one secure place.</p>
      </header>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search actions (e.g., 'Director', 'Address')..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 placeholder-slate-400 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActions.map(action => (
          <div 
            key={action.id}
            onClick={() => onSelectAction(action)}
            className="group bg-white rounded-xl border border-slate-200 p-6 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col h-full"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                action.category === 'Governance' ? 'bg-purple-100 text-purple-600' :
                action.category === 'Shares' ? 'bg-indigo-100 text-indigo-600' :
                action.category === 'Compliance' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <action.icon size={24} />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                action.complexity === 'High' ? 'bg-red-50 text-red-600' :
                action.complexity === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                'bg-green-50 text-green-600'
              }`}>
                {action.complexity} Complexity
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {action.title}
            </h3>
            <p className="text-slate-600 text-sm mb-6 flex-grow">
              {action.shortDescription}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{action.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={14} />
                {/* Fixed: estimatedCost replaced by pricing.basic */}
                <span>Start from RM{action.pricing.basic}</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              Start Action <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        ))}
      </div>

      {filteredActions.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">No actions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};