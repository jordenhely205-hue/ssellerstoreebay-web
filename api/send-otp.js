// Vercel Serverless Function: POST /api/send-otp
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
      const email = (body.email || '').toString().trim().toLowerCase();

      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'A valid email address is required.' });
      }

      // Generate 6-digit numeric OTP code
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const TTL_SECONDS = 600; // 10 Minutes TTL
      const expiresAt = Date.now() + TTL_SECONDS * 1000;

      const store = getOtpStore();
      store[email] = {
        code: otpCode,
        expiresAt: expiresAt,
        createdAt: new Date().toISOString(),
        verified: false
      };
      saveOtpStore(store);

      let emailDispatched = false;
      let dispatchProvider = 'sandbox_fallback';

      // Attempt Nodemailer Zoho Mail SMTP Dispatch
      try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.zoho.com',
          port: parseInt(process.env.SMTP_PORT || '465', 10),
          secure: true,
          auth: {
            user: process.env.SMTP_USER || 'support@ssellerstorebay.com',
            pass: process.env.SMTP_PASS || 'ZW4Hd5PkhPbE'
          }
        });

        const fromAddress = process.env.SMTP_FROM || '"E Seller Store" <noreply@ssellerstorebay.com>';
        
        await transporter.sendMail({
          from: fromAddress,
          to: email,
          subject: `E Seller Store - Verification Code: ${otpCode}`,
          html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #eee; border-radius: 8px;">
  <h2 style="color: #111;">E Seller Store - Verification Code</h2>
  <p>Your one-time verification code (OTP) is:</p>
  <h1 style="color: #0070f3; letter-spacing: 5px; font-size: 32px; margin: 16px 0;">${otpCode}</h1>
  <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes. Please do not share this code with anyone.</p>
  <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
  <p style="font-size: 12px; color: #999;">© E Seller Store. All rights reserved.</p>
</div>`
        });
        emailDispatched = true;
        dispatchProvider = 'zoho_smtp';
      } catch (smtpErr) {
        console.warn('Zoho SMTP Dispatch Error:', smtpErr.message);
      }

      return res.status(200).json({
        success: true,
        message: 'Verification code sent to your email',
        email: email,
        emailDispatched: emailDispatched,
        dispatchProvider: dispatchProvider,
        otpPreview: otpCode, // For testing & instant verification fallback
        expiresInSeconds: TTL_SECONDS
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
