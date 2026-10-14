/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, CurrentView, Product, ProductSize, StoreInfo, UserProfile } from './types';
import { INITIAL_PRODUCTS, STORE_INFO } from './data/mockData';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { StoreScreen } from './components/StoreScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { AdminCatalogScreen } from './components/AdminCatalogScreen';
import { AdminProductForm } from './components/AdminProductForm';
import { RemoveProductModal } from './components/RemoveProductModal';
import { ChatScreen } from './components/ChatScreen';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';

const STORAGE_KEY = 'dokan_direct_products_v2';
const AUTH_KEY = 'dokan_direct_admin_auth_v1';
const USER_KEY = 'dokan_direct_user_v1';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  const [storeInfo] = useState<StoreInfo>(STORE_INFO);
  const [activeTab, setActiveTab] = useState<ActiveTab>('store');
  const [currentView, setCurrentView] = useState<CurrentView>({ type: 'store' });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true);

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState<Product | null>(null);
  const [prefilledChatMessage, setPrefilledChatMessage] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Sync auth status
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_KEY, isAdminLoggedIn ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  // Sync customer user
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Switch tabs
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'store') {
      setCurrentView({ type: 'store' });
    } else if (tab === 'categories') {
      setCurrentView({ type: 'categories' });
    } else if (tab === 'admin') {
      setCurrentView({ type: 'admin' });
    } else if (tab === 'chat') {
      setCurrentView({ type: 'chat' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // WhatsApp order dispatch
  const handleOrderWhatsApp = (product: Product, selectedSize?: ProductSize) => {
    const sizeLine = selectedSize
      ? `\nSize: ${selectedSize.name} (${selectedSize.chest.replace('Chest ', '')})`
      : '';
    const customerInfo = currentUser
      ? `\nBuyer Name: ${currentUser.name}\nContact: ${currentUser.phone}${currentUser.address ? `\nDelivery Address: ${currentUser.address}` : ''}`
      : '';
    const message = `"Hello, I want to order this product.
Product: ${product.name}
Price: ৳${product.price.toLocaleString()}${sizeLine}${customerInfo}
Product Link: dokandirect.com/p/${product.slug}
Please provide more details about ordering and delivery."`;

    setPrefilledChatMessage(message);
    setActiveTab('chat');
    setCurrentView({ type: 'chat', prefilledMessage: message });
    showToast(`Order ready for ${product.name}! Switching to WhatsApp chat.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskQuestionWhatsApp = (product: Product) => {
    const message = `Hello Dokan Direct, I have a question regarding "${product.name}" (৳${product.price.toLocaleString()}). Could you provide more details?`;
    setPrefilledChatMessage(message);
    setActiveTab('chat');
    setCurrentView({ type: 'chat', prefilledMessage: message });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Selection
  const handleSelectProduct = (productId: string) => {
    setCurrentView({ type: 'product-detail', productId, returnTab: activeTab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Actions: Strictly Add and Remove Products
  const handleAddProduct = () => {
    setCurrentView({ type: 'admin-add' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProduct = (data: Partial<Product>) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: data.name || 'Untitled Product',
      slug:
        data.slug ||
        (data.name || 'product')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .slice(0, 30),
      price: data.price || 500,
      originalPrice: data.price ? Math.round(data.price * 1.15) : undefined,
      category: data.category || 'Handicrafts',
      categorySlug:
        data.categorySlug ||
        (data.category || 'handicrafts')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-'),
      shortDescription:
        data.shortDescription ||
        'Authentic handcrafted product directly curated in Bangladesh.',
      description:
        data.description ||
        data.shortDescription ||
        'Authentic product crafted with premium materials.',
      images:
        data.images && data.images.length > 0
          ? data.images
          : [
              'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
            ],
      inStock: true,
      isDhakaStock: true,
      deliveryOptions: {
        insideDhakaPrice: 70,
        outsideDhakaPrice: 130,
        insideDhakaTime: 'Cash on Delivery (COD) inside Dhaka (24-48 hrs)',
        outsideDhakaTime: 'Outside Dhaka (3-4 days via Courier)',
      },
      enabledWhatsAppOrder: data.enabledWhatsAppOrder ?? true,
      publishedAt: new Date().toISOString().split('T')[0],
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Published "${newProduct.name}" to store catalog!`);
    setCurrentView({ type: 'admin' });
    setActiveTab('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmRemove = () => {
    if (!productToRemove) return;
    setProducts((prev) => prev.filter((p) => p.id !== productToRemove.id));
    showToast(`Removed "${productToRemove.name}" from catalog.`);
    setProductToRemove(null);
  };

  // Selected product object
  const currentProduct =
    currentView.type === 'product-detail'
      ? products.find((p) => p.id === currentView.productId) || products[0]
      : null;

  const isFormView = currentView.type === 'admin-add';

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-sans selection:bg-[#c2ecd7] selection:text-[#00685d]">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0f172a] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-[#25d366]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header (Image 1, 3, 7, 9) */}
      {!isFormView && currentView.type !== 'product-detail' && currentView.type !== 'chat' && (
        <Header
          currentUser={currentUser}
          isAdmin={activeTab === 'admin'}
          isAdminLoggedIn={isAdminLoggedIn}
          onNavigateHome={() => handleTabChange('store')}
          onNavigateAdmin={() => handleTabChange('admin')}
          onViewLiveStore={() => handleTabChange('store')}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onLogoutCustomer={() => {
            setCurrentUser(null);
            showToast('লগআউট সম্পন্ন হয়েছে (Logged out successfully)');
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Customer Storefront (Image 1) */}
        {currentView.type === 'store' && (
          <StoreScreen
            products={products}
            storeInfo={storeInfo}
            onSelectProduct={handleSelectProduct}
            onOrderWhatsApp={handleOrderWhatsApp}
            onExploreProducts={() => handleTabChange('categories')}
            onOpenChat={() => handleTabChange('chat')}
          />
        )}

        {/* 2. All Products / Categories Catalog (Image 3) */}
        {currentView.type === 'categories' && (
          <CategoriesScreen
            products={products}
            initialCategory={currentView.initialCategory || 'all'}
            onSelectProduct={handleSelectProduct}
            onOrderWhatsApp={handleOrderWhatsApp}
            onOpenChat={() => handleTabChange('chat')}
          />
        )}

        {/* 3. Product Detail Screen (Image 5) */}
        {currentView.type === 'product-detail' && currentProduct && (
          <ProductDetailScreen
            product={currentProduct}
            storeInfo={storeInfo}
            onBack={() => {
              if (currentView.returnTab === 'categories') {
                handleTabChange('categories');
              } else {
                handleTabChange('store');
              }
            }}
            onOrderWhatsApp={handleOrderWhatsApp}
            onAskQuestionWhatsApp={handleAskQuestionWhatsApp}
          />
        )}

        {/* 4. Admin Portal: Strictly Product Add and Remove */}
        {currentView.type === 'admin' && (
          <AdminCatalogScreen
            products={products}
            onAddProduct={handleAddProduct}
            onOpenRemoveModal={(prod) => setProductToRemove(prod)}
          />
        )}

        {/* 5. Add Product Form */}
        {currentView.type === 'admin-add' && (
          <AdminProductForm
            onSave={handleSaveProduct}
            onCancel={() => {
              setCurrentView({ type: 'admin' });
            }}
          />
        )}

        {/* 6. Direct WhatsApp Chat Simulator & Dispatch */}
        {currentView.type === 'chat' && (
          <ChatScreen
            storeInfo={storeInfo}
            prefilledMessage={prefilledChatMessage}
            onClearPrefilled={() => setPrefilledChatMessage('')}
          />
        )}
      </main>

      {/* Remove Product Confirmation Bottom-Sheet Modal (Image 13) */}
      <RemoveProductModal
        product={productToRemove}
        isOpen={Boolean(productToRemove)}
        onConfirm={handleConfirmRemove}
        onCancel={() => setProductToRemove(null)}
      />

      {/* Customer Login & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`স্বাগতম, ${user.name}! লগইন সফল হয়েছে।`);
        }}
        onOpenMerchantLogin={() => {
          setIsAuthModalOpen(false);
          setActiveTab('admin');
          setCurrentView({ type: 'admin' });
        }}
      />

      {/* Customer Profile & Logout Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        user={currentUser}
        onClose={() => setIsProfileModalOpen(false)}
        onLogout={() => {
          setCurrentUser(null);
          showToast('লগআউট সম্পন্ন হয়েছে (Logged out successfully)');
        }}
        onUpdateAddress={(newAddr) => {
          if (currentUser) {
            setCurrentUser({ ...currentUser, address: newAddr });
            showToast('ঠিকানা আপডেট করা হয়েছে (Address updated)');
          }
        }}
        onOpenAdmin={() => {
          setIsProfileModalOpen(false);
          setActiveTab('admin');
          setCurrentView({ type: 'admin' });
        }}
        onOpenChat={() => {
          setIsProfileModalOpen(false);
          setActiveTab('chat');
          setCurrentView({ type: 'chat' });
        }}
      />

      {/* Sticky Bottom Navigation Bar (across screens except full forms or detail view with buy bar) */}
      {currentView.type !== 'product-detail' && !isFormView && (
        <BottomNavigation
          activeTab={activeTab}
          onChangeTab={handleTabChange}
          chatBadgeCount={prefilledChatMessage ? 1 : 0}
        />
      )}
    </div>
  );
}
