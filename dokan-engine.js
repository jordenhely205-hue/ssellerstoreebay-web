/**
 * SsellerStoreeBay - Dokan Multi-Vendor & Headless Engine
 * Manages Onboarding with CNIC, Profit Calculation (18%-30%), Real-Time Activity Tracking,
 * Ad Campaigns Management Engine, Manual Live Chat Stream & Web Audio Notifications.
 */

import { INITIAL_PRODUCTS, INITIAL_VENDORS, INITIAL_BRANDS, INITIAL_ADS, PLATFORM_METRICS } from './data.js';

class DokanEngine {
  constructor() {
    this.storageKeyProducts = 'ssellerstoreebay_products';
    this.storageKeyVendors = 'ssellerstoreebay_vendors';
    this.storageKeyMetrics = 'ssellerstoreebay_metrics';
    this.storageKeyCart = 'ssellerstoreebay_cart';
    this.storageKeyWishlist = 'ssellerstoreebay_wishlist';
    this.storageKeyCompare = 'ssellerstoreebay_compare';
    this.storageKeyWalletLogs = 'ssellerstoreebay_wallet_logs';
    this.storageKeyOrders = 'ssellerstoreebay_orders';
    this.storageKeyActivityLogs = 'ssellerstoreebay_activity_logs';
    this.storageKeyAds = 'ssellerstoreebay_ads';
    this.storageKeyChat = 'ssellerstoreebay_chat_messages';

    this.init();
  }

