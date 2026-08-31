// Vercel Serverless Function: GET /api/applications, POST /api/applications, PATCH /api/applications, DELETE /api/applications
const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_APPS_DB = path.join(os.tmpdir(), 'esellerstore_applications_db.json');

let inMemoryApplications = [];

function getApplications() {
  if (inMemoryApplications && inMemoryApplications.length > 0) return inMemoryApplications;

  try {
    if (fs.existsSync(TMP_APPS_DB)) {
      const raw = fs.readFileSync(TMP_APPS_DB, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        inMemoryApplications = parsed;
        return inMemoryApplications;
      }
    }
  } catch (e) {}

  return inMemoryApplications;
}

function persistApplications(apps) {
  inMemoryApplications = apps;
  try {
    fs.writeFileSync(TMP_APPS_DB, JSON.stringify(apps), 'utf8');
  } catch (e) {}
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apps = getApplications();

  // GET /api/applications -> Returns all vendor applications
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=2, no-cache, no-store');
    return res.status(200).json(apps);
  }

  // POST /api/applications -> New vendor registration from any device
  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const appRecord = {
        id: payload.id || ('app_' + Date.now()),
        ownerName: payload.ownerName || 'Applicant',
        cnic: payload.cnic || 'N/A',
        email: payload.email || '',
        storeName: payload.storeName || (payload.ownerName + ' Store'),
        mobile: payload.mobile || payload.phone || '',
        password: payload.password || 'Sanvi@123',
        description: payload.description || '',
        status: payload.status || 'pending',
        createdAt: payload.createdAt || new Date().toLocaleString(),
        deviceOrigin: req.headers['user-agent'] || 'Web Client'
      };

      const existingIdx = apps.findIndex(a => a.id === appRecord.id || (a.email && a.email.toLowerCase() === appRecord.email.toLowerCase()));
      if (existingIdx >= 0) {
        apps[existingIdx] = { ...apps[existingIdx], ...appRecord };
      } else {
        apps.unshift(appRecord);
      }

      persistApplications(apps);
      return res.status(201).json({ success: true, application: appRecord, count: apps.length });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // PATCH /api/applications -> Super Admin approves or rejects
  if (req.method === 'PATCH' || req.method === 'PUT') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { id, status } = payload;
      const appIdx = apps.findIndex(a => a.id === id);
      if (appIdx >= 0) {
        apps[appIdx].status = status || 'approved';
        apps[appIdx].updatedAt = new Date().toISOString();
        persistApplications(apps);
        return res.status(200).json({ success: true, application: apps[appIdx] });
      }
      return res.status(404).json({ error: 'Application not found' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE /api/applications -> Super Admin deletes
  if (req.method === 'DELETE') {
    const { id } = req.query || {};
    const deleteId = id || (req.body && req.body.id);
    if (deleteId) {
      const filtered = apps.filter(a => a.id !== deleteId);
      persistApplications(filtered);
      return res.status(200).json({ success: true, count: filtered.length });
    }
    return res.status(400).json({ error: 'Application ID required' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};