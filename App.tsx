import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ActionDetail } from './components/ActionDetail';
import { AIAssistant } from './components/AIAssistant';
import { CompanyProfile } from './components/CompanyProfile';
import { CreateCompany } from './components/CreateCompany';
import { FeeTimeline } from './components/FeeTimeline';
import { Billing } from './components/Billing';
import { Documents } from './components/Documents';
import { SettingsPage } from './components/SettingsPage';
import { Fundraising } from './components/Fundraising';
import { MyActions } from './components/MyActions';
import { ActionDrawer } from './components/ActionDrawer';
import { AppView, ActionItem, Company, ActionRequest } from './types';
import { MOCK_COMPANIES } from './data/companies';
import { SECRETARIAL_ACTIONS } from './data/actions';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [selectedCompany, setSelectedCompany] = useState<Company>(MOCK_COMPANIES[0]);
  
  // State for Action Requests
  const [actionRequests, setActionRequests] = useState<ActionRequest[]>([]);
  const [selectedActionRequest, setSelectedActionRequest] = useState<ActionRequest | null>(null);

  const handleActionSelect = (action: ActionItem) => {
    setSelectedAction(action);
    setCurrentView(AppView.ACTION_DETAIL);
  };

  const handleBackToDashboard = () => {
    setSelectedAction(null);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleCreateCompanyComplete = (newCompany: Company) => {
    setCompanies([...companies, newCompany]);
    setSelectedCompany(newCompany);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleUpdateCompany = (updatedCompany: Company) => {
    setCompanies(prev => prev.map(c => c.id === updatedCompany.id ? updatedCompany : c));
    setSelectedCompany(updatedCompany);
  };

  const handleStartAction = (formData: any) => {
    if (!selectedAction) return;

    const newRequest: ActionRequest = {
      id: `req-${Date.now()}`,
      actionId: selectedAction.id,
      companyId: selectedCompany.id,
      status: 'In Progress', // Simulating immediate processing
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      formData: formData
    };

    setActionRequests(prev => [newRequest, ...prev]);
    setSelectedAction(null);
    setCurrentView(AppView.MY_ACTIONS);
  };

  const handleNavigateToBilling = () => {
    setCurrentView(AppView.BILLING);
  };

  // Helper to jump to invite director flow
  const handleInviteDirector = () => {
    const appointDirectorAction = SECRETARIAL_ACTIONS.find(a => a.id === 'appoint-director');
    if (appointDirectorAction) {
      handleActionSelect(appointDirectorAction);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onSelectAction={handleActionSelect} />;
      case AppView.ACTION_DETAIL:
        if (selectedAction) {
          return <ActionDetail 
            action={selectedAction} 
            onBack={handleBackToDashboard} 
            onStartAction={handleStartAction}
            userPlan={selectedCompany.currentPlan}
            onUpgrade={handleNavigateToBilling}
          />;
        }
        return <Dashboard onSelectAction={handleActionSelect} />; // Fallback
      case AppView.MY_ACTIONS:
        return <MyActions actionRequests={actionRequests} onOpenActionDrawer={setSelectedActionRequest} />;
      case AppView.AI_ASSISTANT:
        return <AIAssistant />;
      case AppView.COMPANY_PROFILE:
        return <CompanyProfile 
          company={selectedCompany} 
          onInviteDirector={handleInviteDirector}
          onUpdateCompany={handleUpdateCompany}
          onUpgrade={handleNavigateToBilling}
        />;
      case AppView.CREATE_COMPANY:
        return (
          <CreateCompany 
            onComplete={handleCreateCompanyComplete} 
            onCancel={() => setCurrentView(AppView.DASHBOARD)} 
          />
        );
      case AppView.FEE_TIMELINE:
        return <FeeTimeline company={selectedCompany} />;
      case AppView.BILLING:
        return <Billing />;
      case AppView.DOCUMENTS:
        return <Documents company={selectedCompany} />;
      case AppView.SETTINGS:
        return <SettingsPage company={selectedCompany} />;
      case AppView.FUNDRAISING:
        return <Fundraising company={selectedCompany} onUpgrade={handleNavigateToBilling} />;
      default:
        return <Dashboard onSelectAction={handleActionSelect} />;
    }
  };

  // If in create mode, hide sidebar for full focus
  if (currentView === AppView.CREATE_COMPANY) {
    return (
      <div className="min-h-screen bg-slate-50">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        companies={companies}
        selectedCompany={selectedCompany}
        onSelectCompany={setSelectedCompany}
      />
      <main className="flex-1 ml-64 relative">
        {renderContent()}
        <ActionDrawer 
          request={selectedActionRequest} 
          onClose={() => setSelectedActionRequest(null)} 
        />
      </main>
    </div>
  );
};

export default App;