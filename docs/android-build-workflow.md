# Android APK Build Workflow

This document describes the automated Android APK build workflow for CryptoMafia.

## Triggers

The workflow runs automatically on:
- **Every commit to the `main` branch** - Generates development APKs
- **Every tag push matching `v*`** - Generates release APKs
- **Manual trigger** - Can be run manually from GitHub Actions

## Version Management

### Development Builds (main branch)
- Version format: `0.1.0-dev.{SHORT_SHA}.{BUILD_NUMBER}`
- Example: `0.1.0-dev.b2f2888.42`
- APK artifact name: `cryptomafia-android-apk-dev-{SHORT_SHA}-{BUILD_NUMBER}`
- No GitHub release created

### Release Builds (tags)
- Version format: Uses the tag name (without 'v' prefix)
- Example tag `v1.2.3` → version `1.2.3`
- APK artifact name: `cryptomafia-android-apk`
- GitHub release created automatically

## Build Process

1. **Version Generation**: Determines version based on trigger type
2. **Config Update**: Updates `src-tauri/tauri.conf.json` and `src-tauri/Cargo.toml` with dynamic version
3. **Environment Setup**: Node.js, Java 17, Android SDK, Rust with Android target
4. **Dependencies**: Frontend npm packages and Tauri CLI
5. **Build**: Frontend build followed by Android APK build
6. **Artifacts**: Upload APK files to GitHub Actions artifacts
7. **Release** (tags only): Create GitHub release with APK attachment

## Generated Files

APK files are generated in: `src-tauri/gen/android/app/build/outputs/apk/`

The workflow supports both debug and release APK variants depending on Tauri configuration.