---
sidebar_position: 8
---

# Change App Logo & Assets 

This guide explains how to update branding assets (logos and icons) for the ELMS Flutter application.

:::info App Icon Guide
For a general walkthrough of changing a Flutter app's icon (automated and manual methods), see the [App Icon Guide](https://marketplace.wrteam.in/docs/flutter-common-doc/GeneralSettings/appicon).
:::

## Current Asset Structure

The ELMS app has the following asset organization:

- **Icons and logos**: `assets/icons/`
- **Launcher icon source files**: `assets/logo/`
- **General images**: `assets/images/`
- **Illustrators**: `assets/images/illustrators/`

### Current Logo Files

| File | Location | Usage |
|------|----------|-------|
| `splash_logo.svg` | `assets/icons/` | App logo used in splash screen, referenced as `AppIcons.appLogo` |
| `ic_launcher.png` | `assets/logo/` | Source icon used by `flutter_launcher_icons` to generate the device home screen icon |
| `ic_launcher_foreground.png` | `assets/logo/` | Foreground layer for Android adaptive icons (background color set via `adaptive_icon_background` in `pubspec.yaml`) |
| Launcher icons (generated) | `android/app/src/main/res/mipmap-*/` and `ios/Runner/Assets.xcassets/AppIcon.appiconset/` | Device home screen icons |

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

The `flutter_launcher_icons` package is **already added** to `pubspec.yaml` and pre-configured, so you don't need to install or set it up — just replace the source icon files and regenerate.

### Step 1: Current Configuration

`pubspec.yaml` already contains:

```yaml
flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/logo/ic_launcher.png"
  adaptive_icon_background: "#673AB7"  # Current brand color
  adaptive_icon_foreground: "assets/logo/ic_launcher_foreground.png"
  remove_alpha_ios: true
```

**Note:** `adaptive_icon_background` should match the app's current brand color. If you change the brand color (see [Change App Theme](./change-app-theme)), update this value too so the launcher icon's background stays consistent with the in-app theme.

### Step 2: Replace Icon Files

Replace the two existing icon files in `assets/logo/` with your own (keep the same filenames):

1. **`ic_launcher.png`** - Square logo (1024x1024px recommended, solid background)
2. **`ic_launcher_foreground.png`** - Logo with transparent background (for Android adaptive icons)

### Step 3: Generate Icons

```sh
flutter pub get
dart run flutter_launcher_icons
```

This automatically generates all required icon sizes for Android and iOS.

### Step 4: Test

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
- [ ] Replace `assets/logo/ic_launcher.png` (1024x1024)
- [ ] Replace `assets/logo/ic_launcher_foreground.png`
- [ ] Update `adaptive_icon_background` in `pubspec.yaml` if your brand color changed
- [ ] Run `flutter pub get`
- [ ] Run `dart run flutter_launcher_icons`
- [ ] Run `flutter clean && flutter pub get && flutter run`
- [ ] Uninstall old app and install fresh to verify icons

---

## File Locations Reference

| Asset Type | Current Location |
|------------|-----------------|
| App logo (in-app, splash screen) | `assets/icons/splash_logo.svg` |
| App icons reference | `lib/core/constants/app_icons.dart` |
| Launcher icon source files | `assets/logo/ic_launcher.png`, `assets/logo/ic_launcher_foreground.png` |
| Launcher icon generator config | `pubspec.yaml` (`flutter_launcher_icons:` section) |
| Android launcher icons (generated) | `android/app/src/main/res/mipmap-*/` |
| iOS launcher icons (generated) | `ios/Runner/Assets.xcassets/AppIcon.appiconset/` |
| Illustrators | `assets/images/illustrators/` |
| Onboarding images | `assets/icons/onboarding_*.svg` |