  init() {
    localStorage.setItem(this.storageKeyProducts, JSON.stringify(INITIAL_PRODUCTS));

    if (!localStorage.getItem(this.storageKeyVendors)) {
      localStorage.setItem(this.storageKeyVendors, JSON.stringify(INITIAL_VENDORS));
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
        { id: 'c1', sender: 'client', clientName: 'Demo Client', message: 'Hello! I need assistance with vendor registration.', timestamp: '12:05 PM', unread: true },
        { id: 'c2', sender: 'admin', clientName: 'Demo Client', message: 'Welcome to SsellerStoreeBay! How can I assist your business today?', timestamp: '12:06 PM', unread: false }
      ]));
    }
    if (!localStorage.getItem(this.storageKeyWalletLogs)) {
      localStorage.setItem(this.storageKeyWalletLogs, JSON.stringify([
        { id: 'w1', vendorId: 'v101', vendorName: 'TechWorld Hub', amount: 500.00, type: 'credit', note: 'Initial Admin Bonus Grant', date: '2026-07-01 10:30' }
      ]));
    }
    if (!localStorage.getItem(this.storageKeyActivityLogs)) {
      localStorage.setItem(this.storageKeyActivityLogs, JSON.stringify([
        { id: 'act_1', title: 'Visitor Session Started', detail: 'New client landed on SsellerStoreeBay storefront', time: 'Just now', type: 'info' }
      ]));
    }
  }

  // --- ADVERTISEMENTS MANAGEMENT MODULE ---
  getAds() {
    return JSON.parse(localStorage.getItem(this.storageKeyAds)) || INITIAL_ADS;
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
      this.logActivity('Ad Campaign Status Toggled', `Campaign '${ad.title}' is now ${ad.active ? 'ACTIVE (ON)' : 'DISABLED (OFF)'}`, 'info');
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
    this.logActivity('New Ad Campaign Published', `Campaign '${newAd.title}' added to slot [${newAd.placement}]`, 'success');
    return newAd;
  }

  deleteAd(adId) {
    let ads = this.getAds();
    const ad = ads.find(a => a.id === adId);
    ads = ads.filter(a => a.id !== adId);
    this.saveAds(ads);
    if (ad) this.logActivity('Ad Campaign Deleted', `Removed '${ad.title}'`, 'warning');
  }

  // --- MANUAL LIVE CHAT & AUDIO ALERTS ---
  getChatMessages() {
    return JSON.parse(localStorage.getItem(this.storageKeyChat)) || [];
  }

  saveChatMessages(messages) {
    localStorage.setItem(this.storageKeyChat, JSON.stringify(messages));
    window.dispatchEvent(new CustomEvent('live_chat_updated'));
  }

  sendClientChatMessage(messageText, clientName = 'Guest Buyer') {
    const messages = this.getChatMessages();
    const msg = {
      id: 'chat_' + Date.now(),
      sender: 'client',
      clientName,
      message: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unread: true
    };
    messages.push(msg);
    this.saveChatMessages(messages);

    // Audio & Real-time Alert
    this.playNotificationSound();
    this.logActivity('New Live Chat Message', `From '${clientName}': "${messageText.slice(0, 30)}..."`, 'warning');
    return msg;
  }

  sendAdminChatMessage(messageText, clientName = 'Guest Buyer') {
    const messages = this.getChatMessages();
    const msg = {
      id: 'chat_' + Date.now(),
      sender: 'admin',
      clientName,
      message: messageText,
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
    } catch (e) {
      console.log('Web Audio notification chime:', e);
    }
  }

  // --- CORE PRODUCTS & VENDORS ENGINE ---
  getProducts() {
    return JSON.parse(localStorage.getItem(this.storageKeyProducts)) || INITIAL_PRODUCTS;
  }

  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  }

  saveProducts(products) {
    localStorage.setItem(this.storageKeyProducts, JSON.stringify(products));
  }

  getVendors() {
    return JSON.parse(localStorage.getItem(this.storageKeyVendors)) || INITIAL_VENDORS;
  }

  saveVendors(vendors) {
    localStorage.setItem(this.storageKeyVendors, JSON.stringify(vendors));
  }

  getVendorById(id) {
    return this.getVendors().find(v => v.id === id);
  }

  registerVendor({ ownerName, cnic, email, password, storeName, mobile, description }) {
    const vendors = this.getVendors();

    const existing = vendors.find(v => v.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('A seller account with this email address already exists on SsellerStoreeBay.');
    }

    const newVendor = {
      id: 'v_' + Date.now(),
      name: storeName,
      ownerName,
      cnic: cnic || '42101-0000000-0',
      email,
      mobile,
      password,
      description: description || 'Verified Seller on SsellerStoreeBay marketplace.',
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
    this.logActivity('New Vendor Registration', `Store '${storeName}' (CNIC: ${cnic}) submitted application`, 'warning');
    return newVendor;
  }

  updateVendorVerificationStatus(vendorId, newStatus) {
    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) throw new Error('Vendor not found.');

    vendor.status = newStatus;
    this.saveVendors(vendors);
    this.logActivity('Vendor Status Updated', `Store '${vendor.name}' status set to ${newStatus.toUpperCase()}`, 'success');
    return vendor;
  }

  calculateVendorProfit(vendorId, productPrice) {
    const vendor = this.getVendorById(vendorId) || { profitMarginPercent: 25 };
    const margin = vendor.profitMarginPercent || 25;
    const profitAmount = productPrice * (margin / 100);
    const platformFee = productPrice * (15 / 100);
    const netPayout = productPrice - platformFee;

    return {
      marginPercent: margin,
      profitAmount: profitAmount.toFixed(2),
      platformFee: platformFee.toFixed(2),
      netPayout: netPayout.toFixed(2)
    };
  }

  addVendorWalletBalance(vendorId, amount, note = 'Admin Direct Wallet Top-Up') {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error('Please enter a valid positive dollar amount.');
    }

    const vendors = this.getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (!vendor) throw new Error('Vendor store not found.');

    vendor.balance = (parseFloat(vendor.balance) + numAmount).toFixed(2);
    this.saveVendors(vendors);

    const logs = JSON.parse(localStorage.getItem(this.storageKeyWalletLogs)) || [];
    const newLog = {
      id: 'w_' + Date.now(),
      vendorId: vendor.id,
      vendorName: vendor.name,
      amount: numAmount,
      type: 'credit',
      note: note || 'Admin Wallet Addition',
      date: new Date().toLocaleString()
    };
    logs.unshift(newLog);
    localStorage.setItem(this.storageKeyWalletLogs, JSON.stringify(logs));

    this.logActivity('Admin Wallet Fund', `Added $${numAmount.toFixed(2)} to '${vendor.name}' wallet balance`, 'success');
    return { vendor, log: newLog };
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

  processCheckoutOrder(cartItems, customerInfo) {
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cart is empty.');
    }

    const products = this.getProducts();
    const vendors = this.getVendors();
    const metrics = JSON.parse(localStorage.getItem(this.storageKeyMetrics));

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
      vendor.profitEarned = (parseFloat(vendor.profitEarned) + vendorProfitAmount).toFixed(2);
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

    const orders = JSON.parse(localStorage.getItem(this.storageKeyOrders)) || [];
    const newOrder = {
      id: 'SSE-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      customerName: customerInfo.name || 'Guest Buyer',
      customerEmail: customerInfo.email || 'customer@ssellerstoreebay.com',
      total: orderTotal.toFixed(2),
      commissionDeducted: totalAdminCommission.toFixed(2),
      status: 'Processing',
      items: cartItems
    };
    orders.unshift(newOrder);
    localStorage.setItem(this.storageKeyOrders, JSON.stringify(orders));

    localStorage.setItem(this.storageKeyCart, JSON.stringify([]));
    this.logActivity('New Customer Order Purchased', `Order #${newOrder.id} confirmed for $${orderTotal.toFixed(2)}`, 'success');
    return newOrder;
  }

  generateCSVTemplate() {
    const headers = ['Name', 'Category', 'Brand', 'Price', 'OriginalPrice', 'Stock', 'Badge', 'ImageUrl', 'Description'];
    const sampleRow1 = ['SsellerStoreeBay Pro Gaming Mouse', 'computers', 'Logitech', '129.99', '159.99', '25', 'Pro Pick', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80', 'RGB tactile switches.'];
    return [headers.join(','), sampleRow1.map(f => `"${f}"`).join(',')].join('\n');
  }

  processCSVUpload(csvText, vendorId) {
    const vendor = this.getVendorById(vendorId);
    if (!vendor) throw new Error('Invalid vendor session.');

    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length <= 1) throw new Error('CSV file is empty.');

    const products = this.getProducts();
    let importedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      if (!values || values.length < 4) continue;

      const name = values[0] || 'Bulk Product';
      const price = parseFloat(values[3]) || 49.99;

      const newProd = {
        id: 'p_csv_' + Date.now() + '_' + i,
        name,
        category: 'computers',
        brand: 'Generic',
        vendorId: vendor.id,
        vendorName: vendor.name,
        price,
        originalPrice: price * 1.2,
        rating: 5.0,
        reviewsCount: 1,
        stock: 10,
        isDeal: false,
        isFeatured: true,
        isBestSelling: false,
        isNew: true,
        badge: 'CSV Import',
        image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=600&auto=format&fit=crop&q=80',
        description: 'CSV product import'
      };

      products.unshift(newProd);
      importedCount++;
    }

    this.saveProducts(products);
    this.logActivity('CSV Bulk Upload', `Vendor '${vendor.name}' uploaded ${importedCount} items`, 'info');
    return importedCount;
  }
}

export const engine = new DokanEngine();
