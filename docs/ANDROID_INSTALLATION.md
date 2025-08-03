# Android Installation Guide

This guide helps you install CryptoMafia on your Android device.

## 📱 Download the APK

1. Go to the [Releases page](https://github.com/lorenzogm/tauri/releases)
2. Download the latest release
3. Choose the correct APK for your device:
   - **arm64-v8a**: For modern 64-bit ARM devices (most phones from 2017+)
   - **armeabi-v7a**: For older 32-bit ARM devices (phones from 2011-2017)

### How to Check Your Device Architecture

**Method 1: CPU-Z App**
1. Install CPU-Z from Google Play Store
2. Look at the "SOC" tab for architecture info

**Method 2: Device Info Apps**
- Most modern devices (2017+) use arm64-v8a
- Older devices typically use armeabi-v7a

**Method 3: Common Device Architecture**
- **arm64-v8a**: Samsung Galaxy S7+, iPhone equivalent Android phones, most modern devices
- **armeabi-v7a**: Older Samsung devices, budget phones, devices from 2011-2016

## 🔧 Installation Steps

### Step 1: Enable Unknown Sources

**Android 8.0+ (API 26+):**
1. Go to `Settings` → `Apps` → `Special access` → `Install Unknown Apps`
2. Select your browser or file manager
3. Enable `Allow from this source`

**Android 7.x and below:**
1. Go to `Settings` → `Security`
2. Enable `Unknown sources`
3. Confirm when prompted

### Step 2: Install the APK

1. Download the appropriate APK file to your device
2. Open your file manager or downloads folder
3. Tap on the downloaded APK file
4. Tap `Install` when prompted
5. Wait for installation to complete
6. Tap `Open` to launch the app

## 📋 System Requirements

- **Android Version**: 7.0 (API level 24) or higher
- **Architecture**: ARM-based device (arm64-v8a or armeabi-v7a)
- **Storage**: At least 50MB free space
- **RAM**: 2GB recommended
- **Internet**: Required for full functionality

## 🚨 Troubleshooting

### "App not installed" Error
- **Cause**: Unknown sources not enabled
- **Solution**: Follow Step 1 above to enable unknown sources

### "There was a problem parsing the package" Error
- **Cause**: Wrong architecture APK or corrupted download
- **Solution**: 
  1. Download the correct architecture APK for your device
  2. Re-download if the file might be corrupted
  3. Clear browser cache and try again

### "Installation blocked" Error
- **Cause**: Security settings blocking installation
- **Solution**: 
  1. Check antivirus settings
  2. Temporarily disable Google Play Protect
  3. Use a different browser to download

### App Crashes on Launch
- **Cause**: Device doesn't meet minimum requirements
- **Solution**: 
  1. Ensure Android 7.0 or higher
  2. Close other apps to free memory
  3. Restart your device and try again

### "Insufficient storage" Error
- **Cause**: Not enough free space
- **Solution**: 
  1. Delete unnecessary files/apps
  2. Clear app caches
  3. Move photos/videos to external storage

## 🔐 Security Information

### Debug vs Release APKs

**Debug APK:**
- Used for testing and development
- Larger file size
- Less optimized
- Requires "Unknown Sources" enabled

**Release APK:**
- Optimized for production use
- Smaller file size
- Better performance
- Still requires "Unknown Sources" for sideloading

### Why "Unknown Sources" is Required

CryptoMafia is distributed directly from GitHub rather than Google Play Store, so Android treats it as an "unknown source." This is normal for open-source apps distributed outside app stores.

## 📱 Supported Devices

### Confirmed Working
- Samsung Galaxy S8+ (arm64-v8a)
- Google Pixel 2+ (arm64-v8a)
- OnePlus 5+ (arm64-v8a)
- Most devices from 2017+ (arm64-v8a)

### Limited Support
- Devices with x86/x86_64 architecture (Intel-based Android devices) - not currently supported
- Very old devices with armv6 - not supported

## 🆘 Need Help?

1. **Check the troubleshooting section above**
2. **Create an issue** on the [GitHub Issues page](https://github.com/lorenzogm/tauri/issues)
3. **Include this information** in your issue:
   - Device model and Android version
   - APK architecture you tried
   - Exact error message
   - Steps you've already tried

## 🎮 First Launch

After successful installation:

1. **Grant permissions** when prompted (storage, internet)
2. **Wait for initial setup** - first launch may take longer
3. **Enjoy the game!** - You're now ready to navigate the crypto-mafia world

---

**Note**: This app is a satirical game and not actual cryptocurrency software. No real crypto transactions are involved.