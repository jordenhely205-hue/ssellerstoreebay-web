// Vercel Serverless Function: POST /api/auth/register-vendor
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const TMP_APPS_DB = path.join(os.tmpdir(), 'esellerstore_applications_db.json');
const TMP_TOKENS_DB = path.join(os.tmpdir(), 'esellerstore_activation_tokens.json');

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const email = (payload.email || '').trim().toLowerCase();
      const role = (payload.role || 'vendor').trim().toLowerCase();

      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'A valid email address is required.' });
      }

      const isVendor = role === 'vendor';

      let referralCode = (payload.referralCode || '').trim();
      let firstName = (payload.firstName || '').trim();
      let lastName = (payload.lastName || '').trim();
      let shopName = (payload.shopName || payload.storeName || '').trim();
      let slug = (payload.slug || '').trim();
      let country = (payload.country || 'United States').trim();
      let phone = (payload.phone || payload.mobile || '').trim();
      let transactionPassword = payload.transactionPassword || '';
      let confirmTransactionPassword = payload.confirmTransactionPassword || '';

      if (isVendor) {
        if (!firstName || !lastName) {
          return res.status(400).json({ success: false, error: 'First name and last name are required for vendor registration.' });
        }
        if (!shopName) {
          return res.status(400).json({ success: false, error: 'Shop name is required.' });
        }
        if (!slug) {
          slug = shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        // Strict Referral Code Validation (00546)
        if (referralCode !== '00546') {
          return res.status(400).json({
            success: false,
            error: 'Invalid referral code. Please enter the valid 5-digit vendor referral code (00546).'
          });
        }
        if (!phone) {
          return res.status(400).json({ success: false, error: 'Phone number is required.' });
        }
        if (transactionPassword && confirmTransactionPassword && transactionPassword !== confirmTransactionPassword) {
          return res.status(400).json({ success: false, error: 'Transaction passwords do not match.' });
        }
      }

      // Generate 24-hour Activation Token
      const tokenBytes = crypto.randomBytes(24).toString('hex');
      const activationToken = `act_${Date.now()}_${tokenBytes}`;
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 Hours

      const tokens = getTokens();
      tokens[activationToken] = {
        email,
        role,
        shopName: shopName || `${firstName} Store`,
        expiresAt,
        createdAt: new Date().toISOString()
      };
      persistTokens(tokens);

      const ownerName = firstName && lastName ? `${firstName} ${lastName}` : (payload.ownerName || email.split('@')[0]);
      const appRecord = {
        id: 'app_' + Date.now(),
        role: role,
        email: email,
        ownerName: ownerName,
        firstName: firstName,
        lastName: lastName,
        storeName: shopName || `${ownerName} Store`,
        slug: slug || shopName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        referralCode: referralCode || '00546',
        country: country,
        phone: phone,
        mobile: phone,
        transactionPassword: transactionPassword,
        status: 'pending',
        verificationStatus: 'activation_sent',
        activationToken: activationToken,
        createdAt: new Date().toISOString()
      };

      const apps = getApplications();
      const existingIdx = apps.findIndex(a => a.email && a.email.toLowerCase() === email);
      if (existingIdx >= 0) {
        apps[existingIdx] = { ...apps[existingIdx], ...appRecord };
      } else {
        apps.unshift(appRecord);
      }
      persistApplications(apps);

      const baseUrl = req.headers['origin'] || (req.headers['host'] ? `https://${req.headers['host']}` : 'https://ssellerstorebay.com');
      const activationLink = `${baseUrl}/my-account/set-password?token=${activationToken}&email=${encodeURIComponent(email)}`;

      return res.status(200).json({
        success: true,
        message: 'Account registration created successfully. Activation link has been generated and dispatched.',
        role: role,
        email: email,
        storeName: shopName || ownerName,
        activationToken: activationToken,
        activationLink: activationLink,
        activationLinkPreview: activationLink
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
