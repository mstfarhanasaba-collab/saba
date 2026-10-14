import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  RotateCw, 
  Trash2, 
  Check, 
  MessageSquare, 
  Info,
  UploadCloud,
  Image as ImageIcon
} from 'lucide-react';
import { Product } from '../types';

interface AdminProductFormProps {
  onSave: (productData: Partial<Product>) => void;
  onCancel: () => void;
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState('Handmade Clay Tea Cups (Set of 6)');
  const [price, setPrice] = useState<number | string>(480);
  const [category, setCategory] = useState('Handicrafts');
  const [shortDescription, setShortDescription] = useState(
    'Authentic red clay handcrafted tea cups made by traditional potters of Bogura. Heat-resistant and eco-friendly.'
  );
  const [imageUri, setImageUri] = useState<string>(
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
  );
  const [imageFileName, setImageFileName] = useState('Uploaded_Clay_Cups_V1.jpg');
  const [enableWhatsApp, setEnableWhatsApp] = useState(true);
  const [showCustomUrlInput, setShowCustomUrlInput] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  const sampleImages = [
    {
      name: 'Handmade Clay Cups',
      url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Pure Silk Panjabi',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Sundarbans Honey',
      url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Leather Goods',
      url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUri(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const numPrice = typeof price === 'string' ? parseFloat(price) || 0 : price;

    onSave({
      name: name.trim(),
      price: numPrice,
      category,
      categorySlug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      shortDescription: shortDescription.trim(),
      description: shortDescription.trim(),
      images: [imageUri],
      inStock: true,
      enabledWhatsAppOrder: enableWhatsApp,
    });
  };

  return (
    <div className="min-w-0 pb-32">
      {/* Top Header (Image 11) */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#eceef0] px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#00685d] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <button
          onClick={() => handleSubmit()}
          className="text-xs font-semibold text-[#00685d] hover:underline"
        >
          Save Draft
        </button>
      </div>

      <div className="max-w-md mx-auto px-4 pt-4 space-y-5">
        {/* Title & Badge */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl text-[#191c1e]">
              Add New Product
            </h1>
            <p className="text-xs text-[#3d4946] mt-0.5 leading-snug">
              Fill in product specs to publish immediately to your store.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f7f0] text-[#00685d] text-[10px] font-bold border border-[#c2ecd7] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00873c]" />
            <span>NEW PRODUCT</span>
          </div>
        </div>

        {/* Section 1: Product Image Upload (Image 11) */}
        <div className="bg-white rounded-2xl p-4 border border-[#eceef0] space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#191c1e]">
              Product Image Upload <span className="text-[#ba1a1a]">*</span>
            </label>
            <span className="px-2 py-0.5 rounded bg-[#e8f7f0] text-[#00685d] text-[10px] font-bold">
              Primary Visual
            </span>
          </div>

          {/* Uploaded image file bar */}
          {imageUri && (
            <div className="bg-[#f2f4f6] border border-[#bdc9c5]/60 rounded-xl p-3 flex items-center gap-3">
              <img
                src={imageUri}
                alt="Product preview"
                className="w-14 h-14 rounded-lg object-cover border border-[#bdc9c5]/40 shrink-0 bg-white"
              />

              <div className="flex-1 min-w-0">
                <span className="font-semibold text-xs text-[#191c1e] truncate block">
                  {imageFileName}
                </span>
                <span className="text-[11px] text-[#3d4946] block mt-0.5">
                  1.4 MB • Ready to upload
                </span>

                <div className="flex items-center gap-3 mt-1.5">
                  <label className="text-[11px] font-semibold text-[#00685d] hover:underline flex items-center gap-1 cursor-pointer">
                    <RotateCw className="w-3 h-3" />
                    <span>Change Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setImageUri('');
                      setImageFileName('');
                    }}
                    className="text-[11px] font-semibold text-[#ba1a1a] hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Dashed Upload Dropzone */}
          <label className="border-2 border-dashed border-[#bdc9c5] hover:border-[#00685d] rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#f7f9fb]/50">
            <div className="w-10 h-10 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#3d4946] mb-2">
              <Camera className="w-5 h-5" />
            </div>
            <span className="font-heading font-semibold text-xs text-[#191c1e]">
              Tap to add more photos
            </span>
            <span className="text-[11px] text-[#64748b] mt-1 max-w-xs">
              Supported: JPG, PNG. Max 5MB. Clear bright photo recommended.
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Preset image picker for convenience */}
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-[#64748b] block mb-2">
              Or select preset artisan image:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {sampleImages.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setImageUri(s.url);
                    setImageFileName(`${s.name.replace(/\s+/g, '_')}.jpg`);
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-[#e0e3e5] bg-[#f8fafc] hover:border-[#00685d] text-[11px] font-medium text-[#191c1e] whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <img src={s.url} alt="" className="w-4 h-4 rounded-sm object-cover" />
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Product Name (Image 11) */}
        <div className="bg-white rounded-2xl p-4 border border-[#eceef0] space-y-1.5 shadow-xs">
          <label className="text-xs font-bold text-[#191c1e] block">
            Product Name <span className="text-[#ba1a1a]">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Handmade Clay Tea Cups (Set of 6)"
            className="w-full px-3.5 py-2.5 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d] focus:ring-1 focus:ring-[#00685d]"
            required
          />
          <p className="text-[11px] text-[#64748b]">
            Include key attributes like color, quantity, or material for better buyer search.
          </p>
        </div>

        {/* Category selector */}
        <div className="bg-white rounded-2xl p-4 border border-[#eceef0] space-y-1.5 shadow-xs">
          <label className="text-xs font-bold text-[#191c1e] block">
            Category <span className="text-[#ba1a1a]">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d]"
          >
            <option value="Fashion & Panjabi">Fashion & Panjabi</option>
            <option value="Organic Food">Organic Food</option>
            <option value="Leather Goods">Leather Goods</option>
            <option value="Handicrafts">Handicrafts</option>
          </select>
        </div>

        {/* Section 3: Product Price (BDT) (Image 11) */}
        <div className="bg-white rounded-2xl p-4 border border-[#eceef0] space-y-1.5 shadow-xs">
          <label className="text-xs font-bold text-[#191c1e] block">
            Product Price (BDT) <span className="text-[#ba1a1a]">*</span>
          </label>

          <div className="flex rounded-xl border border-[#bdc9c5] overflow-hidden focus-within:border-[#00685d] focus-within:ring-1 focus-within:ring-[#00685d]">
            <div className="bg-[#f2f4f6] px-3.5 py-2.5 flex items-center justify-center font-bold text-sm text-[#0f172a] border-r border-[#bdc9c5]">
              ৳
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="480"
              className="w-full px-3.5 py-2.5 text-xs text-[#191c1e] font-semibold focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-between text-[11px] pt-0.5">
            <span className="text-[#64748b]">
              Enter regular selling price in Bangladeshi Taka
            </span>
            <span className="text-[#15803d] font-bold">
              VAT Inclusive
            </span>
          </div>
        </div>

        {/* Section 4: Short Description (Image 11) */}
        <div className="bg-white rounded-2xl p-4 border border-[#eceef0] space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#191c1e]">
              Short Description
            </label>
            <span className="text-[11px] text-[#64748b]">
              {shortDescription.length}/250 chars
            </span>
          </div>

          <textarea
            rows={3}
            maxLength={250}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Authentic red clay handcrafted tea cups made by traditional potters of Bogura. Heat-resistant and eco-friendly."
            className="w-full p-3 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] focus:outline-none focus:border-[#00685d] focus:ring-1 focus:ring-[#00685d] leading-relaxed"
          />

          <p className="text-[11px] text-[#64748b]">
            Highlight craftsmanship, sizing, and special care notes for your customers.
          </p>
        </div>

        {/* Section 5: WhatsApp Ordering Settings (Image 11) */}
        <div className="bg-white rounded-2xl p-4 border border-[#eceef0] space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#00685d]" />
            <h3 className="font-heading font-semibold text-xs text-[#191c1e]">
              WhatsApp Ordering Settings
            </h3>
          </div>

          {/* Checkbox box */}
          <div className="bg-[#f2f4f6] rounded-xl p-3.5 border border-[#e0e3e5] space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={enableWhatsApp}
                onChange={(e) => setEnableWhatsApp(e.target.checked)}
                className="w-4 h-4 text-[#00685d] rounded border-[#bdc9c5] focus:ring-[#00685d] accent-[#00685d] mt-0.5 shrink-0"
              />
              <div>
                <span className="font-heading font-bold text-xs text-[#191c1e] block">
                  Enable 1-Click WhatsApp Order Button
                </span>
                <span className="text-[11px] text-[#3d4946] block mt-0.5 leading-relaxed">
                  Allows customers to skip multi-step cart checkout and place orders directly through personal WhatsApp chat.
                </span>
              </div>
            </label>
          </div>

          {/* Pre-configured Automated Message Template */}
          <div className="bg-[#e8f7f0] rounded-xl p-3 flex items-center gap-2 border border-[#c2ecd7]">
            <Info className="w-4 h-4 text-[#00685d] shrink-0" />
            <span className="text-xs font-semibold text-[#00685d]">
              Pre-configured Automated Message Template
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar (Image 11) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#eceef0] px-4 py-3 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="py-3 px-5 rounded-xl border border-[#bdc9c5] text-xs font-semibold text-[#191c1e] hover:bg-[#f2f4f6] transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleSubmit()}
            className="flex-1 py-3 px-4 rounded-xl bg-[#00685d] hover:bg-[#005047] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Check className="w-4 h-4" />
            <span>Save & Publish Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};
