// Vercel Serverless Function: POST /api/products/batch
const fs = require('fs');
const path = require('path');

let inMemoryProducts = null;

function getProductsCatalog() {
  if (inMemoryProducts && inMemoryProducts.length > 0) return inMemoryProducts;
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'products.json'), 'utf8');
    inMemoryProducts = JSON.parse(raw);
  } catch (e) {
    inMemoryProducts = [];
  }
  return inMemoryProducts;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const products = getProductsCatalog();

  if (req.method === 'GET') {
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const list = payload.products || (Array.isArray(payload) ? payload : []);

      if (Array.isArray(list) && list.length > 0) {
        list.forEach(newP => {
          const idx = products.findIndex(p => p.id === newP.id || (p.sku && p.sku === newP.sku));
          if (idx >= 0) {
            products[idx] = Object.assign({}, products[idx], newP);
          } else {
            products.unshift(newP);
          }
        });
        inMemoryProducts = products;
        return res.status(200).json({ success: true, count: products.length, imported: list.length });
      }

      return res.status(200).json({ success: true, count: products.length, imported: 0 });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
