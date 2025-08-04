#!/bin/bash

# Android Signing Setup Verification for CryptoMafia
# This script verifies that the Android signing configuration is properly set up

set -e

echo "🔍 CryptoMafia Android Signing Verification"
echo "==========================================="

# Check if we're in the right directory
if [ ! -f "src-tauri/Cargo.toml" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

ISSUES_FOUND=0

echo "📋 Checking Android signing configuration..."

# Check Tauri configuration
echo "🔧 Checking tauri.conf.json..."
if [ -f "src-tauri/tauri.conf.json" ]; then
    if jq -e '.android.releaseSigningConfig' src-tauri/tauri.conf.json > /dev/null 2>&1; then
        echo "   ✅ Android signing configuration found in tauri.conf.json"
        
        # Check specific fields
        KEY_ALIAS=$(jq -r '.android.releaseSigningConfig.keyAlias' src-tauri/tauri.conf.json)
        STORE_FILE=$(jq -r '.android.releaseSigningConfig.storeFile' src-tauri/tauri.conf.json)
        
        echo "   📋 Key alias: $KEY_ALIAS"
        echo "   📋 Store file: $STORE_FILE"
    else
        echo "   ❌ Android signing configuration not found in tauri.conf.json"
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
else
    echo "   ❌ tauri.conf.json not found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# Check keystore generation script
echo "🔧 Checking keystore generation script..."
if [ -f "scripts/generate-keystore.sh" ] && [ -x "scripts/generate-keystore.sh" ]; then
    echo "   ✅ Keystore generation script is present and executable"
else
    echo "   ❌ Keystore generation script is missing or not executable"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# Check development keystore
echo "🔧 Checking development keystore..."
if [ -f ".android/cryptomafia-release.keystore" ]; then
    echo "   ✅ Development keystore exists"
    
    # Test keystore with development password
    if [ -z "$KEYSTORE_PASSWORD" ]; then
        TEST_PASSWORD="cryptomafia123"
    else
        TEST_PASSWORD="$KEYSTORE_PASSWORD"
    fi
    
    if keytool -list -keystore .android/cryptomafia-release.keystore -storepass "$TEST_PASSWORD" > /dev/null 2>&1; then
        echo "   ✅ Keystore is accessible with password"
        
        # Get keystore details
        KEYSTORE_ENTRIES=$(keytool -list -keystore .android/cryptomafia-release.keystore -storepass "$TEST_PASSWORD" | grep -c "PrivateKeyEntry")
        echo "   📋 Keystore contains $KEYSTORE_ENTRIES private key(s)"
    else
        echo "   ❌ Cannot access keystore with provided password"
        echo "   💡 Try: export KEYSTORE_PASSWORD='cryptomafia123'"
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
else
    echo "   ⚠️  Development keystore not found"
    echo "   💡 Run: ./scripts/generate-keystore.sh --development"
fi

# Check GitHub Actions workflow
echo "🔧 Checking GitHub Actions workflow..."
if [ -f ".github/workflows/build-android-app.yml" ]; then
    if grep -q "Setup Android Keystore for Signing" .github/workflows/build-android-app.yml; then
        echo "   ✅ Android signing step found in GitHub Actions workflow"
    else
        echo "   ❌ Android signing step not found in GitHub Actions workflow"
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
    
    if grep -q "Verify APK Signature" .github/workflows/build-android-app.yml; then
        echo "   ✅ APK signature verification step found in workflow"
    else
        echo "   ❌ APK signature verification step not found in workflow"
        ISSUES_FOUND=$((ISSUES_FOUND + 1))
    fi
else
    echo "   ❌ GitHub Actions workflow not found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# Check .gitignore
echo "🔧 Checking .gitignore configuration..."
if grep -q "\.android/" .gitignore && grep -q "\*.keystore" .gitignore; then
    echo "   ✅ Keystore files are properly excluded from version control"
else
    echo "   ❌ Keystore exclusion patterns not found in .gitignore"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# Check documentation
echo "🔧 Checking documentation..."
DOCS_FOUND=0
if [ -f "docs/android-setup.md" ]; then
    if grep -q "signing" docs/android-setup.md; then
        echo "   ✅ Android setup documentation includes signing instructions"
        DOCS_FOUND=$((DOCS_FOUND + 1))
    fi
fi

if [ -f "docs/android-signing.md" ]; then
    echo "   ✅ Dedicated Android signing documentation found"
    DOCS_FOUND=$((DOCS_FOUND + 1))
fi

if [ $DOCS_FOUND -eq 0 ]; then
    echo "   ❌ No signing documentation found"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# Check test script
echo "🔧 Checking APK testing script..."
if [ -f "scripts/test-apk-signing.sh" ] && [ -x "scripts/test-apk-signing.sh" ]; then
    echo "   ✅ APK signature testing script is present and executable"
else
    echo "   ❌ APK signature testing script is missing or not executable"
    ISSUES_FOUND=$((ISSUES_FOUND + 1))
fi

# Summary
echo ""
echo "📊 Verification Summary:"
if [ $ISSUES_FOUND -eq 0 ]; then
    echo "🎉 All Android signing configuration checks passed!"
    echo ""
    echo "✅ Your Android signing setup is complete and ready to use."
    echo ""
    echo "🚀 Next steps:"
    echo "   1. For local development:"
    echo "      export KEYSTORE_PASSWORD='cryptomafia123'"
    echo "      cd src-tauri && tauri android build --apk --target aarch64"
    echo ""
    echo "   2. For production releases:"
    echo "      Configure GitHub Secrets (see docs/android-signing.md)"
    echo ""
    echo "   3. Test APK signing:"
    echo "      ./scripts/test-apk-signing.sh"
    echo ""
    echo "🔒 The generated APKs will be properly signed and installable on Android devices."
else
    echo "❌ Found $ISSUES_FOUND issue(s) with Android signing configuration"
    echo ""
    echo "💡 To fix these issues:"
    echo "   1. Review the errors above"
    echo "   2. Run the Android setup script: ./scripts/android-setup.sh"
    echo "   3. Check the documentation: docs/android-signing.md"
    echo ""
    echo "❌ APK signing may not work correctly until these issues are resolved."
    exit 1
fi