/**
 * E Seller Store - Main Application Controller
 * Handles Onboarding with CNIC, Vendor Profit Calculations (18%-30%), Visible Brands Showcase,
 * Interactive AI Chatbot Assistant, Real-Time Admin Activity Tracking Stream.
 */

import { engine } from './dokan-engine.js';
import { INITIAL_BRANDS, INITIAL_CATEGORIES } from './data.js';

class E Seller StoreApp {
  constructor() {
    this.currentView = 'home';
    this.currentPersona = 'customer';
    this.activeVendorId = 'v101';

    this.cart = JSON.parse(localStorage.getItem('esellerstore_cart')) || [];
    this.wishlist = JSON.parse(localStorage.getItem('esellerstore_wishlist')) || [];
    this.compare = JSON.parse(localStorage.getItem('esellerstore_compare')) || [];

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderAll();
    this.setPersona('customer'); // Default to customer storefront view
  }

  renderAll() {
    this.updateCounters();
    this.renderBrandsCarousel();
    this.renderUpfrontVisibleBrands(); // Requirement #3: Upfront visible brands
    this.renderAdminBrandsList();
    this.renderHomepageSections();
    this.renderAdminDashboard();
    this.renderVendorDashboard();
    this.renderCartDrawer();
  }

  updateCounters() {
    const navCartCountEl = document.getElementById('navCartCountHeader');
    const navCartTotalEl = document.getElementById('navCartTotalHeader');

    const totalQty = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (navCartCountEl) navCartCountEl.textContent = totalQty;
    if (navCartTotalEl) navCartTotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  renderFeaturedProducts() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const featuredProducts = products.filter(p => p.isFeatured);
    this.renderProductGrid('featuredSliderGrid', featuredProducts.length > 0 ? featuredProducts : products);
  }

