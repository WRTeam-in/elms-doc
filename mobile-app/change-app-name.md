---
sidebar_position: 3
---

# Change App Name

This guide explains how to change the display name of the ELMS Flutter application on both Android and iOS devices.

## Current App Name

The app is currently named **"eLMS"** in the following locations:
- Android: `android/app/src/main/AndroidManifest.xml` (line 7)
- iOS: `ios/Runner/Info.plist` (lines 10 and 18)
- In-App Display: `lib/core/configs/app_settings.dart` (line 4)

---

## Method 1: Using rename Package (Recommended)

This is the easiest and safest method to change your app name across both platforms.

### Step 1: Install rename Package

```sh
dart pub global activate rename
```

### Step 2: Change App Name

```sh
dart pub global run rename setAppName --targets ios,android --value "Your App Name"
```

Replace `"Your App Name"` with your desired app name.

**Example:**
```sh
dart pub global run rename setAppName --targets ios,android --value "My Learning App"
```

### Step 3: Update In-App Display Name

The `rename` package updates the platform-specific names, but you also need to manually update the in-app display name:

1. Open `lib/core/configs/app_settings.dart`

2. Change line 4:
   ```dart
   static const String appName = 'Your App Name';
   ```

### Step 4: Test

```sh
flutter clean
flutter pub get
flutter run
```

---

## Method 2: Manual Change

If you prefer to change the app name manually:

### Android

1. Open `android/app/src/main/AndroidManifest.xml`

2. Find line 7 with `android:label="eLMS"`

3. Change `eLMS` to your desired app name:
   ```xml
   <application
       android:label="Your App Name"
       android:name="${applicationName}"
       android:icon="@mipmap/ic_launcher"
   ```

**Example:**
```xml
android:label="My Learning App"
```

### iOS

1. Open `ios/Runner/Info.plist`

2. Find the `CFBundleDisplayName` key (line 9-10):
   ```xml
   <key>CFBundleDisplayName</key>
   <string>eLMS</string>
   ```

3. Change `eLMS` to your desired app name:
   ```xml
   <key>CFBundleDisplayName</key>
   <string>Your App Name</string>
   ```

4. Also update `CFBundleName` (line 17-18):
   ```xml
   <key>CFBundleName</key>
   <string>Your App Name</string>
   ```

**Note:** `CFBundleDisplayName` is what appears on the home screen.

### In-App Display Name

1. Open `lib/core/configs/app_settings.dart`

2. Find line 4 with `static const String appName = 'eLMS';`

3. Change `eLMS` to your desired app name:
   ```dart
   static const String appName = 'Your App Name';
   ```

**Example:**
```dart
static const String appName = 'My Learning App';
```

**Note:** This changes the app name displayed inside the app (UI components, headers, etc.).

### Test

```sh
flutter clean
flutter pub get
flutter run
```

---

## Troubleshooting

**App name not changing on device:**
- Uninstall the app completely
- Run `flutter clean`
- Rebuild and reinstall
- For iOS, try cleaning build folder in Xcode (Product → Clean Build Folder)

---

## Quick Reference

| Location | File | Line | What to Change |
|----------|------|------|----------------|
| Android | `AndroidManifest.xml` | 7 | `android:label="eLMS"` |
| iOS | `Info.plist` | 10 | `<string>eLMS</string>` (CFBundleDisplayName) |
| iOS | `Info.plist` | 18 | `<string>eLMS</string>` (CFBundleName) |
| In-App | `app_settings.dart` | 4 | `appName = 'eLMS'` |

---

## Checklist

- [ ] Choose your method (rename package or manual)
- [ ] Update app name on both Android and iOS
- [ ] Run `flutter clean && flutter pub get`
- [ ] Test on Android device/emulator
- [ ] Test on iOS device/simulator
- [ ] Verify new name appears on home screen
