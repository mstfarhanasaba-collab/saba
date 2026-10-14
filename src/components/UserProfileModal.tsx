import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  LogOut, 
  ShieldCheck, 
  Store, 
  MessageSquare, 
  Save, 
  Check 
} from 'lucide-react';
import { UserProfile } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  user: UserProfile | null;
  onClose: () => void;
  onLogout: () => void;
  onUpdateAddress: (address: string) => void;
  onOpenAdmin: () => void;
  onOpenChat: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  user,
  onClose,
  onLogout,
  onUpdateAddress,
  onOpenAdmin,
  onOpenChat,
}) => {
  const [address, setAddress] = useState(user?.address || 'House 42, Road 7/A, Dhanmondi, Dhaka');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !user) return null;

  const handleSaveAddress = () => {
    onUpdateAddress(address);
    setIsEditingAddress(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eceef0] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 bg-[#f8fafc] border-b border-[#eceef0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#e8f7f0] text-[#00685d] flex items-center justify-center border border-[#c2ecd7]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#191c1e]">
                My Profile / প্রোফাইল
              </h3>
              <span className="text-[10px] text-[#64748b] block">
                Logged in account
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#64748b] hover:text-[#191c1e] hover:bg-[#eceef0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* User badge */}
          <div className="bg-[#f2f4f6] rounded-2xl p-3.5 flex items-center gap-3 border border-[#e0e3e5]">
            <div className="w-12 h-12 rounded-full bg-[#00685d] text-white flex items-center justify-center font-heading font-bold text-lg shrink-0 shadow-xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="font-heading font-bold text-sm text-[#191c1e] truncate">
                  {user.name}
                </h4>
                <ShieldCheck className="w-3.5 h-3.5 text-[#00873c] shrink-0" />
              </div>
              <span className="text-[11px] text-[#3d4946] block truncate">
                {user.phone || user.email}
              </span>
              <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full bg-[#e8f7f0] text-[#00685d] text-[9px] font-bold">
                Active Shopper • Dhaka
              </span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#eceef0]">
              <Phone className="w-3.5 h-3.5 text-[#00685d] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-[#64748b] block">Mobile</span>
                <span className="font-medium text-[#191c1e] truncate block">{user.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#eceef0]">
              <Mail className="w-3.5 h-3.5 text-[#00685d] shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-[#64748b] block">Email</span>
                <span className="font-medium text-[#191c1e] truncate block">{user.email}</span>
              </div>
            </div>

            {/* Saved Address in Dhaka */}
            <div className="p-3 rounded-xl bg-white border border-[#eceef0] space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#00685d] font-semibold text-[11px]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Default Delivery Address</span>
                </div>
                {!isEditingAddress ? (
                  <button
                    onClick={() => setIsEditingAddress(true)}
                    className="text-[10px] font-semibold text-[#00685d] hover:underline"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSaveAddress}
                    className="text-[10px] font-semibold text-[#00873c] hover:underline flex items-center gap-0.5"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                )}
              </div>

              {!isEditingAddress ? (
                <p className="text-[11px] text-[#3d4946] leading-relaxed">
                  {address || 'No address saved yet. Tap edit to set default.'}
                </p>
              ) : (
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-[#bdc9c5] rounded-lg text-xs focus:outline-none focus:border-[#00685d]"
                  placeholder="Enter house, road, area, Dhaka"
                />
              )}

              {savedSuccess && (
                <span className="text-[10px] text-[#15803d] font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Address updated!</span>
                </span>
              )}
            </div>
          </div>

          {/* Shortcuts */}
          <div className="space-y-2 pt-1 border-t border-[#eceef0]">
            <button
              onClick={() => {
                onClose();
                onOpenChat();
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#f2f4f6] hover:bg-[#e0e3e5] text-xs font-semibold text-[#191c1e] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#128c7e]" />
                <span>My WhatsApp Orders & Chat</span>
              </div>
              <span className="text-[11px] text-[#64748b]">Open</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="w-full py-2 px-3 rounded-xl bg-[#f2f4f6] hover:bg-[#e0e3e5] text-xs font-semibold text-[#191c1e] flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#00685d]" />
                <span>Store Owner / Merchant Portal</span>
              </div>
              <span className="text-[11px] text-[#64748b]">Manage</span>
            </button>
          </div>

          {/* Prominent Red Logout Button (Image & Request) */}
          <div className="pt-2">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#fee2e2] hover:bg-[#ffdad6] text-[#ba1a1a] font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-[#ffdad6]"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out / লগআউট করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
