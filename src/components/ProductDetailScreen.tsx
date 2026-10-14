import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Store, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  MessageCircle, 
  Ruler, 
  Check, 
  HelpCircle,
  FileText,
  ZoomIn,
  X
} from 'lucide-react';
import { Product, ProductSize, StoreInfo } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SizeGuideModal } from './SizeGuideModal';

interface ProductDetailScreenProps {
  product: Product;
  storeInfo: StoreInfo;
  onBack: () => void;
  onOrderWhatsApp: (product: Product, selectedSize?: ProductSize) => void;
  onAskQuestionWhatsApp: (product: Product) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  storeInfo,
  onBack,
  onOrderWhatsApp,
  onAskQuestionWhatsApp,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    product.sizes && product.sizes.length > 1 ? product.sizes[1] : product.sizes?.[0]
  );
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = product.images.length > 0 
    ? product.images 
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Dokan Direct for ৳${product.price.toLocaleString()}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Dynamic WhatsApp order text message formatted exactly as in Image 5
  const sizeText = selectedSize ? `Size: ${selectedSize.name} (${selectedSize.chest.replace('Chest ', '')})` : null;
  const orderMessage = `"Hello, I want to order this product.
Product: ${product.name}
Price: ৳${product.price.toLocaleString()}${sizeText ? `\n${sizeText}` : ''}
Product Link: dokandirect.com/p/${product.slug}
Please provide more details about ordering and delivery."`;

  return (
    <div className="min-w-0 pb-28">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#eceef0] px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#191c1e] hover:text-[#00685d] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Products</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f4f6] text-[#00685d] text-xs font-semibold border border-[#e0e3e5]">
          <Store className="w-3.5 h-3.5" />
          <span>Dokan Direct</span>
        </div>

        <button
          onClick={handleShare}
          className="p-1.5 rounded-full text-[#3d4946] hover:bg-[#f2f4f6] transition-colors relative"
          title="Share Product"
        >
          <Share2 className="w-4 h-4" />
          {copiedLink && (
            <span className="absolute -bottom-7 right-0 bg-[#0f172a] text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
              Link Copied!
            </span>
          )}
        </button>
      </div>

      <div className="max-w-md mx-auto px-4 pt-3 space-y-4">
        {/* Main Image Container */}
        <div className="relative rounded-2xl overflow-hidden bg-white border border-[#eceef0] shadow-xs">
          {/* Authentic craft badge */}
          <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-full py-1 px-2.5 flex items-center gap-1 text-[11px] font-semibold text-[#191c1e] shadow-xs border border-[#bdc9c5]/60">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00685d]" />
            <span>100% Authentic Craft</span>
          </div>

          {/* Primary image */}
          <div className="relative aspect-4/5 w-full bg-[#eceef0] flex items-center justify-center">
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover cursor-zoom-in"
              onClick={() => setIsZoomOpen(true)}
            />

            {/* Zoom icon button */}
            <button
              onClick={() => setIsZoomOpen(true)}
              className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#191c1e] shadow-xs hover:bg-white"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Pagination dots */}
          {images.length > 1 && (
            <div className="py-2.5 flex justify-center items-center gap-1.5 bg-white">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeImageIndex === idx ? 'w-6 bg-[#00685d]' : 'w-1.5 bg-[#bdc9c5]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Dispatch & Delivery Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e8f7f0] text-[#00685d] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#00873c] animate-pulse" />
            <span>In Stock (Ready for Dispatch)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#f2f4f6] text-[#3d4946] text-xs font-medium border border-[#bdc9c5]/60">
            <Truck className="w-3.5 h-3.5 text-[#00685d]" />
            <span>Dhaka Delivery: 24h</span>
          </div>
        </div>

        {/* Product Title */}
        <div>
          <h1 className="font-heading font-bold text-xl text-[#191c1e] leading-snug">
            {product.name}
          </h1>

          {/* Price block */}
          <div className="flex items-baseline gap-2.5 mt-2">
            <span className="font-heading font-bold text-2xl text-[#191c1e]">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm font-medium text-[#64748b] line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.saveAmount && (
              <span className="px-2 py-0.5 rounded-md bg-[#e8f7f0] text-[#00685d] text-xs font-bold">
                Save ৳{product.saveAmount.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="bg-white rounded-xl p-3.5 border border-[#eceef0] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#191c1e]">
                Select Size: {selectedSize ? `${selectedSize.name} (${selectedSize.chest.replace('Chest ', '')})` : 'Choose'}
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-semibold text-[#00685d] hover:underline flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize?.name === s.name;
                return (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 px-1 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'bg-[#00685d] text-white border-[#00685d] shadow-xs'
                        : 'bg-white text-[#191c1e] border-[#bdc9c5] hover:border-[#00685d]'
                    }`}
                  >
                    <div className="text-xs font-bold">{s.name}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-[#f4fffb]' : 'text-[#64748b]'}`}>
                      {s.chest}
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-[#64748b]">
              Model is 5'11" wearing Size M (40). Regular festive relaxed fit.
            </p>
          </div>
        )}

        {/* Product Details Section */}
        <div className="bg-white rounded-xl p-4 border border-[#eceef0] space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00685d]" />
            <h2 className="font-heading font-semibold text-sm text-[#191c1e]">
              Product Details
            </h2>
          </div>

          <p className="text-xs text-[#3d4946] leading-relaxed">
            {product.description}
          </p>

          {/* Specs grid */}
          {product.specs && (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#eceef0]">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="bg-[#f2f4f6] p-2.5 rounded-lg border border-[#e0e3e5]">
                  <span className="text-[10px] uppercase font-bold text-[#64748b] block mb-0.5 tracking-wider">
                    {key}
                  </span>
                  <span className="text-xs font-semibold text-[#191c1e]">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delivery & Payment Guarantee */}
        <div className="bg-white rounded-xl p-4 border border-[#eceef0] space-y-2.5">
          <div className="flex items-center gap-2 mb-1">
            <Truck className="w-4 h-4 text-[#00685d]" />
            <h2 className="font-heading font-semibold text-sm text-[#191c1e]">
              Delivery & Payment Guarantee
            </h2>
          </div>

          <div className="bg-[#f2f4f6] rounded-xl p-3 flex items-start gap-3 border border-[#e0e3e5]">
            <div className="w-7 h-7 rounded-lg bg-[#dae2fd]/40 text-[#00685d] flex items-center justify-center shrink-0 mt-0.5">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#191c1e]">
                Inside Dhaka: ৳{product.deliveryOptions?.insideDhakaPrice || 70}
              </div>
              <div className="text-[11px] text-[#3d4946] mt-0.5">
                Cash on Delivery (COD) inside Dhaka (24-48 hrs): ৳{product.deliveryOptions?.insideDhakaPrice || 70}
              </div>
            </div>
          </div>

          <div className="bg-[#f2f4f6] rounded-xl p-3 flex items-start gap-3 border border-[#e0e3e5]">
            <div className="w-7 h-7 rounded-lg bg-[#dae2fd]/40 text-[#00685d] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#191c1e]">
                Outside Dhaka: ৳{product.deliveryOptions?.outsideDhakaPrice || 130}
              </div>
              <div className="text-[11px] text-[#3d4946] mt-0.5">
                Outside Dhaka (3-4 days via Courier): ৳{product.deliveryOptions?.outsideDhakaPrice || 130}
              </div>
            </div>
          </div>

          <div className="bg-[#f2f4f6] rounded-xl p-3 flex items-start gap-3 border border-[#e0e3e5]">
            <div className="w-7 h-7 rounded-lg bg-[#e8f7f0] text-[#00685d] flex items-center justify-center shrink-0 mt-0.5">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#191c1e]">Direct Verification</div>
              <div className="text-[11px] text-[#3d4946] mt-0.5">
                Order verification via direct WhatsApp chat
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Order Preview Card */}
        <div className="bg-white rounded-xl p-4 border border-[#eceef0] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#128c7e]" />
              <h2 className="font-heading font-semibold text-sm text-[#191c1e]">
                WhatsApp Order Preview
              </h2>
            </div>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#f2f4f6] text-[#64748b] border border-[#e0e3e5]">
              Auto-Formatted
            </span>
          </div>

          <p className="text-xs text-[#64748b]">
            Tapping the order button will open WhatsApp with this pre-filled message ready to send:
          </p>

          <div className="bg-[#f4fbf7] border border-[#c2ecd7] rounded-xl p-3.5 font-mono text-[11px] text-[#1e293b] leading-relaxed whitespace-pre-wrap">
            {orderMessage}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-[#128c7e]">
            <Check className="w-3.5 h-3.5" />
            <span>Ready to send instantly to Merchant</span>
          </div>
        </div>

        {/* Ask Question Secondary Button */}
        <button
          onClick={() => onAskQuestionWhatsApp(product)}
          className="w-full py-3 px-4 rounded-xl border border-[#bdc9c5] hover:border-[#191c1e] text-[#191c1e] text-xs font-semibold flex items-center justify-center gap-2 bg-white transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-[#3d4946]" />
          <span>Ask a Question on WhatsApp</span>
        </button>
      </div>

      {/* Persistent Sticky Bottom Action Bar (Image 5) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#eceef0] px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block">
              TOTAL PAYABLE
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading font-bold text-xl text-[#0f172a]">
                ৳{product.price.toLocaleString()}
              </span>
              <span className="text-[10px] font-semibold text-[#15803d]">
                COD Available
              </span>
            </div>
          </div>

          <button
            onClick={() => onOrderWhatsApp(product, selectedSize)}
            className="flex-1 max-w-[240px] py-3.5 px-4 rounded-full bg-[#128c7e] hover:bg-[#0e665c] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span className="truncate">Order on WhatsApp (৳{product.price.toLocaleString()})</span>
          </button>
        </div>
      </div>

      {/* Sizing modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[activeImageIndex]}
            alt={product.name}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};
