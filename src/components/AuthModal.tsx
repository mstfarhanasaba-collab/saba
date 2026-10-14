import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Store,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  onOpenMerchantLogin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenMerchantLogin,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [emailOrPhone, setEmailOrPhone] = useState('01712-345678');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Farhana Saba');
  const [address, setAddress] = useState('House 42, Road 7/A, Dhanmondi, Dhaka');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setError('Please provide your phone or email.');
      return;
    }

    if (mode === 'login') {
      const user: UserProfile = {
        id: 'user-demo-1',
        name: emailOrPhone.includes('farhana') || emailOrPhone.includes('01712') ? 'Farhana Saba' : 'Shopper',
        email: emailOrPhone.includes('@') ? emailOrPhone : 'farhana@dokandirect.bd',
        phone: emailOrPhone.includes('@') ? '+880 1712-345678' : emailOrPhone,
        address: 'House 42, Road 7/A, Dhanmondi, Dhaka',
        city: 'Dhaka',
        role: 'customer',
      };
      onLoginSuccess(user);
    } else {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      const user: UserProfile = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        email: emailOrPhone.includes('@') ? emailOrPhone : `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        phone: emailOrPhone.includes('@') ? '+880 1819-000000' : emailOrPhone,
        address: address.trim() || 'Dhaka, Bangladesh',
        city: 'Dhaka',
        role: 'customer',
      };
      onLoginSuccess(user);
    }
    onClose();
  };

  const handleQuickDemoLogin = () => {
    const demoUser: UserProfile = {
      id: 'user-demo-farhana',
      name: 'Farhana Saba',
      email: 'mstfarhanasaba@gmail.com',
      phone: '+880 1712-345678',
      address: 'House 42, Road 7/A, Dhanmondi, Dhaka 1209',
      city: 'Dhaka',
      role: 'customer',
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eceef0] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#f8fafc] border-b border-[#eceef0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#e8f7f0] text-[#00685d] flex items-center justify-center border border-[#c2ecd7]">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#191c1e]">
                {mode === 'login' ? 'Customer Login / লগইন' : 'Create Account / নিবন্ধন'}
              </h3>
              <span className="text-[10px] text-[#64748b] block">
                Dokan Direct Shopping Account
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

        {/* Tab switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-[#f2f4f6] mx-4 mt-4 rounded-xl border border-[#e0e3e5]">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#00685d] shadow-xs'
                : 'text-[#64748b] hover:text-[#191c1e]'
            }`}
          >
            Sign In / লগইন
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-[#00685d] shadow-xs'
                : 'text-[#64748b] hover:text-[#191c1e]'
            }`}
          >
            New Account / রেজিস্টার
          </button>
        </div>

        {/* One-Click Fast Login Helper */}
        <div className="px-4 pt-3">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2 px-3 rounded-xl bg-[#e8f7f0] hover:bg-[#c2ecd7] text-[#00685d] border border-[#c2ecd7] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00873c]" />
            <span>1-Click Quick Demo Login (Farhana Saba)</span>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {error && (
            <div className="p-2.5 rounded-xl bg-[#fee2e2] text-[#b91c1c] text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#191c1e] block">
                  Full Name / পূর্ণ নাম *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Farhana Saba"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d]"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#191c1e] block">
                Mobile Number or Email / মোবাইল বা ইমেইল *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="01712-345678 or you@domain.com"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d]"
                  required
                />
              </div>
            </div>

            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#191c1e] block">
                  Delivery Address / ঠিকানা (Dhaka)
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House 42, Dhanmondi, Dhaka"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#191c1e]">
                  Password / পাসওয়ার্ড *
                </label>
                <span className="text-[9px] font-bold text-[#00685d] uppercase">
                  Secure
                </span>
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-9 py-2 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-[#64748b] hover:text-[#191c1e] absolute right-2.5 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 bg-[#00685d] hover:bg-[#005047] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>{mode === 'login' ? 'Sign In / প্রবেশ করুন' : 'Create Account / একাউন্ট খুলুন'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Switch to merchant admin */}
          <div className="pt-2 border-t border-[#eceef0] text-center">
            <span className="text-[11px] text-[#64748b]">Are you a store owner? </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenMerchantLogin();
              }}
              className="text-[11px] font-semibold text-[#00685d] hover:underline inline-flex items-center gap-1"
            >
              <Store className="w-3 h-3" />
              <span>Merchant Admin Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
