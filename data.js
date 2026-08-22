/**
 * SsellerStoreeBay - Core Data Store
 * Brand Name: SsellerStoreeBay
 * Contains 40 Top Brands, Category Profiles, Vendors, Products, and Initial Ad Campaigns
 */

export const INITIAL_BRANDS = [
  // Laptops & Tech
  { id: 'b1', name: 'Apple iPhone', logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b3', name: 'Dell', logo: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b14', name: 'HP', logo: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b8', name: 'Asus', logo: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b9', name: 'Lenovo', logo: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b21', name: 'Microsoft', logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=150&auto=format&fit=crop&q=80', category: 'Laptops & Tech', catKey: 'computers' },
  { id: 'b22', name: 'NVIDIA', logo: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=150&auto=format&fit=crop&q=80', category: 'GPU Tech', catKey: 'computers' },
  { id: 'b23', name: 'Razer', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80', category: 'Gaming Gear', catKey: 'computers' },

  // Footwear & Sneakers
  { id: 'b2', name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=80', category: 'Footwear & Sneakers', catKey: 'sneakers' },
  { id: 'b4', name: 'Puma', logo: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&auto=format&fit=crop&q=80', category: 'Footwear & Sneakers', catKey: 'sneakers' },
  { id: 'b7', name: 'Adidas', logo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=150&auto=format&fit=crop&q=80', category: 'Footwear & Sneakers', catKey: 'sneakers' },
  { id: 'b39', name: 'Under Armour', logo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=150&auto=format&fit=crop&q=80', category: 'Footwear & Sneakers', catKey: 'sneakers' },

  // Electronics & Mobile
  { id: 'b5', name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=150&auto=format&fit=crop&q=80', category: 'Cellphones & Electronics', catKey: 'computers' },
  { id: 'b6', name: 'Sony', logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=150&auto=format&fit=crop&q=80', category: 'Audio & Gadgets', catKey: 'computers' },
  { id: 'b13', name: 'Bose', logo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80', category: 'Audio & Gadgets', catKey: 'computers' },
  { id: 'b12', name: 'Panasonic', logo: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=150&auto=format&fit=crop&q=80', category: 'Home Electronics', catKey: 'computers' },
  { id: 'b20', name: 'Logitech', logo: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=150&auto=format&fit=crop&q=80', category: 'Computer Accessories', catKey: 'computers' },

  // Jewelry & Watches
  { id: 'b15', name: 'Rolex', logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80', category: 'Jewelry & Watches', catKey: 'jewelry' },
  { id: 'b38', name: 'Cartier', logo: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&auto=format&fit=crop&q=80', category: 'Jewelry & Watches', catKey: 'jewelry' },

  // Beauty & Personal Care
  { id: 'b16', name: 'Sephora', logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=80', category: 'Beauty & Skincare', catKey: 'beauty' },
  { id: 'b19', name: 'Philips', logo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=150&auto=format&fit=crop&q=80', category: 'Personal Care', catKey: 'beauty' },

  // Tools & Home Decor
  { id: 'b17', name: 'Bosch', logo: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=150&auto=format&fit=crop&q=80', category: 'Tools & Hardware', catKey: 'tools' },
  { id: 'b18', name: 'IKEA', logo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&auto=format&fit=crop&q=80', category: 'Home Decor & Furniture', catKey: 'homedecor' },

  // Fashion & Apparel
  { id: 'b26', name: 'Zara', logo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&auto=format&fit=crop&q=80', category: 'Fashion & Apparel', catKey: 'fashion' },
  { id: 'b27', name: 'Gucci', logo: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=150&auto=format&fit=crop&q=80', category: 'Fashion & Apparel', catKey: 'fashion' }
];

export const INITIAL_CATEGORIES = [
  { id: 'computers', name: 'Computer & Accessories', icon: '💻', count: 18 },
  { id: 'jewelry', name: 'Jewelry & Watches', icon: '💎', count: 12 },
  { id: 'homedecor', name: 'Home Decor & Furniture', icon: '🏠', count: 15 },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: '✨', count: 14 },
  { id: 'tools', name: 'Tools & Hardware', icon: '🛠️', count: 11 },
  { id: 'fashion', name: 'Fashion & Apparel', icon: '👗', count: 22 },
  { id: 'sneakers', name: 'Footwear & Sneakers', icon: '👟', count: 16 }
];

export const INITIAL_VENDORS = [
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
    name: 'Luxury Life Studio',
    ownerName: 'Alex Rivera',
    cnic: '35202-1234567-9',
    email: 'alex@luxurylife.com',
    mobile: '+1 (555) 876-5432',
    description: 'Bespoke seller of premium watches, luxury footwear & designer apparel.',
    status: 'verified',
    balance: 890.50,
    profitEarned: 2420.00,
    profitMarginPercent: 22,
    productsSold: 42,
    commissionRate: 18,
    storeLogo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80',
    rating: 4.8,
    joinedDate: '2026-02-01'
  }
];

export const INITIAL_PRODUCTS = [
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
    badge: 'Apple Deal',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    specs: { Chip: 'A17 Pro 3nm', Camera: '48MP Main + 5x Optical Telephoto', Material: 'Aerospace Grade Titanium' },
    description: 'Forged in titanium featuring the groundbreaking A17 Pro chip and versatile 48MP main camera.'
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
    badge: 'Dell Official',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    specs: { Processor: 'Intel Core i9-13900H', RAM: '32GB DDR5', Display: '15.6" 3.5K OLED Touch' },
    description: 'Immerse in breathtaking OLED color accuracy with CNC machined aluminum durability.'
  },
  {
    id: 'p3',
    name: 'Nike Air Max 270 React Running Shoes',
    category: 'sneakers',
    brand: 'Nike',
    vendorId: 'v102',
    vendorName: 'Luxury Life Studio',
    price: 159.95,
    originalPrice: 180.00,
    rating: 4.9,
    reviewsCount: 210,
    stock: 45,
    isDeal: false,
    isFeatured: true,
    isBestSelling: false,
    isNew: false,
    badge: 'Nike Original',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    specs: { Upper: 'Breathable Mesh', Cushioning: '270 Max Air Unit' },
    description: 'Unmatched sneaker comfort featuring Nike’s biggest heel Max Air unit yet.'
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
    badge: 'HP Official',
    image: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=600&auto=format&fit=crop&q=80',
    specs: { CPU: 'Intel Core Ultra 7', RAM: '16GB LPDDR5X', Pen: 'Tilt Stylus Pen Included' },
    description: 'Ultra-versatile 360-degree convertible laptop crafted with gem-cut chassis.'
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
    badge: 'Top Seller #1',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    specs: { ANC: 'Auto NC Optimizer', Battery: '30 Hours Fast Charge' },
    description: 'Industry-leading noise cancellation with two processors and 8 microphones.'
  },
  {
    id: 'p6',
    name: 'Rolex Submariner Date 41mm Oystersteel Watch',
    category: 'jewelry',
    brand: 'Rolex',
    vendorId: 'v102',
    vendorName: 'Luxury Life Studio',
    price: 13450.00,
    originalPrice: 14500.00,
    rating: 5.0,
    reviewsCount: 29,
    stock: 4,
    isDeal: false,
    isFeatured: false,
    isBestSelling: true,
    isNew: false,
    badge: 'Top Seller #2',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    specs: { Case: 'Oystersteel 41mm', Movement: 'Calibre 3235 Automatic' },
    description: 'The archetype of the diver’s watch with black Cerachrom bezel.'
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
    badge: 'Top Seller #3',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    specs: { Sensor: '8K DPI Glass Tracking', Clicks: 'Quiet Click Tech' },
    description: 'Ultra-fast MagSpeed scrolling precision engineered for product creators.'
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
    badge: 'New Release 2026',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    specs: { GPU: 'NVIDIA RTX 4090 16GB', Screen: 'Dual-Mode Mini-LED 4K/FHD+' },
    description: 'World-first dual-mode Mini-LED display packed with ultimate desktop-grade power.'
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
    badge: 'New Release 2026',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    specs: { Camera: '200MP Quad Telephoto', AI: 'Integrated Galaxy AI' },
    description: 'Unleash Galaxy AI live translation and 200MP detail resolution.'
  },
  {
    id: 'p10',
    name: 'IKEA Scandinavian Minimalist Solid Oak Sofa',
    category: 'homedecor',
    brand: 'IKEA',
    vendorId: 'v102',
    vendorName: 'Luxury Life Studio',
    price: 849.00,
    originalPrice: 999.00,
    rating: 4.7,
    reviewsCount: 18,
    stock: 8,
    isDeal: false,
    isFeatured: false,
    isBestSelling: false,
    isNew: true,
    badge: 'New Collection',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80',
    specs: { Frame: 'Solid European Oak', Upholstery: 'Emerald Green Velvet' },
    description: 'Timeless Nordic comfort crafted with sustainably sourced European oak.'
  }
];

export const INITIAL_ADS = [
  {
    id: 'ad_1',
    title: 'SsellerStoreeBay Mega Summer Promo',
    mediaUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
    targetUrl: '#',
    placement: 'hero', // hero, sidebar, between_listings, popup
    active: true,
    createdDate: '2026-07-20'
  },
  {
    id: 'ad_2',
    title: 'Flash Watch Deal 40% OFF',
    mediaUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
    targetUrl: '#',
    placement: 'sidebar',
    active: true,
    createdDate: '2026-07-21'
  },
  {
    id: 'ad_3',
    title: 'Join SsellerStoreeBay Seller Zone Banner',
    mediaUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    targetUrl: '#',
    placement: 'between_listings',
    active: true,
    createdDate: '2026-07-22'
  }
];

export const PLATFORM_METRICS = {
  adminWalletTotal: 12450.00,
  totalPlatformCommissionCollected: 1850.75,
  globalCommissionRatePercent: 15,
  totalOrdersProcessed: 126
};
