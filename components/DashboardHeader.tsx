
import React from 'react';
import { PageType } from '../types';

interface HeaderProps {
  activeTab: PageType;
  setActiveTab: (tab: PageType) => void;
}

const DashboardHeader: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: PageType.GLOBAL_EVENTS, label: '全球大事', icon: 'fa-globe' },
    { id: PageType.COMPANY_EVENTS, label: '关注公司', icon: 'fa-building' },
    { id: PageType.INDUSTRY_POLICY, label: '行业政策', icon: 'fa-gavel' }
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">FinSense AI</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-1 py-4 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <i className="far fa-bell text-lg"></i>
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold border border-blue-200">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
