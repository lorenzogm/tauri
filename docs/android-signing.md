# Android APK Signing Configuration

This document explains how to configure Android APK signing for the CryptoMafia project.

## Overview

Android APKs must be digitally signed to be installable on devices. This project supports both development and production signing configurations.

## Development Signing

For local development, the setup script automatically generates a development keystore:

```bash
./scripts/android-setup.sh
```

This creates:
- Keystore file: `.android/cryptomafia-release.keystore`
- Password: `cryptomafia123` (development default)

## Production Signing

For production releases in GitHub Actions, you need to configure repository secrets.

### Step 1: Generate Production Keystore

Generate a production keystore with a strong password:

```bash
./scripts/generate-keystore.sh
```

This will prompt you for a secure password and generate `.android/cryptomafia-release.keystore`.

### Step 2: Encode Keystore for GitHub Secrets

Convert the keystore to base64 for storage in GitHub Secrets:

```bash
base64 -i .android/cryptomafia-release.keystore -o keystore.base64
```

### Step 3: Configure GitHub Repository Secrets

In your GitHub repository, go to Settings → Secrets and variables → Actions, and add:

1. **ANDROID_KEYSTORE_BASE64**: The content of `keystore.base64` file
2. **ANDROID_KEYSTORE_PASSWORD**: Your keystore password

### Step 4: Clean Up

Remove the temporary base64 file:

```bash
rm keystore.base64
```

## How It Works

### Tauri Configuration

The signing configuration is defined in `src-tauri/tauri.conf.json`:

```json
{
  "android": {
    "releaseSigningConfig": {
      "keyAlias": "release-key",
      "keyPassword": "ENV:KEYSTORE_PASSWORD",
      "storeFile": "/tmp/keystore/cryptomafia-release.keystore",
      "storePassword": "ENV:KEYSTORE_PASSWORD"
    }
  }
}
```

### GitHub Actions Workflow

The build workflow (`build-android-app.yml`) handles signing automatically:

1. **With Secrets**: Uses production keystore from `ANDROID_KEYSTORE_BASE64`
2. **Without Secrets**: Generates temporary development keystore for CI

### Environment Variables

- `KEYSTORE_PASSWORD`: Password for the keystore (from secrets or development default)

## Security Best Practices

1. **Never commit keystores to version control**
2. **Use strong passwords for production keystores**
3. **Keep backup copies of production keystores**
4. **Rotate keystores periodically**
5. **Limit access to GitHub repository secrets**

## Troubleshooting

### APK Installation Fails

If APK installation fails with "invalid" or "not valid" error:

1. Verify APK is signed:
   ```bash
   ./scripts/test-apk-signing.sh
   ```

2. Check if "Install from unknown sources" is enabled on the device

3. Ensure the APK was built with proper signing configuration

### Keystore Issues

If you get keystore-related errors:

1. Verify keystore file exists and is readable
2. Check that `KEYSTORE_PASSWORD` environment variable is set
3. Ensure Java keytool is available in PATH

### GitHub Actions Failures

If signing fails in GitHub Actions:

1. Verify `ANDROID_KEYSTORE_BASE64` secret contains valid base64 data
2. Check that `ANDROID_KEYSTORE_PASSWORD` secret is set correctly
3. Review the "Setup Android Keystore for Signing" step logs

## Testing

To test the complete signing flow:

1. Generate keystore: `./scripts/generate-keystore.sh --development`
2. Set password: `export KEYSTORE_PASSWORD="cryptomafia123"`
3. Build APK: `cd src-tauri && tauri android build --apk --target aarch64`
4. Verify signing: `./scripts/test-apk-signing.sh`

The APK should be properly signed and installable on Android devices.