  renderBestSelling() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const bestSellingProducts = products.filter(p => p.isBestSelling);
    this.renderProductGrid('bestSellingSliderGrid', bestSellingProducts.length > 0 ? bestSellingProducts : products);
  }

  renderNewArrivals() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const newProducts = products.filter(p => p.isNew);
    this.renderProductGrid('newArrivalsSliderGrid', newProducts.length > 0 ? newProducts : products);
  }

  renderCatalog() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const countEl = document.getElementById('storefrontCatalogCount');
    if (countEl) countEl.textContent = products.length;

    this.renderProductGrid('catalogGrid', products);
    this.renderProductGrid('catalogProductsGrid', products);
    this.renderProductGrid('allProductsGrid', products);
  }

  handleForceSyncCatalog() {
    try {
      const products = engine.forceSyncCatalog();
      this.renderHomepageSections();
      this.renderCatalog();
      this.renderAdminProductsTable();
      this.renderAdminVendorsTable();
      this.renderVendorDashboard();
      this.updateCounters();
      this.showToast(`⚡ Re-indexed ${products.length} live products across storefront!`);
      alert(`🎉 FORCE CATALOG SYNC COMPLETE!\n\nRe-indexed ${products.length} live products.\nAll imported, assigned, and edited items are synchronized across the storefront, Admin, and Vendor dashboards.`);
    } catch (err) {
      alert('Sync Error: ' + err.message);
    }
  }

  renderHomepageSections() {
    const cfg = engine.getStorefrontConfig ? engine.getStorefrontConfig() : {};

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

    this.renderFeaturedProducts();
    this.renderBestSelling();
    this.renderNewArrivals();
    this.renderCatalog();
  }

  renderBrandsCarousel() {
    const track = document.getElementById('brandsCarouselTrack');
    if (!track) return;

    track.innerHTML = INITIAL_BRANDS.map(brand => `
      <div class="brand-circle-card" onclick="app.filterByBrand('${brand.name}')">
        <img src="${brand.logo}" alt="${brand.name}">
        <span>${brand.name}</span>
        <small style="font-size:10px; color:var(--nav-red); font-weight:700;">${brand.category}</small>
      </div>
    `).join('');
  }

  /**
   * Requirement #3: Upfront Visible Brands Section (No clicks required)
   */
  renderUpfrontVisibleBrands() {
    const container = document.getElementById('upfrontVisibleBrandsGrid');
    if (!container) return;

    container.innerHTML = INITIAL_BRANDS.map(brand => `
      <div class="visible-brand-card" onclick="app.filterByBrand('${brand.name}')">
        <img src="${brand.logo}" alt="${brand.name}">
        <span>${brand.name}</span>
        <small>${brand.category}</small>
      </div>
    `).join('');
  }

  renderAdminBrandsList() {
    const container = document.getElementById('adminBrandsGridList');
    if (!container) return;

    container.innerHTML = INITIAL_BRANDS.map((b, index) => `
      <div style="display:flex; align-items:center; gap:10px; padding:8px 12px; background:#f8f9fa; border:1px solid #e9ecef; border-radius:6px; cursor:pointer;" onclick="app.filterByBrand('${b.name}')">
        <span style="font-weight:700; font-size:11px; color:#888;">#${index + 1}</span>
        <img src="${b.logo}" width="28" height="28" style="border-radius:50%; object-fit:cover;">
        <div>
          <div style="font-size:12px; font-weight:700; color:#222;">${b.name}</div>
          <div style="font-size:10px; color:var(--nav-red); font-weight:600;">${b.category}</div>
        </div>
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
      const title = prod.name || prod.title || 'Product Item';
      const price = typeof prod.price === 'number' ? prod.price : (parseFloat(prod.price) || 0);
      const origPrice = typeof prod.originalPrice === 'number' ? prod.originalPrice : (parseFloat(prod.originalPrice) || 0);
      const image = prod.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80';
      const seller = prod.vendorName || prod.seller || 'Sanvicollection';

      let badgeHtml = '';
      if (prod.publishTarget === 'official' || prod.isOfficial) {
        badgeHtml = '<span class="official-badge-tag" style="margin-bottom:4px;">🏢 OFFICIAL DIRECT</span>';
      } else if (prod.publishTarget === 'both') {
        badgeHtml = '<span class="official-badge-tag" style="margin-bottom:4px;">⭐ OFFICIAL PARTNER</span>';
      } else if (prod.badge && prod.badge !== 'Bulk CSV' && prod.badge !== 'CSV Import') {
        badgeHtml = '<span class="product-badge">' + prod.badge + '</span>';
      }

      return `
        <div class="product-card" data-product-id="${prod.id}">
          ${badgeHtml}
          <div class="product-img-box">
            <img src="${image}" alt="${title}" loading="lazy">
          </div>

          <div class="product-card-body">
            <h4 class="product-title" title="${title}">${title}</h4>
            <div style="font-size:11px; color:#0284c7; font-weight:700; margin-bottom:4px;">🏪 Seller: ${seller}</div>
            <div style="font-size:12px; color:#f59e0b; margin-bottom:6px;">⭐ ${prod.rating || 5.0} (${prod.reviewsCount || 0})</div>
            <div class="product-price">
              $${price.toFixed(2)}
              ${origPrice > 0 ? ('<span class="original">$' + origPrice.toFixed(2) + '</span>') : ''}
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

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast('Removed from Wishlist');
    } else {
      this.wishlist.push(productId);
      this.showToast('❤️ Added to Wishlist!');
    }
    localStorage.setItem('esellerstore_wishlist', JSON.stringify(this.wishlist));
    this.updateCounters();
    this.renderHomepageSections();
  }

  addToCompare(productId) {
    if (this.compare.includes(productId)) {
      this.showToast('Item already in Compare list.');
    } else {
      if (this.compare.length >= 4) {
        this.showToast('Compare limit reached (max 4 products).');
        return;
      }
      this.compare.push(productId);
      localStorage.setItem('esellerstore_compare', JSON.stringify(this.compare));
      this.showToast('⚖️ Added to Compare!');
      this.openCompareDrawer();
    }
  }

  openCompareDrawer() {
    const modal = document.getElementById('compareModalOverlay');
    const content = document.getElementById('compareModalBody');
    if (!modal || !content) return;

    const products = this.compare.map(id => engine.getProductById(id)).filter(Boolean);

    if (products.length === 0) {
      content.innerHTML = `<p style="padding:20px; text-align:center;">No items selected for comparison.</p>`;
    } else {
      content.innerHTML = `
        <div style="overflow-x:auto; padding:10px 0;">
          <table class="dash-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${products.map(p => `<th><img src="${p.image}" width="50" style="border-radius:4px;"><br>${p.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Price</strong></td>${products.map(p => `<td>$${p.price.toFixed(2)}</td>`).join('')}</tr>
              <tr><td><strong>Brand</strong></td>${products.map(p => `<td>${p.brand}</td>`).join('')}</tr>
              <tr><td><strong>Rating</strong></td>${products.map(p => `<td>⭐ ${p.rating}</td>`).join('')}</tr>
              <tr>
                <td><strong>Action</strong></td>
                ${products.map(p => `<td><button class="btn-primary" style="padding:4px 10px; font-size:11px;" onclick="app.addToCart('${p.id}')">Add to Cart</button></td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }

    modal.classList.add('active');
  }

  openQuickView(productId) {
    const product = engine.getProductById(productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModalOverlay');
    const content = document.getElementById('quickViewModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
        <div>
          <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:8px; object-fit:cover;">
        </div>
        <div>
          <span style="background:#fce8e3; color:var(--nav-red); font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px;">${product.brand}</span>
          <h2 style="font-size:20px; margin:10px 0;">${product.name}</h2>
          <div style="font-size:24px; font-weight:800; color:var(--nav-red); margin-bottom:12px;">
            $${product.price.toFixed(2)}
            ${product.originalPrice ? `<span style="font-size:14px; color:#999; text-decoration:line-through; margin-left:8px;">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <p style="font-size:13px; line-height:1.5; color:#555; margin-bottom:16px;">
            ${product.description}
          </p>
          <button class="btn-primary" style="width:100%; justify-content:center; padding:12px;" onclick="app.addToCart('${product.id}'); app.closeModals();">
            🛒 Add to Cart Now
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

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
    this.showToast('🛒 Added to Cart on E Seller Store!');

    // Real-Time Admin Log
    engine.logActivity('Cart Item Added', `Product '${product.name}' added to cart`, 'info');
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
    if (drawerOverlay) drawerOverlay.classList.add('active');
  }

  closeCartDrawer() {
    const drawerOverlay = document.getElementById('cartDrawerOverlay');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
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

    totalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  processCheckout() {
    if (this.cart.length === 0) {
      this.showToast('Cart is empty.');
      return;
    }

    try {
      const order = engine.processCheckoutOrder(this.cart, {
        name: 'Demo Customer',
        email: 'customer@esellerstore.com'
      });

      this.cart = [];
      this.updateCounters();
      this.renderCartDrawer();
      this.closeCartDrawer();
      this.renderAdminDashboard();
      this.renderVendorDashboard();

      alert(`🎉 E Seller Store ORDER CONFIRMED!\n\nOrder ID: ${order.id}\nTotal Paid: $${order.total}\n\nDokan Calculation:\nAdmin Commission Deducted: $${order.commissionDeducted}\nVendor Balance Credited!`);
    } catch (err) {
      alert('Error during checkout: ' + err.message);
    }
  }

  /**
   * Requirement #1: Advanced User Onboarding (Registration with CNIC, Email, Description)
   */
  handleVendorRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const ownerName = form.ownerName.value;
    const cnic = form.cnic.value;
    const email = form.email.value;
    const password = form.password.value;
    const storeName = form.storeName.value;
    const mobile = form.mobile.value;
    const description = form.description.value;

    try {
      const vendor = engine.registerVendor({ ownerName, cnic, email, password, storeName, mobile, description });
      this.closeModals();
      alert(`✅ E Seller Store ADVANCED ONBOARDING SUCCESSFUL!\n\nStore Name: ${vendor.name}\nCNIC Verified: ${vendor.cnic}\nEmail: ${vendor.email}\nStatus: PENDING ADMIN VERIFICATION\n\nAdmin notification sent for manual approval.`);
      this.setPersona('admin');
    } catch (err) {
      alert('Registration Error: ' + err.message);
    }
  }

  adminApproveVendor(vendorId, newStatus) {
    try {
      const vendor = engine.updateVendorVerificationStatus(vendorId, newStatus);
      this.renderAdminDashboard();
      this.renderVendorDashboard();
      this.showToast(`Vendor '${vendor.name}' status set to: ${newStatus.toUpperCase()}`);
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  }

  handleAdminAddBalance(event) {
    event.preventDefault();
    const form = event.target;
    const vendorId = form.adminSelectVendor.value;
    const amount = form.adminFundAmount.value;
    const note = form.adminFundNote.value;

    try {
      const res = engine.addVendorWalletBalance(vendorId, amount, note);
      form.reset();
      this.renderAdminDashboard();
      this.renderVendorDashboard();
      alert(`💰 WALLET FUNDED SUCCESSFUL!\n\nAdded: $${res.log.amount.toFixed(2)}\nVendor: ${res.vendor.name}\nNew Wallet Balance: $${res.vendor.balance}`);
    } catch (err) {
      alert('Wallet Funding Error: ' + err.message);
    }
  }

  /**
   * Requirement #5: Real-Time Admin Dashboard Notifications Feed
   */
  renderAdminDashboard() {
    const vendors = engine.getVendors();
    const metrics = JSON.parse(localStorage.getItem('esellerstore_metrics')) || {};

    const totalVendorsEl = document.getElementById('adminMetricVendors');
    const platformWalletEl = document.getElementById('adminMetricWallet');
    const totalCommEl = document.getElementById('adminMetricCommission');
    const brandCountEl = document.getElementById('adminMetricBrandsCount');

    if (totalVendorsEl) totalVendorsEl.textContent = vendors.length;
    if (platformWalletEl) platformWalletEl.textContent = `$${parseFloat(metrics.adminWalletTotal || 0).toFixed(2)}`;
    if (totalCommEl) totalCommEl.textContent = `$${parseFloat(metrics.totalPlatformCommissionCollected || 0).toFixed(2)}`;
    if (brandCountEl) brandCountEl.textContent = INITIAL_BRANDS.length;

    // Render Admin Live Activity Notification Feed
    const feedContainer = document.getElementById('adminLiveActivityFeedBox');
    if (feedContainer) {
      const logs = engine.getActivityLogs();
      feedContainer.innerHTML = logs.slice(0, 5).map(log => `
        <div class="admin-feed-item">
          <span class="admin-feed-badge ${log.type}">${log.type.toUpperCase()}</span>
          <div style="flex:1;">
            <strong>${log.title}</strong> &mdash; ${log.detail}
          </div>
          <small style="color:#94a3b8;">${log.time}</small>
        </div>
      `).join('');
    }

    const tableBody = document.getElementById('adminVendorsTableBody');
    if (tableBody) {
      tableBody.innerHTML = vendors.map(v => `
        <tr>
          <td>
            <strong>${v.name}</strong><br>
            <small style="color:#666;">Owner: ${v.ownerName}</small><br>
            <small style="color:var(--nav-red); font-weight:700;">CNIC: ${v.cnic || 'N/A'}</small>
          </td>
          <td>${v.email}<br><small style="color:#666;">${v.mobile || ''}</small></td>
          <td><span class="status-badge ${v.status}">${v.status.replace('_', ' ').toUpperCase()}</span></td>
          <td><strong>$${parseFloat(v.balance).toFixed(2)}</strong></td>
          <td>
            <span style="color:#137333; font-weight:700;">${v.profitMarginPercent || 25}% Profit Margin</span><br>
            <small style="color:#666;">(${v.commissionRate}% Admin Fee)</small>
          </td>
          <td>
            ${v.status === 'pending_verification' ? `
              <button class="btn-primary" style="padding:2px 8px; font-size:11px; background:#137333;" onclick="app.adminApproveVendor('${v.id}', 'verified')">Approve</button>
              <button class="btn-primary" style="padding:2px 8px; font-size:11px; background:#b91c1c;" onclick="app.adminApproveVendor('${v.id}', 'rejected')">Reject</button>
            ` : `Verified Seller`}
          </td>
        </tr>
      `).join('');
    }

    const selectEl = document.getElementById('adminSelectVendor');
    if (selectEl) {
      selectEl.innerHTML = vendors.map(v => `<option value="${v.id}">${v.name} (Bal: $${parseFloat(v.balance).toFixed(2)})</option>`).join('');
    }
  }

  /**
   * Requirement #2: Vendor Product Listing & Profit Calculation (18% - 30%)
   */
  renderVendorDashboard() {
    const vendor = engine.getVendorById(this.activeVendorId) || engine.getVendors()[0];
    if (!vendor) return;

    const nameEl = document.getElementById('vendorDashStoreName');
    const statusEl = document.getElementById('vendorDashStatus');
    const balanceEl = document.getElementById('vendorDashBalance');
    const profitEl = document.getElementById('vendorDashProfit');
    const marginEl = document.getElementById('vendorDashMarginPercent');
    const soldEl = document.getElementById('vendorDashSold');

    if (nameEl) nameEl.textContent = vendor.name;
    if (statusEl) {
      statusEl.className = `status-badge ${vendor.status}`;
      statusEl.textContent = vendor.status.replace('_', ' ').toUpperCase();
    }
    if (balanceEl) balanceEl.textContent = `$${parseFloat(vendor.balance).toFixed(2)}`;
    if (profitEl) profitEl.textContent = `$${parseFloat(vendor.profitEarned).toFixed(2)}`;
    if (marginEl) marginEl.textContent = `${vendor.profitMarginPercent || 25}% Net Margin`;
    if (soldEl) soldEl.textContent = vendor.productsSold || 0;

    const products = engine.getProducts().filter(p => p.vendorId === vendor.id);
    const prodBody = document.getElementById('vendorProductsTableBody');
    if (prodBody) {
      prodBody.innerHTML = products.map(p => {
        // Calculate 18%-30% profit breakdown
        const profitCalc = engine.calculateVendorProfit(vendor.id, p.price);
        return `
          <tr>
            <td><img src="${p.image}" width="30" height="30" style="object-fit:cover; border-radius:3px;"> <strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td>
              <span style="color:#137333; font-weight:700;">+$${profitCalc.profitAmount} (${profitCalc.marginPercent}%)</span><br>
              <small style="color:#666;">Platform Fee: -$${profitCalc.platformFee}</small>
            </td>
            <td>${p.stock} units</td>
            <td><span class="status-badge verified">Active Listing</span></td>
          </tr>
        `;
      }).join('');
    }
  }

  downloadCSVTemplate() {
    const csvContent = engine.generateCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'E Seller Store_Product_Upload_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const count = engine.processCSVUpload(e.target.result, this.activeVendorId);
        this.renderHomepageSections();
        this.renderVendorDashboard();
        alert(`📦 CSV BULK UPLOAD SUCCESSFUL!\n\nImported ${count} new products into E Seller Store catalog.`);
      } catch (err) {
        alert('CSV Parsing Error: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  /**
   * Live Chat Support Integration (Tawk.to)
   */
  toggleAIChat() {
    if (typeof window !== 'undefined' && window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
      window.Tawk_API.maximize();
    }
  }

  handleAjaxSearch(query) {
    const dropdown = document.getElementById('ajaxSearchDropdown');
    if (!dropdown) return;

    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      dropdown.classList.remove('active');
      return;
    }

    const products = engine.getProducts().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);

    if (products.length === 0) {
      dropdown.innerHTML = `<div style="padding:10px; font-size:12px; color:#666;">No products found on E Seller Store for "${query}"</div>`;
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

  setPersona(persona) {
    this.currentPersona = persona;

    document.querySelectorAll('.persona-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.persona === persona);
    });

    const homeView = document.getElementById('homeView');
    const vendorDashView = document.getElementById('vendorDashboardView');
    const adminDashView = document.getElementById('adminDashboardView');

    if (homeView) homeView.style.display = persona === 'customer' ? 'block' : 'none';
    if (vendorDashView) vendorDashView.classList.toggle('active', persona === 'vendor');
    if (adminDashView) adminDashView.classList.toggle('active', persona === 'admin');

    if (persona === 'customer') this.renderHomepageSections();
    if (persona === 'admin') this.renderAdminDashboard();
    if (persona === 'vendor') this.renderVendorDashboard();

    this.showToast(`Switched to: ${persona.toUpperCase()}`);
  }

  filterByBrand(brandName) {
    const products = engine.getProducts().filter(p => p.brand.toLowerCase().includes(brandName.toLowerCase()));
    if (products.length > 0) {
      this.renderProductGrid('featuredSliderGrid', products);
      this.showToast(`Filtered catalog by brand: ${brandName}`);
    } else {
      this.showToast(`Showing catalog for brand: ${brandName}`);
    }
    window.scrollTo({ top: 750, behavior: 'smooth' });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }

  showToast(message) {
    let toast = document.getElementById('nexToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nexToast';
      toast.style.cssText = `
        position: fixed; bottom: 80px; right: 20px;
        background: #222733; color: #fff; padding: 10px 20px;
        border-radius: 20px; font-weight: 600; font-size: 13px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 5000;
        transition: all 0.3s ease; opacity: 0; transform: translateY(20px);
      `;
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
      searchInput.addEventListener('input', (e) => this.handleAjaxSearch(e.target.value));
    }

    // Listen for custom admin activity notifications
    window.addEventListener('admin_activity_logged', () => {
      if (this.currentPersona === 'admin') this.renderAdminDashboard();
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.ref-search-container')) {
        const dropdown = document.getElementById('ajaxSearchDropdown');
        if (dropdown) dropdown.classList.remove('active');
      }
    });
  }
}

window.app = new E Seller StoreApp();
 + origPrice.toFixed(2) + '</span>') : ''}
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

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast('Removed from Wishlist');
    } else {
      this.wishlist.push(productId);
      this.showToast('❤️ Added to Wishlist!');
    }
    localStorage.setItem('esellerstore_wishlist', JSON.stringify(this.wishlist));
    this.updateCounters();
    this.renderHomepageSections();
  }

  addToCompare(productId) {
    if (this.compare.includes(productId)) {
      this.showToast('Item already in Compare list.');
    } else {
      if (this.compare.length >= 4) {
        this.showToast('Compare limit reached (max 4 products).');
        return;
      }
      this.compare.push(productId);
      localStorage.setItem('esellerstore_compare', JSON.stringify(this.compare));
      this.showToast('⚖️ Added to Compare!');
      this.openCompareDrawer();
    }
  }

  openCompareDrawer() {
    const modal = document.getElementById('compareModalOverlay');
    const content = document.getElementById('compareModalBody');
    if (!modal || !content) return;

    const products = this.compare.map(id => engine.getProductById(id)).filter(Boolean);

    if (products.length === 0) {
      content.innerHTML = `<p style="padding:20px; text-align:center;">No items selected for comparison.</p>`;
    } else {
      content.innerHTML = `
        <div style="overflow-x:auto; padding:10px 0;">
          <table class="dash-table">
            <thead>
              <tr>
                <th>Feature</th>
                ${products.map(p => `<th><img src="${p.image}" width="50" style="border-radius:4px;"><br>${p.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Price</strong></td>${products.map(p => `<td>$${p.price.toFixed(2)}</td>`).join('')}</tr>
              <tr><td><strong>Brand</strong></td>${products.map(p => `<td>${p.brand}</td>`).join('')}</tr>
              <tr><td><strong>Rating</strong></td>${products.map(p => `<td>⭐ ${p.rating}</td>`).join('')}</tr>
              <tr>
                <td><strong>Action</strong></td>
                ${products.map(p => `<td><button class="btn-primary" style="padding:4px 10px; font-size:11px;" onclick="app.addToCart('${p.id}')">Add to Cart</button></td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }

    modal.classList.add('active');
  }

  openQuickView(productId) {
    const product = engine.getProductById(productId);
    if (!product) return;

    const modal = document.getElementById('quickViewModalOverlay');
    const content = document.getElementById('quickViewModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">
        <div>
          <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:8px; object-fit:cover;">
        </div>
        <div>
          <span style="background:#fce8e3; color:var(--nav-red); font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px;">${product.brand}</span>
          <h2 style="font-size:20px; margin:10px 0;">${product.name}</h2>
          <div style="font-size:24px; font-weight:800; color:var(--nav-red); margin-bottom:12px;">
            $${product.price.toFixed(2)}
            ${product.originalPrice ? `<span style="font-size:14px; color:#999; text-decoration:line-through; margin-left:8px;">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <p style="font-size:13px; line-height:1.5; color:#555; margin-bottom:16px;">
            ${product.description}
          </p>
          <button class="btn-primary" style="width:100%; justify-content:center; padding:12px;" onclick="app.addToCart('${product.id}'); app.closeModals();">
            🛒 Add to Cart Now
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

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
    this.showToast('🛒 Added to Cart on E Seller Store!');

    // Real-Time Admin Log
    engine.logActivity('Cart Item Added', `Product '${product.name}' added to cart`, 'info');
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
    if (drawerOverlay) drawerOverlay.classList.add('active');
  }

  closeCartDrawer() {
    const drawerOverlay = document.getElementById('cartDrawerOverlay');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
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

    totalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  processCheckout() {
    if (this.cart.length === 0) {
      this.showToast('Cart is empty.');
      return;
    }

    try {
      const order = engine.processCheckoutOrder(this.cart, {
        name: 'Demo Customer',
        email: 'customer@esellerstore.com'
      });

      this.cart = [];
      this.updateCounters();
      this.renderCartDrawer();
      this.closeCartDrawer();
      this.renderAdminDashboard();
      this.renderVendorDashboard();

      alert(`🎉 E Seller Store ORDER CONFIRMED!\n\nOrder ID: ${order.id}\nTotal Paid: $${order.total}\n\nDokan Calculation:\nAdmin Commission Deducted: $${order.commissionDeducted}\nVendor Balance Credited!`);
    } catch (err) {
      alert('Error during checkout: ' + err.message);
    }
  }

  /**
   * Requirement #1: Advanced User Onboarding (Registration with CNIC, Email, Description)
   */
  /**
   * Requirement #1: Advanced User Onboarding (Registration with CNIC, Email, Description)
   */
  handleVendorRegistration(event) {
    if (event && event.preventDefault) event.preventDefault();
    const form = event.target || document.querySelector('#sellerRegModalOverlay form');
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
      const appRecord = engine.submitVendorApplication({ ownerName, cnic, email, password, storeName, mobile, description });
      this.closeModals();
      form.reset();
      this.renderAdminDashboard();
      this.renderAdminVendorsTable();
      this.updateCounters();
      const cnicDisplay = (appRecord.cnic && appRecord.cnic !== 'N/A') ? '\nCNIC: ' + appRecord.cnic : '';
      alert(`🎉 APPLICATION SUBMITTED SUCCESSFULLY!\n\nStore Name: ${appRecord.storeName}\nOwner: ${appRecord.ownerName}${cnicDisplay}\nEmail: ${appRecord.email}\nStatus: PENDING ADMIN APPROVAL\n\nYour application has been placed in the Super Admin Pending Queue for verification.`);
      this.showToast('📋 Vendor registration submitted for review');
    } catch (err) {
      alert('Registration Error: ' + err.message);
    }
  }

  handleAdminApproveApplication(applicationId) {
    try {
      const vendor = engine.approveVendorApplication(applicationId);
      this.renderAdminDashboard();
      this.renderAdminVendorsTable();
      this.renderVendorDashboard();
      this.updateCounters();
      this.showToast(`✅ Store '${vendor.name}' approved & activated!`);
      alert(`🎉 VENDOR APPLICATION APPROVED!\n\nStore "${vendor.name}" (${vendor.ownerName}) is now an active verified seller.\nThe vendor can immediately log in via the Seller Portal with email: ${vendor.email}`);
    } catch (err) {
      alert('Approval Error: ' + err.message);
    }
  }

  handleAdminRejectApplication(applicationId) {
    if (!confirm('Are you sure you want to decline and remove this vendor registration application?')) return;
    try {
      const appRecord = engine.rejectVendorApplication(applicationId);
      this.renderAdminDashboard();
      this.renderAdminVendorsTable();
      this.updateCounters();
      this.showToast('❌ Vendor application declined');
      alert(`⚠️ VENDOR APPLICATION DECLINED\n\nApplication for "${appRecord.storeName || appRecord.name}" has been rejected.`);
    } catch (err) {
      alert('Rejection Error: ' + err.message);
    }
  }

  adminApproveVendor(vendorId, newStatus) {
    try {
      const vendor = engine.updateVendorVerificationStatus(vendorId, newStatus);
      this.renderAdminDashboard();
      this.renderAdminVendorsTable();
      this.renderVendorDashboard();
      this.showToast(`Vendor '${vendor.name}' status set to: ${newStatus.toUpperCase()}`);
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  }

  handleAdminAddBalance(event) {
    event.preventDefault();
    const form = event.target;
    const vendorId = form.adminSelectVendor.value;
    const amount = form.adminFundAmount.value;
    const note = form.adminFundNote.value;

    try {
      const res = engine.addVendorWalletBalance(vendorId, amount, note);
      form.reset();
      this.renderAdminDashboard();
      this.renderVendorDashboard();
      alert(`💰 WALLET FUNDED SUCCESSFUL!\n\nAdded: $${res.log.amount.toFixed(2)}\nVendor: ${res.vendor.name}\nNew Wallet Balance: $${res.vendor.balance}`);
    } catch (err) {
      alert('Wallet Funding Error: ' + err.message);
    }
  }

  renderAdminPendingApplicationsTable() {
    const pendingTbody = document.getElementById('adminPendingApplicationsTableBody');
    const overviewTbody = document.getElementById('adminPendingVendorsOverviewTableBody');
    const tabCountEl = document.getElementById('adminPendingApplicationsTabCount');
    const overviewCountEl = document.getElementById('adminPendingVendorsCount');
    const alertSection = document.getElementById('adminPendingVendorsAlertSection');

    const applications = engine.getVendorApplications ? engine.getVendorApplications() : [];
    const pendingApps = applications.filter(a => a.status === 'pending');

    const count = pendingApps.length;
    if (tabCountEl) tabCountEl.textContent = count;
    if (overviewCountEl) overviewCountEl.textContent = count;
    if (alertSection) alertSection.style.display = count > 0 ? 'block' : 'none';

    const rowsHtml = count === 0
      ? `<tr><td colspan="7" style="text-align:center; color:#64748b; padding:16px;">No pending vendor applications awaiting review.</td></tr>`
      : pendingApps.map(appRecord => `
        <tr style="background:#fffdf5;">
          <td>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:18px;">🏪</span>
              <div>
                <strong style="font-size:13px; color:#1e293b;">${appRecord.storeName || appRecord.name}</strong><br>
                <small style="color:#64748b;">ID: <code>${appRecord.id}</code></small>
              </div>
            </div>
          </td>
          <td>
            <strong>${appRecord.ownerName}</strong><br>
            <small style="color:var(--nav-red); font-weight:700;">CNIC: ${appRecord.cnic || 'N/A'}</small>
          </td>
          <td>
            ${appRecord.email}<br>
            <small style="color:#64748b;">${appRecord.mobile || appRecord.phone || 'N/A'}</small>
          </td>
          <td>
            <small style="color:#475569;">${appRecord.createdAt ? new Date(appRecord.createdAt).toLocaleDateString() : 'Today'}</small>
          </td>
          <td>
            <small style="color:#64748b; display:inline-block; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${appRecord.description || ''}">${appRecord.description || 'Registered Seller application.'}</small>
          </td>
          <td>
            <span class="status-badge pending_verification" style="background:#fef3c7; color:#b45309; font-weight:800; padding:4px 10px; border-radius:12px; border:1px solid #fde68a;">⏳ PENDING</span>
          </td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:6px;">
              <button class="btn-primary" style="padding:5px 12px; font-size:11px; background:#10b981; color:#fff;" onclick="app.handleAdminApproveApplication('${appRecord.id}')">✅ Approve Store</button>
              <button class="btn-primary" style="padding:5px 12px; font-size:11px; background:#ef4444; color:#fff;" onclick="app.handleAdminRejectApplication('${appRecord.id}')">❌ Reject / Delete</button>
            </div>
          </td>
        </tr>
      `).join('');

    if (pendingTbody) pendingTbody.innerHTML = rowsHtml;
    if (overviewTbody) overviewTbody.innerHTML = rowsHtml;
  }

  renderAdminVendorsTable() {
    this.renderAdminPendingApplicationsTable();
    const tableBody = document.getElementById('adminFullVendorsTableBody') || document.getElementById('adminVendorsTableBody');
    if (!tableBody) return;

    const vendors = engine.getVendors();
    const activeVendors = vendors.filter(v => v.status !== 'pending' && v.status !== 'pending_verification');
    const displayVendors = activeVendors.length > 0 ? activeVendors : vendors;

    tableBody.innerHTML = displayVendors.map(v => `
      <tr>
        <td>
          <strong>${v.name}</strong><br>
          <small style="color:#666;">Owner: ${v.ownerName}</small><br>
          <small style="color:var(--nav-red); font-weight:700;">CNIC: ${v.cnic || 'N/A'}</small>
        </td>
        <td>${v.email}<br><small style="color:#666;">${v.mobile || ''}</small></td>
        <td><span class="status-badge ${v.status}">${v.status.replace('_', ' ').toUpperCase()}</span></td>
        <td><strong>$${parseFloat(v.balance).toFixed(2)}</strong></td>
        <td>
          <span style="color:#137333; font-weight:700;">${v.profitMarginPercent || 25}% Profit Margin</span><br>
          <small style="color:#666;">(${v.commissionRate}% Admin Fee)</small>
        </td>
        <td style="text-align:right;">
          <div style="display:inline-flex; gap:6px; flex-wrap:wrap; justify-content:flex-end;">
            <button class="btn-primary" style="padding:4px 8px; font-size:11px; background:#0284c7;" onclick="app.openAdminMasterCatalogImporter('${v.id}')">⚡ List Master Catalog</button>
            <button class="btn-primary" style="padding:4px 8px; font-size:11px; background:#10b981;" onclick="app.handleAdminVendorInventoryView('${v.id}')">📦 Inventory</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  /**
   * Requirement #5: Real-Time Admin Dashboard Notifications Feed
   */
  renderAdminDashboard() {
    const vendors = engine.getVendors();
    const metrics = JSON.parse(localStorage.getItem('esellerstore_metrics')) || {};

    const totalVendorsEl = document.getElementById('adminMetricVendors');
    const platformWalletEl = document.getElementById('adminMetricWallet');
    const totalCommEl = document.getElementById('adminMetricCommission');
    const brandCountEl = document.getElementById('adminMetricBrandsCount');

    if (totalVendorsEl) totalVendorsEl.textContent = vendors.length;
    if (platformWalletEl) platformWalletEl.textContent = `$${parseFloat(metrics.adminWalletTotal || 0).toFixed(2)}`;
    if (totalCommEl) totalCommEl.textContent = `$${parseFloat(metrics.totalPlatformCommissionCollected || 0).toFixed(2)}`;
    if (brandCountEl) brandCountEl.textContent = INITIAL_BRANDS.length;

    this.renderAdminPendingApplicationsTable();
    this.renderAdminVendorsTable();

    // Render Admin Live Activity Notification Feed
    const feedContainer = document.getElementById('adminLiveActivityFeedBox');
    if (feedContainer) {
      const logs = engine.getActivityLogs();
      feedContainer.innerHTML = logs.slice(0, 5).map(log => `
        <div class="admin-feed-item">
          <span class="admin-feed-badge ${log.type}">${log.type.toUpperCase()}</span>
          <div style="flex:1;">
            <strong>${log.title}</strong> &mdash; ${log.detail}
          </div>
          <small style="color:#94a3b8;">${log.time}</small>
        </div>
      `).join('');
    }

    const selectEl = document.getElementById('adminSelectVendor');
    if (selectEl) {
      selectEl.innerHTML = vendors.map(v => `<option value="${v.id}">${v.name} (Bal: $${parseFloat(v.balance).toFixed(2)})</option>`).join('');
    }
  }

  /**
   * Requirement #2: Vendor Product Listing & Profit Calculation (18% - 30%)
   */
  renderVendorDashboard() {
    const vendor = engine.getVendorById(this.activeVendorId) || engine.getVendors()[0];
    if (!vendor) return;

    const nameEl = document.getElementById('vendorDashStoreName');
    const statusEl = document.getElementById('vendorDashStatus');
    const balanceEl = document.getElementById('vendorDashBalance');
    const profitEl = document.getElementById('vendorDashProfit');
    const marginEl = document.getElementById('vendorDashMarginPercent');
    const soldEl = document.getElementById('vendorDashSold');

    if (nameEl) nameEl.textContent = vendor.name;
    if (statusEl) {
      statusEl.className = `status-badge ${vendor.status}`;
      statusEl.textContent = vendor.status.replace('_', ' ').toUpperCase();
    }
    if (balanceEl) balanceEl.textContent = `$${parseFloat(vendor.balance).toFixed(2)}`;
    if (profitEl) profitEl.textContent = `$${parseFloat(vendor.profitEarned).toFixed(2)}`;
    if (marginEl) marginEl.textContent = `${vendor.profitMarginPercent || 25}% Net Margin`;
    if (soldEl) soldEl.textContent = vendor.productsSold || 0;

    const products = engine.getProducts().filter(p => p.vendorId === vendor.id);
    const prodBody = document.getElementById('vendorProductsTableBody');
    if (prodBody) {
      prodBody.innerHTML = products.map(p => {
        // Calculate 18%-30% profit breakdown
        const profitCalc = engine.calculateVendorProfit(vendor.id, p.price);
        return `
          <tr>
            <td><img src="${p.image}" width="30" height="30" style="object-fit:cover; border-radius:3px;"> <strong>${p.name}</strong></td>
            <td>${p.category}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td>
              <span style="color:#137333; font-weight:700;">+$${profitCalc.profitAmount} (${profitCalc.marginPercent}%)</span><br>
              <small style="color:#666;">Platform Fee: -$${profitCalc.platformFee}</small>
            </td>
            <td>${p.stock} units</td>
            <td><span class="status-badge verified">Active Listing</span></td>
          </tr>
        `;
      }).join('');
    }
  }

  downloadCSVTemplate() {
    const csvContent = engine.generateCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'E Seller Store_Product_Upload_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const count = engine.processCSVUpload(e.target.result, this.activeVendorId);
        this.renderHomepageSections();
        this.renderVendorDashboard();
        alert(`📦 CSV BULK UPLOAD SUCCESSFUL!\n\nImported ${count} new products into E Seller Store catalog.`);
      } catch (err) {
        alert('CSV Parsing Error: ' + err.message);
      }
    };
    reader.readAsText(file);
  }



  handleAjaxSearch(query) {
    const dropdown = document.getElementById('ajaxSearchDropdown');
    if (!dropdown) return;

    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      dropdown.classList.remove('active');
      return;
    }

    const products = engine.getProducts().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    ).slice(0, 6);

    if (products.length === 0) {
      dropdown.innerHTML = `<div style="padding:10px; font-size:12px; color:#666;">No products found on E Seller Store for "${query}"</div>`;
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

  setPersona(persona) {
    this.currentPersona = persona;

    document.querySelectorAll('.persona-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.persona === persona);
    });

    const homeView = document.getElementById('homeView');
    const vendorDashView = document.getElementById('vendorDashboardView');
    const adminDashView = document.getElementById('adminDashboardView');

    if (homeView) homeView.style.display = persona === 'customer' ? 'block' : 'none';
    if (vendorDashView) vendorDashView.classList.toggle('active', persona === 'vendor');
    if (adminDashView) adminDashView.classList.toggle('active', persona === 'admin');

    if (persona === 'customer') this.renderHomepageSections();
    if (persona === 'admin') this.renderAdminDashboard();
    if (persona === 'vendor') this.renderVendorDashboard();

    this.showToast(`Switched to: ${persona.toUpperCase()}`);
  }

  filterByCategory(categoryKey) {
    if (this.currentPersona !== 'customer') {
      this.setPersona('customer');
    }
    const cat = (categoryKey || '').trim().toLowerCase();
    const products = engine.getProducts().filter(p => {
      if (p.published === false) return false;
      const pCat = (p.category || '').toLowerCase();
      return pCat === cat || pCat.includes(cat) || cat.includes(pCat);
    });

    if (products.length > 0) {
      this.renderProductGrid('featuredSliderGrid', products);
      this.renderProductGrid('catalogGrid', products);
      this.showToast(`Filtered catalog by category: ${categoryKey}`);
    } else {
      this.renderProductGrid('featuredSliderGrid', products);
      this.showToast(`No products in category: ${categoryKey}`);
    }

    const grid = document.getElementById('featuredSliderGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 750, behavior: 'smooth' });
    }
  }

  filterByBrand(brandName) {
    const products = engine.getProducts().filter(p => p.brand.toLowerCase().includes(brandName.toLowerCase()));
    if (products.length > 0) {
      this.renderProductGrid('featuredSliderGrid', products);
      this.showToast(`Filtered catalog by brand: ${brandName}`);
    } else {
      this.showToast(`Showing catalog for brand: ${brandName}`);
    }
    window.scrollTo({ top: 750, behavior: 'smooth' });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }

  showToast(message) {
    let toast = document.getElementById('nexToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nexToast';
      toast.style.cssText = `
        position: fixed; bottom: 80px; right: 20px;
        background: #222733; color: #fff; padding: 10px 20px;
        border-radius: 20px; font-weight: 600; font-size: 13px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 5000;
        transition: all 0.3s ease; opacity: 0; transform: translateY(20px);
      `;
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

  updateCloudSyncBadge(lastSync) {
    const badge = document.getElementById('adminCloudSyncBadge');
    if (badge) {
      badge.textContent = '🟢 CLOUD SYNC LIVE';
      badge.style.background = '#ecfdf5';
      badge.style.color = '#047857';
      badge.style.borderColor = '#a7f3d0';
      badge.title = 'Last Synchronized: ' + (lastSync || new Date().toLocaleTimeString());
    }
    const timeEl = document.getElementById('adminCloudSyncLastTime');
    if (timeEl) {
      timeEl.textContent = new Date().toLocaleTimeString();
    }
  }

  async handleForceCloudPush() {
    try {
      this.showToast('☁️ Pushing local data to cloud backend...');
      const success = await engine.forceCloudPush();
      if (success) {
        this.updateCounters();
        this.updateCloudSyncBadge(new Date().toISOString());
        this.showToast('✅ Cloud database synchronized successfully!');
        alert('🎉 CLOUD PUSH COMPLETE!\n\nAll current products, vendors, applications, and store orders have been uploaded and persisted to the global cloud database.');
      } else {
        alert('Cloud push failed. Check network connection.');
      }
    } catch (e) {
      alert('Cloud Push Error: ' + e.message);
    }
  }

  async handleForceCloudPull() {
    try {
      this.showToast('🔄 Pulling latest data from cloud backend...');
      const snapshot = await engine.forceCloudPull();
      if (snapshot) {
        this.renderHomepageSections();
        this.renderCatalog();
        this.renderAdminDashboard();
        this.renderAdminProductsTable();
        this.renderAdminVendorsTable();
        this.renderVendorDashboard();
        this.updateCounters();
        this.updateCloudSyncBadge(snapshot.lastUpdated);
        this.showToast('✅ Local cache updated with latest cloud data!');
        alert(`🎉 CLOUD PULL COMPLETE!\n\nSynchronized with cloud database.\nProducts: ${snapshot.products ? snapshot.products.length : 0}\nVendors: ${snapshot.vendors ? snapshot.vendors.length : 0}\nPending Applications: ${snapshot.vendor_applications ? snapshot.vendor_applications.length : 0}`);
      } else {
        alert('No new cloud data or endpoint unreachable.');
      }
    } catch (e) {
      alert('Cloud Pull Error: ' + e.message);
    }
  }

  bindEvents() {
    const searchInput = document.getElementById('ajaxSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleAjaxSearch(e.target.value));
    }

    // Listen for custom admin activity notifications
    window.addEventListener('admin_activity_logged', () => {
      if (this.currentPersona === 'admin') this.renderAdminDashboard();
    });

    window.addEventListener('vendor_applications_updated', () => {
      if (this.currentPersona === 'admin') {
        this.renderAdminDashboard();
        this.renderAdminVendorsTable();
      }
    });

    window.addEventListener('cloud_sync_updated', (e) => {
      this.updateCloudSyncBadge(e.detail ? e.detail.lastUpdated : null);
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.ref-search-container')) {
        const dropdown = document.getElementById('ajaxSearchDropdown');
        if (dropdown) dropdown.classList.remove('active');
      }
    });
  }
}

window.app = new E Seller StoreApp();
window.handleForceCloudPush = function() { if (window.app) window.app.handleForceCloudPush(); };
window.handleForceCloudPull = function() { if (window.app) window.app.handleForceCloudPull(); };
