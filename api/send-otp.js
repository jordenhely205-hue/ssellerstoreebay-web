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
        return res.status(400).json({ success: false, error: 'A valid email address is required.' });
      }

      // Generate authentic 6-digit numeric OTP code
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const TTL_SECONDS = 300; // 5 Minutes TTL
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
      let dispatchProvider = 'sandbox_preview';

      // 1. Attempt Nodemailer SMTP Dispatch if SMTP environment variables are configured
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const nodemailer = require('nodemailer');
          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          });

          const fromAddress = process.env.SMTP_FROM || '"E Seller Store Security" <auth@esellerstorebay.com>';
          await transporter.sendMail({
            from: fromAddress,
            to: email,
            subject: `Your E Seller Store Verification Code: ${otpCode}`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 24px;">
                  <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">
                    <span style="color: #4f46e5;">E Seller </span><span style="color: #10b981;">Store</span>
                  </h1>
                  <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Official Merchant Onboarding &amp; Security Verification</p>
                </div>
                <div style="background: #f8fafc; border-radius: 10px; padding: 24px; border: 1px solid #e2e8f0; text-align: center;">
                  <p style="color: #334155; font-size: 14px; margin: 0 0 16px 0; font-weight: 600;">Your one-time authentication passcode is:</p>
                  <div style="background: #0f172a; color: #ffffff; padding: 16px 24px; font-size: 32px; font-weight: 800; letter-spacing: 8px; border-radius: 8px; display: inline-block; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);">
                    ${otpCode}
                  </div>
                  <p style="font-size: 12px; color: #dc2626; margin: 16px 0 0 0; font-weight: 600;">
                    ⏱️ This code strictly expires in 5 minutes (300 seconds).
                  </p>
                </div>
                <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 24px 0 0 0; line-height: 1.5;">
                  If you did not request this verification passcode, please disregard this email. Your account remains secure.
                </p>
              </div>
            `
          });
          emailDispatched = true;
          dispatchProvider = 'nodemailer_smtp';
        } catch (smtpErr) {
          console.warn('SMTP Dispatch Error:', smtpErr.message);
        }
      }

      // 2. Attempt Resend API Dispatch if RESEND_API_KEY is configured
      if (!emailDispatched && process.env.RESEND_API_KEY) {
        try {
          const { Resend } = require('resend');
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: 'E Seller Store <auth@esellerstorebay.com>',
            to: [email],
            subject: `Your E Seller Store Verification Code: ${otpCode}`,
            html: `
              <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 28px 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <h2 style="color: #0f172a; margin-bottom: 8px; text-align: center;">E Seller Store</h2>
                <p style="font-size: 14px; color: #475569; text-align: center;">Your merchant onboarding verification passcode is:</p>
                <div style="background: #0f172a; color: #ffffff; padding: 16px; font-size: 32px; font-weight: 800; letter-spacing: 8px; text-align: center; border-radius: 8px; margin: 20px 0; font-family: monospace;">
                  ${otpCode}
                </div>
                <p style="font-size: 12px; color: #dc2626; text-align: center; font-weight: 600;">This code expires in 5 minutes (300 seconds).</p>
              </div>
            `
          });
          emailDispatched = true;
          dispatchProvider = 'resend_api';
        } catch (resendErr) {
          console.warn('Resend Dispatch Error:', resendErr.message);
        }
      }

      return res.status(200).json({
        success: true,
        message: `Authentication code dispatched to ${email}`,
        email: email,
        emailDispatched: emailDispatched,
        dispatchProvider: dispatchProvider,
        otpPreview: otpCode, // Provided for instant sandbox testing
        expiresInSeconds: TTL_SECONDS
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};
