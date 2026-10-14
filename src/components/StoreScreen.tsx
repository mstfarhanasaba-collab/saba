import React, { useState } from 'react';
import { ArrowDown, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Product, StoreInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DeliveryTicker } from './DeliveryTicker';

interface StoreScreenProps {
  products: Product[];
  storeInfo: StoreInfo;
  onSelectProduct: (productId: string) => void;
  onOrderWhatsApp: (product: Product) => void;
  onExploreProducts: () => void;
  onOpenChat: () => void;
}

export const StoreScreen: React.FC<StoreScreenProps> = ({
  products,
  storeInfo,
  onSelectProduct,
  onOrderWhatsApp,
  onExploreProducts,
  onOpenChat,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'Fashion & Panjabi', label: 'Fashion & Panjabi' },
    { id: 'Organic Food', label: 'Organic Food' },
    { id: 'Leather Goods', label: 'Leather Goods' },
    { id: 'Handicrafts', label: 'Handicrafts' },
  ];

  const filteredFeaturedProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="min-w-0 pb-24">
      {/* Fast Delivery marquee bar */}
      <DeliveryTicker />

      <div className="max-w-md mx-auto px-4 pt-4 space-y-6">
        {/* Hero Card (Image 1) */}
        <div className="bg-[#f2f4f6] border border-[#bdc9c5]/60 rounded-3xl p-5 shadow-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#191c1e] text-[10px] font-bold tracking-wider mb-3.5 border border-[#bdc9c5]/60">
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span>DIRECT WHATSAPP CHECKOUT • NO CART NEEDED</span>
          </div>

          <h1 className="font-heading font-bold text-2xl text-[#191c1e] leading-tight mb-2.5">
            Discover Products You'll Love
          </h1>

          <p className="text-xs text-[#3d4946] leading-relaxed mb-5">
            Explore our collection and order easily through WhatsApp. Instant chat with merchants for sizes, stock, and live updates.
          </p>

          <div className="space-y-2.5">
            <button
              onClick={onExploreProducts}
              className="w-full py-3.5 px-4 rounded-full bg-[#191c1e] hover:bg-[#2d3133] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Explore Products</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenChat}
              className="w-full py-3.5 px-4 rounded-full bg-[#128c7e] hover:bg-[#0e665c] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Direct WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Browse Collections */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-sm text-[#191c1e]">
              Browse Collections
            </h2>
            <span className="text-xs text-[#64748b]">
              5 Categories
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                    isSelected
                      ? 'bg-[#191c1e] text-white shadow-xs'
                      : 'bg-white border border-[#bdc9c5] text-[#3d4946] hover:bg-[#f2f4f6]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Products Section (Image 1) */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-heading font-bold text-lg text-[#191c1e]">
                Featured Products
              </h2>
              <p className="text-xs text-[#64748b]">
                Handpicked essentials available with one-tap order
              </p>
            </div>

            <div className="px-2.5 py-1 rounded-md bg-[#e8f7f0] text-[#00685d] text-xs font-bold shrink-0">
              Dhaka Stock
            </div>
          </div>

          {/* Product Cards Stack (Image 1) */}
          <div className="space-y-4">
            {filteredFeaturedProducts.slice(0, 4).map((product, idx) => {
              const isSelectedTarget = idx === 1; // div:nth-of-type(2) matching CSS selector 1
              return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#eceef0] overflow-hidden shadow-xs hover:border-[#bdc9c5] transition-all"
              >
                {/* Image container */}
                <div 
                  className="relative aspect-4/3 sm:aspect-16/10 bg-[#eceef0] cursor-pointer overflow-hidden group"
                  onClick={() => onSelectProduct(product.id)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Stock tag and discount badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="bg-white/95 backdrop-blur-xs py-0.5 px-2.5 rounded-full text-[10px] font-bold text-[#15803d] flex items-center gap-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                      In Stock
                    </span>
                    {product.saveAmount && (
                      <span className="bg-[#fee2e2]/95 backdrop-blur-xs py-0.5 px-2 rounded-full text-[10px] font-bold text-[#b91c1c] shadow-xs">
                        Save ৳{product.saveAmount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content details */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block mb-0.5">
                      {product.category}
                    </span>
                    <h3 
                      onClick={() => onSelectProduct(product.id)}
                      className="font-heading font-bold text-base text-[#191c1e] hover:text-[#00685d] cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#3d4946] line-clamp-2 mt-1 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price */}
                  <div 
                    className={`flex items-baseline gap-2 ${isSelectedTarget ? 'font-medium' : ''}`}
                    style={isSelectedTarget ? { fontWeight: 500 } : undefined}
                  >
                    <span 
                      className={`font-heading text-xl text-[#0f172a] ${isSelectedTarget ? 'font-medium' : 'font-bold'}`}
                      style={isSelectedTarget ? { fontWeight: 500 } : undefined}
                    >
                      ৳{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#64748b] line-through">
                        ৳{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Actions: Details & Order WhatsApp */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <button
                      onClick={() => onSelectProduct(product.id)}
                      className="py-2.5 px-3 rounded-xl border border-[#bdc9c5] hover:bg-[#f2f4f6] text-xs font-semibold text-[#191c1e] transition-colors"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => onOrderWhatsApp(product)}
                      className="py-2.5 px-3 rounded-xl bg-[#128c7e] hover:bg-[#0e665c] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Order WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* How WhatsApp Shopping Works (Image 1) */}
        <div className="bg-white rounded-2xl border border-[#eceef0] p-5 space-y-4">
          <div>
            <h2 className="font-heading font-bold text-base text-[#191c1e]">
              How WhatsApp Shopping Works
            </h2>
            <p className="text-xs text-[#64748b] mt-0.5">
              Skip complex registrations. Tap, chat, and confirm.
            </p>
          </div>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="bg-[#f2f4f6] rounded-xl p-3.5 flex items-start gap-3 border border-[#e0e3e5]">
              <div className="w-7 h-7 rounded-full bg-[#00685d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-heading font-semibold text-xs text-[#191c1e]">
                  Select Product
                </h4>
                <p className="text-xs text-[#3d4946] mt-0.5 leading-relaxed">
                  Tap Order via WhatsApp to load pre-filled details.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#f2f4f6] rounded-xl p-3.5 flex items-start gap-3 border border-[#e0e3e5]">
              <div className="w-7 h-7 rounded-full bg-[#00685d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-heading font-semibold text-xs text-[#191c1e]">
                  Send Your Address
                </h4>
                <p className="text-xs text-[#3d4946] mt-0.5 leading-relaxed">
                  Provide your delivery location in Dhaka or elsewhere in BD.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#f2f4f6] rounded-xl p-3.5 flex items-start gap-3 border border-[#e0e3e5]">
              <div className="w-7 h-7 rounded-full bg-[#00685d] text-white font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-heading font-semibold text-xs text-[#191c1e]">
                  Pay on Delivery
                </h4>
                <p className="text-xs text-[#3d4946] mt-0.5 leading-relaxed">
                  Inspect package on arrival and settle via Cash or bKash.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dokan Direct Store Info / Footer (Image 1) */}
        <div className="bg-white rounded-2xl border border-[#eceef0] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#00685d]">
              {storeInfo.name}
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#e8f7f0] text-[#00685d] text-[10px] font-bold border border-[#c2ecd7]">
              {storeInfo.badge}
            </span>
          </div>

          <p className="text-xs text-[#3d4946] leading-relaxed">
            {storeInfo.tagline}
          </p>

          <div className="space-y-3 pt-2 border-t border-[#eceef0]">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#00685d] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-[#191c1e] block">
                  Store Location
                </span>
                <span className="text-xs text-[#3d4946]">
                  {storeInfo.address}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#00685d] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-bold text-[#191c1e] block">
                  Phone / WhatsApp
                </span>
                <span className="text-xs text-[#3d4946]">
                  {storeInfo.phone} ({storeInfo.hours})
                </span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="pt-2 border-t border-[#eceef0] flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#64748b]">
            <button onClick={() => {}} className="hover:text-[#191c1e] underline">
              Shipping Policy
            </button>
            <button onClick={() => {}} className="hover:text-[#191c1e] underline">
              Return Policy
            </button>
            <button onClick={() => {}} className="hover:text-[#191c1e] underline">
              Cash on Delivery Info
            </button>
            <button onClick={() => {}} className="hover:text-[#191c1e] underline">
              Merchant Inquiry
            </button>
          </div>

          {/* Chat with us on WhatsApp */}
          <button
            onClick={onOpenChat}
            className="w-full py-3.5 px-4 rounded-full bg-[#128c7e] hover:bg-[#0e665c] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Chat With Us on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
