import React from 'react';
import { Truck } from 'lucide-react';

export const DeliveryTicker: React.FC = () => {
  return (
    <div className="bg-[#e8f7f0] border-b border-[#c2ecd7] text-[#00685d] py-2 px-4">
      <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-medium">
        <div className="w-5 h-5 rounded-full bg-[#c2ecd7] flex items-center justify-center shrink-0">
          <Truck className="w-3.5 h-3.5 text-[#00685d]" />
        </div>
        <span className="truncate">
          <strong className="font-semibold text-[#00685d]">Fast Delivery</strong> in Dhaka & All Bangladesh ৳ • Cash on Delivery
        </span>
      </div>
    </div>
  );
};
