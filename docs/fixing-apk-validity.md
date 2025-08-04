# Fixing "Package Not Valid" APK Error

This document addresses the specific issue where Android APK files are reported as "not valid" during installation.

## Problem Description

When building Android APKs with Tauri, you may encounter the error:
- **Spanish**: "sigue diciendo que el paquete no es valido"
- **English**: "keeps saying the package is not valid"

## Root Causes

The "package not valid" error typically occurs due to:

1. **APK not digitally signed** - Android requires all APKs to be signed
2. **Missing Android configuration** - Tauri needs proper Android platform setup
3. **Incorrect signing configuration** - Environment variables not set properly
4. **Corrupted APK file** - Build process failed but produced incomplete file

## Official Tauri Documentation References

According to the [official Tauri documentation](https://v2.tauri.app/start/android/):

### 1. Android Platform Setup

First, ensure your `tauri.conf.json` has Android platform configuration:

```json
{
  "productName": "CryptoMafia",
  "version": "0.1.0",
  "identifier": "com.cryptomafia.app",
  "build": {
    "frontendDist": "../frontend/dist",
    "beforeDevCommand": "cd ../frontend && npm run dev",
    "beforeBuildCommand": "",
    "devUrl": "http://localhost:5173"
  },
  "app": {
    "windows": [...],
    "security": {...}
  },
  "bundle": {...},
  "plugins": {}
}
```

### 2. Android Signing Configuration

For **signed APKs** (required for installation), you need to set up signing configuration.

#### Step 1: Generate Keystore

```bash
# For development
./scripts/generate-keystore.sh --development

# For production (prompts for secure password)
./scripts/generate-keystore.sh
```

#### Step 2: Set Environment Variables

```bash
export TAURI_ANDROID_KEYSTORE_PATH=".android/cryptomafia-release.keystore"
export TAURI_ANDROID_KEYSTORE_PASSWORD="cryptomafia123"  # Dev password
export TAURI_ANDROID_KEY_PASSWORD="cryptomafia123"       # Dev password
```

#### Step 3: Initialize Android Project

```bash
cd src-tauri
tauri android init --skip-targets-install
```

This creates the Android project structure in `src-tauri/gen/android/`.

#### Step 4: Build Signed APK

```bash
cd src-tauri
tauri android build --apk --target aarch64
```

### 3. Android Configuration Integration

After running `tauri android init`, Tauri will automatically manage the Android configuration. The signing configuration is handled through environment variables during the build process.

## Verification Steps

### 1. Verify APK Signature

```bash
# Check if APK is signed
./scripts/test-apk-signing.sh

# Or manually verify
jarsigner -verify path/to/your.apk
```

### 2. Check APK Installation

```bash
# Install on connected device
adb install path/to/your.apk

# Check installation logs
adb logcat | grep PackageManager
```

## Troubleshooting Guide

### Error: "Package not valid"

**Symptoms**: APK installation fails on Android device
**Cause**: APK is not properly signed
**Solution**: Ensure signing environment variables are set and rebuild

```bash
# Verify signing setup
./scripts/verify-android-signing.sh

# Rebuild with signing
export TAURI_ANDROID_KEYSTORE_PATH=".android/cryptomafia-release.keystore"
export TAURI_ANDROID_KEYSTORE_PASSWORD="cryptomafia123"
export TAURI_ANDROID_KEY_PASSWORD="cryptomafia123"
cd src-tauri && tauri android build --apk --target aarch64
```

### Error: "Unknown sources disabled"

**Symptoms**: Installation blocked by Android
**Cause**: Security setting prevents non-Play Store installations
**Solution**: Enable "Install from unknown sources" in Android settings

1. Go to **Settings** > **Security** (or **Privacy**)
2. Enable **"Install from unknown sources"** or **"Allow from this source"**
3. Try installing the APK again

### Error: "Android Studio project directory doesn't exist"

**Symptoms**: `tauri android build` fails
**Cause**: Android project not initialized
**Solution**: Run `tauri android init` first

```bash
cd src-tauri
tauri android init --skip-targets-install
tauri android build --apk --target aarch64
```

## Simulating APK Installation

To test APK installation without a physical device:

### 1. Android Emulator

```bash
# Install Android Studio and create an AVD (Android Virtual Device)
# Start the emulator
emulator -avd YourAVDName

# Install APK on emulator
adb install path/to/your.apk
```

### 2. APK Analyzer

```bash
# Use Android Studio's APK Analyzer to inspect the APK
# File > Profile or Debug APK > Select your APK file

# Or use command line tools
aapt dump badging path/to/your.apk
aapt list path/to/your.apk
```

### 3. Signature Verification

```bash
# Verify APK signature
jarsigner -verify -verbose -certs path/to/your.apk

# Check APK information
apksigner verify --verbose path/to/your.apk
```

## Automated Build Process

This project includes automated APK building with GitHub Actions:

1. **Tag-based builds**: Push a version tag to trigger APK build
2. **Manual builds**: Use "workflow_dispatch" in GitHub Actions
3. **Signed APKs**: Automatically signed and ready for installation

See `.github/workflows/build-android-app.yml` for the complete build process.

## Quick Fix Checklist

To resolve "package not valid" errors:

- [ ] ✅ **Signing keystore exists**: `.android/cryptomafia-release.keystore`
- [ ] ✅ **Environment variables set**: `TAURI_ANDROID_*` variables
- [ ] ✅ **Android project initialized**: `src-tauri/gen/android/` exists
- [ ] ✅ **APK is signed**: Verified with `jarsigner -verify`
- [ ] ✅ **"Unknown sources" enabled**: Android device setting
- [ ] ✅ **APK not corrupted**: File size > 0 and proper extension

## Security Considerations

- **Never commit keystore files** to version control
- **Use strong passwords** for production keystores
- **Keep backup copies** of production keystores
- **Test on multiple devices** before production release

## References

- [Tauri Android Guide](https://v2.tauri.app/start/android/)
- [Android App Signing](https://developer.android.com/studio/publish/app-signing)
- [APK Installation Troubleshooting](https://developer.android.com/guide/app-bundle/troubleshoot)

---

**Note**: This solution ensures that generated APKs are properly signed and installable on Android devices, resolving the "package not valid" error.