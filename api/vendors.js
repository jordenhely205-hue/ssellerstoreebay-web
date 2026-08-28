// Vercel Serverless Function: GET /api/vendors, POST /api/vendors
const fs = require('fs');

const DEFAULT_VENDORS = [
  { id: 'v101', name: 'TechWorld Hub', ownerName: 'Sarah Jenkins', email: 'sarah@techworld.com', status: 'verified', balance: 1450.00, rating: 4.9 },
  { id: 'v102', name: 'Luxe Watches', ownerName: 'Alex Rivera', email: 'alex@luxewatches.com', status: 'verified', balance: 890.50, rating: 4.8 },
  { id: 'v103', name: 'Sneaker Planet', ownerName: 'Marcus Vance', email: 'marcus@sneakerplanet.com', status: 'verified', balance: 2150.00, rating: 4.9 },
  { id: 'v104', name: 'Fashion Haven', ownerName: 'Elena Rostova', email: 'elena@fashionhaven.com', status: 'verified', balance: 3400.00, rating: 4.7 }
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
