---
sidebar_position: 8
---

# Change App Logo & Assets 

This guide explains how to update branding assets (logos and icons) for the ELMS Flutter application.

## Current Asset Structure

The ELMS app has the following asset organization:

- **Icons and logos**: `assets/icons/`
- **General images**: `assets/images/`
- **Illustrators**: `assets/images/illustrators/`

### Current Logo Files

| File | Location | Usage |
|------|----------|-------|
| `splash_logo.svg` | `assets/icons/` | App logo used in splash screen, referenced as `AppIcons.appLogo` |
| Launcher icons | `android/app/src/main/res/mipmap-*/` and `ios/Runner/Assets.xcassets/AppIcon.appiconset/` | Device home screen icons |

### Current Illustrator Assets

These files can be customized for visual branding:
- `assets/images/illustrators/error.svg`
- `assets/images/illustrators/no_data.svg`
- `assets/images/illustrators/no_internet.svg`

### Onboarding Assets

- `assets/icons/onboarding_1.svg`
- `assets/icons/onboarding_2.svg`
- `assets/icons/onboarding_3.svg`
- `assets/icons/onboarding_bg.svg`

---

## Method 1: Quick Logo Update (In-App Logo Only)

This method updates the logo shown inside the app (splash screen, etc.) without changing launcher icons.

### Step 1: Replace the Logo File

Simply replace the existing file with your new logo:
```sh
# Backup current logo (optional)
cp assets/icons/splash_logo.svg assets/icons/splash_logo_backup.svg

# Replace with your logo (keep the same filename)
# Copy your logo file to: assets/icons/splash_logo.svg
```

**Important**: Keep the filename as `splash_logo.svg` - this is referenced in `lib/core/constants/app_icons.dart` as `AppIcons.appLogo`

### Step 2: Test

```sh
flutter clean
flutter pub get
flutter run
```

---

## Method 2: Update Launcher Icons (Auto-Generate)

This method updates the app icon shown on device home screens using an automated tool.

### Step 1: Install flutter_launcher_icons

Add to `pubspec.yaml` under `dev_dependencies`:

```yaml
dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0
  flutter_launcher_icons: ^0.14.2  # Add this line
```

### Step 2: Configure Icon Generation

Add this configuration at the end of `pubspec.yaml`:

```yaml
flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/icons/ic_launcher.png"
  adaptive_icon_background: "#FFFFFF"  # Change to your brand color
  adaptive_icon_foreground: "assets/icons/ic_launcher_transparent.png"
  remove_alpha_ios: true
```

### Step 3: Prepare Icon Files

Create two icon files in `assets/icons/`:

1. **`ic_launcher.png`** - Square logo (1024x1024px recommended, solid background)
2. **`ic_launcher_transparent.png`** - Logo with transparent background (for Android adaptive icons)

### Step 4: Generate Icons

```sh
flutter pub get
dart run flutter_launcher_icons
```

This automatically generates all required icon sizes for Android and iOS.

### Step 5: Test

```sh
flutter clean
flutter pub get
flutter run
```

---

## Method 3: Manual Launcher Icon Update

If you prefer not to use the automated tool:

### Android

1. Generate icons in various sizes:
   - `mipmap-ldpi/` - 36x36
   - `mipmap-mdpi/` - 48x48
   - `mipmap-hdpi/` - 72x72
   - `mipmap-xhdpi/` - 96x96
   - `mipmap-xxhdpi/` - 144x144
   - `mipmap-xxxhdpi/` - 192x192

2. Place files in: `android/app/src/main/res/mipmap-*/ic_launcher.png`

### iOS

1. Generate all required sizes:
   - 20x20, 29x29, 40x40, 60x60, 76x76, 83.5x83.5, 1024x1024

2. Replace icons in: `ios/Runner/Assets.xcassets/AppIcon.appiconset/`

3. Update filenames in `Contents.json` if needed

### Rebuild

```sh
flutter clean
flutter pub get
flutter run
```

---

## Updating Other Assets

### Onboarding Screens

Replace these files to customize onboarding:
- `assets/icons/onboarding_1.svg`
- `assets/icons/onboarding_2.svg`
- `assets/icons/onboarding_3.svg`
- `assets/icons/onboarding_bg.svg`

### Error/Empty State Illustrations

Replace these files in `assets/images/illustrators/`:
- `error.svg` - Shown on error screens
- `no_data.svg` - Shown when no data available
- `no_internet.svg` - Shown when offline

---

## Icon Reference System

The app uses a centralized icon management system in `lib/core/constants/app_icons.dart`.

### How Icons are Referenced

```dart
// In app_icons.dart
static final String appLogo = _getSvg('splash_logo');

// Usage in code
CustomImage(imagePath: AppIcons.appLogo)
```

### Adding New Icons

If you add a new icon to `assets/icons/`, register it in `app_icons.dart`:

```dart
static final String myNewIcon = _getSvg('my_new_icon');
```

---

## Notification Icons (Android)

The app uses `awesome_notifications` package. If you need to update notification icons, check the notification initialization code for icon references.

---

## Troubleshooting

**Icons not updating on device:**
- Uninstall the app completely and reinstall
- Run `flutter clean` before rebuilding
- For iOS, clean Xcode build folder (Product → Clean Build Folder)

**SVG not displaying:**
- Verify SVG file is valid (the app uses `flutter_svg` package which is already installed)
- Check file path is correct in `app_icons.dart`
- Ensure asset is listed in `pubspec.yaml`

**Launcher icon not changing:**
- Make sure you uninstall the old app before installing new version
- Clear device cache if needed
- For Android, check if adaptive icon files are properly generated

---

## Quick Reference Checklist

### For In-App Logo Only:
- [ ] Replace `assets/icons/splash_logo.svg` with your logo
- [ ] Run `flutter clean && flutter pub get && flutter run`
- [ ] Test splash screen shows new logo

### For Launcher Icons:
- [ ] Create `assets/icons/ic_launcher.png` (1024x1024)
- [ ] Create `assets/icons/ic_launcher_transparent.png`
- [ ] Add `flutter_launcher_icons` to `pubspec.yaml`
- [ ] Configure `flutter_launcher_icons` settings
- [ ] Run `flutter pub get`
- [ ] Run `dart run flutter_launcher_icons`
- [ ] Run `flutter clean && flutter pub get && flutter run`
- [ ] Uninstall old app and install fresh to verify icons

---

## File Locations Reference

| Asset Type | Current Location |
|------------|-----------------|
| App logo (in-app) | `assets/icons/splash_logo.svg` |
| App icons reference | `lib/core/constants/app_icons.dart` |
| Android launcher icons | `android/app/src/main/res/mipmap-*/` |
| iOS launcher icons | `ios/Runner/Assets.xcassets/AppIcon.appiconset/` |
| Illustrators | `assets/images/illustrators/` |
| Onboarding images | `assets/icons/onboarding_*.svg` |
