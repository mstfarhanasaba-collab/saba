import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, MessageSquare, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CategoriesScreenProps {
  products: Product[];
  initialCategory?: string;
  onSelectProduct: (productId: string) => void;
  onOrderWhatsApp: (product: Product) => void;
  onOpenChat: () => void;
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct,
  onOrderWhatsApp,
  onOpenChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  const categories = [
    { id: 'all', label: `All Products (${products.length})` },
    { id: 'Fashion & Panjabi', label: "Men's Wear" },
    { id: 'Organic Food', label: 'Honey & Ghee' },
    { id: 'Leather Goods', label: 'Footwear & Gear' },
    { id: 'Organic Grocery', label: 'Organic Grocery' },
    { id: 'Handicrafts', label: 'Handicrafts' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' ||
        p.category === selectedCategory ||
        p.categorySlug === selectedCategory ||
        (selectedCategory === 'Fashion & Panjabi' && (p.category === 'Fashion & Panjabi' || p.categorySlug === 'fashion-panjabi')) ||
        (selectedCategory === 'Organic Grocery' && (p.category === 'Organic Food' || p.categorySlug === 'organic-food'));

      return matchesSearch && matchesCat;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return (b.publishedAt || '').localeCompare(a.publishedAt || '');
    });
  }, [products, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-w-0 pb-24">
      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Title & Filter Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl text-[#191c1e]">
              All Products
            </h1>
            <p className="text-xs text-[#64748b] mt-0.5">
              {filteredProducts.length} Items available in Dhaka & countrywide
            </p>
          </div>

          <button
            onClick={() => {}}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#bdc9c5] text-xs font-semibold text-[#191c1e] hover:bg-[#f2f4f6] transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] placeholder-[#64748b] focus:outline-none focus:border-[#00685d] focus:ring-1 focus:ring-[#00685d]"
          />
        </div>

        {/* Categories Pills Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#00685d] text-white shadow-xs'
                    : 'bg-white border border-[#bdc9c5] text-[#3d4946] hover:bg-[#f2f4f6]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Showing Count and Sort Bar */}
        <div className="flex items-center justify-between text-xs text-[#64748b] pt-1">
          <span className="font-semibold tracking-wider uppercase text-[11px]">
            SHOWING {filteredProducts.length} OF {products.length}
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-xs">Sort:</span>
            <div className="relative inline-block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-[#bdc9c5] rounded-lg py-1 pl-2.5 pr-6 text-xs font-medium text-[#191c1e] focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3 h-3 text-[#64748b] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 2-Column Product Grid (Image 3) */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-[#eceef0] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#bdc9c5] transition-all"
            >
              {/* Product Card Top: Image + Tag */}
              <div>
                <div 
                  className="relative aspect-square bg-[#eceef0] cursor-pointer overflow-hidden group"
                  onClick={() => onSelectProduct(product.id)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 z-10 bg-white/95 backdrop-blur-xs rounded-full py-0.5 px-2 flex items-center gap-1 text-[10px] font-semibold text-[#15803d] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
                    <span>In Stock</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-2.5">
                  <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block mb-0.5 truncate">
                    {product.category}
                  </span>
                  <h3 
                    onClick={() => onSelectProduct(product.id)}
                    className="font-heading font-bold text-xs text-[#191c1e] line-clamp-1 hover:text-[#00685d] cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#64748b] line-clamp-2 mt-1 leading-snug">
                    {product.shortDescription}
                  </p>
                </div>
              </div>

              {/* Card Footer: Price & WhatsApp Action */}
              <div className="p-2.5 pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-sm text-[#0f172a]">
                    ৳{product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onSelectProduct(product.id)}
                    className="text-[11px] font-semibold text-[#00685d] hover:underline"
                  >
                    Details
                  </button>
                </div>

                <button
                  onClick={() => onOrderWhatsApp(product)}
                  className="w-full py-2 px-2.5 rounded-full bg-[#128c7e] hover:bg-[#0e665c] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">WhatsApp Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#eceef0] p-6">
            <p className="text-sm font-semibold text-[#191c1e]">No products found</p>
            <p className="text-xs text-[#64748b] mt-1">Try another search keyword or category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-4 py-1.5 bg-[#00685d] text-white rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner: Need Custom Help? Direct Merchant Chat */}
        <div className="bg-white rounded-2xl p-4 border border-[#eceef0] flex items-center justify-between gap-3 shadow-xs mt-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748b] block">
              NEED CUSTOM HELP?
            </span>
            <span className="font-heading font-bold text-xs text-[#191c1e] block">
              Direct Merchant Chat
            </span>
          </div>

          <button
            onClick={onOpenChat}
            className="py-2.5 px-3.5 rounded-full bg-[#128c7e] hover:bg-[#0e665c] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Instant WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
