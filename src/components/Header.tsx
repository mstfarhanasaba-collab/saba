import React from 'react';
import { Store, User, ExternalLink, Lock, LogIn, LogOut } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentUser: UserProfile | null;
  isAdmin?: boolean;
  isAdminLoggedIn?: boolean;
  onNavigateHome: () => void;
  onNavigateAdmin: () => void;
  onViewLiveStore?: () => void;
  onOpenAuthModal: () => void;
  onOpenProfileModal: () => void;
  onLogoutCustomer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  isAdmin = false,
  isAdminLoggedIn = false,
  onNavigateHome,
  onNavigateAdmin,
  onViewLiveStore,
  onOpenAuthModal,
  onOpenProfileModal,
  onLogoutCustomer,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#eceef0] px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand logo & title */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#00685d] border border-[#e0e3e5] group-hover:bg-[#dae2fd]/30 transition-colors">
            <Store className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-heading font-bold text-lg text-[#00685d] tracking-tight">
              Dokan Direct
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00873c] animate-pulse" />
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {isAdmin && isAdminLoggedIn && (
            <button
              onClick={onViewLiveStore}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e0e3e5] transition-colors border border-[#bdc9c5]/60"
            >
              <span>Live Store</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}

          {isAdmin && !isAdminLoggedIn && (
            <div className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-[#f2f4f6] text-[#191c1e] border border-[#bdc9c5]/60">
              <Lock className="w-3 h-3 text-[#00685d]" />
              <span>Admin</span>
            </div>
          )}

          {/* Customer Auth Button: Login if logged out, Profile + Quick Logout if logged in */}
          {currentUser ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenProfileModal}
                className="inline-flex items-center gap-1.5 pl-1 pr-2.5 py-1 rounded-full bg-[#f2f4f6] hover:bg-[#e0e3e5] border border-[#bdc9c5]/60 text-xs font-semibold text-[#191c1e] transition-colors"
                title="View Profile / প্রোফাইল"
              >
                <div className="w-6 h-6 rounded-full bg-[#00685d] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="truncate max-w-[80px]">{currentUser.name.split(' ')[0]}</span>
              </button>

              <button
                onClick={onLogoutCustomer}
                title="Log Out / লগআউট"
                className="w-7 h-7 rounded-full bg-[#fee2e2]/60 hover:bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center transition-colors border border-[#ffdad6]"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00685d] hover:bg-[#005047] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login / লগইন</span>
            </button>
          )}

          {/* Admin shortcut button if not logged in */}
          {!currentUser && (
            <button
              onClick={onNavigateAdmin}
              title={isAdminLoggedIn ? 'Admin Panel' : 'Store Owner Login'}
              className="w-8 h-8 rounded-full bg-[#f2f4f6] border border-[#bdc9c5]/60 flex items-center justify-center text-[#3d4946] hover:bg-[#e0e3e5] transition-colors focus:outline-none"
            >
              <User className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
