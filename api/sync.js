// Vercel Serverless Function: GET /api/sync, POST /api/sync
// Full-state & delta multi-device cloud synchronization
const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_SYNC_DB = path.join(os.tmpdir(), 'esellerstore_cloud_sync_db.json');

// In-memory runtime cache for serverless lifecycle
let cloudSnapshot = null;

function loadDefaultSeed() {
  let products = [];
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'products.json'), 'utf8');
    products = JSON.parse(raw);
  } catch (e) {
    products = [];
  }

  return {
    version: 'v3.5_cloud_sync',
    lastUpdated: new Date().toISOString(),
    products: products,
    vendors: [
      {
        id: 'sanvicollection',
        name: 'Sanvicollection',
        storeName: 'Sanvicollection',
        ownerName: 'Sanvi Sharma',
        cnic: '42101-7890123-5',
        email: 'sanvi@sanvicollection.com',
        mobile: '+1 (555) 345-6789',
        status: 'verified',
        balance: 3420.50,
        totalSales: 18750.00,
        profitEarned: 4685.00,
        profitMarginPercent: 25,
        productsSold: 150,
        commissionRate: 15,
        rating: 5.0,
        joinedDate: '2026-01-10'
      }
    ],
    vendor_applications: [],
    orders: [],
    activity_logs: [
      {
        id: 'act_cloud_init',
        title: 'Cloud Backend Active',
        detail: 'Global multi-device cloud synchronization service initialized',
        time: 'Just now',
        type: 'success'
      }
    ]
  };
}

function getCloudSnapshot() {
  if (cloudSnapshot) return cloudSnapshot;

  try {
    if (fs.existsSync(TMP_SYNC_DB)) {
      const raw = fs.readFileSync(TMP_SYNC_DB, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        cloudSnapshot = parsed;
        return cloudSnapshot;
      }
    }
  } catch (e) {}

  cloudSnapshot = loadDefaultSeed();
  return cloudSnapshot;
}

function persistCloudSnapshot(snapshot) {
  cloudSnapshot = {
    ...snapshot,
    lastUpdated: new Date().toISOString()
  };
  try {
    fs.writeFileSync(TMP_SYNC_DB, JSON.stringify(cloudSnapshot), 'utf8');
  } catch (e) {}
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Client-Device, Cache-Control, Pragma');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const snapshot = getCloudSnapshot();

  // GET /api/sync -> Returns current global cloud state
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3, stale-while-revalidate=10, no-cache, no-store');
    return res.status(200).json({
      success: true,
      lastUpdated: snapshot.lastUpdated,
      products: snapshot.products || [],
      vendors: snapshot.vendors || [],
      vendor_applications: snapshot.vendor_applications || [],
      orders: snapshot.orders || [],
      activity_logs: snapshot.activity_logs || []
    });
  }

  // POST /api/sync -> Upsert delta or full synchronization from client (Mobile, PC, Admin)
  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { entity, data, action } = payload;

      // 1. Vendor Application Submission
      if (entity === 'vendor_application' || entity === 'application') {
        const appRecord = data;
        if (!appRecord || !appRecord.id) {
          return res.status(400).json({ error: 'Invalid application payload' });
        }
        if (!Array.isArray(snapshot.vendor_applications)) snapshot.vendor_applications = [];
        const existingIdx = snapshot.vendor_applications.findIndex(a => a.id === appRecord.id || (a.email && a.email.toLowerCase() === (appRecord.email || '').toLowerCase()));
        if (existingIdx >= 0) {
          snapshot.vendor_applications[existingIdx] = { ...snapshot.vendor_applications[existingIdx], ...appRecord };
        } else {
          snapshot.vendor_applications.unshift(appRecord);
        }
        persistCloudSnapshot(snapshot);
        return res.status(200).json({ success: true, count: snapshot.vendor_applications.length, application: appRecord });
      }

      // 2. Vendor Approval / Status Update
      if (entity === 'vendor_approval') {
        const { applicationId, status, vendor } = data || {};
        if (!Array.isArray(snapshot.vendor_applications)) snapshot.vendor_applications = [];
        const appIdx = snapshot.vendor_applications.findIndex(a => a.id === applicationId);
        if (appIdx >= 0) {
          snapshot.vendor_applications[appIdx].status = status || 'approved';
        }
        if (vendor && vendor.id) {
          if (!Array.isArray(snapshot.vendors)) snapshot.vendors = [];
          const vIdx = snapshot.vendors.findIndex(v => v.id === vendor.id || (v.email && v.email.toLowerCase() === (vendor.email || '').toLowerCase()));
          if (vIdx >= 0) {
            snapshot.vendors[vIdx] = { ...snapshot.vendors[vIdx], ...vendor, status: 'verified' };
          } else {
            snapshot.vendors.unshift({ ...vendor, status: 'verified' });
          }
        }
        persistCloudSnapshot(snapshot);
        return res.status(200).json({ success: true, message: 'Vendor application status updated in cloud' });
      }

      // 3. Products Batch / Single Sync
      if (entity === 'products' || Array.isArray(payload.products)) {
        const prods = payload.products || (Array.isArray(data) ? data : [data]);
        if (!Array.isArray(snapshot.products)) snapshot.products = [];

        prods.forEach(newP => {
          if (!newP) return;
          const idx = snapshot.products.findIndex(p => p.id === newP.id || (p.sku && newP.sku && p.sku === newP.sku));
          if (idx >= 0) {
            snapshot.products[idx] = { ...snapshot.products[idx], ...newP };
          } else {
            snapshot.products.unshift(newP);
          }
        });
        persistCloudSnapshot(snapshot);
        return res.status(200).json({ success: true, count: snapshot.products.length });
      }

      // 4. Full Snapshot Replacement / Reconciliation from Admin Force Push
      if (action === 'full_reconcile' && payload.state) {
        const newState = payload.state;
        if (Array.isArray(newState.products)) snapshot.products = newState.products;
        if (Array.isArray(newState.vendors)) snapshot.vendors = newState.vendors;
        if (Array.isArray(newState.vendor_applications)) snapshot.vendor_applications = newState.vendor_applications;
        if (Array.isArray(newState.orders)) snapshot.orders = newState.orders;
        persistCloudSnapshot(snapshot);
        return res.status(200).json({ success: true, message: 'Cloud database fully reconciled from admin state' });
      }

      return res.status(400).json({ error: 'Unrecognized sync payload entity' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};