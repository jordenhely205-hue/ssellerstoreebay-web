// Vercel Serverless Function: GET /api/vendors, POST /api/vendors
const fs = require('fs');

const DEFAULT_VENDORS = [
  {
    id: 'sanvicollection',
    name: 'Sanvicollection',
    storeName: 'Sanvicollection',
    ownerName: 'Sanvi Sharma',
    cnic: '42101-7890123-5',
    email: 'sanvi@sanvicollection.com',
    mobile: '+1 (555) 345-6789',
    phone: '+1 (555) 345-6789',
    description: 'Exclusive official vendor of luxury fashion, modern technology, lifestyle accessories, and premium home essentials.',
    status: 'verified',
    balance: 3420.50,
    totalSales: 18750.00,
    profitEarned: 4685.00,
    profitMarginPercent: 25,
    productsSold: 150,
    commissionRate: 15,
    storeLogo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    rating: 5.0,
    joinedDate: '2026-01-10'
  }
];

let inMemoryVendors = [...DEFAULT_VENDORS];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json(inMemoryVendors);
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const list = payload.vendors || (Array.isArray(payload) ? payload : [payload]);
      list.forEach(v => {
        const idx = inMemoryVendors.findIndex(x => x.id === v.id || (x.email && x.email.toLowerCase() === (v.email || '').toLowerCase()));
        if (idx >= 0) inMemoryVendors[idx] = Object.assign({}, inMemoryVendors[idx], v);
        else inMemoryVendors.push(v);
      });
      return res.status(200).json({ success: true, count: inMemoryVendors.length });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
