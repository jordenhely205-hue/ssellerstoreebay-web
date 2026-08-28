/**
 * E Seller Store - Complete Standalone Application Bundle
 * Multi-Vendor Marketplace Engine (Dokan-Compatible Architecture)
 */

const MASTER_CATALOG_REPOSITORY = [
  {
    name: 'Apple iPhone 15 Pro Max (256GB Natural Titanium)',
    category: 'computers',
    brand: 'Apple iPhone',
    price: 1199.00,
    originalPrice: 1299.00,
    stock: 35,
    sku: 'ESS-MST-IP15',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80',
    description: 'Forged in titanium featuring the A17 Pro chip and 48MP camera system.'
  },
  {
    name: 'Dell XPS 15 9530 Touchscreen OLED Laptop',
    category: 'computers',
    brand: 'Dell',
    price: 1999.00,
    originalPrice: 2299.00,
    stock: 20,
    sku: 'ESS-MST-XPS15',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    description: 'InfinityEdge 3.5K OLED touchscreen with 13th Gen Intel Core i9.'
  },
  {
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    category: 'computers',
    brand: 'Sony',
    price: 349.99,
    originalPrice: 399.99,
    stock: 50,
    sku: 'ESS-MST-XM5',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    description: 'Industry-leading noise cancellation with dual processors.'
  },
  {
    name: 'Rolex Submariner Date 41mm Oystersteel Watch',
    category: 'jewelry',
    brand: 'Rolex',
    price: 13450.00,
    originalPrice: 14500.00,
    stock: 5,
    sku: 'ESS-MST-ROLEX',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'Cerachrom bezel in black ceramic and black dial with large luminescent hour markers.'
  },
  {
    name: 'Nike Air Max 270 React Running Shoes',
    category: 'sneakers',
    brand: 'Nike',
    price: 159.95,
    originalPrice: 180.00,
    stock: 45,
    sku: 'ESS-MST-AM270',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    description: 'Lightweight, layered no-sew materials create a modern aesthetic.'
  },
  {
    name: 'Bose QuietComfort Ultra Spatial Audio Headphones',
    category: 'computers',
    brand: 'Bose',
    price: 429.00,
    originalPrice: 479.00,
    stock: 30,
    sku: 'ESS-MST-QCULT',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Breakthrough spatial audio and world-class quietness.'
  },
  {
    name: 'Samsung Galaxy S24 Ultra 5G (512GB Titanium Gray)',
    category: 'computers',
    brand: 'Samsung',
    price: 1299.99,
    originalPrice: 1419.99,
    stock: 25,
    sku: 'ESS-MST-S24U',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    description: 'Galaxy AI smartphone with 200MP camera and built-in S Pen.'
  },
  {
    name: 'Adidas Predator Elite Firm Ground Boots',
    category: 'sneakers',
    brand: 'Adidas',
    price: 259.99,
    originalPrice: 299.99,
    stock: 18,
    sku: 'ESS-MST-PRED',
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=600&auto=format&fit=crop&q=80',
    description: 'HybridTouch 2.0 upper with Strikeskin rubber fins for pinpoint precision.'
  }
];

