// Vercel Serverless Function: GET /api/products, POST /api/products, DELETE /api/products
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const products = getProductsCatalog();

  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      
      // Batch upsert support
      if (payload.action === 'batch_upsert' && Array.isArray(payload.products)) {
        payload.products.forEach(newP => {
          const idx = products.findIndex(p => p.id === newP.id || (p.sku && p.sku === newP.sku));
          if (idx >= 0) {
            products[idx] = Object.assign({}, products[idx], newP);
          } else {
            products.unshift(newP);
          }
        });
        inMemoryProducts = products;
        return res.status(200).json({ success: true, count: products.length, message: 'Products batch upserted' });
      }

      // Single product upsert
      const newProduct = payload;
      if (newProduct && (newProduct.name || newProduct.title)) {
        if (!newProduct.id) newProduct.id = 'p_' + Date.now();
        const idx = products.findIndex(p => p.id === newProduct.id);
        if (idx >= 0) {
          products[idx] = Object.assign({}, products[idx], newProduct);
        } else {
          products.unshift(newProduct);
        }
        inMemoryProducts = products;
        return res.status(200).json({ success: true, product: newProduct, count: products.length });
      }

      return res.status(400).json({ error: 'Invalid product payload' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (id) {
      const initialLen = products.length;
      inMemoryProducts = products.filter(p => p.id !== id);
      return res.status(200).json({ success: true, deleted: initialLen - inMemoryProducts.length });
    }
    return res.status(400).json({ error: 'Product ID required' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
