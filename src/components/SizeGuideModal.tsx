import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-[#eceef0]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-[#eceef0] flex items-center justify-between bg-[#f8fafc]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#dae2fd]/40 text-[#00685d]">
              <Ruler className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#0f172a]">Panjabi Size Chart</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#64748b] hover:text-[#0f172a] hover:bg-[#eceef0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-xs text-[#64748b]">
            All measurements in inches. Regular tailored fit standard in Bangladesh.
          </p>

          <div className="overflow-x-auto rounded-lg border border-[#e2e8f0]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#f1f5f9] text-[#334155] font-semibold">
                <tr>
                  <th className="py-2 px-3">Size</th>
                  <th className="py-2 px-3">Chest</th>
                  <th className="py-2 px-3">Length</th>
                  <th className="py-2 px-3">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#0f172a]">S (38)</td>
                  <td className="py-2.5 px-3">38" - 39"</td>
                  <td className="py-2.5 px-3">40"</td>
                  <td className="py-2.5 px-3">17.5"</td>
                </tr>
                <tr className="bg-[#f8fafc]">
                  <td className="py-2.5 px-3 font-semibold text-[#00685d]">M (40)</td>
                  <td className="py-2.5 px-3">40" - 41"</td>
                  <td className="py-2.5 px-3">42"</td>
                  <td className="py-2.5 px-3">18.0"</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-[#0f172a]">L (42)</td>
                  <td className="py-2.5 px-3">42" - 43"</td>
                  <td className="py-2.5 px-3">44"</td>
                  <td className="py-2.5 px-3">18.5"</td>
                </tr>
                <tr className="bg-[#f8fafc]">
                  <td className="py-2.5 px-3 font-semibold text-[#0f172a]">XL (44)</td>
                  <td className="py-2.5 px-3">44" - 45"</td>
                  <td className="py-2.5 px-3">46"</td>
                  <td className="py-2.5 px-3">19.0"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-[#e8f7f0] p-3 text-xs text-[#00685d] space-y-1">
            <span className="font-semibold block">Need advice on fit?</span>
            <p className="text-[11px] text-[#00685d]/90">
              WhatsApp merchant for personal fit recommendations or custom measurements.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#f8fafc] border-t border-[#eceef0]">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#0f172a] text-white text-xs font-semibold rounded-lg hover:bg-[#1e293b]"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
