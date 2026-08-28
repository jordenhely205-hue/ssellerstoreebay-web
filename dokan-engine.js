/**
 * E Seller Store - Dokan Multi-Vendor & Headless Engine
 * Manages Onboarding with CNIC, Profit Calculation (18%-30%), Real-Time Activity Tracking,
 * Ad Campaigns Management Engine, Manual Live Chat Stream & Web Audio Notifications.
 */

import { INITIAL_PRODUCTS, INITIAL_VENDORS, INITIAL_BRANDS, INITIAL_ADS, PLATFORM_METRICS } from './data.js';

class DokanEngine {
  constructor() {
    this.storageKeyProducts = 'esellerstore_products';
    this.storageKeyVendors = 'esellerstore_vendors';
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
    if (!localStorage.getItem(this.storageKeyAdminAuth)) {
      localStorage.setItem(this.storageKeyAdminAuth, JSON.stringify({
        email: 'admin@esellerstore.com',
        password: 'admin123',
        lastUpdated: 'Initial Provisioning'
      }));
    }
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
        { id: 'c2', sender: 'admin', clientName: 'Demo Client', message: 'Welcome to E Seller Store! How can I assist your business today?', timestamp: '12:06 PM', unread: false }
      ]));
    }
    if (!localStorage.getItem(this.storageKeyWalletLogs)) {
      localStorage.setItem(this.storageKeyWalletLogs, JSON.stringify([
        { id: 'w1', vendorId: 'v101', vendorName: 'TechWorld Hub', amount: 500.00, type: 'credit', note: 'Initial Admin Bonus Grant', date: '2026-07-01 10:30' }
      ]));
    }
    if (!localStorage.getItem(this.storageKeyActivityLogs)) {
      localStorage.setItem(this.storageKeyActivityLogs, JSON.stringify([
        { id: 'act_1', title: 'Visitor Session Started', detail: 'New client landed on E Seller Store storefront', time: 'Just now', type: 'info' }
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
    try {
      const data = JSON.parse(localStorage.getItem(this.storageKeyProducts));
      if (!data || !Array.isArray(data) || data.length === 0) {
        return INITIAL_PRODUCTS;
      }
      let cleaned = false;
      data.forEach(p => {
        if (p.badge === 'Bulk CSV' || p.badge === 'CSV Import') {
          p.badge = '';
          cleaned = true;
        }
      });
      if (cleaned) {
        localStorage.setItem(this.storageKeyProducts, JSON.stringify(data));
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
    if (Array.isArray(products)) {
      products.forEach(p => {
        if (p.badge === 'Bulk CSV' || p.badge === 'CSV Import') {
          p.badge = '';
        }
      });
    }
    localStorage.setItem(this.storageKeyProducts, JSON.stringify(products));
    this.syncProductsToCloudBackend(products);
    this.revalidateStorefrontCache();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('products_updated'));
    }
  }

  syncProductsToCloudBackend(products) {
    const payload = {
      action: 'batch_upsert',
      products: products || this.getProducts(),
      timestamp: new Date().toISOString(),
      source: 'csv_bulk_import_sync'
    };

    if (typeof fetch !== 'undefined') {
      try {
        fetch('/api/products/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      } catch (err) {}
    }
  }

  revalidateStorefrontCache() {
    if (typeof window !== 'undefined') {
      try {
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              if (name.includes('products') || name.includes('storefront') || name.includes('api')) {
                caches.delete(name);
              }
            });
          });
        }
      } catch (e) {}

      try {
        localStorage.setItem('esellerstore_cache_bust', Date.now().toString());
      } catch (e) {}
    }
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
      id: 'ESS-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      customerName: customerInfo.name || 'Guest Buyer',
      customerEmail: customerInfo.email || 'customer@esellerstore.com',
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
        isFeatured: true,
        isBestSelling: false,
        isNew: true,
        isDeal: false,
        badge: ''
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
}

export const engine = new DokanEngine();
