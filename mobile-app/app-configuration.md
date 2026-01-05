---
sidebar_position: 3
---

# App Configuration Guide

This guide explains how to change the app name, package name, and other configuration settings for the ELMS Flutter application.

## Overview

The ELMS app uses centralized configuration files for managing app settings across platforms:
- **Android**: `android/config.gradle`
- **iOS**: `ios/Runner/AppConfig.xcconfig`
- **In-App**: `lib/core/configs/app_settings.dart`

This approach ensures consistent configuration across your app and makes changes easier to manage.

---

## Current Configuration

### App Name
- **Current Value**: `eLMS`
- **Locations**:
  - Android: `android/config.gradle`
  - iOS: `ios/Runner/AppConfig.xcconfig`
  - In-App: `lib/core/configs/app_settings.dart`

### Package Name
- **Current Value**: `com.wrteam.elms`
- **Locations**:
  - Android: `android/config.gradle`
  - iOS: Set via Xcode (Bundle Identifier)

### Deep Link Schema
- **Current Value**: `elms`
- **Locations**:
  - Android: `android/config.gradle`
  - iOS: `ios/Runner/AppConfig.xcconfig`

---

## How to Change App Name

### Step 1: Update Android Configuration

1. Open `android/config.gradle`
2. Change `APP_NAME`:
   ```gradle
   ext.APP_NAME = "Your App Name"
   ```

**Example:**
```gradle
ext.APP_NAME = "My Learning App"
```

### Step 2: Update iOS Configuration

1. Open `ios/Runner/AppConfig.xcconfig`
2. Change `APP_NAME`:
   ```
   APP_NAME = Your App Name
   ```

**Example:**
```
APP_NAME = My Learning App
```

**Note:** Do not use quotes in the xcconfig file.

### Step 3: Update In-App Display Name

1. Open `lib/core/configs/app_settings.dart`
2. Change `appName`:
   ```dart
   static const String appName = 'Your App Name';
   ```

**Example:**
```dart
static const String appName = 'My Learning App';
```

### Step 4: Clean and Rebuild

```bash
flutter clean
flutter pub get
flutter run
```

**For iOS, also run:**
```bash
cd ios
pod install
cd ..
flutter run
```

---

## How to Change Package Name

### Step 1: Update Android Package Name

1. Open `android/config.gradle`
2. Change `PACKAGE_NAME`:
   ```gradle
   ext.PACKAGE_NAME = "com.yourcompany.yourapp"
   ```

**Example:**
```gradle
ext.PACKAGE_NAME = "com.mycompany.learningapp"
```

**Note:** Package names must:
- Be in reverse domain format (com.company.app)
- Use only lowercase letters, numbers, and dots
- Not start or end with a dot
- Not have consecutive dots

### Step 2: Update iOS Bundle Identifier

1. Open the iOS folder in Xcode:
   ```bash
   open ios/Runner.xcworkspace
   ```
2. Select **Runner** in the project navigator
3. Go to **Targets → Runner → General → Identity**
4. Change the **Bundle Identifier** to your new package name

**Example:** `com.mycompany.learningapp`

### Step 3: Update MainActivity (Android)

If you have custom code in your MainActivity, update the package name:

1. Open `android/app/src/main/kotlin/com/wrteam/elms/MainActivity.kt`
2. Move the file to match your new package structure
3. Update the package declaration at the top of the file

**Example:**
```kotlin
package com.mycompany.learningapp

import io.flutter.embedding.android.FlutterActivity

class MainActivity: FlutterActivity()
```

### Step 4: Clean and Rebuild

```bash
flutter clean
cd ios
pod install
cd ..
flutter pub get
flutter run
```

---

## How to Change Deep Link Schema

### Step 1: Update Android Deep Link

1. Open `android/config.gradle`
2. Change `DEEP_LINK_SCHEMA`:
   ```gradle
   ext.DEEP_LINK_SCHEMA = "yourschema"
   ```

**Example:**
```gradle
ext.DEEP_LINK_SCHEMA = "mylearningapp"
```

### Step 2: Update iOS Deep Link

1. Open `ios/Runner/AppConfig.xcconfig`
2. Change `DEEP_LINK_SCHEMA`:
   ```
   DEEP_LINK_SCHEMA = yourschema
   ```

