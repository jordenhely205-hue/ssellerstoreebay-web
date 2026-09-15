// Vercel Serverless Function: POST /api/auth/set-password
const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_APPS_DB = path.join(os.tmpdir(), 'esellerstore_applications_db.json');
const TMP_TOKENS_DB = path.join(os.tmpdir(), 'esellerstore_activation_tokens.json');
const TMP_VENDORS_DB = path.join(os.tmpdir(), 'esellerstore_vendors_db.json');

function getApplications() {
  try {
    if (fs.existsSync(TMP_APPS_DB)) {
      const raw = fs.readFileSync(TMP_APPS_DB, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function persistApplications(apps) {
  try {
    fs.writeFileSync(TMP_APPS_DB, JSON.stringify(apps), 'utf8');
  } catch (e) {}
}

function getTokens() {
  try {
    if (fs.existsSync(TMP_TOKENS_DB)) {
      const raw = fs.readFileSync(TMP_TOKENS_DB, 'utf8');
      return JSON.parse(raw) || {};
    }
  } catch (e) {}
  return {};
}

function persistTokens(tokens) {
  try {
    fs.writeFileSync(TMP_TOKENS_DB, JSON.stringify(tokens), 'utf8');
  } catch (e) {}
}

function getVendors() {
  try {
    if (fs.existsSync(TMP_VENDORS_DB)) {
      const raw = fs.readFileSync(TMP_VENDORS_DB, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function persistVendors(vendors) {
  try {
    fs.writeFileSync(TMP_VENDORS_DB, JSON.stringify(vendors), 'utf8');
  } catch (e) {}
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const email = (payload.email || '').trim().toLowerCase();
      const token = (payload.token || '').trim();
      const password = (payload.password || '').trim();
      const confirmPassword = (payload.confirmPassword || '').trim();

      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Valid email address is required.' });
      }

      if (!token) {
        return res.status(400).json({ success: false, error: 'Activation token is required.' });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ success: false, error: 'Passwords do not match.' });
      }

      const tokens = getTokens();
      const tokenRecord = tokens[token];

      if (tokenRecord) {
        if (Date.now() > tokenRecord.expiresAt) {
          return res.status(400).json({ success: false, error: 'Activation token has expired. Please register again.' });
        }
        if (tokenRecord.email && tokenRecord.email.toLowerCase() !== email) {
          return res.status(400).json({ success: false, error: 'Token does not match the provided email address.' });
        }
      }

      // Update in applications DB
      const apps = getApplications();
      const appIdx = apps.findIndex(a => a.email && a.email.toLowerCase() === email);
      let storeName = 'My Store';
      let ownerName = 'Merchant';

      if (appIdx >= 0) {
        apps[appIdx].password = password;
        apps[appIdx].verificationStatus = 'activated';
        apps[appIdx].status = 'pending';
        apps[appIdx].activatedAt = new Date().toISOString();
        storeName = apps[appIdx].storeName || storeName;
        ownerName = apps[appIdx].ownerName || ownerName;
        persistApplications(apps);
      }

      // Update in vendors DB
      const vendors = getVendors();
      const vendorIdx = vendors.findIndex(v => v.email && v.email.toLowerCase() === email);
      if (vendorIdx >= 0) {
        vendors[vendorIdx].password = password;
        vendors[vendorIdx].verificationStatus = 'activated';
        persistVendors(vendors);
      }

      // Mark token as used
      if (tokenRecord) {
        tokenRecord.used = true;
        tokenRecord.usedAt = new Date().toISOString();
        tokens[token] = tokenRecord;
        persistTokens(tokens);
      }

      return res.status(200).json({
        success: true,
        message: 'Your permanent store password has been configured and your account is active. You can now log in to the Seller Portal.',
        email: email,
        storeName: storeName,
        ownerName: ownerName
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
