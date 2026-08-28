// Vercel Serverless Function: GET /api/products, POST /api/products, PUT /api/products, PATCH /api/products, DELETE /api/products
const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_DB_PATH = path.join(os.tmpdir(), 'esellerstore_products_db.json');

let inMemoryProducts = null;

function getProductsCatalog() {
  if (inMemoryProducts && inMemoryProducts.length > 0) return inMemoryProducts;
  
  // Try reading from writable serverless temp DB
  try {
    if (fs.existsSync(TMP_DB_PATH)) {
      const raw = fs.readFileSync(TMP_DB_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryProducts = parsed;
        return inMemoryProducts;
      }
    }
  } catch (e) {}

  // Fallback to static products.json
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'products.json'), 'utf8');
    inMemoryProducts = JSON.parse(raw);
  } catch (e) {
    inMemoryProducts = [];
  }
  return inMemoryProducts;
}

function persistProducts(products) {
  inMemoryProducts = products;
  try {
    fs.writeFileSync(TMP_DB_PATH, JSON.stringify(products), 'utf8');
  } catch (e) {}
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const products = getProductsCatalog();

  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=5, stale-while-revalidate=30, no-cache, no-store');
    return res.status(200).json(products);
  }

  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      
      // Batch upsert support
      if (payload.action === 'batch_upsert' && Array.isArray(payload.products)) {
        payload.products.forEach(newP => {
          if (!newP) return;
          const idx = products.findIndex(p => p.id === newP.id || (p.sku && p.sku === newP.sku));
          const updatedRecord = {
            ...(idx >= 0 ? products[idx] : {}),
            ...newP,
            updatedAt: newP.updatedAt || new Date().toISOString(),
            isEdited: true
          };
          if (idx >= 0) {
            products[idx] = updatedRecord;
          } else {
            products.unshift(updatedRecord);
          }
        });
        persistProducts(products);
        return res.status(200).json({ success: true, count: products.length, message: 'Products batch upserted' });
      }

      // Single product upsert / update
      const newProduct = payload;
      if (newProduct && (newProduct.name || newProduct.title || newProduct.id)) {
        if (!newProduct.id) newProduct.id = 'p_' + Date.now();
        const idx = products.findIndex(p => p.id === newProduct.id || (newProduct.sku && p.sku === newProduct.sku));
        const updatedRecord = {
          ...(idx >= 0 ? products[idx] : {}),
          ...newProduct,
          updatedAt: newProduct.updatedAt || new Date().toISOString(),
          isEdited: true
        };
        
        if (idx >= 0) {
          products[idx] = updatedRecord;
        } else {
          products.unshift(updatedRecord);
        }
        persistProducts(products);
        return res.status(200).json({ success: true, product: updatedRecord, count: products.length });
      }

      return res.status(400).json({ error: 'Invalid product payload' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query || {};
    const deleteId = id || (req.body && req.body.id);
    if (deleteId) {
      const initialLen = products.length;
      const filtered = products.filter(p => p.id !== deleteId);
      persistProducts(filtered);
      return res.status(200).json({ success: true, deleted: initialLen - filtered.length, count: filtered.length });
    }
    return res.status(400).json({ error: 'Product ID required' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
