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
      const email = (body.email || '').trim().toLowerCase();

      if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Valid email address is required.' });
      }

      // Generate 6-digit numeric OTP code
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      const store = getOtpStore();
      store[email] = {
        code: otpCode,
        expiresAt: expiresAt,
        createdAt: new Date().toISOString(),
        verified: false
      };
      saveOtpStore(store);

      // Attempt email delivery if configured, otherwise fallback to local/preview
      let emailDispatched = false;
      try {
        if (process.env.RESEND_API_KEY) {
          const { Resend } = require('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: 'E Seller Store <onboarding@esellerstorebay.com>',
            to: [email],
            subject: `Your E Seller Store Verification Code: ${otpCode}`,
            html: `
              <div style="font-family:sans-serif; max-width:500px; margin:auto; padding:24px; border:1px solid #e2e8f0; border-radius:10px;">
                <h2 style="color:#0f172a; margin-bottom:8px;">E Seller Store</h2>
                <p style="font-size:14px; color:#475569;">Your merchant onboarding verification code is:</p>
                <div style="background:#f1f5f9; padding:16px; font-size:28px; font-weight:800; letter-spacing:6px; text-align:center; color:#1a73e8; border-radius:8px; margin:16px 0;">
                  ${otpCode}
                </div>
                <p style="font-size:12px; color:#64748b;">This code expires in 10 minutes. If you did not request this, please ignore this email.</p>
              </div>
            `
          });
          emailDispatched = true;
        }
      } catch (err) {
        console.warn('Email delivery notice (local/sandbox mode active):', err.message);
      }

      return res.status(200).json({
        success: true,
        message: `Verification code sent to ${email}`,
        emailDispatched: emailDispatched,
        otpPreview: otpCode, // For demo/sandbox instant testing
        expiresInSeconds: 600
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
