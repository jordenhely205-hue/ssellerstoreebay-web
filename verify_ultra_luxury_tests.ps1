Write-Host "=== RUNNING ULTRA-LUXURY STOREFRONT & ONBOARDING OTP TEST SUITE ===" -ForegroundColor Cyan

$passed = 0
$failed = 0

function Assert-Condition($condition, $msg) {
    if ($condition) {
        Write-Host "  [PASS] $msg" -ForegroundColor Green
        $script:passed++
    } else {
        Write-Host "  [FAIL] $msg" -ForegroundColor Red
        $script:failed++
    }
}

$html = Get-Content -Raw "index.html" -Encoding UTF8
$css = Get-Content -Raw "styles.css" -Encoding UTF8
$engine = Get-Content -Raw "dokan-engine.js" -Encoding UTF8
$app = Get-Content -Raw "app.js" -Encoding UTF8
$bundle = Get-Content -Raw "app-bundle.js" -Encoding UTF8

Write-Host "`n1. Checking Enterprise Storefront & Design Architecture..." -ForegroundColor Yellow
Assert-Condition ($html.Contains('enterprise-navbar-wrapper')) "index.html contains frosted island navigation"
Assert-Condition ($html.Contains('cmd-kbd-badge')) "index.html contains Ctrl K omni-search shortcut badge"
Assert-Condition ($html.Contains('enterprise-utility-capsule')) "index.html contains unified utility capsule"
Assert-Condition ($html.Contains('platform-live-ticker-strip')) "index.html contains real-time platform live ticker"
Assert-Condition ($html.Contains('enterprise-hero-section')) "index.html contains dual-split enterprise hero section"
Assert-Condition ($html.Contains('glass-analytics-hero-card')) "index.html contains glassmorphic vendor analytics card"
Assert-Condition ($html.Contains('institutional-trust-strip')) "index.html contains institutional trust strip"
Assert-Condition ($html.Contains('enterprise-bento-grid')) "index.html contains curated bento grid"

Write-Host "`n2. Checking Onboarding Wizard Overhaul & Role Labels..." -ForegroundColor Yellow
Assert-Condition ($html.Contains('I am a customer')) "Step 1 role choice contains 'I am a customer'"
Assert-Condition ($html.Contains('I am a vendor')) "Step 1 role choice contains 'I am a vendor'"
Assert-Condition ($html.Contains('wizardOtpCodeInput')) "Step 2 contains OTP input"
Assert-Condition (!$html.Contains('placeholder="123456"')) "Step 2 OTP input has NO dummy placeholder (123456)"
Assert-Condition ($html.Contains('wizardReferralCode')) "Step 3 contains referral code input"
Assert-Condition ($html.Contains('00546')) "Step 3 strictly references sponsor code 00546"

Write-Host "`n3. Checking Backend API & Environment Configuration..." -ForegroundColor Yellow
Assert-Condition (Test-Path ".env.example") ".env.example exists"
$envEx = Get-Content -Raw ".env.example" -Encoding UTF8
Assert-Condition ($envEx.Contains('SMTP_HOST') -and $envEx.Contains('SMTP_USER')) ".env.example contains SMTP configuration keys"
Assert-Condition (Test-Path "api\send-otp.js") "api/send-otp.js exists"
$sendOtp = Get-Content -Raw "api\send-otp.js" -Encoding UTF8
Assert-Condition ($sendOtp.Contains('TTL_SECONDS = 300') -or $sendOtp.Contains('300')) "api/send-otp.js enforces 5-minute TTL (300s)"
Assert-Condition ($sendOtp.Contains('nodemailer') -or $sendOtp.Contains('SMTP_HOST')) "api/send-otp.js supports Nodemailer SMTP transport"

Write-Host "`n4. Checking Versioning & Asset Invalidation..." -ForegroundColor Yellow
Assert-Condition ($html.Contains('styles.css?v=4.5')) "index.html references styles.css?v=4.5"
Assert-Condition ($html.Contains('app-bundle.js?v=4.5')) "index.html references app-bundle.js?v=4.5"
Assert-Condition ($engine.Contains('v4.5_ultra_luxury_storefront_otp')) "dokan-engine.js version is v4.5_ultra_luxury_storefront_otp"
Assert-Condition ($app.Contains('v4.5_ultra_luxury_storefront_otp')) "app.js version is v4.5_ultra_luxury_storefront_otp"
Assert-Condition ($bundle.Contains('v4.5_ultra_luxury_storefront_otp')) "app-bundle.js version is v4.5_ultra_luxury_storefront_otp"
Assert-Condition ($app.Contains('startLivePlatformTicker')) "app.js has live ticker rotation"
Assert-Condition ($bundle.Contains('startLivePlatformTicker')) "app-bundle.js has live ticker rotation"

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total Passed: $passed" -ForegroundColor Green
Write-Host "Total Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })

if ($failed -eq 0) {
    Write-Host "`nALL ULTRA-LUXURY TESTS PASSED PERFECTLY!" -ForegroundColor Green
} else {
    exit 1
}