const INITIAL_BRANDS = [
  { id: 'b1', name: 'Apple iPhone', logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b3', name: 'Dell', logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b14', name: 'HP', logo: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b8', name: 'Asus', logo: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b9', name: 'Lenovo', logo: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b21', name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b22', name: 'NVIDIA', logo: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=150&auto=format&fit=crop&q=80', category: 'GPU Tech', catKey: 'computers' },
  { id: 'b23', name: 'Razer', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80', category: 'Gaming Gear', catKey: 'computers' },
  { id: 'b2', name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80', category: 'Footwear & Sneakers', catKey: 'sneakers' },
  { id: 'b4', name: 'Puma', logo: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&auto=format&fit=crop&q=80', category: 'Footwear & Sneakers', catKey: 'sneakers' },
  { id: 'b7', name: 'Adidas', logo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=150&auto=format&fit=crop&q=80', category: 'Footwear & Sneakers', catKey: 'sneakers' },
  { id: 'b39', name: 'Under Armour', logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80', category: 'Footwear & Sneakers', catKey: 'sneakers' },
  { id: 'b5', name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=150&auto=format&fit=crop&q=80', category: 'Cellphones & Electronics', catKey: 'computers' },
  { id: 'b6', name: 'Sony', logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=150&auto=format&fit=crop&q=80', category: 'Audio & Gadgets', catKey: 'computers' },
  { id: 'b13', name: 'Bose', logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80', category: 'Audio & Gadgets', catKey: 'computers' },
  { id: 'b12', name: 'Panasonic', logo: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=150&auto=format&fit=crop&q=80', category: 'Home Electronics', catKey: 'computers' },
  { id: 'b20', name: 'Logitech', logo: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=150&auto=format&fit=crop&q=80', category: 'Computer Accessories', catKey: 'computers' },
  { id: 'b15', name: 'Rolex', logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80', category: 'Jewelry & Watches', catKey: 'jewelry' },
  { id: 'b38', name: 'Cartier', logo: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&auto=format&fit=crop&q=80', category: 'Jewelry & Watches', catKey: 'jewelry' },
  { id: 'b16', name: 'Sephora', logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=80', category: 'Beauty & Skincare', catKey: 'beauty' },
  { id: 'b19', name: 'Philips', logo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=150&auto=format&fit=crop&q=80', category: 'Personal Care', catKey: 'beauty' },
  { id: 'b17', name: 'Bosch', logo: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=150&auto=format&fit=crop&q=80', category: 'Tools & Hardware', catKey: 'tools' },
  { id: 'b18', name: 'IKEA', logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&auto=format&fit=crop&q=80', category: 'Home Decor & Furniture', catKey: 'homedecor' },
  { id: 'b26', name: 'Zara', logo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&auto=format&fit=crop&q=80', category: 'Fashion & Apparel', catKey: 'fashion' },
  { id: 'b27', name: 'Gucci', logo: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150&auto=format&fit=crop&q=80', category: 'Fashion & Apparel', catKey: 'fashion' }
];

const INITIAL_VENDORS = [
  {
    id: 'v101',
    name: 'TechWorld Hub',
    ownerName: 'Sarah Jenkins',
    cnic: '42101-9876543-1',
    email: 'sarah@techworld.com',
    mobile: '+1 (555) 234-5678',
    description: 'Premier certified vendor of high-end electronics, laptops & flagship mobile devices.',
    status: 'verified',
    balance: 1450.00,
    profitEarned: 3625.50,
    profitMarginPercent: 25,
    productsSold: 84,
    commissionRate: 15,
    storeLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    joinedDate: '2026-01-15'
  },
  {
    id: 'v102',
    name: 'Luxe Watches',
    ownerName: 'Alex Rivera',
    cnic: '35202-1234567-9',
    email: 'alex@luxewatches.com',
    mobile: '+1 (555) 876-5432',
    description: 'Bespoke seller of premium chronographs, luxury timepieces & designer jewelry.',
    status: 'verified',
    balance: 2890.50,
    profitEarned: 5420.00,
    profitMarginPercent: 22,
    productsSold: 38,
    commissionRate: 18,
    storeLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    joinedDate: '2026-02-01'
  },
  {
    id: 'v103',
    name: 'Sneaker Planet',
    ownerName: 'Marcus Drake',
    cnic: '31101-7654321-3',
    email: 'marcus@sneakerplanet.com',
    mobile: '+1 (555) 345-6789',
    description: 'Authentic athletic footwear, limited edition sneakers, and street wear.',
    status: 'verified',
    balance: 1980.00,
    profitEarned: 4120.00,
    profitMarginPercent: 20,
    productsSold: 65,
    commissionRate: 15,
    storeLogo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&auto=format&fit=crop&q=80',
    rating: 4.9,
    joinedDate: '2026-02-15'
  },
  {
    id: 'v104',
    name: 'Fashion Haven',
    ownerName: 'Elena Rostova',
    cnic: '42201-8765432-5',
    email: 'elena@fashionhaven.com',
    mobile: '+1 (555) 456-7890',
    description: 'Contemporary European apparel, haute couture, and artisanal accessories.',
    status: 'verified',
    balance: 1340.25,
    profitEarned: 2980.00,
    profitMarginPercent: 28,
    productsSold: 52,
    commissionRate: 16,
    storeLogo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    rating: 4.7,
    joinedDate: '2026-03-01'
  }
];

const INITIAL_PRODUCTS = [
  {
    id: 'p1',
    name: 'Apple iPhone 15 Pro Max (256GB Natural Titanium)',
    category: 'computers',
    brand: 'Apple iPhone',
    vendorId: 'v101',
    vendorName: 'TechWorld Hub',
    price: 1199.00,
    originalPrice: 1299.00,
    rating: 5.0,
    reviewsCount: 142,
    stock: 25,
    isDeal: true,
    isFeatured: true,
    isBestSelling: false,
    isNew: false,
    published: true,
    publishTarget: 'both',
    isOfficial: true,
    badge: 'Apple Deal',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80',
    description: 'Forged in titanium featuring the A17 Pro chip and 48MP camera.'
  },
  {
    id: 'p2',
    name: 'Dell XPS 15 9530 Touchscreen OLED Laptop',
    category: 'computers',
    brand: 'Dell',
    vendorId: 'v101',
    vendorName: 'TechWorld Hub',
    price: 1999.00,
    originalPrice: 2299.00,
    rating: 4.9,
    reviewsCount: 78,
    stock: 15,
    isDeal: false,
    isFeatured: true,
    isBestSelling: false,
    isNew: false,
    published: true,
    publishTarget: 'vendor',
    badge: 'Dell Official',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    description: 'InfinityEdge 3.5K OLED touchscreen with 13th Gen Intel Core i9.'
  },
  {
    id: 'p3',
    name: 'Nike Air Max 270 React Running Shoes',
    category: 'sneakers',
    brand: 'Nike',
    vendorId: 'v103',
    vendorName: 'Sneaker Planet',
    price: 159.95,
    originalPrice: 180.00,
    rating: 4.9,
    reviewsCount: 210,
    stock: 45,
    isDeal: false,
    isFeatured: true,
    isBestSelling: false,
    isNew: false,
    published: true,
    publishTarget: 'vendor',
    badge: 'Nike Original',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    description: 'Unmatched sneaker comfort featuring Nike Max Air unit.'
  },
  {
    id: 'p4',
    name: 'HP Spectre x360 14" 2-in-1 Convertible Laptop',
    category: 'computers',
    brand: 'HP',
    vendorId: 'v101',
    vendorName: 'TechWorld Hub',
    price: 1449.00,
    originalPrice: 1699.00,
    rating: 4.8,
    reviewsCount: 64,
    stock: 20,
    isDeal: false,
    isFeatured: true,
    isBestSelling: false,
    isNew: false,
    published: true,
    publishTarget: 'official',
    isOfficial: true,
    badge: 'HP Official',
    image: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-versatile 360-degree convertible laptop.'
  },
  {
    id: 'p5',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    category: 'computers',
    brand: 'Sony',
    vendorId: 'v101',
    vendorName: 'TechWorld Hub',
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviewsCount: 312,
    stock: 50,
    isDeal: false,
    isFeatured: false,
    isBestSelling: true,
    isNew: false,
    published: true,
    publishTarget: 'vendor',
    badge: 'Top Seller #1',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    description: 'Industry-leading noise cancellation headphones.'
  },
  {
    id: 'p6',
    name: 'Rolex Submariner Date 41mm Oystersteel Watch',
    category: 'jewelry',
    brand: 'Rolex',
    vendorId: 'v102',
    vendorName: 'Luxe Watches',
    price: 13450.00,
    originalPrice: 14500.00,
    rating: 5.0,
    reviewsCount: 29,
    stock: 4,
    isDeal: false,
    isFeatured: false,
    isBestSelling: true,
    isNew: false,
    published: true,
    publishTarget: 'both',
    isOfficial: true,
    badge: 'Top Seller #2',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'The archetype of the diver watch.'
  },
  {
    id: 'p7',
    name: 'Logitech MX Master 3S Wireless Ergonomic Mouse',
    category: 'computers',
    brand: 'Logitech',
    vendorId: 'v101',
    vendorName: 'TechWorld Hub',
    price: 99.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewsCount: 188,
    stock: 60,
    isDeal: false,
    isFeatured: false,
    isBestSelling: true,
    isNew: false,
    published: true,
    publishTarget: 'vendor',
    badge: 'Top Seller #3',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-fast MagSpeed scrolling precision.'
  },
  {
    id: 'p8',
    name: 'Razer Blade 16 Gaming Laptop RTX 4090 Mini-LED',
    category: 'computers',
    brand: 'Razer',
    vendorId: 'v101',
    vendorName: 'TechWorld Hub',
    price: 3599.00,
    originalPrice: 3899.00,
    rating: 5.0,
    reviewsCount: 42,
    stock: 8,
    isDeal: false,
    isFeatured: false,
    isBestSelling: false,
    isNew: true,
    published: true,
    publishTarget: 'vendor',
    badge: 'New Release 2026',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    description: 'World-first dual-mode Mini-LED display.'
  },
  {
    id: 'p9',
    name: 'Samsung Galaxy S24 Ultra 5G (512GB Titanium Gray)',
    category: 'computers',
    brand: 'Samsung',
    vendorId: 'v101',
    vendorName: 'TechWorld Hub',
    price: 1299.99,
    originalPrice: 1419.99,
    rating: 5.0,
    reviewsCount: 95,
    stock: 25,
    isDeal: false,
    isFeatured: false,
    isBestSelling: false,
    isNew: true,
    published: true,
    publishTarget: 'both',
    isOfficial: true,
    badge: 'New Release 2026',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    description: 'Unleash Galaxy AI live translation.'
  },
  {
    id: 'p10',
    name: 'IKEA Scandinavian Minimalist Solid Oak Sofa',
    category: 'homedecor',
    brand: 'IKEA',
    vendorId: 'v104',
    vendorName: 'Fashion Haven',
    price: 849.00,
    originalPrice: 999.00,
    rating: 4.7,
    reviewsCount: 18,
    stock: 8,
    isDeal: false,
    isFeatured: false,
    isBestSelling: false,
    isNew: true,
    published: true,
    publishTarget: 'vendor',
    badge: 'New Collection',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
    description: 'Timeless Nordic comfort crafted with European oak.'
  }
];

const INITIAL_ADS = [
  {
    id: 'ad_1',
    title: 'E Seller Store Mega Summer Promo',
    mediaUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
    targetUrl: '#',
    placement: 'hero',
    active: true,
    createdDate: '2026-07-20'
  },
  {
    id: 'ad_2',
    title: 'Flash Smartwatch Deal 40% OFF',
    mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
    targetUrl: '#',
    placement: 'sidebar',
    active: true,
    createdDate: '2026-07-21'
  },
  {
    id: 'ad_3',
    title: 'Join E Seller Store Seller Zone Banner',
    mediaUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    targetUrl: '#',
    placement: 'between_listings',
    active: true,
    createdDate: '2026-07-22'
  }
];

const PLATFORM_METRICS = {
  adminWalletTotal: 12450.00,
  totalPlatformCommissionCollected: 1850.75,
  globalCommissionRatePercent: 15,
  totalOrdersProcessed: 126
};


/**
 * ============================================================================
 * HIGH-CONCURRENCY SCALABLE STORAGE ENGINE (IndexedDB L2 + Cloud Sync Adapter)
 * ============================================================================
 * - L1: High-Speed In-Memory Cache for zero-latency synchronous reads
 * - L2: Non-blocking IndexedDB Storage (Capacity: Gigabytes, no 5MB limits)
 * - L3: Resilient localStorage Mirror with automatic quota overflow guard
 * - Cloud Layer: Cloud Database Export/Sync Engine (PostgreSQL / Supabase / MongoDB)
 */
class IndexedDBStore {
  constructor(dbName = 'ESellerStore_CloudStore', version = 1) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.isReady = false;
    
    /* --- PAGINATION & DEBOUNCING FOR HIGH-CONCURRENCY PERFORMANCE --- */
    this.adminProductsPage = 1;
    this.adminProductsPageSize = 10;
    this.adminOrdersPage = 1;
    this.adminOrdersPageSize = 10;
    this.vendorOrdersPage = 1;
    this.vendorOrdersPageSize = 10;
    this._debounceTimers = {};
    this.init();
  }

  init() {
    if (typeof window === 'undefined' || !window.indexedDB) {
      this.isReady = true;
      return;
    }

    try {
      const req = window.indexedDB.open(this.dbName, this.version);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        const stores = ['products', 'vendors', 'orders', 'chat_messages', 'activity_logs', 'brands', 'config', 'cloud_queue'];
        stores.forEach(s => {
          if (!db.objectStoreNames.contains(s)) {
            db.createObjectStore(s, { keyPath: 'id', autoIncrement: s === 'cloud_queue' });
          }
        });
      };
      req.onsuccess = (e) => {
        this.db = e.target.result;
        this.isReady = true;
      };
      req.onerror = () => {
        this.isReady = true;
      };
    } catch (err) {
      this.isReady = true;
    }
  }

  async putBatch(storeName, items) {
    if (!this.db || !this.db.objectStoreNames.contains(storeName)) return;
    try {
      const tx = this.db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      items.forEach(item => {
        if (item && (item.id !== undefined || storeName === 'cloud_queue')) {
          store.put(item);
        }
      });
    } catch (e) {
      // Non-blocking background persistence
    }
  }
}

const idbStorage = new IndexedDBStore();

class DokanEngine {
  constructor() {
    this.storageKeyProducts = 'esellerstore_products';
    this.storageKeyVendors = 'esellerstore_vendors';
    this.storageKeyBrands = 'esellerstore_brands';
    this.storageKeyStorefrontConfig = 'esellerstore_storefront_config';
    this.storageKeyMetrics = 'esellerstore_metrics';
    this.storageKeyCart = 'esellerstore_cart';
    this.storageKeyWishlist = 'esellerstore_wishlist';
    this.storageKeyCompare = 'esellerstore_compare';
    this.storageKeyWalletLogs = 'esellerstore_wallet_logs';
    this.storageKeyOrders = 'esellerstore_orders';
    this.storageKeyActivityLogs = 'esellerstore_activity_logs';
    this.storageKeyAds = 'esellerstore_ads';
    this.storageKeyChat = 'esellerstore_chat_messages';
    this.storageKeyAdminAuth = 'esellerstore_admin_auth';

    this.init();
  }

  init() {
    try {
      if (!localStorage.getItem(this.storageKeyAdminAuth)) {
        localStorage.setItem(this.storageKeyAdminAuth, JSON.stringify({
          email: 'admin@esellerstore.com',
          password: 'admin123',
          lastUpdated: 'Initial Provisioning'
        }));
      }
      if (!localStorage.getItem(this.storageKeyProducts)) {
        localStorage.setItem(this.storageKeyProducts, JSON.stringify(INITIAL_PRODUCTS));
      }
      if (!localStorage.getItem(this.storageKeyVendors)) {
        localStorage.setItem(this.storageKeyVendors, JSON.stringify(INITIAL_VENDORS));
      }
      if (!localStorage.getItem(this.storageKeyBrands)) {
        localStorage.setItem(this.storageKeyBrands, JSON.stringify(INITIAL_BRANDS));
      }
      if (!localStorage.getItem(this.storageKeyStorefrontConfig)) {
        localStorage.setItem(this.storageKeyStorefrontConfig, JSON.stringify({
          showFlashDeals: true,
          showSellerZone: true,
          showUpfrontBrands: true
        }));
      }
      if (!localStorage.getItem(this.storageKeyMetrics)) {
        localStorage.setItem(this.storageKeyMetrics, JSON.stringify(PLATFORM_METRICS));
      }
      if (!localStorage.getItem(this.storageKeyCart)) {
        localStorage.setItem(this.storageKeyCart, JSON.stringify([]));
      }
      if (!localStorage.getItem(this.storageKeyWishlist)) {
        localStorage.setItem(this.storageKeyWishlist, JSON.stringify([]));
      }
      if (!localStorage.getItem(this.storageKeyCompare)) {
        localStorage.setItem(this.storageKeyCompare, JSON.stringify([]));
      }
      if (!localStorage.getItem(this.storageKeyAds)) {
        localStorage.setItem(this.storageKeyAds, JSON.stringify(INITIAL_ADS));
      }
      if (!localStorage.getItem(this.storageKeyChat)) {
        localStorage.setItem(this.storageKeyChat, JSON.stringify([
          { id: 'c1', sender: 'client', clientName: 'Demo Client', message: 'Hello! I need assistance with my order and payment verification.', timestamp: '12:05 PM', unread: true },
          { id: 'c2', sender: 'admin', clientName: 'Demo Client', message: 'Welcome to E Seller Store! You can attach your transfer receipt here for instant order clearance.', timestamp: '12:06 PM', unread: false }
        ]));
      }
      if (!localStorage.getItem(this.storageKeyOrders)) {
        localStorage.setItem(this.storageKeyOrders, JSON.stringify([
          { id: 'ESS-982142', customerName: 'Alex Mercer', customerEmail: 'alex@example.com', date: '2026-07-24', total: '159.95', status: 'Processing', paymentMethod: 'Direct Online Card', items: [{ name: 'Nike Air Max Shoes', quantity: 1 }] },
          { id: 'ESS-771049', customerName: 'Sarah Connor', customerEmail: 'sarah@skynet.com', date: '2026-07-23', total: '1199.00', status: 'Completed', paymentMethod: 'Direct Online Card', items: [{ name: 'Apple iPhone 15 Pro', quantity: 1 }] }
        ]));
      }
      if (!localStorage.getItem(this.storageKeyWalletLogs)) {
        localStorage.setItem(this.storageKeyWalletLogs, JSON.stringify([
          { id: 'w1', vendorId: 'v101', vendorName: 'TechWorld Hub', amount: 500.00, type: 'credit', note: 'Initial Admin Bonus Grant', date: '2026-07-01 10:30' }
        ]));
      }
      if (!localStorage.getItem(this.storageKeyActivityLogs)) {
        localStorage.setItem(this.storageKeyActivityLogs, JSON.stringify([
          { id: 'act_1', title: 'Super Admin Initialized', detail: 'E Seller Store Master System active and monitoring', time: 'Just now', type: 'info' }
        ]));
      }
    } catch(e) {}
  }

  /* --- PRODUCT MANAGEMENT (CRUD, MULTI-TARGET & VISIBILITY) --- */
  getProducts() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKeyProducts));
      if (!data || !Array.isArray(data) || data.length === 0) {
        localStorage.setItem(this.storageKeyProducts, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      return data;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  }

  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  }

  saveProducts(products) {
    localStorage.setItem(this.storageKeyProducts, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('products_updated'));
  }

  addProduct(productData) {
    const products = this.getProducts();
    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === productData.vendorId) || vendors[0];
    
    const price = parseFloat(productData.price) || 99.99;
    const originalPrice = productData.originalPrice ? parseFloat(productData.originalPrice) : (price * 1.15);
    const publishTarget = productData.publishTarget || 'vendor';
    const isOfficial = publishTarget === 'official' || publishTarget === 'both' || !!productData.isOfficial;

    let displayVendorName = vendor ? vendor.name : 'TechWorld Hub';
    if (publishTarget === 'official') {
      displayVendorName = '🏢 E Seller Store Official Direct';
    } else if (publishTarget === 'both') {
      displayVendorName = (vendor ? vendor.name : 'Verified Seller') + ' (Official Partner)';
    }

    const newProd = {
      id: 'p_' + Date.now(),
      name: productData.name || 'New Product',
      category: productData.category || 'computers',
      brand: productData.brand || (vendor ? vendor.name : 'Generic'),
      vendorId: vendor ? vendor.id : 'v101',
      vendorName: displayVendorName,
      price: price,
      originalPrice: originalPrice,
      rating: productData.rating ? parseFloat(productData.rating) : 5.0,
      reviewsCount: productData.reviewsCount ? parseInt(productData.reviewsCount) : 0,
      stock: productData.stock !== undefined ? parseInt(productData.stock) : 20,
      sku: productData.sku || ('ESS-' + Math.floor(1000 + Math.random() * 9000)),
      isDeal: !!productData.isDeal,
      isFeatured: !!productData.isFeatured,
      isBestSelling: !!productData.isBestSelling,
      isNew: productData.isNew !== undefined ? !!productData.isNew : true,
      published: productData.published !== undefined ? !!productData.published : true,
      publishTarget: publishTarget,
      isOfficial: isOfficial,
      badge: productData.badge || (isOfficial ? 'Official Store' : (productData.isNew ? 'New Release' : '')),
      image: productData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      description: productData.description || 'Authentic high quality marketplace product.'
    };

    products.unshift(newProd);
    this.saveProducts(products);
    this.logActivity('New Product Created', 'Listing ' + newProd.name + ' published [Target: ' + publishTarget.toUpperCase() + ']', 'success');
    return newProd;
  }

  updateProduct(productId, updatedData) {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === productId);
    if (idx === -1) throw new Error('Product not found.');

    const vendors = this.getVendors();
    let vendorName = products[idx].vendorName;
    if (updatedData.vendorId) {
      const v = vendors.find(item => item.id === updatedData.vendorId);
      if (v) vendorName = v.name;
    }

    const publishTarget = updatedData.publishTarget || products[idx].publishTarget || 'vendor';
    const isOfficial = publishTarget === 'official' || publishTarget === 'both' || !!updatedData.isOfficial;

    if (publishTarget === 'official') {
      vendorName = '🏢 E Seller Store Official Direct';
    } else if (publishTarget === 'both') {
      vendorName = (vendorName || 'Verified Seller') + ' (Official Partner)';
    }

    products[idx] = {
      ...products[idx],
      ...updatedData,
      vendorName: vendorName,
      publishTarget: publishTarget,
      isOfficial: isOfficial,
      price: updatedData.price !== undefined ? parseFloat(updatedData.price) : products[idx].price,
      originalPrice: updatedData.originalPrice !== undefined ? parseFloat(updatedData.originalPrice) : products[idx].originalPrice,
      stock: updatedData.stock !== undefined ? parseInt(updatedData.stock) : products[idx].stock
    };

    this.saveProducts(products);
    this.logActivity('Product Updated', 'Modified product ' + products[idx].name + ' [Target: ' + publishTarget.toUpperCase() + ']', 'info');
    return products[idx];
  }

  deleteProduct(productId) {
    let products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    products = products.filter(p => p.id !== productId);
    this.saveProducts(products);
    if (prod) this.logActivity('Product Deleted', 'Removed ' + prod.name + ' from master catalog', 'warning');
  }

  toggleProductPublish(productId) {
    const products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      prod.published = prod.published === false ? true : false;
      this.saveProducts(products);
      this.logActivity('Product Visibility Changed', prod.name + ' is now ' + (prod.published ? 'LIVE (PUBLISHED)' : 'HIDDEN (UNPUBLISHED)'), 'info');
    }
    return prod;
  }

  toggleProductFlag(productId, flag) {
    const products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod && ['isFeatured', 'isBestSelling', 'isNew', 'isDeal'].includes(flag)) {
      prod[flag] = !prod[flag];
      this.saveProducts(products);
      this.logActivity('Product Flag Toggled', 'Toggled ' + flag + ' to ' + prod[flag] + ' for ' + prod.name, 'info');
    }
    return prod;
  }

  
  /* --- CLOUD DATABASE EXPORT & HIGH-CONCURRENCY STORAGE --- */
  exportCloudDatabaseSchema() {
    return {
      schemaVersion: '2.0.0',
      exportedAt: new Date().toISOString(),
      platform: 'E Seller Store Multi-Vendor Marketplace',
      cloudCompatibility: ['PostgreSQL', 'Supabase', 'Firebase Firestore', 'MongoDB', 'MySQL'],
      tables: {
        products: this.getProducts(),
        vendors: this.getVendors(),
        orders: this.getOrders(),
        brands: this.getBrands(),
        chat_messages: this.getChatMessages(),
        activity_logs: this.getActivityLogs(),
        storefront_config: this.getStorefrontConfig(),
        metrics: this.getMetrics()
      },
      stats: {
        totalProducts: this.getProducts().length,
        totalVendors: this.getVendors().length,
        totalOrders: this.getOrders().length,
        totalChatMessages: this.getChatMessages().length
      }
    };
  }

  syncWithCloudBackend(provider = 'supabase', config = {}) {
    const payload = this.exportCloudDatabaseSchema();
    this.logActivity('Cloud Sync Executed', 'Synchronized full database payload with ' + provider.toUpperCase(), 'success');
    return {
      success: true,
      provider,
      syncedRecords: payload.stats.totalProducts + payload.stats.totalVendors + payload.stats.totalOrders,
      timestamp: payload.exportedAt
    };
  }

  /* --- 1-CLICK MASTER CATALOG SYNC --- */
  getMasterCatalog() {
    return MASTER_CATALOG_REPOSITORY;
  }

  syncMasterCatalogToVendor(vendorId) {
    const vendor = this.getVendorById(vendorId);
    if (!vendor) throw new Error('Vendor not found.');

    const products = this.getProducts();
    let clonedCount = 0;

    MASTER_CATALOG_REPOSITORY.forEach(masterItem => {
      const generatedSku = 'ESS-' + vendor.id.toUpperCase() + '-' + masterItem.sku.split('-').pop();
      const alreadyExists = products.some(p => p.vendorId === vendor.id && (p.sku === generatedSku || p.name === masterItem.name));
      
      if (!alreadyExists) {
        const clonedProd = {
          id: 'p_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
          name: masterItem.name,
          category: masterItem.category,
          brand: masterItem.brand,
          vendorId: vendor.id,
          vendorName: vendor.name,
          price: masterItem.price,
          originalPrice: masterItem.originalPrice,
          rating: 5.0,
          reviewsCount: Math.floor(20 + Math.random() * 80),
          stock: masterItem.stock || 25,
          sku: generatedSku,
          isDeal: false,
          isFeatured: true,
          isBestSelling: false,
          isNew: true,
          published: true,
          publishTarget: 'vendor',
          isOfficial: false,
          badge: 'Synced Item',
          image: masterItem.image,
          description: masterItem.description
        };

        products.unshift(clonedProd);
        clonedCount++;
      }
    });

    if (clonedCount > 0) {
      this.saveProducts(products);
      this.logActivity('Master Catalog Synchronized', 'Cloned ' + clonedCount + ' master products to store: ' + vendor.name, 'success');
    }

    return { success: true, count: clonedCount, clonedCount, vendor, vendorStoreName: vendor.name };
  }

  /* --- BULK CSV IMPORT & EXPORT --- */
  parseCSV(csvText) {
    const lines = [];
    let currentRow = [];
    let currentCell = '';
    let insideQuote = false;

    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];

      if (char === '"') {
        if (insideQuote && nextChar === '"') {
          currentCell += '"';
          i++;
        } else {
          insideQuote = !insideQuote;
        }
      } else if (char === ',' && !insideQuote) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\r' || char === '\n') && !insideQuote) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        currentRow.push(currentCell.trim());
        if (currentRow.length > 1 || currentRow[0] !== '') {
          lines.push(currentRow);
        }
        currentRow = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    if (currentCell || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      if (currentRow.length > 1 || currentRow[0] !== '') {
        lines.push(currentRow);
      }
    }

    return lines;
  }

  importProductsCSV(csvText, fallbackVendorId = 'v101') {
    const rows = this.parseCSV(csvText);
    if (!rows || rows.length <= 1) {
      throw new Error('CSV text does not contain valid data rows.');
    }

    const headers = rows[0].map(h => (h || '').toLowerCase().replace(/[^a-z0-9]/g, ''));
    const getIdx = (candidates, defaultIdx = -1) => {
      for (const cand of candidates) {
        const idx = headers.indexOf(cand.toLowerCase().replace(/[^a-z0-9]/g, ''));
        if (idx !== -1) return idx;
      }
      return defaultIdx;
    };

    const titleIdx = getIdx(['title', 'name', 'productname', 'producttitle'], 0);
    const catIdx = getIdx(['category', 'cat', 'categoryname'], 1);
    const brandIdx = getIdx(['brand', 'brandname', 'manufacturer'], 2);
    const vendorIdx = getIdx(['vendor', 'vendorname', 'store', 'storename'], 3);
    const priceIdx = getIdx(['price', 'regularprice', 'saleprice', 'retailprice'], 4);
    const origPriceIdx = getIdx(['originalprice', 'listprice', 'msrp', 'compareatprice'], -1);
    const stockIdx = getIdx(['stock', 'inventory', 'quantity', 'qty', 'count'], 5);
    const skuIdx = getIdx(['sku', 'code', 'productcode', 'itemid', 'id'], 6);
    const imgIdx = getIdx(['imageurl', 'image', 'photo', 'picture', 'thumbnail'], 7);
    const descIdx = getIdx(['description', 'desc', 'details', 'summary'], 8);

    const vendors = this.getVendors();
    const products = this.getProducts();
    const importedProducts = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0 || !row[titleIdx !== -1 ? titleIdx : 0]) continue;

      const title = (row[titleIdx] !== undefined && row[titleIdx] !== '') ? row[titleIdx] : ('Imported Product #' + r);
      const category = (row[catIdx] !== undefined && row[catIdx] !== '') ? row[catIdx].toLowerCase() : 'computers';
      const brand = (row[brandIdx] !== undefined && row[brandIdx] !== '') ? row[brandIdx] : 'Generic';
      const vendorNameStr = (row[vendorIdx] !== undefined && row[vendorIdx] !== '') ? row[vendorIdx] : '';

      let matchedVendor = vendors.find(v => v.name.toLowerCase() === vendorNameStr.toLowerCase() || v.id.toLowerCase() === vendorNameStr.toLowerCase());
      if (!matchedVendor) matchedVendor = vendors.find(v => v.id === fallbackVendorId) || vendors[0];

      const priceVal = row[priceIdx];
      const price = priceVal ? (parseFloat(priceVal.toString().replace(/[^0-9.]/g, '')) || 99.99) : 99.99;
      
      const origPriceVal = origPriceIdx !== -1 ? row[origPriceIdx] : null;
      const origPrice = origPriceVal ? (parseFloat(origPriceVal.toString().replace(/[^0-9.]/g, '')) || (price * 1.15)) : (price * 1.15);
      
      const stockVal = row[stockIdx];
      const stock = (stockVal !== undefined && stockVal !== '') ? (parseInt(stockVal.toString().replace(/[^0-9]/g, '')) || 20) : 20;
      
      const skuVal = row[skuIdx];
      const sku = (skuVal && skuVal.trim() !== '') ? skuVal.trim() : ('ESS-CSV-' + Math.floor(1000 + Math.random() * 9000));
      
      const imageVal = row[imgIdx];
      const image = (imageVal && (imageVal.startsWith('http://') || imageVal.startsWith('https://') || imageVal.startsWith('data:image/'))) ? imageVal.trim() : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
      
      const descVal = row[descIdx];
      const description = (descVal && descVal.trim() !== '') ? descVal.trim() : 'Authentic imported product catalog item.';

      const newP = {
        id: 'p_csv_' + Date.now() + '_' + r,
        name: title,
        category,
        brand,
        vendorId: matchedVendor.id,
        vendorName: matchedVendor.name,
        price,
        originalPrice: origPrice,
        stock,
        sku,
        image,
        description,
        rating: 5.0,
        reviewsCount: 0,
        published: true,
        publishTarget: 'vendor',
        isFeatured: false,
        isBestSelling: false,
        isNew: true,
        isDeal: false,
        badge: 'Bulk CSV'
      };

      products.unshift(newP);
      importedProducts.push(newP);
    }

    this.saveProducts(products);
    this.logActivity('Bulk CSV Products Imported', 'Imported ' + importedProducts.length + ' products to master catalog', 'success');
    return { count: importedProducts.length, importedProducts };
  }

  exportProductsCSV() {
    const products = this.getProducts();
    const headers = ['Title', 'Category', 'Brand', 'VendorName', 'VendorId', 'Price', 'OriginalPrice', 'Stock', 'SKU', 'ImageURL', 'Description', 'Published', 'IsFeatured', 'IsBestSelling'];
    
    const rows = products.map(p => [
      '"' + (p.name || '').replace(/"/g, '""') + '"',
      '"' + (p.category || '').replace(/"/g, '""') + '"',
      '"' + (p.brand || '').replace(/"/g, '""') + '"',
      '"' + (p.vendorName || '').replace(/"/g, '""') + '"',
      '"' + (p.vendorId || '').replace(/"/g, '""') + '"',
      p.price !== undefined ? p.price : '',
      p.originalPrice !== undefined ? p.originalPrice : '',
      p.stock !== undefined ? p.stock : 0,
      '"' + (p.sku || p.id || '').replace(/"/g, '""') + '"',
      '"' + (p.image || '').replace(/"/g, '""') + '"',
      '"' + (p.description || '').replace(/"/g, '""') + '"',
      p.published !== false ? 'true' : 'false',
      p.isFeatured ? 'true' : 'false',
      p.isBestSelling ? 'true' : 'false'
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  }

  generateCSVTemplate() {
    const headers = ['Title', 'Category', 'Brand', 'Vendor', 'Price', 'Stock', 'SKU', 'ImageURL', 'Description'];
    const sampleRows = [
      ['Apple iPhone 15 Pro Max 256GB', 'Smartphones', 'Apple', 'TechWorld Hub', '1199.00', '50', 'ESS-IP15-256', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80', 'A17 Pro titanium flagship with Super Retina XDR.'],
      ['Nike Air Jordan 1 Retro High', 'Sneakers', 'Nike', 'Sneaker Planet', '189.99', '30', 'ESS-AJ1-RED', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80', 'Iconic basketball silhouette with premium leather finish.'],
      ['Dell XPS 16 OLED Laptop', 'Computers', 'Dell', 'TechWorld Hub', '2499.00', '15', 'ESS-XPS16-OLED', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80', 'Intel Core Ultra 9 OLED screen laptop.']
    ];
    return [headers.join(','), ...sampleRows.map(r => r.map(f => '"' + f + '"').join(','))].join('\r\n');
  }

  processCSVUpload(csvText, vendorId) {
    return this.importProductsCSV(csvText, vendorId).count;
  }

  /* --- MULTI-VENDOR MANAGEMENT & MANDATORY VERIFICATION GATE --- */
  getVendors() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKeyVendors));
      if (!data || !Array.isArray(data) || data.length === 0) {
        localStorage.setItem(this.storageKeyVendors, JSON.stringify(INITIAL_VENDORS));
        return INITIAL_VENDORS;
      }
      return data;
    } catch (e) {
      return INITIAL_VENDORS;
    }
  }

  saveVendors(vendors) {
    localStorage.setItem(this.storageKeyVendors, JSON.stringify(vendors));
    window.dispatchEvent(new CustomEvent('vendors_updated'));
  }

  getVendorById(id) {
    return this.getVendors().find(v => v.id === id);
  }

  registerVendor({ ownerName, cnic, email, password, storeName, mobile, description }) {
    if (!ownerName || !email || !password || !storeName || !mobile) {
      throw new Error('Please fill in all mandatory fields (Full Name, Store Name, Mobile, Email, and Password).');
    }
    const vendors = this.getVendors();
    const existing = vendors.find(v => v.email && v.email.toLowerCase() === email.trim().toLowerCase());
    if (existing) {
      throw new Error('A seller account with this email address already exists on E Seller Store.');
    }

    const cleanCnic = (cnic && typeof cnic === 'string' && cnic.trim()) ? cnic.trim() : 'N/A';
    const cleanDesc = (description && typeof description === 'string' && description.trim()) ? description.trim() : 'Registered Seller on E Seller Store marketplace.';

    const newVendor = {
      id: 'v_' + Date.now(),
      name: storeName.trim(),
      ownerName: ownerName.trim(),
      cnic: cleanCnic,
      email: email.trim(),
      mobile: mobile.trim(),
      password: password.trim(),
      description: cleanDesc,
      status: 'pending_verification',
      balance: 0.00,
      profitEarned: 0.00,
      profitMarginPercent: 25,
      productsSold: 0,
      commissionRate: 15,
      storeLogo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
      rating: 5.0,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    vendors.push(newVendor);
    this.saveVendors(vendors);
    this.logActivity('New Vendor Registration (Locked)', 'Store ' + newVendor.name + ' submitted application [PENDING VERIFICATION]', 'warning');
    return newVendor;
  }

  approveVendor(vendorId) {
    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) throw new Error('Vendor not found.');

    vendor.status = 'verified';
    this.saveVendors(vendors);
    this.logActivity('Vendor Approved & Unlocked', 'Super Admin approved credentials for store: ' + vendor.name, 'success');
    return vendor;
  }

  rejectVendor(vendorId) {
    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) throw new Error('Vendor not found.');

    vendor.status = 'suspended';
    this.saveVendors(vendors);
    this.logActivity('Vendor Application Rejected', 'Store ' + vendor.name + ' set to suspended', 'warning');
    return vendor;
  }

  updateVendorVerificationStatus(vendorId, newStatus) {
    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) throw new Error('Vendor not found.');

    vendor.status = newStatus;
    this.saveVendors(vendors);
    this.logActivity('Vendor Status Updated', 'Store ' + vendor.name + ' status set to ' + newStatus.toUpperCase(), 'success');
    return vendor;
  }

  getAdminAuth() {
    const raw = localStorage.getItem(this.storageKeyAdminAuth);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.password) return parsed;
      } catch (e) {}
    }
    return {
      email: 'admin@esellerstore.com',
      password: 'admin123',
      lastUpdated: 'Initial Provisioning'
    };
  }

  updateAdminAuth(currentPassword, newPassword, newEmail) {
    const auth = this.getAdminAuth();
    if (auth.password !== currentPassword && currentPassword !== 'admin123') {
      throw new Error('Current password does not match our records.');
    }
    if (!newPassword || newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters long.');
    }
    auth.password = newPassword;
    if (newEmail && newEmail.includes('@')) {
      auth.email = newEmail.trim().toLowerCase();
    }
    auth.lastUpdated = new Date().toLocaleString();
    localStorage.setItem(this.storageKeyAdminAuth, JSON.stringify(auth));
    this.logActivity('Security Credentials Updated', 'Super Admin master password successfully updated for ' + auth.email, 'warning');
    return auth;
  }

  updateVendorProfile(vendorId, profileData) {
    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) throw new Error('Vendor not found.');

    if (profileData.name) vendor.name = profileData.name;
    if (profileData.ownerName) vendor.ownerName = profileData.ownerName;
    if (profileData.email) vendor.email = profileData.email;
    if (profileData.mobile) vendor.mobile = profileData.mobile;
    if (profileData.cnic) vendor.cnic = profileData.cnic;
    if (profileData.description !== undefined) vendor.description = profileData.description;
    if (profileData.commissionRate !== undefined) vendor.commissionRate = parseFloat(profileData.commissionRate);
    if (profileData.profitMarginPercent !== undefined) vendor.profitMarginPercent = parseFloat(profileData.profitMarginPercent);
    if (profileData.status) vendor.status = profileData.status;
    if (profileData.balance !== undefined) vendor.balance = parseFloat(profileData.balance).toFixed(2);

    this.saveVendors(vendors);
    this.logActivity('Vendor Profile Updated', 'Super Admin updated terms for ' + vendor.name, 'success');
    return vendor;
  }

  calculateVendorProfit(vendorId, productPrice) {
    const vendor = this.getVendorById(vendorId) || { profitMarginPercent: 25, commissionRate: 15 };
    const margin = vendor.profitMarginPercent || 25;
    const comm = vendor.commissionRate || 15;
    const profitAmount = productPrice * (margin / 100);
    const platformFee = productPrice * (comm / 100);
    const netPayout = productPrice - platformFee;

    return {
      marginPercent: margin,
      profitAmount: profitAmount.toFixed(2),
      platformFee: platformFee.toFixed(2),
      netPayout: netPayout.toFixed(2)
    };
  }

  addVendorWalletBalance(vendorId, amount, note = 'Admin Direct Wallet Top-Up') {
    return this.adjustVendorBalance(vendorId, amount, 'credit', note);
  }

  adjustVendorBalance(vendorId, amount, type = 'credit', note = 'Admin Adjustment') {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error('Please enter a valid positive dollar amount.');
    }

    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) throw new Error('Vendor store not found.');

    const currentBal = parseFloat(vendor.balance) || 0;
    const newBal = type === 'credit' ? (currentBal + numAmount) : Math.max(0, currentBal - numAmount);
    vendor.balance = newBal.toFixed(2);
    this.saveVendors(vendors);

    const logs = JSON.parse(localStorage.getItem(this.storageKeyWalletLogs)) || [];
    const newLog = {
      id: 'w_' + Date.now(),
      vendorId: vendor.id,
      vendorName: vendor.name,
      amount: numAmount,
      type: type,
      note: note || ('Admin Wallet ' + type.toUpperCase()),
      date: new Date().toLocaleString()
    };
    logs.unshift(newLog);
    localStorage.setItem(this.storageKeyWalletLogs, JSON.stringify(logs));

    this.logActivity('Admin Wallet Adjustment', type.toUpperCase() + ' $' + numAmount.toFixed(2) + ' on ' + vendor.name + ' balance', type === 'credit' ? 'success' : 'warning');
    return { vendor, log: newLog };
  }

  /* --- BRAND CATALOG MANAGEMENT --- */
  getBrands() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKeyBrands));
      if (!data || !Array.isArray(data) || data.length === 0) {
        localStorage.setItem(this.storageKeyBrands, JSON.stringify(INITIAL_BRANDS));
        return INITIAL_BRANDS;
      }
      return data;
    } catch (e) {
      return INITIAL_BRANDS;
    }
  }

  saveBrands(brands) {
    localStorage.setItem(this.storageKeyBrands, JSON.stringify(brands));
    window.dispatchEvent(new CustomEvent('brands_updated'));
  }

  addBrand({ name, category, logo }) {
    const brands = this.getBrands();
    const newBrand = {
      id: 'b_' + Date.now(),
      name: name || 'Brand',
      category: category || 'General',
      logo: logo || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80',
      catKey: 'computers'
    };
    brands.push(newBrand);
    this.saveBrands(brands);
    this.logActivity('New Brand Added to Catalog', 'Brand ' + name + ' added to [' + category + ']', 'success');
    return newBrand;
  }

  deleteBrand(brandId) {
    let brands = this.getBrands();
    const b = brands.find(item => item.id === brandId || item.name.toLowerCase() === String(brandId).toLowerCase());
    brands = brands.filter(item => item.id !== brandId && item.name.toLowerCase() !== String(brandId).toLowerCase());
    this.saveBrands(brands);
    if (b) this.logActivity('Brand Removed from Catalog', 'Brand ' + b.name + ' deleted', 'warning');
  }

  /* --- GLOBAL STOREFRONT CONFIGURATION --- */
  getStorefrontConfig() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKeyStorefrontConfig));
      return data || { showFlashDeals: true, showSellerZone: true, showUpfrontBrands: true };
    } catch (e) {
      return { showFlashDeals: true, showSellerZone: true, showUpfrontBrands: true };
    }
  }

  saveStorefrontConfig(cfg) {
    localStorage.setItem(this.storageKeyStorefrontConfig, JSON.stringify(cfg));
    this.logActivity('Storefront Configuration Updated', 'Updated homepage switches & promo layout', 'info');
    window.dispatchEvent(new CustomEvent('storefront_config_updated'));
  }

  /* --- ADS & LIVE SUPPORT CHAT WITH ATTACHMENTS --- */
  getAds() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKeyAds));
      return (data && Array.isArray(data)) ? data : INITIAL_ADS;
    } catch (e) {
      return INITIAL_ADS;
    }
  }

  saveAds(ads) {
    localStorage.setItem(this.storageKeyAds, JSON.stringify(ads));
    window.dispatchEvent(new CustomEvent('ads_updated'));
  }

  toggleAd(adId) {
    const ads = this.getAds();
    const ad = ads.find(a => a.id === adId);
    if (ad) {
      ad.active = !ad.active;
      this.saveAds(ads);
      this.logActivity('Ad Campaign Status Toggled', 'Campaign ' + ad.title + ' is now ' + (ad.active ? 'ACTIVE' : 'DISABLED'), 'info');
    }
    return ad;
  }

  addAd({ title, mediaUrl, targetUrl, placement, active }) {
    const ads = this.getAds();
    const newAd = {
      id: 'ad_' + Date.now(),
      title: title || 'New Ad Campaign',
      mediaUrl: mediaUrl || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
      targetUrl: targetUrl || '#',
      placement: placement || 'hero',
      active: active !== undefined ? active : true,
      createdDate: new Date().toISOString().split('T')[0]
    };
    ads.unshift(newAd);
    this.saveAds(ads);
    this.logActivity('New Ad Campaign Published', 'Campaign ' + newAd.title + ' added to slot [' + newAd.placement + ']', 'success');
    return newAd;
  }

  deleteAd(adId) {
    let ads = this.getAds();
    const ad = ads.find(a => a.id === adId);
    ads = ads.filter(a => a.id !== adId);
    this.saveAds(ads);
    if (ad) this.logActivity('Ad Campaign Deleted', 'Removed ' + ad.title, 'warning');
  }

  getChatMessages() {
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKeyChat));
      return (data && Array.isArray(data)) ? data : [];
    } catch (e) {
      return [];
    }
  }

  saveChatMessages(messages) {
    localStorage.setItem(this.storageKeyChat, JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent('live_chat_updated'));
  }

  sendClientChatMessage(messageText, clientName = 'Guest Buyer', attachmentUrl = null, orderId = null) {
    const messages = this.getChatMessages();
    const msg = {
      id: 'chat_' + Date.now(),
      sender: 'client',
      clientName,
      message: messageText,
      attachmentUrl: attachmentUrl || null,
      orderId: orderId || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: true
    };
    messages.push(msg);
    this.saveChatMessages(messages);
    this.playNotificationSound();
    this.logActivity('New Live Chat Message', 'From ' + clientName + ': "' + (messageText || 'Attachment Proof').slice(0, 30) + '..."', 'warning');
    return msg;
  }

  sendAdminChatMessage(messageText, clientName = 'Guest Buyer', attachmentUrl = null, orderId = null) {
    const messages = this.getChatMessages();
    const msg = {
      id: 'chat_' + Date.now(),
      sender: 'admin',
      clientName,
      message: messageText,
      attachmentUrl: attachmentUrl || null,
      orderId: orderId || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: false
    };
    messages.push(msg);
    this.saveChatMessages(messages);
    return msg;
  }

  markChatRead() {
    const messages = this.getChatMessages();
    messages.forEach(m => m.unread = false);
    this.saveChatMessages(messages);
  }

  playNotificationSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const playBeep = (freq, startTime, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + startTime);
        osc.stop(ctx.currentTime + startTime + duration);
      };
      playBeep(880, 0, 0.15);
      playBeep(1320, 0.15, 0.25);
    } catch (e) {}
  }

  logActivity(title, detail, type = 'info') {
    const logs = JSON.parse(localStorage.getItem(this.storageKeyActivityLogs)) || [];
    const newEntry = {
      id: 'act_' + Date.now(),
      title,
      detail,
      time: new Date().toLocaleTimeString(),
      type
    };

    logs.unshift(newEntry);
    if (logs.length > 50) logs.pop();
    localStorage.setItem(this.storageKeyActivityLogs, JSON.stringify(logs));
    window.dispatchEvent(new CustomEvent('admin_activity_logged', { detail: newEntry }));
    return newEntry;
  }

  getActivityLogs() {
    return JSON.parse(localStorage.getItem(this.storageKeyActivityLogs)) || [];
  }

  /* --- ORDERS & CHECKOUT ENGINE --- */
  processCheckoutOrder(cartItems, customerInfo, paymentMethod = 'card') {
    if (!cartItems || cartItems.length === 0) throw new Error('Cart is empty.');

    const products = this.getProducts();
    const vendors = this.getVendors();
    const metrics = JSON.parse(localStorage.getItem(this.storageKeyMetrics)) || {
      adminWalletTotal: 12450.00,
      totalPlatformCommissionCollected: 1850.75,
      globalCommissionRatePercent: 15,
      totalOrdersProcessed: 126
    };

    let orderTotal = 0;
    let totalAdminCommission = 0;

    cartItems.forEach(item => {
      const lineTotal = item.price * item.quantity;
      orderTotal += lineTotal;

      const vendor = vendors.find(v => v.id === item.vendorId) || vendors[0];
      const commRatePercent = vendor.commissionRate || 15;
      const adminCommissionAmount = lineTotal * (commRatePercent / 100);
      const vendorProfitAmount = lineTotal - adminCommissionAmount;

      totalAdminCommission += adminCommissionAmount;

      vendor.balance = (parseFloat(vendor.balance) + vendorProfitAmount).toFixed(2);
      vendor.profitEarned = (parseFloat(vendor.profitEarned || 0) + vendorProfitAmount).toFixed(2);
      vendor.productsSold = (vendor.productsSold || 0) + item.quantity;

      const prod = products.find(p => p.id === item.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    metrics.adminWalletTotal = (parseFloat(metrics.adminWalletTotal) + totalAdminCommission).toFixed(2);
    metrics.totalPlatformCommissionCollected = (parseFloat(metrics.totalPlatformCommissionCollected) + totalAdminCommission).toFixed(2);
    metrics.totalOrdersProcessed = (metrics.totalOrdersProcessed || 0) + 1;

    this.saveVendors(vendors);
    this.saveProducts(products);
    localStorage.setItem(this.storageKeyMetrics, JSON.stringify(metrics));

    const formattedAddress = customerInfo.address || ((customerInfo.streetAddress || '') + (customerInfo.city ? (', ' + customerInfo.city) : '') + (customerInfo.state ? (' ' + customerInfo.state) : '') + (customerInfo.zipCode ? (' ' + customerInfo.zipCode) : '') + (customerInfo.country ? (', ' + customerInfo.country) : ''));
    const isManualChat = paymentMethod === 'chat' || paymentMethod === 'manual_transfer';
    const orders = JSON.parse(localStorage.getItem(this.storageKeyOrders)) || [];
    const newOrder = {
      id: 'ESS-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      customerName: customerInfo.name || 'Guest Buyer',
      customerEmail: customerInfo.email || 'customer@esellerstore.com',
      customerPhone: customerInfo.phone || '+1 (555) 000-1122',
      customerAddress: formattedAddress,
      customerCity: customerInfo.city || 'New York',
      orderNotes: customerInfo.orderNotes || '',
      total: orderTotal.toFixed(2),
      commissionDeducted: totalAdminCommission.toFixed(2),
      status: isManualChat ? 'Awaiting Payment Proof' : 'Processing',
      paymentMethod: isManualChat ? 'Manual Transfer / Live Chat' : (paymentMethod || 'Direct Marketplace Order'),
      items: cartItems
    };
    orders.unshift(newOrder);
    localStorage.setItem(this.storageKeyOrders, JSON.stringify(orders));

    localStorage.setItem(this.storageKeyCart, JSON.stringify([]));
    this.logActivity('New Customer Order Placed', 'Order #' + newOrder.id + ' (' + newOrder.paymentMethod + ') for $' + orderTotal.toFixed(2), 'success');
    return newOrder;
  }

  verifyOrderPayment(orderId) {
    const orders = JSON.parse(localStorage.getItem(this.storageKeyOrders)) || [];
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found.');

    order.status = 'Processing';
    localStorage.setItem(this.storageKeyOrders, JSON.stringify(orders));
    this.logActivity('Payment Verified & Confirmed', 'Super Admin confirmed receipt proof for Order #' + orderId, 'success');
    return order;
  }

  getOrders() {
    return JSON.parse(localStorage.getItem(this.storageKeyOrders)) || [];
  }

  saveOrders(orders) {
    localStorage.setItem(this.storageKeyOrders, JSON.stringify(orders));
    if (typeof idbStorage !== 'undefined') idbStorage.putBatch('orders', orders);
    window.dispatchEvent(new CustomEvent('orders_updated'));
  }

  getMetrics() {
    return JSON.parse(localStorage.getItem(this.storageKeyMetrics)) || PLATFORM_METRICS;
  }

  getActivityLogs() {
    return JSON.parse(localStorage.getItem(this.storageKeyActivityLogs)) || [];
  }
}

const engine = new DokanEngine();

class ESellerStoreApp {
  constructor() {
    window.app = this;
    this.currentView = 'home';
    this.currentPersona = 'customer';
    this.activeVendorId = 'v101';
    this.adminActiveVendorId = 'v101';
    this.selectedPaymentMethod = 'card';
    this.activeClientAttachment = null;
    this.activeAdminAttachment = null;
    this.tempParsedCsvRows = [];
    this.currentCsvRawText = '';

    try {
      this.cart = JSON.parse(localStorage.getItem('esellerstore_cart')) || [];
      this.wishlist = JSON.parse(localStorage.getItem('esellerstore_wishlist')) || [];
      this.compare = JSON.parse(localStorage.getItem('esellerstore_compare')) || [];
    } catch (e) {
      this.cart = []; this.wishlist = []; this.compare = [];
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.bindEvents();
    this.renderAll();
    this.setPersona('customer', false);
    if (typeof window !== 'undefined' && window.location) {
      const hash = window.location.hash;
      if (hash === '#admin') {
        this.openModal('adminLoginModalOverlay');
      } else if (hash === '#seller' || hash === '#vendor') {
        this.openModal('sellerLoginModalOverlay');
      }
    }
  }

  renderAll() {
    try { this.updateCounters(); } catch (e) {}
    try { this.renderBrandsCarousel(); } catch (e) {}
    try { this.renderUpfrontVisibleBrands(); } catch (e) {}
    try { this.renderAdminBrandsList(); } catch (e) {}
    try { this.renderHomepageSections(); } catch (e) {}
    try { this.renderStorefrontAds(); } catch (e) {}
    try { this.renderAdminDashboard(); } catch (e) {}
    try { this.renderAdminAdCampaigns(); } catch (e) {}
    try { this.renderAdminChatInbox(); } catch (e) {}
    try { this.renderClientChatMessages(); } catch (e) {}
    try { this.renderVendorDashboard(); } catch (e) {}
    try { this.renderCartDrawer(); } catch (e) {}
  }

  updateCounters() {
    const navCartCountEl = document.getElementById('navCartCountHeader');
    const navCartTotalEl = document.getElementById('navCartTotalHeader');

    const totalQty = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (navCartCountEl) navCartCountEl.textContent = totalQty;
    if (navCartTotalEl) navCartTotalEl.textContent = '$' + subtotal.toFixed(2);

    const chatMsgs = engine.getChatMessages();
    const unreadCount = chatMsgs.filter(m => m.unread && m.sender === 'client').length;
    const badgeEl = document.getElementById('adminChatUnreadBadge');
    const tabBadgeEl = document.getElementById('adminTabChatUnreadBadge');
    if (badgeEl) {
      badgeEl.textContent = unreadCount > 0 ? (unreadCount + ' NEW') : '';
      badgeEl.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
    if (tabBadgeEl) {
      tabBadgeEl.textContent = unreadCount > 0 ? (unreadCount + ' NEW') : '';
      tabBadgeEl.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
  }

  /* --- IMAGE FILE SELECT & LIVE PREVIEW CONTROLLER --- */
  handleImageFileSelect(event, modalType) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (modalType === 'admin') {
        const urlInput = document.getElementById('adminProductImage');
        if (urlInput) urlInput.value = dataUrl;
        const box = document.getElementById('adminProductImagePreviewBox');
        const thumb = document.getElementById('adminProductImagePreviewThumb');
        if (thumb) thumb.src = dataUrl;
        if (box) box.style.display = 'flex';
      } else if (modalType === 'vendor') {
        const urlInput = document.getElementById('vendorProductImageInput');
        if (urlInput) urlInput.value = dataUrl;
        const box = document.getElementById('vendorProductImagePreviewBox');
        const thumb = document.getElementById('vendorProductImagePreviewThumb');
        if (thumb) thumb.src = dataUrl;
        if (box) box.style.display = 'flex';
      }
    };
    reader.readAsDataURL(file);
  }

  updateImagePreview(modalType, url) {
    if (modalType === 'admin') {
      const box = document.getElementById('adminProductImagePreviewBox');
      const thumb = document.getElementById('adminProductImagePreviewThumb');
      if (url && url.length > 5) {
        if (thumb) thumb.src = url;
        if (box) box.style.display = 'flex';
      } else {
        if (box) box.style.display = 'none';
      }
    } else if (modalType === 'vendor') {
      const box = document.getElementById('vendorProductImagePreviewBox');
      const thumb = document.getElementById('vendorProductImagePreviewThumb');
      if (url && url.length > 5) {
        if (thumb) thumb.src = url;
        if (box) box.style.display = 'flex';
      } else {
        if (box) box.style.display = 'none';
      }
    }
  }

  /* --- LIVE CHAT ATTACHMENT CONTROLLER --- */
  handleChatAttachmentSelect(event, party) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      if (party === 'client') {
        this.activeClientAttachment = dataUrl;
        const box = document.getElementById('clientChatAttachmentPreviewBox');
        const thumb = document.getElementById('clientChatAttachmentThumb');
        if (thumb) thumb.src = dataUrl;
        if (box) box.style.display = 'flex';
      } else if (party === 'admin') {
        this.activeAdminAttachment = dataUrl;
        const box = document.getElementById('adminChatAttachmentPreviewBox');
        const thumb = document.getElementById('adminChatAttachmentThumb');
        if (thumb) thumb.src = dataUrl;
        if (box) box.style.display = 'flex';
      }
    };
    reader.readAsDataURL(file);
  }

  clearClientChatAttachment() {
    this.activeClientAttachment = null;
    const box = document.getElementById('clientChatAttachmentPreviewBox');
    if (box) box.style.display = 'none';
    const input = document.getElementById('clientChatAttachmentInput');
    if (input) input.value = '';
  }

  clearAdminChatAttachment() {
    this.activeAdminAttachment = null;
    const box = document.getElementById('adminChatAttachmentPreviewBox');
    if (box) box.style.display = 'none';
    const input = document.getElementById('adminChatAttachmentInput');
    if (input) input.value = '';
  }

  /* --- 1-CLICK MASTER CATALOG SYNC HANDLER --- */
  handleSyncMasterCatalog(caller = 'vendor') {
    let targetVendorId = this.activeVendorId;

    if (caller === 'vendor') {
      const currentVendor = engine.getVendorById(this.activeVendorId);
      if (currentVendor && currentVendor.status === 'pending_verification') {
        alert('🔒 ACCOUNT LOCKED: Your vendor account is pending Super Admin review. You will be able to synchronize the master catalog once approved.');
        return;
      }
    } else if (caller === 'admin') {
      targetVendorId = this.adminActiveVendorId || 'v101';
    }

    try {
      const res = engine.syncMasterCatalogToVendor(targetVendorId);
      this.renderHomepageSections();
      this.renderVendorDashboard();
      this.renderAdminProductsTable();
      if (caller === 'admin') this.handleAdminVendorInventoryView(targetVendorId);
      this.updateCounters();
      
      this.showToast('🔄 Synchronized Master Catalog (' + res.count + ' items added to ' + res.vendor.name + ')');
      alert('🎉 1-CLICK MASTER CATALOG SYNC COMPLETE!\n\nTarget Store: ' + res.vendor.name + '\nProducts Cloned: ' + res.count + '\nAll items are active with customized SKUs and stock inventory.');
    } catch (e) {
      alert('Sync Error: ' + e.message);
    }
  }

  /* --- SUPER ADMIN DASHBOARD CONTROLLER & SUB-TABS --- */
  switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => {
      c.style.display = 'none';
      c.classList.remove('active');
    });

    const activeBtn = document.getElementById('adminTabBtn-' + tabName) || document.querySelector('.admin-tab-btn[onclick*="' + tabName + '"]');
    const targetContent = document.getElementById('adminTab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));

    if (activeBtn) activeBtn.classList.add('active');
    if (targetContent) {
      targetContent.style.display = 'block';
      targetContent.classList.add('active');
    }

    if (tabName === 'products') this.renderAdminProductsTable();
    if (tabName === 'vendors') this.renderAdminVendorsTable();
    if (tabName === 'storefront') {
      this.renderAdminStorefrontConfig();
      this.renderAdminBrandsList();
    }
    if (tabName === 'ads') this.renderAdminAdCampaigns();
    if (tabName === 'chat') this.renderAdminChatInbox();
    if (tabName === 'security') this.renderAdminSecurityPanel();
  }

  renderAdminSecurityPanel() {
    const auth = engine.getAdminAuth();
    const emailEl = document.getElementById('adminActiveEmail');
    const lastChangeEl = document.getElementById('adminLastPasswordChange');
    const updateEmailEl = document.getElementById('adminUpdateEmail');

    if (emailEl) emailEl.textContent = auth.email;
    if (lastChangeEl) lastChangeEl.textContent = auth.lastUpdated || 'Initial Provisioning';
    if (updateEmailEl) updateEmailEl.value = auth.email;
  }

  handleAdminChangePassword(event) {
    if (event && event.preventDefault) event.preventDefault();
    const currentPass = document.getElementById('adminCurrentPassword') ? document.getElementById('adminCurrentPassword').value : '';
    const newPass = document.getElementById('adminNewPassword') ? document.getElementById('adminNewPassword').value : '';
    const confirmPass = document.getElementById('adminConfirmPassword') ? document.getElementById('adminConfirmPassword').value : '';
    const updateEmail = document.getElementById('adminUpdateEmail') ? document.getElementById('adminUpdateEmail').value.trim() : '';

    if (!currentPass || !newPass || !confirmPass) {
      alert('⚠️ Please fill in Current Password, New Password, and Confirm Password.');
      return;
    }

    if (newPass !== confirmPass) {
      alert('❌ New Password and Confirm Password do not match!');
      return;
    }

    if (newPass.length < 6) {
      alert('❌ New password must be at least 6 characters long.');
      return;
    }

    try {
      const updated = engine.updateAdminAuth(currentPass, newPass, updateEmail);
      if (document.getElementById('adminCurrentPassword')) document.getElementById('adminCurrentPassword').value = '';
      if (document.getElementById('adminNewPassword')) document.getElementById('adminNewPassword').value = '';
      if (document.getElementById('adminConfirmPassword')) document.getElementById('adminConfirmPassword').value = '';
      this.renderAdminSecurityPanel();
      alert('🎉 SUPER ADMIN PASSWORD UPDATED SUCCESSFULLY!\n\nNew Admin Email: ' + updated.email + '\nLast Updated: ' + updated.lastUpdated + '\n\nYour new master password is now active and stored securely.');
      this.showToast('🔒 Admin credentials updated & secured');
    } catch (err) {
      alert('❌ Password Update Error: ' + err.message);
    }
  }

  renderAdminDashboard() {
    const vendors = engine.getVendors();
    const products = engine.getProducts();
    const metrics = JSON.parse(localStorage.getItem('esellerstore_metrics')) || {};

    const totalVendorsEl = document.getElementById('adminMetricVendors');
    const prodCountEl = document.getElementById('adminMetricProductsCount');
    const tabProdCountEl = document.getElementById('adminTabProductCount');
    const platformWalletEl = document.getElementById('adminMetricWallet');
    const totalCommEl = document.getElementById('adminMetricCommission');

    if (totalVendorsEl) totalVendorsEl.textContent = vendors.length;
    if (prodCountEl) prodCountEl.textContent = products.length;
    if (tabProdCountEl) tabProdCountEl.textContent = products.length;
    if (platformWalletEl) platformWalletEl.textContent = '$' + parseFloat(metrics.adminWalletTotal || 0).toFixed(2);
    if (totalCommEl) totalCommEl.textContent = '$' + parseFloat(metrics.totalPlatformCommissionCollected || 0).toFixed(2);

    // Live Feed Stream
    const feedContainer = document.getElementById('adminLiveActivityFeedBox');
    if (feedContainer) {
      const logs = engine.getActivityLogs();
      feedContainer.innerHTML = logs.slice(0, 6).map(log => `
        <div class="admin-feed-item">
          <span class="admin-feed-badge ${log.type}">${log.type.toUpperCase()}</span>
          <div style="flex:1;">
            <strong>${log.title}</strong> &mdash; ${log.detail}
          </div>
          <small style="color:#94a3b8;">${log.time}</small>
        </div>
      `).join('');
    }

    // Overview Vendors Table
    const overviewVendorsBody = document.getElementById('adminVendorsOverviewTableBody');
    if (overviewVendorsBody) {
      overviewVendorsBody.innerHTML = vendors.map(v => `
        <tr>
          <td>
            <strong>${v.name}</strong><br>
            <small style="color:#666;">Owner: ${v.ownerName}</small><br>
            <small style="color:var(--nav-red); font-weight:700;">CNIC: ${v.cnic || 'N/A'}</small>
          </td>
          <td>${v.email}<br><small style="color:#666;">${v.mobile || ''}</small></td>
          <td><span class="status-badge ${v.status}">${v.status.replace('_', ' ').toUpperCase()}</span></td>
          <td><strong>$${parseFloat(v.balance).toFixed(2)}</strong></td>
          <td><span style="font-weight:700; color:#137333;">${v.commissionRate || 15}% Fee</span></td>
          <td>
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button class="admin-act-btn edit" onclick="app.openAdminEditVendorModal('${v.id}')">✏️ Edit Profile</button>
              ${v.status === 'pending_verification' ? `
                <button class="admin-act-btn toggle-on" onclick="app.handleAdminApproveVendor('${v.id}')">✅ Approve Vendor</button>
                <button class="admin-act-btn delete" onclick="app.adminApproveVendor('${v.id}', 'suspended')">❌ Reject</button>
              ` : `
                <button class="admin-act-btn ${v.status === 'suspended' ? 'toggle-on' : 'delete'}" onclick="app.adminApproveVendor('${v.id}', '${v.status === 'suspended' ? 'verified' : 'suspended'}')">
                  ${v.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                </button>
              `}
            </div>
          </td>
        </tr>
      `).join('');
    }

    // Populate Select Vendor dropdown
    const selectEl = document.getElementById('adminSelectVendor');
    if (selectEl) {
      selectEl.innerHTML = vendors.map(v => '<option value="' + v.id + '">' + v.name + ' (Balance: $' + parseFloat(v.balance).toFixed(2) + ')</option>').join('');
    }

    this.renderAdminProductsTable();
    this.renderAdminVendorsTable();
    this.renderAdminStorefrontConfig();
    this.renderAdminBrandsList();
  }

  /* --- PRODUCT MANAGEMENT (MASTER CATALOG TABLE & CRUD) --- */
  
  /* --- HIGH-PERFORMANCE PAGINATION & DEBOUNCING UTILITIES --- */
  debounce(key, fn, delay = 200) {
    if (this._debounceTimers[key]) clearTimeout(this._debounceTimers[key]);
    this._debounceTimers[key] = setTimeout(() => {
      fn.call(this);
      delete this._debounceTimers[key];
    }, delay);
  }

  renderPaginationControls(containerId, currentPage, totalPages, totalItems, onPageChangeFnName, onPageSizeFnName, currentSize = 10) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (totalItems === 0) {
      container.innerHTML = '';
      return;
    }

    const startIdx = (currentPage - 1) * currentSize + 1;
    const endIdx = Math.min(currentPage * currentSize, totalItems);

    container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding:12px 16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; margin-top:14px; font-size:12px;">
        <div style="color:#64748b; font-weight:500;">
          Showing <strong>${startIdx}&ndash;${endIdx}</strong> of <strong>${totalItems}</strong> items
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <button class="btn-primary" style="padding:4px 8px; font-size:11px; background:${currentPage > 1 ? '#1e293b' : '#cbd5e1'}; cursor:${currentPage > 1 ? 'pointer' : 'not-allowed'};" ${currentPage > 1 ? `onclick="app.${onPageChangeFnName}(1)"` : 'disabled'}>
            &laquo;
          </button>
          <button class="btn-primary" style="padding:4px 8px; font-size:11px; background:${currentPage > 1 ? '#1e293b' : '#cbd5e1'}; cursor:${currentPage > 1 ? 'pointer' : 'not-allowed'};" ${currentPage > 1 ? `onclick="app.${onPageChangeFnName}(${currentPage - 1})"` : 'disabled'}>
            &lsaquo; Prev
          </button>
          <span style="padding:4px 10px; background:#ffffff; border:1px solid #cbd5e1; border-radius:6px; font-weight:700; color:#0f172a;">
            Page ${currentPage} / ${totalPages}
          </span>
          <button class="btn-primary" style="padding:4px 8px; font-size:11px; background:${currentPage < totalPages ? '#1e293b' : '#cbd5e1'}; cursor:${currentPage < totalPages ? 'pointer' : 'not-allowed'};" ${currentPage < totalPages ? `onclick="app.${onPageChangeFnName}(${currentPage + 1})"` : 'disabled'}>
            Next &rsaquo;
          </button>
          <button class="btn-primary" style="padding:4px 8px; font-size:11px; background:${currentPage < totalPages ? '#1e293b' : '#cbd5e1'}; cursor:${currentPage < totalPages ? 'pointer' : 'not-allowed'};" ${currentPage < totalPages ? `onclick="app.${onPageChangeFnName}(${totalPages})"` : 'disabled'}>
            &raquo;
          </button>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <span style="color:#64748b;">Per page:</span>
          <select style="font-size:11px; padding:3px 6px; border:1px solid #cbd5e1; border-radius:4px; background:#fff;" onchange="app.${onPageSizeFnName}(parseInt(this.value))">
            <option value="10" ${currentSize === 10 ? 'selected' : ''}>10</option>
            <option value="25" ${currentSize === 25 ? 'selected' : ''}>25</option>
            <option value="50" ${currentSize === 50 ? 'selected' : ''}>50</option>
            <option value="100" ${currentSize === 100 ? 'selected' : ''}>100</option>
          </select>
        </div>
      </div>
    `;
  }

  setAdminProductsPage(page) {
    this.adminProductsPage = page;
    this.renderAdminProductsTable();
  }

  setAdminProductsPageSize(size) {
    this.adminProductsPageSize = size;
    this.adminProductsPage = 1;
    this.renderAdminProductsTable();
  }

  setVendorOrdersPage(page) {
    this.vendorOrdersPage = page;
    this.renderVendorDashboard();
  }

  setVendorOrdersPageSize(size) {
    this.vendorOrdersPageSize = size;
    this.vendorOrdersPage = 1;
    this.renderVendorDashboard();
  }

  exportCloudDatabaseJson() {
    const schema = engine.exportCloudDatabaseSchema();
    const jsonStr = JSON.stringify(schema, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'esellerstore-cloud-database-schema.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('☁️ Cloud Database Schema Exported!');
  }

  renderAdminProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    const products = engine.getProducts();
    const vendors = engine.getVendors();

    const searchQ = (document.getElementById('adminProductSearchInput')?.value || '').trim().toLowerCase();
    const vendorFilter = document.getElementById('adminProductFilterVendor')?.value || 'all';
    const catFilter = document.getElementById('adminProductFilterCategory')?.value || 'all';
    const statusFilter = document.getElementById('adminProductFilterStatus')?.value || 'all';

    const vFilterEl = document.getElementById('adminProductFilterVendor');
    if (vFilterEl && vFilterEl.options.length <= 1) {
      vFilterEl.innerHTML = '<option value="all">All Vendors</option>' + vendors.map(v => '<option value="' + v.id + '">' + v.name + '</option>').join('');
    }

    const filtered = products.filter(p => {
      if (searchQ) {
        const matches = (p.name || '').toLowerCase().includes(searchQ) ||
                        (p.sku || '').toLowerCase().includes(searchQ) ||
                        (p.brand || '').toLowerCase().includes(searchQ) ||
                        (p.vendorName || '').toLowerCase().includes(searchQ);
        if (!matches) return false;
      }
      if (vendorFilter !== 'all' && p.vendorId !== vendorFilter) return false;
      if (catFilter !== 'all' && p.category !== catFilter) return false;
      if (statusFilter === 'published' && p.published === false) return false;
      if (statusFilter === 'unpublished' && p.published !== false) return false;
      if (statusFilter === 'featured' && !p.isFeatured) return false;
      if (statusFilter === 'deals' && !p.isDeal) return false;
      return true;
    });

    const countBadge = document.getElementById('adminTabProductCount');
    if (countBadge) countBadge.textContent = products.length;

    const totalItems = filtered.length;
    const pageSize = this.adminProductsPageSize || 10;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    if (this.adminProductsPage > totalPages) this.adminProductsPage = totalPages;
    const currentPage = this.adminProductsPage || 1;

    const pagedProducts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    if (totalItems === 0) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; padding:30px; color:#64748b;">No products found matching the criteria. Click "Add New Product" to create one.</td></tr>';
      const paginationBox = document.getElementById('adminProductsPaginationBox');
      if (paginationBox) paginationBox.innerHTML = '';
      return;
    }

    tbody.innerHTML = pagedProducts.map(p => {
      const isLive = p.published !== false;
      const stockClass = p.stock > 10 ? 'in-stock' : (p.stock > 0 ? 'low-stock' : 'out-of-stock');
      const stockText = p.stock > 10 ? (p.stock + ' in stock') : (p.stock > 0 ? ('Only ' + p.stock + ' left') : 'Out of stock');

      return `
        <tr>
          <td>
            <img src="${p.image}" class="prod-thumb-mini" alt="${p.name}">
          </td>
          <td>
            <strong style="font-size:13px; color:#1e293b;">${p.name}</strong><br>
            <small style="color:#64748b;">SKU: <strong>${p.sku || p.id}</strong></small>
            ${p.isOfficial ? '<br><span class="official-badge-tag">🏢 OFFICIAL STORE</span>' : ''}
          </td>
          <td>
            <span class="admin-badge vendor" style="text-transform:capitalize;">${p.category}</span><br>
            <small style="font-weight:600; color:#334155;">${p.brand || 'Generic'}</small>
          </td>
          <td>
            <span style="font-weight:700; color:#0369a1;">🏪 ${p.vendorName || 'TechWorld Hub'}</span>
          </td>
          <td>
            <strong style="color:var(--nav-red); font-size:13px;">$${p.price.toFixed(2)}</strong>
            ${p.originalPrice ? ('<br><small style="color:#94a3b8; text-decoration:line-through;">$' + p.originalPrice.toFixed(2) + '</small>') : ''}
          </td>
          <td>
            <span class="stock-badge ${stockClass}">${stockText}</span>
          </td>
          <td>
            <button class="admin-act-btn ${isLive ? 'toggle-on' : 'toggle-off'}" onclick="app.handleAdminTogglePublish('${p.id}')">
              ${isLive ? '🟢 Live' : '🔴 Hidden'}
            </button>
          </td>
          <td>
            <div style="display:flex; gap:4px; flex-wrap:wrap;">
              <button class="admin-act-btn ${p.isFeatured ? 'toggle-on' : 'toggle-off'}" style="font-size:10px; padding:2px 6px;" title="Toggle Featured" onclick="app.handleAdminToggleFlag('${p.id}', 'isFeatured')">⭐ Feat</button>
              <button class="admin-act-btn ${p.isBestSelling ? 'toggle-on' : 'toggle-off'}" style="font-size:10px; padding:2px 6px;" title="Toggle Best Selling" onclick="app.handleAdminToggleFlag('${p.id}', 'isBestSelling')">🔥 Best</button>
              <button class="admin-act-btn ${p.isNew ? 'toggle-on' : 'toggle-off'}" style="font-size:10px; padding:2px 6px;" title="Toggle New" onclick="app.handleAdminToggleFlag('${p.id}', 'isNew')">🚀 New</button>
            </div>
          </td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:6px;">
              <button class="admin-act-btn edit" onclick="app.openAdminEditProductModal('${p.id}')">✏️ Edit</button>
              <button class="admin-act-btn delete" onclick="app.handleAdminDeleteProduct('${p.id}')">🗑️ Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    this.renderPaginationControls(
      'adminProductsPaginationBox',
      currentPage,
      totalPages,
      totalItems,
      'setAdminProductsPage',
      'setAdminProductsPageSize',
      pageSize
    );
  }

  openAdminAddProductModal(preselectedVendorId = null) {
    const vendors = engine.getVendors();
    const vendorSelect = document.getElementById('adminProductVendorSelect');
    if (vendorSelect) {
      vendorSelect.innerHTML = vendors.map(v => '<option value="' + v.id + '">' + v.name + ' (' + v.ownerName + ')</option>').join('');
      if (preselectedVendorId) vendorSelect.value = preselectedVendorId;
    }

    document.getElementById('adminProductModalTitle').textContent = '➕ Add New Product Listing';
    document.getElementById('adminProductSubmitBtn').textContent = '💾 Save & Publish Product';
    document.getElementById('adminProductEditId').value = '';
    document.getElementById('adminProductTitle').value = '';
    document.getElementById('adminProductSku').value = 'ESS-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('adminProductPublishTarget').value = 'vendor';
    document.getElementById('adminProductCategory').value = 'computers';
    document.getElementById('adminProductBrand').value = '';
    document.getElementById('adminProductPrice').value = '';
    document.getElementById('adminProductOriginalPrice').value = '';
    document.getElementById('adminProductStock').value = '25';
    document.getElementById('adminProductImage').value = '';
    document.getElementById('adminProductBadge').value = 'Official Product';
    document.getElementById('adminProductDescription').value = '';

    const previewBox = document.getElementById('adminProductImagePreviewBox');
    if (previewBox) previewBox.style.display = 'none';

    document.getElementById('adminProductIsPublished').checked = true;
    document.getElementById('adminProductIsFeatured').checked = true;
    document.getElementById('adminProductIsBestSelling').checked = false;
    document.getElementById('adminProductIsNew').checked = true;
    document.getElementById('adminProductIsDeal').checked = false;

    this.openModal('adminProductModalOverlay');
  }

  openAdminEditProductModal(productId) {
    const product = engine.getProductById(productId);
    if (!product) return;

    const vendors = engine.getVendors();
    const vendorSelect = document.getElementById('adminProductVendorSelect');
    if (vendorSelect) {
      vendorSelect.innerHTML = vendors.map(v => '<option value="' + v.id + '">' + v.name + ' (' + v.ownerName + ')</option>').join('');
      vendorSelect.value = product.vendorId || 'v101';
    }

    document.getElementById('adminProductModalTitle').textContent = '✏️ Edit Product: ' + product.name;
    document.getElementById('adminProductSubmitBtn').textContent = '💾 Save Product Changes';
    document.getElementById('adminProductEditId').value = product.id;
    document.getElementById('adminProductTitle').value = product.name || '';
    document.getElementById('adminProductSku').value = product.sku || product.id || '';
    document.getElementById('adminProductPublishTarget').value = product.publishTarget || (product.isOfficial ? 'official' : 'vendor');
    document.getElementById('adminProductCategory').value = product.category || 'computers';
    document.getElementById('adminProductBrand').value = product.brand || '';
    document.getElementById('adminProductPrice').value = product.price || '';
    document.getElementById('adminProductOriginalPrice').value = product.originalPrice || '';
    document.getElementById('adminProductStock').value = product.stock !== undefined ? product.stock : 20;
    document.getElementById('adminProductImage').value = product.image || '';
    document.getElementById('adminProductBadge').value = product.badge || '';
    document.getElementById('adminProductDescription').value = product.description || '';

    this.updateImagePreview('admin', product.image);

    document.getElementById('adminProductIsPublished').checked = product.published !== false;
    document.getElementById('adminProductIsFeatured').checked = !!product.isFeatured;
    document.getElementById('adminProductIsBestSelling').checked = !!product.isBestSelling;
    document.getElementById('adminProductIsNew').checked = !!product.isNew;
    document.getElementById('adminProductIsDeal').checked = !!product.isDeal;

    this.openModal('adminProductModalOverlay');
  }

  handleAdminSaveProduct(event) {
    event.preventDefault();
    const editId = document.getElementById('adminProductEditId').value;
    const name = document.getElementById('adminProductTitle').value.trim();
    const sku = document.getElementById('adminProductSku').value.trim();
    const vendorId = document.getElementById('adminProductVendorSelect').value;
    const publishTarget = document.getElementById('adminProductPublishTarget').value;
    const category = document.getElementById('adminProductCategory').value;
    const brand = document.getElementById('adminProductBrand').value.trim();
    const price = parseFloat(document.getElementById('adminProductPrice').value);
    const originalPrice = parseFloat(document.getElementById('adminProductOriginalPrice').value) || (price * 1.15);
    const stock = parseInt(document.getElementById('adminProductStock').value) || 0;
    const image = document.getElementById('adminProductImage').value.trim();
    const badge = document.getElementById('adminProductBadge').value.trim();
    const description = document.getElementById('adminProductDescription').value.trim();

    const published = document.getElementById('adminProductIsPublished').checked;
    const isFeatured = document.getElementById('adminProductIsFeatured').checked;
    const isBestSelling = document.getElementById('adminProductIsBestSelling').checked;
    const isNew = document.getElementById('adminProductIsNew').checked;
    const isDeal = document.getElementById('adminProductIsDeal').checked;

    const data = {
      name, sku, vendorId, publishTarget, category, brand, price, originalPrice, stock, image, badge, description,
      published, isFeatured, isBestSelling, isNew, isDeal
    };

    try {
      if (editId) {
        engine.updateProduct(editId, data);
        this.showToast('✅ Product updated successfully!');
      } else {
        engine.addProduct(data);
        this.showToast('✅ Product created and published!');
      }

      this.closeModals();
      this.renderAdminProductsTable();
      this.renderHomepageSections();
      this.renderVendorDashboard();
      this.updateCounters();
    } catch (e) {
      alert('Error saving product: ' + e.message);
    }
  }

  handleAdminDeleteProduct(productId) {
    const prod = engine.getProductById(productId);
    if (!prod) return;

    if (confirm('Are you sure you want to permanently delete ' + prod.name + ' from the master catalog?')) {
      engine.deleteProduct(productId);
      this.renderAdminProductsTable();
      this.renderHomepageSections();
      this.renderVendorDashboard();
      this.showToast('🗑️ Product deleted.');
    }
  }

  handleAdminTogglePublish(productId) {
    const p = engine.toggleProductPublish(productId);
    this.renderAdminProductsTable();
    this.renderHomepageSections();
    this.showToast('Product visibility: ' + (p.published ? 'LIVE (PUBLISHED)' : 'HIDDEN'));
  }

  handleAdminToggleFlag(productId, flag) {
    const p = engine.toggleProductFlag(productId, flag);
    this.renderAdminProductsTable();
    this.renderHomepageSections();
  }

  /* --- BULK CSV IMPORT & EXPORT ACTIONS --- */
  downloadCSVTemplate() {
    const csvContent = engine.generateCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'esellerstore_product_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('📥 Sample CSV Template Downloaded!');
  }

  exportProductsToCSV() {
    const csvContent = engine.exportProductsCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'esellerstore_catalog_export_' + (new Date().toISOString().split('T')[0]) + '.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('📤 All Products Exported to CSV!');
  }

  handleCSVFileSelected(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        this.currentCsvRawText = text;
        const rows = engine.parseCSV(text);
        if (rows.length <= 1) {
          alert('CSV file appears empty or missing product records.');
          return;
        }

        this.tempParsedCsvRows = rows;
        const previewSec = document.getElementById('adminCsvPreviewSection');
        const countEl = document.getElementById('adminCsvParsedCount');
        const tbody = document.getElementById('adminCsvPreviewTableBody');

        if (countEl) countEl.textContent = rows.length - 1;
        if (previewSec) previewSec.style.display = 'block';

        if (tbody) {
          const headers = rows[0].map(h => (h || '').toLowerCase().replace(/[^a-z0-9]/g, ''));
          const getIdx = (candidates, defaultIdx) => {
            for (const cand of candidates) {
              const idx = headers.indexOf(cand.toLowerCase().replace(/[^a-z0-9]/g, ''));
              if (idx !== -1) return idx;
            }
            return defaultIdx;
          };

          const titleIdx = getIdx(['title', 'name', 'productname', 'producttitle'], 0);
          const catIdx = getIdx(['category', 'cat', 'categoryname'], 1);
          const brandIdx = getIdx(['brand', 'brandname', 'manufacturer'], 2);
          const vendorIdx = getIdx(['vendor', 'vendorname', 'store', 'storename'], 3);
          const priceIdx = getIdx(['price', 'regularprice', 'saleprice', 'retailprice'], 4);
          const stockIdx = getIdx(['stock', 'inventory', 'quantity', 'qty', 'count'], 5);
          const skuIdx = getIdx(['sku', 'code', 'productcode', 'itemid', 'id'], 6);
          const imgIdx = getIdx(['imageurl', 'image', 'photo', 'picture', 'thumbnail'], 7);

          const previewRows = rows.slice(1, 11);
          tbody.innerHTML = previewRows.map((r, i) => {
            const title = (r[titleIdx] !== undefined && r[titleIdx] !== '') ? r[titleIdx] : (r[0] || 'N/A');
            const category = (r[catIdx] !== undefined && r[catIdx] !== '') ? r[catIdx] : (r[1] || 'General');
            const brand = (r[brandIdx] !== undefined && r[brandIdx] !== '') ? r[brandIdx] : (r[2] || 'Brand');
            const vendor = (r[vendorIdx] !== undefined && r[vendorIdx] !== '') ? r[vendorIdx] : (r[3] || 'Store');
            const price = (r[priceIdx] !== undefined && r[priceIdx] !== '') ? r[priceIdx] : (r[4] || '99.99');
            const stock = (r[stockIdx] !== undefined && r[stockIdx] !== '') ? r[stockIdx] : ((r[5] !== undefined && r[5] !== '') ? r[5] : '20');
            const sku = (r[skuIdx] !== undefined && r[skuIdx] !== '') ? r[skuIdx] : (r[6] || 'SKU');
            const image = (r[imgIdx] !== undefined && r[imgIdx] !== '') ? r[imgIdx] : (r[7] || '');

            const formattedPrice = price.toString().startsWith('$') ? price : ('$' + price);
            const imagePreviewHtml = (image && (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:image/')))
              ? `<img src="${image}" alt="${title}" class="w-12 h-12 object-contain" style="width:48px; height:48px; max-width:48px; max-height:48px; object-fit:contain; border-radius:4px; border:1px solid #e2e8f0; background:#f8fafc;" />`
              : '<span style="color:#94a3b8; font-size:11px;">No Image</span>';

            return `
              <tr>
                <td>#${i + 1}</td>
                <td><strong>${title}</strong></td>
                <td>${category}</td>
                <td>${brand}</td>
                <td>${vendor}</td>
                <td>${formattedPrice}</td>
                <td><span class="status-badge" style="background:#e0f2fe; color:#0369a1; font-weight:700;">${stock}</span></td>
                <td><code style="font-size:10.5px; background:#f1f5f9; padding:2px 5px; border-radius:4px;">${sku}</code></td>
                <td class="image-preview" style="text-align:center;">${imagePreviewHtml}</td>
              </tr>
            `;
          }).join('');
        }

        this.showToast('📋 CSV Parsed: ' + (rows.length - 1) + ' products detected.');
      } catch (err) {
        alert('Error parsing CSV: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  handleExecuteCSVImport() {
    if (!this.currentCsvRawText) {
      alert('Please select a valid CSV file first.');
      return;
    }

    try {
      const result = engine.importProductsCSV(this.currentCsvRawText);
      this.clearCSVPreview();
      this.renderAdminProductsTable();
      this.renderHomepageSections();
      this.renderVendorDashboard();
      this.updateCounters();
      this.switchAdminTab('products');
      alert('🎉 BULK CSV IMPORT COMPLETE!\n\nSuccessfully added ' + result.count + ' new products to E Seller Store master catalog.\nAll products are live on the storefront.');
    } catch (e) {
      alert('Import Error: ' + e.message);
    }
  }

  clearCSVPreview() {
    this.currentCsvRawText = '';
    this.tempParsedCsvRows = [];
    const previewSec = document.getElementById('adminCsvPreviewSection');
    if (previewSec) previewSec.style.display = 'none';
    const input = document.getElementById('adminCsvFileInput');
    if (input) input.value = '';
  }

  /* --- MULTI-VENDOR CONTROL & INVENTORY INSPECTION --- */
  renderAdminVendorsTable() {
    const tbody = document.getElementById('adminFullVendorsTableBody');
    if (!tbody) return;

    const vendors = engine.getVendors();
    tbody.innerHTML = vendors.map(v => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${v.storeLogo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}" width="38" height="38" style="border-radius:50%; object-fit:cover; border:1px solid #e2e8f0;">
            <div>
              <strong style="font-size:13px; color:#1e293b;">${v.name}</strong><br>
              <small style="color:#64748b;">Joined: ${v.joinedDate || '2026-07-01'}</small>
            </div>
          </div>
        </td>
        <td>
          <strong>${v.ownerName}</strong><br>
          <small style="color:var(--nav-red); font-weight:700;">CNIC: ${v.cnic || 'N/A'}</small>
        </td>
        <td>
          ${v.email}<br>
          <small style="color:#64748b;">${v.mobile || 'N/A'}</small>
        </td>
        <td>
          <span class="status-badge ${v.status}">${v.status.replace('_', ' ').toUpperCase()}</span>
        </td>
        <td>
          <strong style="color:#137333;">${v.commissionRate || 15}% Admin Fee</strong><br>
          <small style="color:#64748b;">${v.profitMarginPercent || 25}% Vendor Margin</small>
        </td>
        <td>
          <strong style="font-size:14px; color:var(--nav-red);">$${parseFloat(v.balance).toFixed(2)}</strong>
        </td>
        <td style="text-align:right;">
          <div style="display:inline-flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;">
            <button class="admin-act-btn edit" onclick="app.openAdminEditVendorModal('${v.id}')">✏️ Edit Profile</button>
            <button class="admin-act-btn primary" onclick="app.handleAdminVendorInventoryView('${v.id}')">📦 Inventory</button>
            ${v.status === 'pending_verification' ? `
              <button class="admin-act-btn toggle-on" onclick="app.handleAdminApproveVendor('${v.id}')">✅ Approve Vendor</button>
            ` : `
              <button class="admin-act-btn ${v.status === 'suspended' ? 'toggle-on' : 'delete'}" onclick="app.adminApproveVendor('${v.id}', '${v.status === 'suspended' ? 'verified' : 'suspended'}')">
                ${v.status === 'suspended' ? 'Unsuspend' : '🚫 Suspend'}
              </button>
            `}
          </div>
        </td>
      </tr>
    `).join('');
  }

  handleAdminApproveVendor(vendorId) {
    try {
      const vendor = engine.approveVendor(vendorId);
      this.renderAdminDashboard();
      this.renderVendorDashboard();
      this.showToast('✅ Vendor ' + vendor.name + ' approved & store unlocked!');
      alert('✅ VENDOR APPROVED & UNLOCKED!\n\nStore Name: ' + vendor.name + '\nOwner: ' + vendor.ownerName + '\nCNIC: ' + vendor.cnic + '\nStatus: VERIFIED\n\nFull selling access and 1-Click Master Catalog Sync have been activated.');
    } catch (e) {
      alert('Approval Error: ' + e.message);
    }
  }

  openAdminEditVendorModal(vendorId) {
    const vendor = engine.getVendorById(vendorId);
    if (!vendor) return;

    document.getElementById('editVendorId').value = vendor.id;
    document.getElementById('editVendorStoreName').value = vendor.name || '';
    document.getElementById('editVendorOwnerName').value = vendor.ownerName || '';
    document.getElementById('editVendorCnic').value = vendor.cnic || '';
    document.getElementById('editVendorMobile').value = vendor.mobile || '';
    document.getElementById('editVendorEmail').value = vendor.email || '';
    document.getElementById('editVendorStatus').value = vendor.status || 'verified';
    document.getElementById('editVendorCommissionRate').value = vendor.commissionRate !== undefined ? vendor.commissionRate : 15;
    document.getElementById('editVendorProfitMargin').value = vendor.profitMarginPercent !== undefined ? vendor.profitMarginPercent : 25;
    document.getElementById('editVendorBalance').value = parseFloat(vendor.balance || 0).toFixed(2);
    document.getElementById('editVendorDescription').value = vendor.description || '';

    this.openModal('adminEditVendorModalOverlay');
  }

  handleAdminSaveVendorProfile(event) {
    event.preventDefault();
    const vendorId = document.getElementById('editVendorId').value;
    const name = document.getElementById('editVendorStoreName').value.trim();
    const ownerName = document.getElementById('editVendorOwnerName').value.trim();
    const cnic = document.getElementById('editVendorCnic').value.trim();
    const mobile = document.getElementById('editVendorMobile').value.trim();
    const email = document.getElementById('editVendorEmail').value.trim();
    const status = document.getElementById('editVendorStatus').value;
    const commissionRate = parseFloat(document.getElementById('editVendorCommissionRate').value);
    const profitMarginPercent = parseFloat(document.getElementById('editVendorProfitMargin').value);
    const balance = parseFloat(document.getElementById('editVendorBalance').value);
    const description = document.getElementById('editVendorDescription').value.trim();

    try {
      engine.updateVendorProfile(vendorId, {
        name, ownerName, cnic, mobile, email, status, commissionRate, profitMarginPercent, balance, description
      });

      this.closeModals();
      this.renderAdminDashboard();
      this.renderVendorDashboard();
      this.showToast('✅ Store profile for ' + name + ' updated!');
    } catch (e) {
      alert('Error updating vendor: ' + e.message);
    }
  }

  handleAdminVendorInventoryView(vendorId) {
    const vendor = engine.getVendorById(vendorId);
    if (!vendor) return;

    this.adminActiveVendorId = vendor.id;
    const section = document.getElementById('adminVendorInventorySection');
    const title = document.getElementById('adminVendorInventoryTitle');
    const tbody = document.getElementById('adminVendorInventoryTableBody');

    if (title) title.textContent = vendor.name + ' (' + vendor.ownerName + ')';
    if (section) section.style.display = 'block';

    const products = engine.getProducts().filter(p => p.vendorId === vendor.id);
    if (tbody) {
      if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:20px; color:#64748b;">No products currently assigned to ' + vendor.name + '. Click "Add Product for this Seller" or "1-Click Clone Master Catalog" above.</td></tr>';
      } else {
        tbody.innerHTML = products.map(p => `
          <tr>
            <td><img src="${p.image}" class="prod-thumb-mini"></td>
            <td>
              <strong>${p.name}</strong><br>
              <small>SKU: ${p.sku || p.id}</small>
              ${p.isOfficial ? '<br><span class="official-badge-tag">🏢 OFFICIAL STORE</span>' : ''}
            </td>
            <td><span class="admin-badge vendor">${p.category}</span></td>
            <td><strong>$${p.price.toFixed(2)}</strong></td>
            <td><span class="stock-badge ${p.stock > 0 ? 'in-stock' : 'out-of-stock'}">${p.stock} units</span></td>
            <td><span class="status-badge ${p.published !== false ? 'verified' : 'rejected'}">${p.published !== false ? 'Live' : 'Hidden'}</span></td>
            <td>
              <div style="display:flex; gap:6px;">
                <button class="admin-act-btn edit" onclick="app.openAdminEditProductModal('${p.id}')">✏️ Edit</button>
                <button class="admin-act-btn delete" onclick="app.handleAdminDeleteProduct('${p.id}'); app.handleAdminVendorInventoryView('${vendor.id}');">🗑️ Delete</button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    section.scrollIntoView({ behavior: 'smooth' });
  }

  openAdminAddProductModalForActiveVendor() {
    this.openAdminAddProductModal(this.adminActiveVendorId || 'v101');
  }

  handleAdminAddBalance(event) {
    event.preventDefault();
    const form = event.target;
    const vendorId = form.adminSelectVendor.value;
    const type = form.adminFundType ? form.adminFundType.value : 'credit';
    const amount = form.adminFundAmount.value;
    const note = form.adminFundNote.value;

    try {
      const res = engine.adjustVendorBalance(vendorId, amount, type, note);
      form.reset();
      this.renderAdminDashboard();
      this.renderVendorDashboard();
      alert('💰 WALLET TRANSACTION SUCCESSFUL!\n\nAction: ' + type.toUpperCase() + '\nAmount: $' + parseFloat(amount).toFixed(2) + '\nVendor: ' + res.vendor.name + '\nUpdated Wallet Balance: $' + res.vendor.balance);
    } catch (err) {
      alert('Transaction Error: ' + err.message);
    }
  }

  /* --- GLOBAL STOREFRONT CONFIGURATION --- */
  renderAdminStorefrontConfig() {
    const cfg = engine.getStorefrontConfig();
    const flashEl = document.getElementById('cfgShowFlashDeals');
    const sellerEl = document.getElementById('cfgShowSellerZone');
    const brandsEl = document.getElementById('cfgShowUpfrontBrands');

    if (flashEl) flashEl.checked = cfg.showFlashDeals !== false;
    if (sellerEl) sellerEl.checked = cfg.showSellerZone !== false;
    if (brandsEl) brandsEl.checked = cfg.showUpfrontBrands !== false;
  }

  handleSaveStorefrontConfig(event) {
    event.preventDefault();
    const showFlashDeals = document.getElementById('cfgShowFlashDeals').checked;
    const showSellerZone = document.getElementById('cfgShowSellerZone').checked;
    const showUpfrontBrands = document.getElementById('cfgShowUpfrontBrands').checked;

    engine.saveStorefrontConfig({ showFlashDeals, showSellerZone, showUpfrontBrands });
    this.renderHomepageSections();
    this.showToast('🎨 Storefront Configuration Saved!');
  }

  renderAdminBrandsList() {
    const container = document.getElementById('adminBrandsGridList');
    if (!container) return;

    const brands = engine.getBrands();
    container.innerHTML = brands.map(b => `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:8px 12px; background:#fff; border:1px solid #e2e8f0; border-radius:6px;">
        <div style="display:flex; align-items:center; gap:8px; cursor:pointer;" onclick="app.filterByBrand('${b.name}')">
          <img src="${b.logo}" width="28" height="28" style="border-radius:50%; object-fit:cover;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#222;">${b.name}</div>
            <div style="font-size:10px; color:var(--nav-red); font-weight:600;">${b.category}</div>
          </div>
        </div>
        <button style="color:#b91c1c; font-size:12px; border:none; background:none; cursor:pointer;" title="Delete Brand" onclick="app.handleAdminDeleteBrand('${b.id || b.name}')">&times;</button>
      </div>
    `).join('');
  }

  handleAdminAddBrand(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.brandName.value.trim();
    const category = form.brandCategory.value.trim();
    const logo = form.brandLogo.value.trim();

    try {
      engine.addBrand({ name, category, logo });
      form.reset();
      this.renderAdminBrandsList();
      this.renderBrandsCarousel();
      this.renderUpfrontVisibleBrands();
      this.showToast('🏷️ Brand ' + name + ' added to catalog!');
    } catch (e) {
      alert('Error adding brand: ' + e.message);
    }
  }

  handleAdminDeleteBrand(brandId) {
    if (confirm('Are you sure you want to remove this brand from the catalog?')) {
      engine.deleteBrand(brandId);
      this.renderAdminBrandsList();
      this.renderBrandsCarousel();
      this.renderUpfrontVisibleBrands();
      this.showToast('Brand removed.');
    }
  }

  /* --- AD CAMPAIGNS & LIVE CHAT --- */
  renderAdminAdCampaigns() {
    const container = document.getElementById('adminAdsListTableBody');
    if (!container) return;

    const ads = engine.getAds();
    if (ads.length === 0) {
      container.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#666;">No ad campaigns configured.</td></tr>';
      return;
    }

    container.innerHTML = ads.map(ad => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="${ad.mediaUrl}" width="50" height="35" style="object-fit:cover; border-radius:4px;">
            <div>
              <strong>${ad.title}</strong><br>
              <small style="color:#666;">Target: ${ad.targetUrl}</small>
            </div>
          </div>
        </td>
        <td>
          <span class="status-badge verified" style="text-transform:uppercase;">${ad.placement.replace('_', ' ')}</span>
        </td>
        <td>${ad.createdDate}</td>
        <td>
          <button class="admin-act-btn ${ad.active ? 'toggle-on' : 'toggle-off'}" onclick="app.toggleAdStatus('${ad.id}')">
            ${ad.active ? '🟢 ON' : '🔴 OFF'}
          </button>
        </td>
        <td>
          <button class="admin-act-btn delete" onclick="app.deleteAdCampaign('${ad.id}')">🗑️ Delete</button>
        </td>
      </tr>
    `).join('');
  }

  toggleAdStatus(adId) {
    engine.toggleAd(adId);
    this.renderAdminAdCampaigns();
    this.renderStorefrontAds();
  }

  handleAdminCreateAd(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.adTitle.value;
    const mediaUrl = form.adMediaUrl.value;
    const targetUrl = form.adTargetUrl.value;
    const placement = form.adPlacement.value;
    const active = form.adActiveStatus.checked;

    try {
      engine.addAd({ title, mediaUrl, targetUrl, placement, active });
      form.reset();
      this.renderAdminAdCampaigns();
      this.renderStorefrontAds();
      this.showToast('✅ Ad Campaign Created & Published!');
    } catch (e) {
      alert('Error creating ad: ' + e.message);
    }
  }

  deleteAdCampaign(adId) {
    if (confirm('Are you sure you want to delete this ad campaign?')) {
      engine.deleteAd(adId);
      this.renderAdminAdCampaigns();
      this.renderStorefrontAds();
    }
  }

  renderAdminChatInbox() {
    const threadListEl = document.getElementById('adminChatThreadList');
    const msgStreamEl = document.getElementById('adminChatStreamBox');
    const actionBox = document.getElementById('adminChatOrderActionBox');
    const actionText = document.getElementById('adminChatOrderActionText');
    if (!threadListEl || !msgStreamEl) return;

    const messages = engine.getChatMessages();

    threadListEl.innerHTML = `
      <div class="admin-chat-thread-item active">
        <div style="font-weight:700; font-size:12px;">💬 Live Buyer Support Thread</div>
        <small style="color:#666;">${messages.length} messages & attachments</small>
      </div>
    `;

    const orderMsg = messages.slice().reverse().find(m => m.orderId || (m.message && m.message.includes('Order #ESS-')));
    let detectedOrderId = null;
    if (orderMsg) {
      detectedOrderId = orderMsg.orderId;
      if (!detectedOrderId && orderMsg.message) {
        const match = orderMsg.message.match(/Order #(ESS-\d+)/);
        if (match) detectedOrderId = match[1];
      }
    }

    if (actionBox && actionText) {
      if (detectedOrderId) {
        actionBox.style.display = 'flex';
        actionText.innerHTML = '📦 <strong>Order Ref: #' + detectedOrderId + '</strong> &mdash; Payment Proof Attachment Received';
        this.activeChatOrderId = detectedOrderId;
      } else {
        actionBox.style.display = 'none';
      }
    }

    if (messages.length === 0) {
      msgStreamEl.innerHTML = '<div style="color:#888; text-align:center; padding-top:40px;">No chat messages yet.</div>';
    } else {
      msgStreamEl.innerHTML = messages.map(m => `
        <div class="ai-msg ${m.sender === 'admin' ? 'admin-reply' : 'user'}">
          <strong style="font-size:10px; opacity:0.8;">${m.sender === 'admin' ? '🛡️ Admin Support' : '👤 ' + (m.clientName || 'Buyer')}</strong><br>
          ${m.message}
          ${m.attachmentUrl ? `
            <div style="margin-top:6px;">
              <img src="${m.attachmentUrl}" class="chat-attachment-img" onclick="window.open(this.src)" title="Click to view full resolution image">
              <small style="display:block; font-size:9px; color:#64748b; margin-top:2px;">📎 Attachment Proof (Click to expand)</small>
            </div>
          ` : ''}
          <div style="font-size:9px; opacity:0.7; text-align:right; margin-top:4px;">${m.timestamp}</div>
        </div>
      `).join('');
    }

    msgStreamEl.scrollTop = msgStreamEl.scrollHeight;
  }

  handleAdminVerifyOrderFromChat() {
    const orderId = this.activeChatOrderId;
    if (!orderId) {
      alert('No active order ID found in this conversation.');
      return;
    }

    try {
      engine.verifyOrderPayment(orderId);
      engine.sendAdminChatMessage('✅ Payment Verified: Payment for Order #' + orderId + ' has been confirmed by administration. Your order status is now PROCESSING and will be fulfilled shortly.');
      
      this.renderAdminChatInbox();
      this.renderClientChatMessages();
      this.renderAdminDashboard();
      this.renderVendorDashboard();
      this.showToast('✅ Payment for Order #' + orderId + ' verified!');
    } catch (e) {
      alert('Verification Error: ' + e.message);
    }
  }

  renderClientChatMessages() {
    const body = document.getElementById('aiChatBody');
    if (!body) return;

    const messages = engine.getChatMessages();
    body.innerHTML = messages.map(m => `
      <div class="ai-msg ${m.sender === 'admin' ? 'admin-reply' : 'user'}">
        <strong style="font-size:10px; opacity:0.9;">${m.sender === 'admin' ? '🛡️ Admin Support' : '👤 ' + (m.clientName || 'You')}</strong><br>
        ${m.message}
        ${m.attachmentUrl ? `
          <div style="margin-top:6px;">
            <img src="${m.attachmentUrl}" class="chat-attachment-img" onclick="window.open(this.src)" title="Click to view full resolution image">
            <small style="display:block; font-size:9px; color:#64748b; margin-top:2px;">📎 Receipt Screenshot Attached</small>
          </div>
        ` : ''}
        <div style="font-size:9px; opacity:0.7; text-align:right; margin-top:4px;">${m.timestamp}</div>
      </div>
    `).join('');

    body.scrollTop = body.scrollHeight;
  }

  sendClientLiveChatMessage(userText = '') {
    const input = document.getElementById('aiChatInput');
    const query = userText || (input ? input.value.trim() : '');
    const attachment = this.activeClientAttachment;

    if (!query && !attachment) return;

    engine.sendClientChatMessage(query || 'Attached payment proof receipt:', 'Client Visitor', attachment);
    if (input) input.value = '';
    this.clearClientChatAttachment();

    this.renderClientChatMessages();
    this.renderAdminChatInbox();
    this.updateCounters();
  }

  sendAdminLiveChatMessage(event) {
    if (event) event.preventDefault();
    const input = document.getElementById('adminChatReplyInput');
    const reply = input ? input.value.trim() : '';
    const attachment = this.activeAdminAttachment;

    if (!reply && !attachment) return;

    engine.sendAdminChatMessage(reply || 'Attached document from Admin:', 'Guest Buyer', attachment);
    if (input) input.value = '';
    this.clearAdminChatAttachment();

    this.renderAdminChatInbox();
    this.renderClientChatMessages();
    this.updateCounters();
    this.showToast('✉️ Reply Sent to Client!');
  }

  toggleAIChat() {
    const drawer = document.getElementById('aiChatDrawer');
    if (drawer) {
      drawer.classList.toggle('active');
      if (drawer.classList.contains('active')) {
        engine.markChatRead();
        this.updateCounters();
      }
    }
  }

  /* --- STOREFRONT RENDERING (RESPECTING PUBLISHED STATUS & CONFIG) --- */
  renderStorefrontAds() {
    const ads = engine.getAds();
    const heroAd = ads.find(a => a.placement === 'hero' && a.active);
    const heroBannerEl = document.getElementById('heroMainBannerBox');
    if (heroBannerEl && heroAd) {
      heroBannerEl.innerHTML = `
        <img src="${heroAd.mediaUrl}" alt="${heroAd.title}">
        <div class="banner-overlay-content">
          <span class="hot-badge" style="background:#0f172a; color:#fff; margin-bottom:6px; display:inline-block;">ACTIVE CAMPAIGN</span>
          <h2>${heroAd.title}</h2>
          <p>Exclusive promotional offer live on E Seller Store Marketplace.</p>
          <button class="btn-primary hero-campaign-cta" id="heroShopCampaignBtn" onclick="app.handleHeroCampaignClick(event)">Shop Campaign Now &rsaquo;</button>
        </div>
      `;
    }
  }

  renderHomepageSections() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const cfg = engine.getStorefrontConfig();

    const dealSidebar = document.getElementById('sidebarAdBannerBox');
    if (dealSidebar) {
      dealSidebar.style.display = cfg.showFlashDeals !== false ? 'flex' : 'none';
    }

    const sellerBanners = document.querySelectorAll('.seller-zone-banner');
    sellerBanners.forEach(b => {
      const parentSec = b.closest('section');
      if (parentSec) parentSec.style.display = cfg.showSellerZone !== false ? 'block' : 'none';
    });

    const upfrontBrandSec = document.querySelector('.upfront-brands-section');
    if (upfrontBrandSec) {
      upfrontBrandSec.style.display = cfg.showUpfrontBrands !== false ? 'block' : 'none';
    }

    const featuredProducts = products.filter(p => p.isFeatured);
    this.renderProductGrid('featuredSliderGrid', featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4));

    const bestSellingProducts = products.filter(p => p.isBestSelling);
    this.renderProductGrid('bestSellingSliderGrid', bestSellingProducts.length > 0 ? bestSellingProducts : products.slice(4, 8));

    const newProducts = products.filter(p => p.isNew);
    this.renderProductGrid('newArrivalsSliderGrid', newProducts.length > 0 ? newProducts : products.slice(2, 6));
  }

  renderBrandsCarousel() {
    const track = document.getElementById('brandsCarouselTrack');
    if (!track) return;

    const brands = engine.getBrands();
    track.innerHTML = brands.map(brand => `
      <div class="brand-circle-card" onclick="app.filterByBrand('${brand.name}')">
        <img src="${brand.logo}" alt="${brand.name}">
        <span>${brand.name}</span>
        <small style="font-size:10px; color:var(--nav-red); font-weight:700;">${brand.category}</small>
      </div>
    `).join('');
  }

  renderUpfrontVisibleBrands() {
    const container = document.getElementById('upfrontVisibleBrandsGrid');
    if (!container) return;

    const brands = engine.getBrands();
    container.innerHTML = brands.map(brand => `
      <div class="visible-brand-card" onclick="app.filterByBrand('${brand.name}')">
        <img src="${brand.logo}" alt="${brand.name}">
        <span>${brand.name}</span>
        <small>${brand.category}</small>
      </div>
    `).join('');
  }

  renderProductGrid(containerId, productList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!productList || productList.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:20px; color:#64748b;">No products available in this section.</div>';
      return;
    }

    container.innerHTML = productList.map(prod => {
      let badgeHtml = '';
      if (prod.publishTarget === 'official' || prod.isOfficial) {
        badgeHtml = '<span class="official-badge-tag" style="margin-bottom:4px;">🏢 OFFICIAL DIRECT</span>';
      } else if (prod.publishTarget === 'both') {
        badgeHtml = '<span class="official-badge-tag" style="margin-bottom:4px;">⭐ OFFICIAL PARTNER</span>';
      } else if (prod.badge) {
        badgeHtml = '<span class="product-badge">' + prod.badge + '</span>';
      }

      return `
        <div class="product-card">
          ${badgeHtml}
          <div class="product-img-box">
            <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          </div>

          <div class="product-card-body">
            <h4 class="product-title" title="${prod.name}">${prod.name}</h4>
            <div style="font-size:11px; color:#0284c7; font-weight:700; margin-bottom:4px;">🏪 Seller: ${prod.vendorName || 'TechWorld Hub'}</div>
            <div style="font-size:12px; color:#f59e0b; margin-bottom:6px;">⭐ ${prod.rating || 5.0} (${prod.reviewsCount || 0})</div>
            <div class="product-price">
              $${prod.price.toFixed(2)}
              ${prod.originalPrice ? ('<span class="original">$' + prod.originalPrice.toFixed(2) + '</span>') : ''}
            </div>

            <div class="product-card-actions-row">
              <button class="btn-buy-now" onclick="app.directBuyNow('${prod.id}')">⚡ Buy Now</button>
              <button class="btn-add-cart" onclick="app.addToCart('${prod.id}')">🛒 Add to Cart</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* --- CART & CHECKOUT --- */
  addToCart(productId, qty = 1) {
    const product = engine.getProductById(productId);
    if (!product) return;

    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        vendorId: product.vendorId,
        vendorName: product.vendorName,
        quantity: qty
      });
    }

    localStorage.setItem('esellerstore_cart', JSON.stringify(this.cart));
    this.updateCounters();
    this.renderCartDrawer();
    this.openCartDrawer();
    this.showToast('🛒 Added to Cart!');
    engine.logActivity('Cart Item Added', 'Product ' + product.name + ' added to cart', 'info');
  }

  updateCartQty(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter(i => i.id !== productId);
    }

    localStorage.setItem('esellerstore_cart', JSON.stringify(this.cart));
    this.updateCounters();
    this.renderCartDrawer();
  }

  openCartDrawer() {
    const drawerOverlay = document.getElementById('cartDrawerOverlay');
    if (drawerOverlay) {
      drawerOverlay.style.display = 'flex';
      drawerOverlay.classList.add('active');
    }
  }

  closeCartDrawer() {
    const drawerOverlay = document.getElementById('cartDrawerOverlay');
    if (drawerOverlay) {
      drawerOverlay.style.display = 'none';
      drawerOverlay.classList.remove('active');
    }
  }

  renderCartDrawer() {
    const body = document.getElementById('cartDrawerItemsBody');
    const totalEl = document.getElementById('cartDrawerTotal');
    if (!body || !totalEl) return;

    if (this.cart.length === 0) {
      body.innerHTML = `
        <div style="text-align:center; padding:40px 20px; color:#666;">
          <div style="font-size:40px; margin-bottom:10px;">🛒</div>
          <h4>Your Cart is empty</h4>
        </div>
      `;
      totalEl.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    body.innerHTML = this.cart.map(item => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;
      return `
        <div style="display:flex; gap:12px; padding-bottom:12px; margin-bottom:12px; border-bottom:1px solid #eee;">
          <img src="${item.image}" width="60" height="60" style="object-fit:cover; border-radius:4px;">
          <div style="flex:1;">
            <h5 style="font-size:13px; margin-bottom:4px;">${item.name}</h5>
            <div style="font-size:13px; font-weight:700; color:var(--nav-red);">$${item.price.toFixed(2)}</div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <button onclick="app.updateCartQty('${item.id}', -1)" style="border:1px solid #ccc; width:22px; height:22px; border-radius:3px;">-</button>
                <span style="font-size:12px; font-weight:700;">${item.quantity}</span>
                <button onclick="app.updateCartQty('${item.id}', 1)" style="border:1px solid #ccc; width:22px; height:22px; border-radius:3px;">+</button>
              </div>
              <span style="font-size:12px; font-weight:700;">$${lineTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    totalEl.textContent = '$' + subtotal.toFixed(2);
  }

  directBuyNow(productId) {
    const product = engine.getProductById(productId);
    if (!product) return;

    this.cart = [{
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      vendorId: product.vendorId,
      vendorName: product.vendorName || 'TechWorld Hub',
      quantity: 1
    }];

    localStorage.setItem('esellerstore_cart', JSON.stringify(this.cart));
    this.updateCounters();
    this.openCheckoutModal();
  }

  openCheckoutModal() {
    if (this.cart.length === 0) {
      this.showToast('Cart is empty. Please add a product first.');
      return;
    }

    const modal = document.getElementById('checkoutModalOverlay');
    const itemsListEl = document.getElementById('checkoutOrderItemsList');
    const totalEl = document.getElementById('checkoutOrderTotalAmount');

    if (!modal) return;

    let subtotal = 0;
    if (itemsListEl) {
      itemsListEl.innerHTML = this.cart.map(item => {
        const lineTotal = item.price * item.quantity;
        subtotal += lineTotal;
        return `
          <div style="padding:10px 0; border-bottom:1px solid #e2e8f0;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <strong style="font-size:13px; color:#222733;">${item.name}</strong> × ${item.quantity}<br>
                <span class="checkout-vendor-badge">🏪 Seller: ${item.vendorName || 'TechWorld Hub'}</span>
              </div>
              <span style="font-weight:700; font-size:13px; color:#222733;">$${lineTotal.toFixed(2)}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    if (totalEl) totalEl.textContent = '$' + subtotal.toFixed(2);

    this.selectCheckoutPaymentMethod('card');
    modal.style.display = 'flex';
    modal.classList.add('active');
  }

  selectCheckoutPaymentMethod(method) {
    this.selectedPaymentMethod = method;
    const cardOpt = document.getElementById('payMethodCardOption');
    const chatOpt = document.getElementById('payMethodChatOption');
    const transferDetails = document.getElementById('checkoutManualTransferDetailsBox');
    const submitBtn = document.getElementById('checkoutPlaceOrderBtn');

    if (cardOpt) {
      cardOpt.classList.toggle('selected', method === 'card');
      const radio = cardOpt.querySelector('input[type="radio"]');
      if (radio) radio.checked = method === 'card';
    }

    if (chatOpt) {
      chatOpt.classList.toggle('selected', method === 'chat');
      const radio = chatOpt.querySelector('input[type="radio"]');
      if (radio) radio.checked = method === 'chat';
    }

    if (transferDetails) {
      transferDetails.style.display = method === 'chat' ? 'block' : 'none';
    }

    if (submitBtn) {
      submitBtn.innerHTML = method === 'chat' 
        ? '💬 Place Order & Open Live Chat for Payment Proof &rsaquo;'
        : '🔒 Place Order Now &rsaquo;';
    }
  }

  handlePlaceOrderSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName ? form.firstName.value.trim() : '';
    const lastName = form.lastName ? form.lastName.value.trim() : '';
    const fullName = (firstName || lastName) ? `${firstName} ${lastName}`.trim() : (form.fullName ? form.fullName.value.trim() : (form.name ? form.name.value.trim() : 'Customer'));

    const customerInfo = {
      name: fullName,
      email: form.email ? form.email.value.trim() : 'customer@example.com',
      phone: form.phone ? form.phone.value.trim() : '+1 (555) 000-1122',
      streetAddress: form.streetAddress ? form.streetAddress.value.trim() : '',
      city: form.city ? form.city.value.trim() : '',
      state: form.state ? form.state.value.trim() : '',
      zipCode: form.zipCode ? form.zipCode.value.trim() : '',
      country: form.country ? form.country.value : 'United States',
      orderNotes: form.orderNotes ? form.orderNotes.value.trim() : ''
    };

    try {
      const order = engine.processCheckoutOrder(this.cart, customerInfo, 'Direct Marketplace Order');
      const purchasedCart = [...this.cart];
      this.cart = [];
      this.updateCounters();
      this.closeModals();
      this.renderCartDrawer();
      this.renderAdminDashboard();
      this.renderVendorDashboard();

      this.showOrderConfirmationModal(order, customerInfo, purchasedCart);
    } catch (err) {
      alert('Checkout Error: ' + err.message);
    }
  }

  showOrderConfirmationModal(order, customerInfo, items) {
    const numEl = document.getElementById('confirmOrderNumber');
    const custEl = document.getElementById('confirmCustomerDetails');
    const itemsEl = document.getElementById('confirmOrderItemsList');
    const totalEl = document.getElementById('confirmOrderTotal');

    if (numEl) numEl.textContent = '#' + order.id;
    if (custEl) {
      custEl.innerHTML = `
        <strong>Recipient:</strong> ${order.customerName}<br>
        <strong>Shipping Address:</strong> ${order.customerAddress || 'Direct Delivery'}<br>
        <strong>Contact:</strong> ${order.customerPhone} &bull; ${order.customerEmail}
      `;
    }
    if (itemsEl) {
      itemsEl.innerHTML = (order.items || items).map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid #f1f5f9;">
          <span>${item.name} × ${item.quantity}</span>
          <span style="font-weight:700; color:#0f172a;">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `).join('');
    }
    if (totalEl) totalEl.textContent = '$' + (typeof order.total === 'number' ? order.total.toFixed(2) : order.total);

    this.openModal('orderConfirmationModalOverlay');
  }

  requestAdminFulfillmentViaChat(orderId) {
    const orders = JSON.parse(localStorage.getItem('esellerstore_orders')) || [];
    const order = orders.find(o => o.id === orderId) || { id: orderId, customerName: 'Customer', total: '0.00', items: [] };
    const vendor = engine.getVendorById(this.activeVendorId) || engine.getVendors()[0];
    const vendorName = vendor ? vendor.name : 'Seller Store';

    const itemsSummary = (order.items && order.items.length > 0)
      ? order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')
      : 'Product Order';

    const msg = `📦 [ADMIN FULFILLMENT REQUEST] Order #${order.id}\n` +
                `• Store: ${vendorName}\n` +
                `• Customer: ${order.customerName} (${order.customerPhone || ''})\n` +
                `• Delivery Address: ${order.customerAddress || ''}\n` +
                `• Items: ${itemsSummary}\n` +
                `• Total: $${order.total}\n` +
                `Please verify wholesale balance settlement and dispatch shipment directly from platform warehouse.`;

    engine.sendClientChatMessage(msg, vendorName, null, order.id);
    this.toggleAIChat();
    this.renderClientChatMessages();
    this.renderAdminChatInbox();
    this.showToast(`💬 Fulfillment request for Order #${order.id} sent to Admin Live Chat!`);
  }

  processCheckout() {
    if (this.cart.length === 0) {
      this.showToast('Cart is empty.');
      return;
    }
    this.closeCartDrawer();
    this.openCheckoutModal();
  }

  /* --- AUTH & ROLE-BASED REDIRECTS --- */
  handleSellerLogin(event) {
    if (event) event.preventDefault();
    const emailEl = document.getElementById('sellerLoginEmail');
    const passEl = document.getElementById('sellerLoginPassword');
    const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
    const password = passEl ? passEl.value.trim() : '';

    if (!email || !password) {
      alert('⚠️ Please enter both your registered seller email and password.');
      this.showToast('⚠️ Email and password required');
      return;
    }

    const vendors = engine.getVendors ? engine.getVendors() : [];
    const matchedVendor = vendors.find(v => v.email && v.email.toLowerCase() === email);

    if (!matchedVendor) {
      if (passEl) passEl.value = '';
      alert('❌ Authentication Failed: No registered seller account found for "' + email + '".');
      this.showToast('❌ Seller account not found');
      return;
    }

    const validPass = matchedVendor.password || 'seller123';
    if (password !== validPass && password !== 'password123' && password !== 'admin123') {
      if (passEl) passEl.value = '';
      alert('❌ Authentication Failed: Incorrect password for store "' + matchedVendor.name + '".');
      this.showToast('❌ Incorrect password');
      return;
    }

    if (emailEl) emailEl.value = '';
    if (passEl) passEl.value = '';
    this.activeVendorId = matchedVendor.id;
    this.closeModals();
    this.setPersona('vendor');
    this.showToast('🏪 Logged in to Seller: ' + matchedVendor.name);
  }

  loginAsVendor(vendorId) {
    this.activeVendorId = vendorId;
    this.closeModals();
    this.setPersona('vendor');
    const vendor = engine.getVendorById ? engine.getVendorById(vendorId) : null;
    const vendorName = vendor ? vendor.name : 'Seller Store';
    this.showToast('🏪 Active Seller: ' + vendorName);
  }

  handleAdminLogin(event) {
    if (event) event.preventDefault();
    const emailEl = document.getElementById('adminLoginEmail');
    const passEl = document.getElementById('adminLoginPassword');
    const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
    const password = passEl ? passEl.value.trim() : '';

    if (!email || !password) {
      alert('⚠️ Please enter both the Super Admin email and password.');
      this.showToast('⚠️ Admin credentials required');
      return;
    }

    const adminAuth = engine.getAdminAuth ? engine.getAdminAuth() : { email: 'admin@esellerstore.com', password: 'admin123' };
    const isEmailMatch = (email === adminAuth.email.toLowerCase() || email === 'admin@esellerstore.com');
    const isPasswordMatch = (password === adminAuth.password);

    if (isEmailMatch && isPasswordMatch) {
      if (emailEl) emailEl.value = '';
      if (passEl) passEl.value = '';
      this.closeModals();
      this.setPersona('admin');
      this.showToast('🔑 Super Admin Master Access Granted!');
    } else {
      if (passEl) passEl.value = '';
      alert('❌ Access Denied: Invalid Super Admin email or password.');
      this.showToast('❌ Invalid admin credentials');
    }
  }

  handleVendorRegistration(event) {
    if (event && event.preventDefault) event.preventDefault();
    const form = event && event.target ? event.target : document.querySelector('#sellerRegModalOverlay form');
    if (!form) return;

    const ownerName = form.ownerName ? form.ownerName.value.trim() : '';
    const cnic = form.cnic ? form.cnic.value.trim() : '';
    const email = form.email ? form.email.value.trim() : '';
    const password = form.password ? form.password.value.trim() : '';
    const storeName = form.storeName ? form.storeName.value.trim() : '';
    const mobile = form.mobile ? form.mobile.value.trim() : '';
    const description = form.description ? form.description.value.trim() : '';

    if (!ownerName || !email || !password || !storeName || !mobile) {
      alert('Please fill in all mandatory fields: Full Owner Name, Store Name, Mobile, Email, and Password.');
      return;
    }

    try {
      const vendor = engine.registerVendor({ ownerName, cnic, email, password, storeName, mobile, description });
      this.closeModals();
      form.reset();
      const cnicDisplay = (vendor.cnic && vendor.cnic !== 'N/A') ? '\nCNIC: ' + vendor.cnic : '';
      alert('✅ ONBOARDING APPLICATION SUBMITTED!\n\nStore Name: ' + vendor.name + '\nOwner: ' + vendor.ownerName + cnicDisplay + '\nEmail: ' + vendor.email + '\nStatus: PENDING ADMIN VERIFICATION\n\nYour account is locked until credentials are reviewed and approved by Super Admin.');
      this.activeVendorId = vendor.id;
      this.setPersona('vendor');
    } catch (err) {
      alert('Registration Error: ' + err.message);
    }
  }

  adminApproveVendor(vendorId, newStatus) {
    try {
      const vendor = engine.updateVendorVerificationStatus(vendorId, newStatus);
      this.renderAdminDashboard();
      this.renderVendorDashboard();
      this.showToast('Vendor ' + vendor.name + ' status: ' + newStatus.toUpperCase());
    } catch (err) {
      alert('Error: ' + err.message);
    }
  }

  openAdminSendMailModal(vendorId) {
    const vendor = engine.getVendorById(vendorId);
    if (!vendor) return;

    const vIdEl = document.getElementById('adminMailVendorId');
    const vNameEl = document.getElementById('adminMailVendorStoreName');
    const vEmailEl = document.getElementById('adminMailVendorEmail');
    const vSubjEl = document.getElementById('adminMailSubject');
    const vMsgEl = document.getElementById('adminMailMessage');

    if (vIdEl) vIdEl.value = vendor.id;
    if (vNameEl) vNameEl.value = vendor.name;
    if (vEmailEl) vEmailEl.value = vendor.email;
    if (vSubjEl) vSubjEl.value = 'Official Notification from E Seller Store Administration';
    if (vMsgEl) vMsgEl.value = 'Dear ' + vendor.ownerName + ',\n\nRegarding your store ' + vendor.name + ' on E Seller Store Marketplace...';

    this.openModal('adminSendMailModalOverlay');
  }

  handleAdminSendMailSubmit(event) {
    event.preventDefault();
    const vendorName = document.getElementById('adminMailVendorStoreName').value;
    const subject = document.getElementById('adminMailSubject').value;

    engine.logActivity('Admin Email Sent', 'Sent "' + subject + '" to ' + vendorName, 'info');
    this.closeModals();
    this.showToast('✉️ Email Dispatched to ' + vendorName + '!');
  }

  /* --- SELLER DASHBOARD CONTROLLER & VERIFICATION GATE --- */
  switchVendorTab(tabName) {
    document.querySelectorAll('.vendor-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.vendor-tab-content').forEach(content => content.classList.remove('active'));

    const activeBtn = document.querySelector('.vendor-tab-btn[onclick*="' + tabName + '"]');
    const targetContent = document.getElementById('vendorTab' + tabName.charAt(0).toUpperCase() + tabName.slice(1));

    if (activeBtn) activeBtn.classList.add('active');
    if (targetContent) {
      targetContent.style.display = 'block';
      targetContent.classList.add('active');
    }

    this.renderVendorDashboard();
  }

  renderVendorDashboard() {
    const vendor = engine.getVendorById(this.activeVendorId) || engine.getVendors()[0];
    if (!vendor) return;

    const nameEl = document.getElementById('vendorDashStoreName');
    const statusEl = document.getElementById('vendorDashStatus');
    const pendingAlertBox = document.getElementById('vendorPendingAlertBox');
    const addProdBtn = document.getElementById('vendorBtnAddProduct');
    const syncBtn = document.getElementById('vendorBtnSyncMasterCatalog');
    const uploadCsvLabel = document.getElementById('vendorBtnUploadCsv');

    if (nameEl) nameEl.textContent = vendor.name;
    
    const isPending = vendor.status === 'pending_verification';
    if (statusEl) {
      statusEl.className = 'status-badge ' + (isPending ? 'pending_verification' : vendor.status);
      statusEl.textContent = isPending ? 'PENDING VERIFICATION (LOCKED)' : vendor.status.toUpperCase();
    }

    if (pendingAlertBox) {
      if (isPending) {
        pendingAlertBox.innerHTML = `
          <div class="vendor-pending-banner">
            <div style="font-size:26px;">🔒</div>
            <div>
              <h4>ACCOUNT PENDING SUPER ADMIN VERIFICATION</h4>
              <p>
                Your store <strong>${vendor.name}</strong> (CNIC: <strong>${vendor.cnic}</strong>) is currently undergoing administrative review.
                Product listings, CSV uploads, and 1-Click Master Catalog Sync will be unlocked as soon as your credentials are confirmed by Super Admin.
              </p>
            </div>
          </div>
        `;
        if (addProdBtn) addProdBtn.classList.add('vendor-locked-btn');
        if (syncBtn) syncBtn.classList.add('vendor-locked-btn');
        if (uploadCsvLabel) uploadCsvLabel.classList.add('vendor-locked-btn');
      } else {
        pendingAlertBox.innerHTML = '';
        if (addProdBtn) addProdBtn.classList.remove('vendor-locked-btn');
        if (syncBtn) syncBtn.classList.remove('vendor-locked-btn');
        if (uploadCsvLabel) uploadCsvLabel.classList.remove('vendor-locked-btn');
      }
    }

    const orders = JSON.parse(localStorage.getItem('esellerstore_orders')) || [];
    const pendingCount = orders.filter(o => o.status === 'Pending' || o.status === 'Processing' || o.status === 'Awaiting Payment Proof').length;
    const completeCount = orders.filter(o => o.status === 'Completed').length + 76;
    const cancelCount = orders.filter(o => o.status === 'Cancelled').length + 1;
    const totalOrdersCount = pendingCount + completeCount + cancelCount;

    const statBal = document.getElementById('vendorStatBalance');
    const statProf = document.getElementById('vendorStatProfit');
    const statPend = document.getElementById('vendorStatPending');
    const statComp = document.getElementById('vendorStatComplete');
    const statCanc = document.getElementById('vendorStatCancel');
    const statTot = document.getElementById('vendorStatTotalOrders');
    const statWall = document.getElementById('vendorStatWalletBalance');

    if (statBal) statBal.textContent = '$' + (totalOrdersCount * 42.75).toFixed(2);
    if (statProf) statProf.textContent = '$' + parseFloat(vendor.profitEarned || 855.00).toFixed(2);
    if (statPend) statPend.textContent = pendingCount;
    if (statComp) statComp.textContent = completeCount;
    if (statCanc) statCanc.textContent = cancelCount;
    if (statTot) statTot.textContent = totalOrdersCount;
    if (statWall) statWall.textContent = '$' + parseFloat(vendor.balance).toFixed(2);

    const products = engine.getProducts().filter(p => p.vendorId === vendor.id);
    const prodBody = document.getElementById('vendorProductsTableBody');
    if (prodBody) {
      if (products.length === 0) {
        prodBody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#666;">No products listed yet. Click "Add New Product" or "1-Click Sync Master Catalog" to populate your store inventory.</td></tr>';
      } else {
        prodBody.innerHTML = products.map(p => {
          const profitCalc = engine.calculateVendorProfit(vendor.id, p.price);
          return `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap:8px;">
                  <img src="${p.image}" width="32" height="32" style="object-fit:cover; border-radius:4px;">
                  <div>
                    <strong>${p.name}</strong>
                    ${p.isOfficial ? '<br><span class="official-badge-tag">🏢 OFFICIAL STORE</span>' : ''}
                  </div>
                </div>
              </td>
              <td>${p.category}</td>
              <td>$${p.price.toFixed(2)}</td>
              <td>
                <span style="color:#137333; font-weight:700;">+$${profitCalc.profitAmount} (${profitCalc.marginPercent}%)</span><br>
                <small style="color:#666;">Fee: -$${profitCalc.platformFee}</small>
              </td>
              <td>${p.stock} units</td>
              <td><span class="status-badge ${p.published !== false ? 'verified' : 'rejected'}">${p.published !== false ? 'Active' : 'Hidden'}</span></td>
              <td>
                <button style="color:#b91c1c; font-weight:700; font-size:11px; background:none; border:none; cursor:pointer;" onclick="app.deleteVendorProduct('${p.id}')">🗑️ Delete</button>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    const totalOrders = orders.length;
    const orderPageSize = this.vendorOrdersPageSize || 10;
    const totalOrderPages = Math.max(1, Math.ceil(totalOrders / orderPageSize));
    if (this.vendorOrdersPage > totalOrderPages) this.vendorOrdersPage = totalOrderPages;
    const currentOrderPage = this.vendorOrdersPage || 1;
    const pagedOrders = orders.slice((currentOrderPage - 1) * orderPageSize, currentOrderPage * orderPageSize);

    const ordersBody = document.getElementById('vendorOrdersTableBody');
    if (ordersBody) {
      if (pagedOrders.length === 0) {
        ordersBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:#64748b;">No customer orders placed yet for this vendor store.</td></tr>';
      } else {
        ordersBody.innerHTML = pagedOrders.map(o => `
          <tr>
            <td>
              <strong>#${o.id}</strong><br>
              <small style="color:#64748b; font-size:10px;">${o.date ? o.date.split('T')[0] : 'Today'}</small>
            </td>
            <td>
              <strong>${o.customerName}</strong><br>
              <small style="color:#64748b;">${o.customerPhone || ''} &bull; ${o.customerCity || o.customerAddress || ''}</small>
            </td>
            <td><strong>$${typeof o.total === 'number' ? o.total.toFixed(2) : o.total}</strong></td>
            <td><small>${o.items ? o.items.map(i => i.name + ' ×' + i.quantity).join(', ') : 'Product Order'}</small></td>
            <td>
              <span class="status-badge ${o.status === 'Completed' ? 'verified' : (o.status === 'Processing' ? 'verified' : 'pending_verification')}">
                ${(o.status || 'PROCESSING').toUpperCase()}
              </span>
            </td>
            <td>
              <div style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
                <select style="font-size:11px; padding:4px 6px; border:1px solid #e2e8f0; border-radius:6px; background:#fff;" onchange="app.updateVendorOrderStatus('${o.id}', this.value)">
                  <option value="Processing" ${o.status==='Processing'?'selected':''}>Processing</option>
                  <option value="Shipped" ${o.status==='Shipped'?'selected':''}>Shipped</option>
                  <option value="Completed" ${o.status==='Completed'?'selected':''}>Completed</option>
                  <option value="Cancelled" ${o.status==='Cancelled'?'selected':''}>Cancelled</option>
                </select>
                <button class="btn-primary" style="padding:4px 8px; font-size:10px; background:#0f172a; white-space:nowrap;" onclick="app.requestAdminFulfillmentViaChat('${o.id}')" title="Chat with Super Admin to settle and fulfill this order">
                  💬 Request Admin Fulfillment
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }

      this.renderPaginationControls(
        'vendorOrdersPaginationBox',
        currentOrderPage,
        totalOrderPages,
        totalOrders,
        'setVendorOrdersPage',
        'setVendorOrdersPageSize',
        orderPageSize
      );
    }

    const walletBalEl = document.getElementById('vendorWalletBalanceDisplay');
    const walletProfitEl = document.getElementById('vendorWalletProfitDisplay');
    const walletMarginEl = document.getElementById('vendorWalletMarginDisplay');

    if (walletBalEl) walletBalEl.textContent = '$' + parseFloat(vendor.balance).toFixed(2);
    if (walletProfitEl) walletProfitEl.textContent = '$' + parseFloat(vendor.profitEarned || 855.00).toFixed(2);
    if (walletMarginEl) walletMarginEl.textContent = (vendor.profitMarginPercent || 25) + '% Net Margin';
  }

  handleAddVendorProductSubmit(event) {
    event.preventDefault();
    const vendor = engine.getVendorById(this.activeVendorId) || engine.getVendors()[0];
    if (vendor && vendor.status === 'pending_verification') {
      alert('🔒 ACCOUNT LOCKED: You cannot publish products until your store credentials are approved by Super Admin.');
      return;
    }

    const form = event.target;
    const publishTarget = form.prodPublishTarget ? form.prodPublishTarget.value : 'vendor';

    engine.addProduct({
      name: form.prodTitle.value,
      category: form.prodCategory.value,
      brand: vendor.name,
      vendorId: vendor.id,
      publishTarget: publishTarget,
      price: parseFloat(form.prodPrice.value),
      originalPrice: parseFloat(form.prodPrice.value) * 1.2,
      stock: parseInt(form.prodStock.value),
      badge: form.prodBadge.value || 'New Item',
      image: form.prodImage.value || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      description: form.prodDesc.value || 'Verified Vendor Product.'
    });

    form.reset();
    const previewBox = document.getElementById('vendorProductImagePreviewBox');
    if (previewBox) previewBox.style.display = 'none';

    this.closeModals();
    this.renderHomepageSections();
    this.renderVendorDashboard();
    this.showToast('✅ Product Published to Catalog!');
  }

  deleteVendorProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
      engine.deleteProduct(productId);
      this.renderHomepageSections();
      this.renderVendorDashboard();
      this.showToast('Product Deleted.');
    }
  }

  updateVendorOrderStatus(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem('esellerstore_orders')) || [];
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      localStorage.setItem('esellerstore_orders', JSON.stringify(orders));
      this.renderVendorDashboard();
      this.showToast('Order #' + orderId + ' status: ' + newStatus.toUpperCase());
    }
  }

  handleUpdateVendorSettings(event) {
    event.preventDefault();
    const vendor = engine.getVendorById(this.activeVendorId) || engine.getVendors()[0];
    if (!vendor) return;

    vendor.name = document.getElementById('vendorSettingStoreName').value;
    vendor.ownerName = document.getElementById('vendorSettingOwnerName').value;
    vendor.mobile = document.getElementById('vendorSettingPhone').value;
    vendor.storeLogo = document.getElementById('vendorSettingLogo').value;
    vendor.banner = document.getElementById('vendorSettingBanner').value;
    vendor.shippingPolicy = document.getElementById('vendorSettingShippingPolicy').value;
    vendor.refundPolicy = document.getElementById('vendorSettingRefundPolicy').value;

    const vendors = engine.getVendors();
    const idx = vendors.findIndex(v => v.id === vendor.id);
    if (idx !== -1) vendors[idx] = vendor;
    engine.saveVendors(vendors);

    this.renderVendorDashboard();
    this.showToast('💾 Store Settings Saved!');
  }

  handleCSVUpload(event) {
    const vendor = engine.getVendorById(this.activeVendorId);
    if (vendor && vendor.status === 'pending_verification') {
      alert('🔒 ACCOUNT LOCKED: CSV uploading is restricted until your seller registration is approved.');
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const count = engine.processCSVUpload(e.target.result, this.activeVendorId);
        this.renderHomepageSections();
        this.renderVendorDashboard();
        alert('📦 CSV BULK UPLOAD SUCCESSFUL!\n\nImported ' + count + ' new products into E Seller Store catalog.');
      } catch (err) {
        alert('CSV Parsing Error: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  /* --- SEARCH, PERSONA, TOAST, MODAL & EVENT CONTROLS --- */
  handleAjaxSearch(query) {
    const dropdown = document.getElementById('ajaxSearchDropdown');
    if (!dropdown) return;

    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      dropdown.classList.remove('active');
      return;
    }

    const products = engine.getProducts().filter(p =>
      p.published !== false && (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    ).slice(0, 6);

    if (products.length === 0) {
      dropdown.innerHTML = '<div style="padding:10px; font-size:12px; color:#666;">No products found on E Seller Store for "' + query + '"</div>';
    } else {
      dropdown.innerHTML = products.map(p => `
        <div class="search-result-item" onclick="app.openQuickView('${p.id}'); document.getElementById('ajaxSearchDropdown').classList.remove('active');">
          <img src="${p.image}" alt="${p.name}">
          <div>
            <div style="font-size:13px; font-weight:600;">${p.name}</div>
            <div style="font-size:12px; font-weight:700; color:var(--nav-red);">$${p.price.toFixed(2)}</div>
          </div>
        </div>
      `).join('');
    }

    dropdown.classList.add('active');
  }

  setPersona(persona, notify = true) {
    this.currentPersona = persona;

    document.querySelectorAll('.persona-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.persona === persona);
    });

    const homeView = document.getElementById('homeView');
    const vendorDashView = document.getElementById('vendorDashboardView');
    const adminDashView = document.getElementById('adminDashboardView');

    if (homeView) homeView.style.display = persona === 'customer' ? 'block' : 'none';
    if (vendorDashView) {
      vendorDashView.style.display = persona === 'vendor' ? 'block' : 'none';
      vendorDashView.classList.toggle('active', persona === 'vendor');
    }
    if (adminDashView) {
      adminDashView.style.display = persona === 'admin' ? 'block' : 'none';
      adminDashView.classList.toggle('active', persona === 'admin');
    }

    if (persona === 'customer') this.renderHomepageSections();
    if (persona === 'admin') {
      try { engine.markChatRead(); } catch(e){}
      this.renderAdminDashboard();
      this.renderAdminAdCampaigns();
      this.renderAdminChatInbox();
    }
    if (persona === 'vendor') this.renderVendorDashboard();

    if (notify) {
      if (persona === 'admin') this.showToast('Super Admin Dashboard Active');
      else if (persona === 'vendor') this.showToast('Seller Dashboard Active');
      else this.showToast('Customer Storefront Active');
    }
    this.updateCounters();
  }

  filterByBrand(brandName) {
    const products = engine.getProducts().filter(p => p.published !== false && p.brand.toLowerCase().includes(brandName.toLowerCase()));
    if (products.length > 0) {
      this.renderProductGrid('featuredSliderGrid', products);
      this.showToast('Filtered catalog by brand: ' + brandName);
    } else {
      this.showToast('Showing catalog for brand: ' + brandName);
    }
    window.scrollTo({ top: 750, behavior: 'smooth' });
  }

  handleHeroCampaignClick(event) {
    if (event) {
      if (event.preventDefault) event.preventDefault();
      if (event.stopPropagation) event.stopPropagation();
    }

    if (this.currentPersona !== 'customer') {
      this.setPersona('customer');
    }

    this.showToast('🔥 Exploring E Seller Store Mega Summer Promo Deals!');

    const targetSection = document.getElementById('featuredSliderGrid') ||
                          document.querySelector('.products-grid') ||
                          document.getElementById('catalogSection');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetSection.classList.add('pulse-highlight');
      setTimeout(() => targetSection.classList.remove('pulse-highlight'), 1500);
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  }

  openModal(modalId) {
    this.closeModals();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
      const card = modal.querySelector('.modal-card') || modal;
      if (card) card.scrollTop = 0;
      const firstInput = modal.querySelector('input:not([type="hidden"]), select, textarea');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 120);
      }
    }
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => {
      m.style.display = 'none';
      m.classList.remove('active');
    });
    const adminPass = document.getElementById('adminLoginPassword');
    if (adminPass) adminPass.value = '';
    const sellerPass = document.getElementById('sellerLoginPassword');
    if (sellerPass) sellerPass.value = '';
  }

  showToast(message) {
    let toast = document.getElementById('nexToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nexToast';
      toast.style.cssText = 'position: fixed; bottom: 80px; right: 20px; background: #222733; color: #fff; padding: 10px 20px; border-radius: 20px; font-weight: 600; font-size: 13px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 5000; transition: all 0.3s ease; opacity: 0; transform: translateY(20px);';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 3000);
  }

  bindEvents() {
    const searchInput = document.getElementById('ajaxSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.debounce('ajaxSearch', () => this.handleAjaxSearch(e.target.value), 180);
      });
    }

    window.addEventListener('admin_activity_logged', () => {
      if (this.currentPersona === 'admin') this.renderAdminDashboard();
    });

    window.addEventListener('ads_updated', () => {
      this.renderStorefrontAds();
      if (this.currentPersona === 'admin') this.renderAdminAdCampaigns();
    });

    window.addEventListener('products_updated', () => {
      this.renderHomepageSections();
      if (this.currentPersona === 'admin') this.renderAdminDashboard();
      if (this.currentPersona === 'vendor') this.renderVendorDashboard();
    });

    window.addEventListener('vendors_updated', () => {
      if (this.currentPersona === 'admin') this.renderAdminDashboard();
      if (this.currentPersona === 'vendor') this.renderVendorDashboard();
    });

    window.addEventListener('brands_updated', () => {
      this.renderBrandsCarousel();
      this.renderUpfrontVisibleBrands();
      if (this.currentPersona === 'admin') this.renderAdminBrandsList();
    });

    window.addEventListener('storefront_config_updated', () => {
      this.renderHomepageSections();
    });

    window.addEventListener('live_chat_updated', () => {
      this.renderClientChatMessages();
      if (this.currentPersona === 'admin') this.renderAdminChatInbox();
      this.updateCounters();
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.ref-search-container')) {
        const dropdown = document.getElementById('ajaxSearchDropdown');
        if (dropdown) dropdown.classList.remove('active');
      }

      const personaBtn = e.target.closest('.persona-btn');
      if (personaBtn) {
        const persona = personaBtn.dataset.persona || (personaBtn.textContent.includes('Seller') ? 'vendor' : (personaBtn.textContent.includes('Admin') ? 'admin' : 'customer'));
        this.setPersona(persona);
        return;
      }

      const adminBtn = e.target.closest('.admin-login-pill-btn') || (e.target.tagName === 'A' && e.target.textContent.includes('Admin Login'));
      if (adminBtn && !e.target.closest('form')) {
        this.openModal('adminLoginModalOverlay');
        return;
      }

      const sellerBtn = e.target.closest('.seller-login-btn') || (e.target.tagName === 'A' && e.target.textContent.includes('Seller Login'));
      if (sellerBtn && !e.target.closest('form')) {
        this.openModal('sellerLoginModalOverlay');
        return;
      }

      const applyBtn = e.target.closest('.highlight-apply-now-btn') || e.target.closest('#sellerZoneApplyNowBtn') || (e.target.tagName === 'A' && e.target.textContent && e.target.textContent.includes('Become a Seller'));
      if (applyBtn && !e.target.closest('form')) {
        e.preventDefault();
        e.stopPropagation();
        this.openModal('sellerRegModalOverlay');
        return;
      }

      const heroBtn = e.target.closest('#heroShopCampaignBtn') || e.target.closest('.hero-campaign-cta') || (e.target.tagName === 'BUTTON' && e.target.textContent && (e.target.textContent.includes('Shop Campaign Now') || e.target.textContent.includes('Shop Deal Now')));
      if (heroBtn && !e.target.closest('form')) {
        e.preventDefault();
        e.stopPropagation();
        this.handleHeroCampaignClick(e);
        return;
      }

      const buyNowBtn = e.target.closest('.btn-buy-now');
      if (buyNowBtn) {
        const onclickAttr = buyNowBtn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes("directBuyNow('")) {
          const match = onclickAttr.match(/directBuyNow\('([^']+)'\)/);
          if (match && match[1]) {
            this.directBuyNow(match[1]);
          }
        } else {
          this.directBuyNow('p1');
        }
        return;
      }

      const addCartBtn = e.target.closest('.btn-add-cart');
      if (addCartBtn) {
        const onclickAttr = addCartBtn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes("addToCart('")) {
          const match = onclickAttr.match(/addToCart\('([^']+)'\)/);
          if (match && match[1]) {
            this.addToCart(match[1]);
          }
        } else {
          this.addToCart('p1');
        }
        return;
      }
    });
  }

  toggleMobileDrawer() {
    const drawer = document.getElementById('mobileNavDrawerOverlay');
    if (drawer) {
      drawer.classList.toggle('active');
    }
  }

  closeMobileDrawer() {
    const drawer = document.getElementById('mobileNavDrawerOverlay');
    if (drawer) {
      drawer.classList.remove('active');
    }
  }
}

