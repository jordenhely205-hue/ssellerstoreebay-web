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
    this.renderProductGrid('featuredSliderGrid', featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4));
  }

  renderBestSelling() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const bestSellingProducts = products.filter(p => p.isBestSelling);
    this.renderProductGrid('bestSellingSliderGrid', bestSellingProducts.length > 0 ? bestSellingProducts : products.slice(4, 8));
  }

  renderNewArrivals() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const newProducts = products.filter(p => p.isNew);
    this.renderProductGrid('newArrivalsSliderGrid', newProducts.length > 0 ? newProducts : products.slice(2, 6));
  }

  renderCatalog() {
    const products = engine.getProducts().filter(p => p.published !== false);
    this.renderProductGrid('catalogGrid', products);
    this.renderProductGrid('catalogProductsGrid', products);
    this.renderProductGrid('allProductsGrid', products);
  }

  renderFeaturedProducts() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const featuredProducts = products.filter(p => p.isFeatured);
    this.renderProductGrid('featuredSliderGrid', featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4));
  }

  renderBestSelling() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const bestSellingProducts = products.filter(p => p.isBestSelling);
    this.renderProductGrid('bestSellingSliderGrid', bestSellingProducts.length > 0 ? bestSellingProducts : products.slice(4, 8));
  }

  renderNewArrivals() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const newProducts = products.filter(p => p.isNew);
    this.renderProductGrid('newArrivalsSliderGrid', newProducts.length > 0 ? newProducts : products.slice(2, 6));
  }

  renderCatalog() {
    const products = engine.getProducts().filter(p => p.published !== false);
    this.renderProductGrid('catalogGrid', products);
    this.renderProductGrid('catalogProductsGrid', products);
    this.renderProductGrid('allProductsGrid', products);
  }

  renderFeaturedProducts() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const featuredProducts = products.filter(p => p.isFeatured);
    this.renderProductGrid('featuredSliderGrid', featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4));
  }

  renderBestSelling() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const bestSellingProducts = products.filter(p => p.isBestSelling);
    this.renderProductGrid('bestSellingSliderGrid', bestSellingProducts.length > 0 ? bestSellingProducts : products.slice(4, 8));
  }

  renderNewArrivals() {
    const products = engine.getProducts().filter(p => p.published !== false);
    const newProducts = products.filter(p => p.isNew);
    this.renderProductGrid('newArrivalsSliderGrid', newProducts.length > 0 ? newProducts : products.slice(2, 6));
  }

  renderCatalog() {
    const products = engine.getProducts().filter(p => p.published !== false);
    this.renderProductGrid('catalogGrid', products);
    this.renderProductGrid('catalogProductsGrid', products);
    this.renderProductGrid('allProductsGrid', products);
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
   * Requirement #4: Interactive AI Chatbot Assistant Logic
   */
  toggleAIChat() {
    const drawer = document.getElementById('aiChatDrawer');
    if (drawer) drawer.classList.toggle('active');
  }

  sendAIMessage(userText = '') {
    const input = document.getElementById('aiChatInput');
    const query = userText || (input ? input.value.trim() : '');
    if (!query) return;

    const body = document.getElementById('aiChatBody');
    if (!body) return;

    // User Message
    body.innerHTML += `<div class="ai-msg user">${query}</div>`;
    if (input) input.value = '';
    body.scrollTop = body.scrollHeight;

    // Simulated Smart AI Processing
    setTimeout(() => {
      let reply = 'Welcome to E Seller Store! How can I assist you today with products or vendor onboarding?';
      const q = query.toLowerCase();

      if (q.includes('register') || q.includes('seller') || q.includes('cnic')) {
        reply = '🏪 To register as a verified seller on E Seller Store, click "Become a Seller" at the top. Be sure to provide your CNIC (e.g. 42101-9876543-1), Store Name, and Profile Description for instant Admin verification!';
      } else if (q.includes('profit') || q.includes('margin') || q.includes('commission')) {
        reply = '💰 E Seller Store vendors enjoy a high profit margin between 18% and 30% per product sale! Net profit breakdown is displayed automatically on your Seller Dashboard.';
      } else if (q.includes('iphone') || q.includes('dell') || q.includes('nike') || q.includes('hp')) {
        reply = '🏷️ We have official flagship items from Apple iPhone, Dell, Nike, HP, Sony, and Rolex in stock. Check out our Upfront Brands section on the homepage!';
      } else if (q.includes('track') || q.includes('order') || q.includes('status')) {
        reply = '📦 All orders are tracked in real-time. Admin and Vendors receive immediate notification alerts upon customer checkout!';
      }

      body.innerHTML += `<div class="ai-msg bot">⚡ <strong>E Seller Store AI:</strong> ${reply}</div>`;
      body.scrollTop = body.scrollHeight;
    }, 400);
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
   * Requirement #4: Interactive AI Chatbot Assistant Logic
   */
  toggleAIChat() {
    const drawer = document.getElementById('aiChatDrawer');
    if (drawer) drawer.classList.toggle('active');
  }

  sendAIMessage(userText = '') {
    const input = document.getElementById('aiChatInput');
    const query = userText || (input ? input.value.trim() : '');
    if (!query) return;

    const body = document.getElementById('aiChatBody');
    if (!body) return;

    // User Message
    body.innerHTML += `<div class="ai-msg user">${query}</div>`;
    if (input) input.value = '';
    body.scrollTop = body.scrollHeight;

    // Simulated Smart AI Processing
    setTimeout(() => {
      let reply = 'Welcome to E Seller Store! How can I assist you today with products or vendor onboarding?';
      const q = query.toLowerCase();

      if (q.includes('register') || q.includes('seller') || q.includes('cnic')) {
        reply = '🏪 To register as a verified seller on E Seller Store, click "Become a Seller" at the top. Be sure to provide your CNIC (e.g. 42101-9876543-1), Store Name, and Profile Description for instant Admin verification!';
      } else if (q.includes('profit') || q.includes('margin') || q.includes('commission')) {
        reply = '💰 E Seller Store vendors enjoy a high profit margin between 18% and 30% per product sale! Net profit breakdown is displayed automatically on your Seller Dashboard.';
      } else if (q.includes('iphone') || q.includes('dell') || q.includes('nike') || q.includes('hp')) {
        reply = '🏷️ We have official flagship items from Apple iPhone, Dell, Nike, HP, Sony, and Rolex in stock. Check out our Upfront Brands section on the homepage!';
      } else if (q.includes('track') || q.includes('order') || q.includes('status')) {
        reply = '📦 All orders are tracked in real-time. Admin and Vendors receive immediate notification alerts upon customer checkout!';
      }

      body.innerHTML += `<div class="ai-msg bot">⚡ <strong>E Seller Store AI:</strong> ${reply}</div>`;
      body.scrollTop = body.scrollHeight;
    }, 400);
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
