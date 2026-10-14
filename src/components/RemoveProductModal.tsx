import React from 'react';
import { Trash2, Info } from 'lucide-react';
import { Product } from '../types';

interface RemoveProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RemoveProductModal: React.FC<RemoveProductModalProps> = ({
  product,
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-[#eceef0] animate-in slide-in-from-bottom duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top grab bar */}
        <div className="w-10 h-1 bg-[#d8dadc] rounded-full mx-auto mb-5 sm:hidden" />

        {/* Red trash badge */}
        <div className="mx-auto w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] mb-4">
          <Trash2 className="w-5 h-5 stroke-[2.2]" />
        </div>

        {/* Text */}
        <div className="text-center mb-5">
          <h3 className="font-heading font-bold text-xl text-[#191c1e] mb-2">
            Remove Product?
          </h3>
          <p className="text-xs text-[#3d4946] leading-relaxed max-w-xs mx-auto">
            Are you sure you want to remove this product from your WhatsApp store catalog? Customers will no longer be able to view or order it.
          </p>
        </div>

        {/* Product card preview */}
        <div className="bg-[#f2f4f6] border border-[#bdc9c5]/60 rounded-xl p-3 flex items-center gap-3 mb-6">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover border border-[#bdc9c5]/40 shrink-0"
          />
          <div className="min-w-0 text-left">
            <h4 className="font-heading font-semibold text-xs text-[#191c1e] truncate">
              {product.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold text-xs text-[#0f172a]">
                ৳{product.price.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#64748b]">•</span>
              <span className="text-[11px] font-medium text-[#15803d] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                Currently in stock
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={onConfirm}
            className="w-full py-3.5 px-4 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-medium text-xs rounded-full flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>Yes, Remove Product</span>
          </button>

          <button
            onClick={onCancel}
            className="w-full py-3.5 px-4 bg-white hover:bg-[#f2f4f6] text-[#191c1e] font-medium text-xs rounded-full border border-[#bdc9c5] transition-colors"
          >
            Cancel, Keep Product
          </button>
        </div>

        {/* Footer info note */}
        <div className="flex items-center gap-2 mt-5 text-[11px] text-[#3d4946] justify-center">
          <Info className="w-3.5 h-3.5 text-[#00685d] shrink-0" />
          <span>You can add this product again at any time from the Add Product form.</span>
        </div>
      </div>
    </div>
  );
};
