#!/bin/bash

# Test Android APK signing for CryptoMafia
# This script tests if the generated APK is properly signed

set -e

echo "🔍 CryptoMafia APK Signing Test"
echo "==============================="

# Check if we're in the right directory
if [ ! -f "src-tauri/Cargo.toml" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Find APK files
APK_DIR="src-tauri/gen/android/app/build/outputs/apk"
if [ ! -d "$APK_DIR" ]; then
    echo "❌ APK directory not found: $APK_DIR"
    echo "💡 Make sure you've built the Android APK first:"
    echo "   cd src-tauri && tauri android build --apk --target aarch64"
    exit 1
fi

APK_FILES=$(find "$APK_DIR" -name "*.apk" -type f)
if [ -z "$APK_FILES" ]; then
    echo "❌ No APK files found in $APK_DIR"
    echo "💡 Make sure you've built the Android APK first:"
    echo "   cd src-tauri && tauri android build --apk --target aarch64"
    exit 1
fi

echo "📱 Found APK files:"
echo "$APK_FILES"
echo ""

# Test each APK
SIGNED_COUNT=0
UNSIGNED_COUNT=0

for apk in $APK_FILES; do
    echo "🔍 Testing: $(basename "$apk")"
    
    # Check if APK is signed using jarsigner
    if jarsigner -verify "$apk" > /dev/null 2>&1; then
        echo "   ✅ APK is properly signed"
        SIGNED_COUNT=$((SIGNED_COUNT + 1))
        
        # Get signature info
        echo "   📋 Signature details:"
        jarsigner -verify -verbose "$apk" | grep -E "(Alias|Subject|Issuer)" | head -3 | sed 's/^/      /'
    else
        echo "   ❌ APK is not signed or signature is invalid"
        UNSIGNED_COUNT=$((UNSIGNED_COUNT + 1))
    fi
    
    echo ""
done

# Summary
echo "📊 Summary:"
echo "   ✅ Signed APKs: $SIGNED_COUNT"
echo "   ❌ Unsigned APKs: $UNSIGNED_COUNT"

if [ $UNSIGNED_COUNT -eq 0 ]; then
    echo ""
    echo "🎉 All APK files are properly signed!"
    echo "📱 These APKs are ready for installation on Android devices."
    exit 0
else
    echo ""
    echo "❌ Some APK files are not signed!"
    echo "💡 Check your keystore configuration and signing setup."
    exit 1
fi