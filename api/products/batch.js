// Vercel Serverless Function: POST /api/products/batch
const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_DB_PATH = path.join(os.tmpdir(), 'esellerstore_products_db.json');

let inMemoryProducts = null;

function getProductsCatalog() {
  if (inMemoryProducts && inMemoryProducts.length > 0) return inMemoryProducts;
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const list = payload.products || (Array.isArray(payload) ? payload : []);

      if (Array.isArray(list) && list.length > 0) {
        list.forEach(newP => {
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
        return res.status(200).json({ success: true, count: products.length, imported: list.length });
      }

      return res.status(200).json({ success: true, count: products.length, imported: 0 });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
