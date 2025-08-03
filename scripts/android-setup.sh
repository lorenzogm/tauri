#!/bin/bash

# Android Setup Script for CryptoMafia
# This script helps set up the Android development environment

set -e

echo "🚀 CryptoMafia Android Setup"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "src-tauri/Cargo.toml" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Check for required tools
echo "📋 Checking prerequisites..."

# Check Java
if ! command -v java &> /dev/null; then
    echo "❌ Java not found. Please install Java 17:"
    echo "   Ubuntu/Debian: sudo apt-get install openjdk-17-jdk"
    echo "   macOS: brew install openjdk@17"
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" != "17" ]; then
    echo "⚠️  Java version $JAVA_VERSION found, but Java 17 is recommended"
fi

# Check Rust
if ! command -v rustc &> /dev/null; then
    echo "❌ Rust not found. Please install Rust: https://rustup.rs/"
    exit 1
fi

# Check Android target
if ! rustup target list --installed | grep -q "aarch64-linux-android"; then
    echo "📦 Installing Android Rust target..."
    rustup target add aarch64-linux-android
else
    echo "✅ Android Rust target installed"
fi

# Check Tauri CLI
if ! command -v tauri &> /dev/null; then
    echo "📦 Installing Tauri CLI..."
    npm install -g @tauri-apps/cli
else
    echo "✅ Tauri CLI found"
fi

# Check for NDK_HOME
if [ -z "$NDK_HOME" ]; then
    echo "⚠️  NDK_HOME environment variable not set"
    echo "🔧 Please set up Android SDK and NDK. See docs/android-setup.md for details"
    echo ""
    echo "Quick setup options:"
    echo "1. Install Android Studio and set up SDK/NDK through the GUI"
    echo "2. Use command line tools (see docs/android-setup.md)"
    echo ""
    echo "After setting up Android SDK/NDK, run:"
    echo "   export NDK_HOME=/path/to/android/ndk/26.1.10909125"
    echo "   ./scripts/android-setup.sh"
    exit 1
else
    echo "✅ NDK_HOME is set: $NDK_HOME"
    if [ ! -d "$NDK_HOME" ]; then
        echo "❌ NDK_HOME points to non-existent directory: $NDK_HOME"
        exit 1
    fi
fi

# Build frontend
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Initialize Android project
echo "🤖 Initializing Android project..."
cd src-tauri
if tauri android init --skip-targets-install; then
    echo "✅ Android project initialized successfully"
else
    echo "❌ Android initialization failed"
    exit 1
fi

# Verify the structure was created
if [ -d "gen/android" ]; then
    echo "✅ Android project structure created"
    echo "📂 Project files:"
    find gen/android -type f -name "*.xml" -o -name "*.java" -o -name "*.gradle" | head -5
    echo "   ... and more"
else
    echo "❌ Android project structure not created"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To build the Android APK:"
echo "   cd src-tauri && tauri android build --apk --target aarch64"
echo ""
echo "The APK will be generated in: src-tauri/gen/android/app/build/outputs/apk/"