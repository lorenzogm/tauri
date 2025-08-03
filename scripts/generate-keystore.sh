#!/bin/bash

# Generate Android Keystore for CryptoMafia
# This script creates a keystore for signing Android APKs

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
KEYSTORE_DIR="$PROJECT_ROOT/.android"
KEYSTORE_FILE="$KEYSTORE_DIR/cryptomafia-release.keystore"

echo "🔐 Android Keystore Generator for CryptoMafia"
echo "=============================================="

# Create keystore directory
mkdir -p "$KEYSTORE_DIR"

# Check if keystore already exists
if [ -f "$KEYSTORE_FILE" ]; then
    echo "⚠️  Keystore already exists at: $KEYSTORE_FILE"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Aborted. Keeping existing keystore."
        exit 0
    fi
    rm -f "$KEYSTORE_FILE"
fi

# Get keystore password (use default for development)
if [ -z "$KEYSTORE_PASSWORD" ]; then
    if [ "$1" = "--development" ]; then
        KEYSTORE_PASSWORD="cryptomafia123"
        echo "🔧 Using development password for local builds"
    else
        read -s -p "Enter keystore password: " KEYSTORE_PASSWORD
        echo
        read -s -p "Confirm keystore password: " KEYSTORE_PASSWORD_CONFIRM
        echo
        
        if [ "$KEYSTORE_PASSWORD" != "$KEYSTORE_PASSWORD_CONFIRM" ]; then
            echo "❌ Passwords don't match"
            exit 1
        fi
    fi
fi

echo "🛠️  Generating keystore..."

# Generate the keystore
keytool -genkeypair \
    -alias release-key \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -keystore "$KEYSTORE_FILE" \
    -storepass "$KEYSTORE_PASSWORD" \
    -keypass "$KEYSTORE_PASSWORD" \
    -dname "CN=CryptoMafia, OU=Development, O=CryptoMafia Project, L=Unknown, ST=Unknown, C=Unknown"

if [ $? -eq 0 ]; then
    echo "✅ Keystore generated successfully at: $KEYSTORE_FILE"
    echo ""
    echo "📋 Keystore Details:"
    echo "   File: $KEYSTORE_FILE"
    echo "   Alias: release-key"
    echo "   Algorithm: RSA 2048-bit"
    echo "   Validity: 10000 days"
    echo ""
    echo "🔒 Security Information:"
    echo "   - Keep this keystore file secure and backed up"
    echo "   - Never commit the keystore to version control"
    echo "   - For production builds, use a strong password"
    echo ""
    echo "🚀 Usage:"
    echo "   Export KEYSTORE_PASSWORD='$KEYSTORE_PASSWORD'"
    echo "   cd src-tauri && tauri android build --apk --target aarch64"
else
    echo "❌ Failed to generate keystore"
    exit 1
fi