import { Product, StoreInfo } from '../types';

export const STORE_INFO: StoreInfo = {
  name: 'Dokan Direct',
  badge: 'Dhaka Verified',
  tagline: 'Simple direct social commerce tailored for Bangladesh. Authentic items curated from artisanal craftsmen and trusted farms.',
  address: 'House 42, Road 7/A, Dhanmondi, Dhaka 1209, Bangladesh',
  phone: '+880 1712-345678',
  whatsappNumber: '8801712345678',
  whatsappFormatted: '+880 1712-345678',
  hours: '10:00 AM - 10:00 PM',
  currency: '৳',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Semi-Pure Silk Panjabi - Royal Navy',
    slug: 'silk-panjabi-navy',
    price: 2450,
    originalPrice: 2800,
    saveAmount: 350,
    category: 'Fashion & Panjabi',
    categorySlug: 'fashion-panjabi',
    shortDescription: 'Handcrafted embroidery with breathable summer fabric, ideal for festivals and premium occasions.',
    description: 'Carefully woven using breathable semi-pure silk yarn, crafted for Bangladeshi festive celebrations, Eid, and formal gatherings. Features delicate tonal embroidery along the neckline and cuffs.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    stockCount: 14,
    isDhakaStock: true,
    sizes: [
      { name: 'S', chest: 'Chest 38' },
      { name: 'M', chest: 'Chest 40' },
      { name: 'L', chest: 'Chest 42' },
      { name: 'XL', chest: 'Chest 44' }
    ],
    specs: {
      'FABRIC COMPOSITION': '80% Silk, 20% Cotton',
      'WASH CARE': 'Hand Wash / Dry Clean'
    },
    deliveryOptions: {
      insideDhakaPrice: 70,
      outsideDhakaPrice: 130,
      insideDhakaTime: 'Cash on Delivery (COD) inside Dhaka (24-48 hrs)',
      outsideDhakaTime: 'Outside Dhaka (3-4 days via Courier)'
    },
    enabledWhatsAppOrder: true,
    publishedAt: '2025-05-10'
  },
  {
    id: 'prod-2',
    name: 'Sundarbans Natural Raw Honey (500g)',
    slug: 'sundarbans-natural-raw-honey',
    price: 500,
    originalPrice: 850,
    saveAmount: 350,
    category: 'Organic Food',
    categorySlug: 'organic-food',
    shortDescription: '100% pure filtered flower honey with natural aroma and rich medicinal enzymes.',
    description: 'Directly sourced from the deep mangrove wild hives of the Sundarbans. Cold-filtered without heating, preserving pollen, propolis, and active organic enzymes.',
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    stockCount: 28,
    isDhakaStock: true,
    specs: {
      'NET WEIGHT': '500 grams',
      'ORIGIN': 'Satkhira & Sundarbans Range'
    },
    deliveryOptions: {
      insideDhakaPrice: 70,
      outsideDhakaPrice: 130,
      insideDhakaTime: 'Cash on Delivery (COD) inside Dhaka (24-48 hrs)',
      outsideDhakaTime: 'Outside Dhaka (3-4 days via Courier)'
    },
    enabledWhatsAppOrder: true,
    publishedAt: '2025-05-08'
  },
  {
    id: 'prod-3',
    name: 'Full Grain Hand-stitched Leather Wallet',
    slug: 'full-grain-leather-wallet',
    price: 1200,
    originalPrice: 1450,
    saveAmount: 250,
    category: 'Leather Goods',
    categorySlug: 'leather-goods',
    shortDescription: 'Minimalist bifold with 8 card slots and currency slot, built to age with graceful patina.',
    description: 'Export quality vegetable-tanned genuine cowhide leather. Waxed thread hand-stitching with RFID blocking liner and dual note partition for Bangladeshi Taka notes.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    stockCount: 9,
    isDhakaStock: true,
    specs: {
      'MATERIAL': '100% Full Grain Veg-Tanned Leather',
      'SLOTS': '8 Card Pockets + 2 Cash Compartments'
    },
    deliveryOptions: {
      insideDhakaPrice: 70,
      outsideDhakaPrice: 130,
      insideDhakaTime: 'Cash on Delivery (COD) inside Dhaka (24-48 hrs)',
      outsideDhakaTime: 'Outside Dhaka (3-4 days via Courier)'
    },
    enabledWhatsAppOrder: true,
    publishedAt: '2025-05-05'
  },
  {
    id: 'prod-4',
    name: 'Aromatic Kalijira Polao Rice (5kg)',
    slug: 'aromatic-kalijira-polao-rice',
    price: 620,
    originalPrice: 700,
    saveAmount: 80,
    category: 'Organic Food',
    categorySlug: 'organic-food',
    shortDescription: 'Premium aged chinigura rice for festive cooking, offering exceptional natural fragrance.',
    description: 'Authentic Dinajpur origin sweet-scent short grain polao rice. Aged naturally for fluffiness, zero stickiness, and irresistible aroma for biryani and polao feasts.',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    stockCount: 45,
    isDhakaStock: true,
    specs: {
      'PACKAGING': '5kg Traditional Jute Sack',
      'HARVEST ORIGIN': 'Dinajpur Farm Cooperative'
    },
    deliveryOptions: {
      insideDhakaPrice: 70,
      outsideDhakaPrice: 130,
      insideDhakaTime: 'Cash on Delivery (COD) inside Dhaka (24-48 hrs)',
      outsideDhakaTime: 'Outside Dhaka (3-4 days via Courier)'
    },
    enabledWhatsAppOrder: true,
    publishedAt: '2025-05-02'
  },
  {
    id: 'prod-5',
    name: 'Pure Mustard Oil (Ghani Cold-Pressed 1L)',
    slug: 'pure-mustard-oil-ghani',
    price: 360,
    originalPrice: 400,
    saveAmount: 40,
    category: 'Organic Food',
    categorySlug: 'organic-food',
    shortDescription: 'Ghani-broken cold-pressed authentic pungent mustard oil for cooking & massage.',
    description: 'Wooden ghani crushed local high-grade mustard seeds. Unrefined, unbleached, retaining its authentic pungent kick, natural golden glow, and antioxidants.',
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    stockCount: 19,
    isDhakaStock: true,
    specs: {
      'VOLUME': '1 Liter Bottle',
      'PROCESS': 'Traditional Wooden Ghani Cold-Pressed'
    },
    deliveryOptions: {
      insideDhakaPrice: 70,
      outsideDhakaPrice: 130,
      insideDhakaTime: 'Cash on Delivery (COD) inside Dhaka (24-48 hrs)',
      outsideDhakaTime: 'Outside Dhaka (3-4 days via Courier)'
    },
    enabledWhatsAppOrder: true,
    publishedAt: '2025-04-28'
  },
  {
    id: 'prod-6',
    name: 'Tangail Cotton Handloom Saree',
    slug: 'tangail-cotton-handloom-saree',
    price: 1850,
    originalPrice: 2200,
    saveAmount: 350,
    category: 'Handicrafts',
    categorySlug: 'handicrafts',
    shortDescription: 'Handloom woven pure soft cotton saree with authentic traditional border motifs.',
    description: 'Woven by master weavers of Tangail using finest breathable combed cotton yarn. Soft drape suitable for humid Bangladeshi summers and formal daytime events.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    stockCount: 7,
    isDhakaStock: true,
    specs: {
      'MATERIAL': '100% Handloom Combed Cotton',
      'LENGTH': '12 Haat with unstitched blouse piece'
    },
    deliveryOptions: {
      insideDhakaPrice: 70,
      outsideDhakaPrice: 130,
      insideDhakaTime: 'Cash on Delivery (COD) inside Dhaka (24-48 hrs)',
      outsideDhakaTime: 'Outside Dhaka (3-4 days via Courier)'
    },
    enabledWhatsAppOrder: true,
    publishedAt: '2025-04-25'
  },
  {
    id: 'prod-7',
    name: 'Handmade Clay Tea Cups (Set of 6)',
    slug: 'handmade-clay-tea-cups',
    price: 480,
    originalPrice: 600,
    saveAmount: 120,
    category: 'Handicrafts',
    categorySlug: 'handicrafts',
    shortDescription: 'Authentic red clay handcrafted tea cups made by traditional potters of Bogura. Heat-resistant and eco-friendly.',
    description: 'Eco-friendly traditional terracotta earthen cups (matir cha cup). Made using rich alluvial clay from northern Bangladesh, kiln fired for durability and rustic earthy flavor enhancement.',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    stockCount: 30,
    isDhakaStock: true,
    specs: {
      'QUANTITY': 'Set of 6 Cups',
      'MATERIAL': 'Natural Earthen Terracotta Clay'
    },
    deliveryOptions: {
      insideDhakaPrice: 70,
      outsideDhakaPrice: 130,
      insideDhakaTime: 'Cash on Delivery (COD) inside Dhaka (24-48 hrs)',
      outsideDhakaTime: 'Outside Dhaka (3-4 days via Courier)'
    },
    enabledWhatsAppOrder: true,
    publishedAt: '2025-04-20'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', count: 24 },
  { id: 'fashion-panjabi', name: 'Fashion & Panjabi', count: 8 },
  { id: 'organic-food', name: 'Organic Food', count: 6 },
  { id: 'leather-goods', name: 'Leather Goods', count: 4 },
  { id: 'handicrafts', name: 'Handicrafts', count: 6 }
];
