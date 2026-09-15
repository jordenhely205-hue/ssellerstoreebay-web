// Vercel Serverless Function: POST /api/verify-otp
const fs = require('fs');
const path = require('path');
const os = require('os');

const TMP_OTP_DB = path.join(os.tmpdir(), 'esellerstore_otp_cache.json');

function getOtpStore() {
  try {
    if (fs.existsSync(TMP_OTP_DB)) {
      const raw = fs.readFileSync(TMP_OTP_DB, 'utf8');
      return JSON.parse(raw) || {};
    }
  } catch (e) {}
  return {};
}

function saveOtpStore(store) {
  try {
    fs.writeFileSync(TMP_OTP_DB, JSON.stringify(store), 'utf8');
  } catch (e) {}
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cache-Control, Pragma');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const email = (body.email || '').trim().toLowerCase();
      const enteredOtp = (body.otp || '').toString().trim();

      if (!email || !enteredOtp) {
        return res.status(400).json({ success: false, error: 'Email and 6-digit OTP code are required.' });
      }

      const store = getOtpStore();
      const record = store[email];

      if (!record) {
        return res.status(400).json({ success: false, error: 'No active OTP found for this email. Please request a new code.' });
      }

      if (Date.now() > record.expiresAt) {
        return res.status(400).json({ success: false, error: 'Verification code has expired. Please request a new code.' });
      }

      if (record.code !== enteredOtp) {
        return res.status(400).json({ success: false, error: 'Invalid verification code. Please check and try again.' });
      }

      // Mark verified
      record.verified = true;
      record.verifiedAt = new Date().toISOString();
      store[email] = record;
      saveOtpStore(store);

      return res.status(200).json({
        success: true,
        verified: true,
        message: 'Email successfully verified.',
        email: email,
        token: 'otp_verified_' + Buffer.from(email + ':' + Date.now()).toString('base64')
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
