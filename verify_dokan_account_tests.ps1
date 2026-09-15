Write-Host "=== RUNNING DOKAN MY ACCOUNT & ACTIVATION VERIFICATION SUITE ===" -ForegroundColor Cyan

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

Write-Host "`n1. Checking index.html DOM Elements & Navigation..." -ForegroundColor Yellow
Assert-Condition ($html.Contains('id="myAccountView"')) "index.html contains #myAccountView container"
Assert-Condition ($html.Contains('id="accountLoginFormSection"')) "index.html contains #accountLoginFormSection"
Assert-Condition ($html.Contains('id="accountRegisterFormSection"')) "index.html contains #accountRegisterFormSection"
Assert-Condition ($html.Contains('id="accountVendorFieldsContainer"')) "index.html contains #accountVendorFieldsContainer"
Assert-Condition ($html.Contains('id="accountRegReferralCode"')) "index.html contains #accountRegReferralCode"
Assert-Condition ($html.Contains('id="accountRegShopSlug"')) "index.html contains #accountRegShopSlug"
Assert-Condition ($html.Contains('id="setPasswordModalOverlay"')) "index.html contains #setPasswordModalOverlay"
Assert-Condition ($html.Contains('Become A Vendor')) "index.html contains 'Become A Vendor' top link"
Assert-Condition ($html.Contains('My Account')) "index.html contains 'My Account' top link"
Assert-Condition ($html.Contains('styles.css?v=4.2')) "index.html references styles.css?v=4.2"
Assert-Condition ($html.Contains('app-bundle.js?v=4.2')) "index.html references app-bundle.js?v=4.2"

Write-Host "`n2. Checking styles.css..." -ForegroundColor Yellow
Assert-Condition ($css.Contains('#myAccountView')) "styles.css contains #myAccountView"
Assert-Condition ($css.Contains('.dokan-breadcrumb-banner')) "styles.css contains .dokan-breadcrumb-banner"
Assert-Condition ($css.Contains('.dokan-split-auth-container')) "styles.css contains .dokan-split-auth-container"
Assert-Condition ($css.Contains('.dokan-auth-grid')) "styles.css contains .dokan-auth-grid"
Assert-Condition ($css.Contains('.btn-dokan-switch')) "styles.css contains .btn-dokan-switch"
Assert-Condition ($css.Contains('.btn-dokan-auth-submit')) "styles.css contains .btn-dokan-auth-submit"

Write-Host "`n3. Checking dokan-engine.js & Versioning..." -ForegroundColor Yellow
Assert-Condition ($engine.Contains('v4.2_dokan_my_account_activation')) "dokan-engine.js version is v4.2_dokan_my_account_activation"
Assert-Condition ($engine.Contains('registerVendorWithActivationLink')) "dokan-engine.js has registerVendorWithActivationLink"
Assert-Condition ($engine.Contains('setPasswordWithToken')) "dokan-engine.js has setPasswordWithToken"

Write-Host "`n4. Checking app.js & app-bundle.js..." -ForegroundColor Yellow
Assert-Condition ($app.Contains('openMyAccount')) "app.js has openMyAccount"
Assert-Condition ($app.Contains('switchAccountMode')) "app.js has switchAccountMode"
Assert-Condition ($app.Contains('switchAccountRegisterRole')) "app.js has switchAccountRegisterRole"
Assert-Condition ($app.Contains('handleAccountLogin')) "app.js has handleAccountLogin"
Assert-Condition ($app.Contains('handleAccountRegister')) "app.js has handleAccountRegister"
Assert-Condition ($app.Contains('handleSetPasswordSubmit')) "app.js has handleSetPasswordSubmit"

Assert-Condition ($bundle.Contains('v4.2_dokan_my_account_activation')) "app-bundle.js version is v4.2_dokan_my_account_activation"
Assert-Condition ($bundle.Contains('openMyAccount')) "app-bundle.js has openMyAccount"
Assert-Condition ($bundle.Contains('switchAccountMode')) "app-bundle.js has switchAccountMode"
Assert-Condition ($bundle.Contains('switchAccountRegisterRole')) "app-bundle.js has switchAccountRegisterRole"
Assert-Condition ($bundle.Contains('handleAccountLogin')) "app-bundle.js has handleAccountLogin"
Assert-Condition ($bundle.Contains('handleAccountRegister')) "app-bundle.js has handleAccountRegister"

Write-Host "`n5. Checking API Endpoints..." -ForegroundColor Yellow
Assert-Condition (Test-Path "api\auth\register-vendor.js") "api/auth/register-vendor.js exists"
Assert-Condition (Test-Path "api\auth\set-password.js") "api/auth/set-password.js exists"

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Total Passed: $passed" -ForegroundColor Green
Write-Host "Total Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })

if ($failed -eq 0) {
    Write-Host "`nALL TESTS PASSED SUCCESSFULLY!" -ForegroundColor Green
} else {
    exit 1
}
