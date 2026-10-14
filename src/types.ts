export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  role: 'customer' | 'admin';
}

export interface ProductSize {
  name: string;
  chest: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  images: string[];
  inStock: boolean;
  stockCount?: number;
  isDhakaStock?: boolean;
  saveAmount?: number;
  sizes?: ProductSize[];
  specs?: { [key: string]: string };
  deliveryOptions?: {
    insideDhakaPrice: number;
    outsideDhakaPrice: number;
    insideDhakaTime: string;
    outsideDhakaTime: string;
  };
  enabledWhatsAppOrder: boolean;
  messageTemplate?: string;
  publishedAt?: string;
}

export type ActiveTab = 'store' | 'categories' | 'admin' | 'chat';

export type CurrentView = 
  | { type: 'store' }
  | { type: 'categories'; initialCategory?: string }
  | { type: 'product-detail'; productId: string; returnTab?: ActiveTab }
  | { type: 'admin' }
  | { type: 'admin-add' }
  | { type: 'chat'; prefilledMessage?: string };

export interface StoreInfo {
  name: string;
  badge: string;
  tagline: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  hours: string;
  currency: string;
}
