import React from 'react';
import { Store, LayoutGrid, LayoutDashboard, MessageSquare } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavigationProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  chatBadgeCount?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onChangeTab,
  chatBadgeCount = 0,
}) => {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'store',
      label: 'Store',
      icon: <Store className="w-5 h-5" />,
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: <LayoutGrid className="w-5 h-5" />,
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'chat',
      label: 'Chat',
      icon: (
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          {chatBadgeCount > 0 && (
            <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#128c7e] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {chatBadgeCount}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#eceef0] safe-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto grid grid-cols-4 px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-[#00685d] font-semibold'
                  : 'text-[#64748b] hover:text-[#191c1e]'
              }`}
            >
              <div className={`p-1 rounded-lg transition-transform ${isActive ? 'scale-105' : ''}`}>
                {tab.icon}
              </div>
              <span className={`text-[11px] tracking-tight ${isActive ? 'font-semibold' : 'font-normal'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
