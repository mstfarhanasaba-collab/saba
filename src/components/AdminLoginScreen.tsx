import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  KeyRound,
  Store
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface AdminLoginScreenProps {
  onLoginSuccess: () => void;
  onReturnToStore: () => void;
  onSupportWhatsApp: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({
  onLoginSuccess,
  onReturnToStore,
  onSupportWhatsApp,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('merchant@dokandirect.bd');
  const [password, setPassword] = useState('admin123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    // Simple merchant portal login
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col justify-between p-4 pb-20">
      {/* Top Bar (Image 9) */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between py-2 border-b border-[#eceef0]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#00685d] border border-[#e0e3e5]">
            <Store className="w-4 h-4" />
          </div>
          <span className="font-heading font-bold text-base text-[#00685d]">
            Dokan Direct
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f4f6] text-[#191c1e] text-xs font-semibold border border-[#bdc9c5]/60">
          <Lock className="w-3 h-3 text-[#00685d]" />
          <span>Admin</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#191c1e] text-[10px] font-bold tracking-wider border border-[#bdc9c5]/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span>PRIVATE MERCHANT PORTAL</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#eceef0] shadow-sm space-y-6">
          {/* Shield Icon */}
          <div className="w-14 h-14 rounded-2xl bg-[#e8f7f0] text-[#00685d] flex items-center justify-center mx-auto border border-[#c2ecd7]">
            <Shield className="w-7 h-7" />
          </div>

          <div className="text-center">
            <h1 className="font-heading font-bold text-2xl text-[#191c1e]">
              Store Owner Login
            </h1>
            <p className="text-xs text-[#3d4946] mt-1.5">
              Sign in to manage your products and WhatsApp store.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#fee2e2] text-[#b91c1c] text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Phone field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#191c1e] block">
                Store Email or Phone
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="merchant@dokandirect.bd"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d] focus:ring-1 focus:ring-[#00685d]"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#191c1e]">
                  Password
                </label>
                <span className="text-[10px] font-bold tracking-wider text-[#00685d] uppercase">
                  PROTECTED
                </span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d] focus:ring-1 focus:ring-[#00685d]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-[#64748b] hover:text-[#191c1e] absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#00685d] rounded border-[#bdc9c5] focus:ring-[#00685d] accent-[#00685d]"
              />
              <label htmlFor="rememberMe" className="text-xs text-[#3d4946] select-none cursor-pointer">
                Remember me on this device
              </label>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-[#191c1e] hover:bg-[#2d3133] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="text-center pt-2">
            <span className="text-[11px] text-[#64748b]">
              Demo credentials pre-filled. Tap Sign In to enter.
            </span>
          </div>

          {/* Forgot Access Button */}
          <div className="pt-2 border-t border-[#eceef0] text-center space-y-2">
            <span className="text-xs text-[#64748b] block">Forgot access?</span>
            <button
              type="button"
              onClick={onSupportWhatsApp}
              className="w-full py-2.5 px-3 rounded-xl bg-[#e8f7f0] text-[#00685d] hover:bg-[#c2ecd7] text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-[#c2ecd7]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Message Master Support on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Return to storefront link */}
        <div className="mt-6 text-center">
          <button
            onClick={onReturnToStore}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#191c1e] hover:text-[#00685d] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Storefront</span>
          </button>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="text-center text-[11px] text-[#64748b] pt-4">
        © 2025 Dokan Direct. Secure Social Commerce Infrastructure.
      </footer>
    </div>
  );
};