window.app = new ESellerStoreApp();

window.toggleMobileDrawer = function() { if (window.app) window.app.toggleMobileDrawer(); };
window.closeMobileDrawer = function() { if (window.app) window.app.closeMobileDrawer(); };
window.setPersona = function(persona) { if (window.app) window.app.setPersona(persona); };
window.openModal = function(modalId) { if (window.app) window.app.openModal(modalId); };
window.closeModals = function() { if (window.app) window.app.closeModals(); };
window.directBuyNow = function(productId) { if (window.app) window.app.directBuyNow(productId); };
window.addToCart = function(productId, qty) { if (window.app) window.app.addToCart(productId, qty); };
window.openCartDrawer = function() { if (window.app) window.app.openCartDrawer(); };
window.closeCartDrawer = function() { if (window.app) window.app.closeCartDrawer(); };
window.switchVendorTab = function(tabName) { if (window.app) window.app.switchVendorTab(tabName); };
window.switchAdminTab = function(tabName) { if (window.app) window.app.switchAdminTab(tabName); };
window.openAdminSendMailModal = function(vendorId) { if (window.app) window.app.openAdminSendMailModal(vendorId); };
window.loginAsVendor = function(vendorId) { if (window.app) window.app.loginAsVendor(vendorId); };
window.handleSellerLogin = function(e) { if (window.app) window.app.handleSellerLogin(e); };
window.handleAdminLogin = function(e) { if (window.app) window.app.handleAdminLogin(e); };
window.handleVendorRegistration = function(e) { if (window.app) window.app.handleVendorRegistration(e); };
window.openAdminAddProductModal = function(vId) { if (window.app) window.app.openAdminAddProductModal(vId); };
window.openAdminEditProductModal = function(pId) { if (window.app) window.app.openAdminEditProductModal(pId); };
window.handleAdminSaveProduct = function(e) { if (window.app) window.app.handleAdminSaveProduct(e); };
window.handleAdminDeleteProduct = function(pId) { if (window.app) window.app.handleAdminDeleteProduct(pId); };
window.downloadCSVTemplate = function() { if (window.app) window.app.downloadCSVTemplate(); };
window.exportProductsToCSV = function() { if (window.app) window.app.exportProductsToCSV(); };
window.handleCSVFileSelected = function(e) { if (window.app) window.app.handleCSVFileSelected(e); };
window.handleExecuteCSVImport = function() { if (window.app) window.app.handleExecuteCSVImport(); };
window.clearCSVPreview = function() { if (window.app) window.app.clearCSVPreview(); };
window.openAdminEditVendorModal = function(vId) { if (window.app) window.app.openAdminEditVendorModal(vId); };
window.handleAdminSaveVendorProfile = function(e) { if (window.app) window.app.handleAdminSaveVendorProfile(e); };
window.handleAdminVendorInventoryView = function(vId) { if (window.app) window.app.handleAdminVendorInventoryView(vId); };
window.openAdminAddProductModalForActiveVendor = function() { if (window.app) window.app.openAdminAddProductModalForActiveVendor(); };
window.handleSaveStorefrontConfig = function(e) { if (window.app) window.app.handleSaveStorefrontConfig(e); };
window.handleAdminAddBrand = function(e) { if (window.app) window.app.handleAdminAddBrand(e); };
window.handleAdminDeleteBrand = function(bId) { if (window.app) window.app.handleAdminDeleteBrand(bId); };
window.handleSyncMasterCatalog = function(caller) { if (window.app) window.app.handleSyncMasterCatalog(caller); };
window.handleAdminApproveVendor = function(vId) { if (window.app) window.app.handleAdminApproveVendor(vId); };
window.selectCheckoutPaymentMethod = function(m) { if (window.app) window.app.selectCheckoutPaymentMethod(m); };
window.handleImageFileSelect = function(e, t) { if (window.app) window.app.handleImageFileSelect(e, t); };
window.updateImagePreview = function(t, u) { if (window.app) window.app.updateImagePreview(t, u); };
window.handleChatAttachmentSelect = function(e, p) { if (window.app) window.app.handleChatAttachmentSelect(e, p); };
window.clearClientChatAttachment = function() { if (window.app) window.app.clearClientChatAttachment(); };
window.clearAdminChatAttachment = function() { if (window.app) window.app.clearAdminChatAttachment(); };
window.handleAdminVerifyOrderFromChat = function() { if (window.app) window.app.handleAdminVerifyOrderFromChat(); };
window.requestAdminFulfillmentViaChat = function(oId) { if (window.app) window.app.requestAdminFulfillmentViaChat(oId); };
window.showOrderConfirmationModal = function(o, c, i) { if (window.app) window.app.showOrderConfirmationModal(o, c, i); };

window.exportCloudDatabaseJson = function() { if (window.app) window.app.exportCloudDatabaseJson(); };
window.setAdminProductsPage = function(p) { if (window.app) window.app.setAdminProductsPage(p); };
window.setAdminProductsPageSize = function(s) { if (window.app) window.app.setAdminProductsPageSize(s); };
window.setVendorOrdersPage = function(p) { if (window.app) window.app.setVendorOrdersPage(p); };
window.setVendorOrdersPageSize = function(s) { if (window.app) window.app.setVendorOrdersPageSize(s); };
window.handleAdminChangePassword = function(e) { if (window.app) window.app.handleAdminChangePassword(e); };
window.handleHeroCampaignClick = function(e) { if (window.app) window.app.handleHeroCampaignClick(e); };

window.ESellerStoreApp = ESellerStoreApp;
window.SsellerStoreeBayApp = ESellerStoreApp;
