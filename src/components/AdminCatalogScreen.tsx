import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Package
} from 'lucide-react';
import { Product } from '../types';

interface AdminCatalogScreenProps {
  products: Product[];
  onAddProduct: () => void;
  onOpenRemoveModal: (product: Product) => void;
}

export const AdminCatalogScreen: React.FC<AdminCatalogScreenProps> = ({
  products,
  onAddProduct,
  onOpenRemoveModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-w-0 pb-28">
      {/* Top Banner focused only on Add/Remove */}
      <div className="bg-[#e8f7f0] border-b border-[#c2ecd7] px-4 py-2.5">
        <div className="max-w-md mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#00685d] font-semibold">
            <Package className="w-4 h-4 text-[#00873c]" />
            <span>Admin Panel: Product Add & Remove</span>
          </div>
          <span className="text-[11px] font-bold text-[#00685d] bg-white px-2 py-0.5 rounded-full border border-[#c2ecd7]">
            {products.length} Products
          </span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-4 space-y-4">
        {/* Title and Add Product Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-xl text-[#191c1e]">
              Manage Products
            </h1>
            <p className="text-xs text-[#64748b] mt-0.5">
              Add new products or remove existing items
            </p>
          </div>

          <button
            onClick={onAddProduct}
            className="py-2.5 px-4 rounded-full bg-[#00685d] hover:bg-[#005047] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search product to remove..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#bdc9c5] rounded-xl text-xs text-[#191c1e] placeholder-[#64748b] focus:outline-none focus:border-[#00685d] focus:ring-1 focus:ring-[#00685d]"
          />
        </div>

        {/* Product List Cards: Only Remove Option */}
        <div className="space-y-3 pt-1">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#eceef0] p-3 shadow-xs hover:border-[#bdc9c5] transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Thumbnail */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#eceef0] shrink-0 bg-[#eceef0]"
                />

                {/* Details */}
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#64748b] tracking-wider block truncate">
                    {product.category}
                  </span>
                  <h3 className="font-heading font-bold text-xs text-[#191c1e] truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-heading font-bold text-sm text-[#0f172a]">
                      ৳{product.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#15803d] font-semibold bg-[#e8f7f0] px-1.5 py-0.5 rounded">
                      In Catalog
                    </span>
                  </div>
                </div>
              </div>

              {/* ONLY Remove Button */}
              <button
                onClick={() => onOpenRemoveModal(product)}
                className="py-2 px-3 rounded-xl bg-[#fee2e2]/70 hover:bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 border border-[#ffdad6]"
                title="Remove product from store"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="text-center py-10 bg-white rounded-xl border border-[#eceef0] p-4">
              <p className="text-xs font-semibold text-[#191c1e]">No matching products</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-[#00685d] font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Add New Product Full-Width Button */}
        <div className="pt-2">
          <button
            onClick={onAddProduct}
            className="w-full py-3.5 px-4 rounded-full bg-[#00685d] hover:bg-[#005047] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};