**Example:**
```
DEEP_LINK_SCHEMA = mylearningapp
```

### Step 3: Clean and Rebuild

```bash
flutter clean
flutter pub get
flutter run
```

---

## Configuration Reference Table

| Setting | Android File | iOS File | In-App File |
|---------|-------------|----------|-------------|
| App Name | `android/config.gradle` | `ios/Runner/AppConfig.xcconfig` | `lib/core/configs/app_settings.dart` |
| Package Name | `android/config.gradle` | Xcode → Bundle Identifier | N/A |
| Deep Link Schema | `android/config.gradle` | `ios/Runner/AppConfig.xcconfig` | N/A |

---

## How It Works

### Android Configuration Flow

```
android/config.gradle (defines variables)
         ↓
android/app/build.gradle (reads variables via rootProject.ext)
         ↓
manifestPlaceholders (injects into AndroidManifest.xml)
         ↓
android/app/src/main/AndroidManifest.xml (uses ${PLACEHOLDER})
```

### iOS Configuration Flow

```
ios/Runner/AppConfig.xcconfig (defines variables)
         ↓
ios/Runner/Info.plist (uses $(VARIABLE_NAME))
         ↓
iOS Build System (resolves variables at build time)
```

---

## Troubleshooting

### App name not changing on device

**Android:**
- Uninstall the app completely from the device
- Run `flutter clean`
- Rebuild and reinstall: `flutter run`

**iOS:**
- Uninstall the app from the device/simulator
- In Xcode: **Product → Clean Build Folder** (Cmd+Shift+K)
- Run `cd ios && pod install && cd ..`
- Rebuild: `flutter run`

### Package name conflicts

If you get duplicate package errors:
1. Search your entire project for the old package name
2. Update all references in:
   - `android/app/src/main/AndroidManifest.xml` (if hardcoded anywhere)
   - `android/app/src/debug/AndroidManifest.xml` (if exists)
   - `MainActivity.kt` package declaration
   - Any custom native code files

### Build errors after changing configuration

```bash
# Complete clean rebuild
flutter clean
cd ios
rm -rf Pods
rm Podfile.lock
pod install
cd ..
flutter pub get
flutter run
```

### Configuration not taking effect

**Make sure:**
- You saved all files after editing
- No extra spaces or special characters in configuration values
- iOS xcconfig file doesn't have quotes around values
- Android gradle file has quotes around string values

---

## Quick Setup Checklist

When setting up a new app from ELMS template:

- [ ] Change `APP_NAME` in `android/config.gradle`
- [ ] Change `APP_NAME` in `ios/Runner/AppConfig.xcconfig`
- [ ] Change `appName` in `lib/core/configs/app_settings.dart`
- [ ] Change `PACKAGE_NAME` in `android/config.gradle`
- [ ] Change Bundle Identifier in Xcode
- [ ] Update MainActivity.kt package declaration and file path
- [ ] Change `DEEP_LINK_SCHEMA` in both config files (optional)
- [ ] Run `flutter clean && cd ios && pod install && cd .. && flutter pub get`
- [ ] Test on both Android and iOS devices
- [ ] Verify app name appears correctly on home screen
- [ ] Verify deep links work (if configured)

---

## Additional iOS Configuration

The `ios/Runner/AppConfig.xcconfig` file also contains:
- `REVERSE_CLIENT_ID`: Google OAuth configuration
- `ENCODED_APP_ID`: Firebase configuration

These should be updated when setting up Firebase and Google Sign-In for your app. Refer to the respective Firebase and Google OAuth setup documentation.

---

## Best Practices

1. **Use descriptive names**: Choose app names that clearly represent your application
2. **Follow conventions**: Use reverse domain notation for package names (com.company.app)
3. **Be consistent**: Keep app name consistent across all three configuration locations
4. **Test thoroughly**: Always test on both platforms after making configuration changes
5. **Version control**: Commit configuration changes with clear commit messages
6. **Document changes**: Keep track of configuration changes in your project documentation

---

## Legacy Note

Previous versions of this documentation recommended using the `rename` package or `change_app_package_name` tools. The current configuration approach is preferred because:
- ✅ Single source of truth for each platform
- ✅ No dependency on external packages
- ✅ Better control over configuration
- ✅ Easier to understand and maintain
- ✅ Works reliably across Flutter updates
