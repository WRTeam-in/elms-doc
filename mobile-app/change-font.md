---
sidebar_position: 9
---

# Change font

This guide explains how to customize the font family used throughout the ELMS (E-Learning Management System) Flutter application.

## Overview

The ELMS app uses a centralized font management system where the font family is defined once and applied globally throughout the entire application. The current app uses the **Geist** font family.

## Current Font Configuration

**Current Font:** Geist
**Font Weights Available:** 100, 200, 300, 400, 500, 600, 700, 800, 900

## File Locations

### 1. Theme Configuration File
```
lib/core/theme/app_theme.dart
```
This file contains the `fontFamily` constant that sets the global font for the entire app.

### 2. Font Assets Directory
```
assets/fonts/
```
This directory contains all the `.ttf` (TrueType Font) files for your custom fonts.

### 3. Font Registration File
```
pubspec.yaml
```
This file registers your fonts with Flutter so they can be used in the app.

## Step-by-Step Guide to Change Fonts

### Step 1: Obtain Your Font Files

Before you begin, you need to have your font files ready:

**Supported Font Formats:**
- `.ttf` (TrueType Font) - Most common and recommended
- `.otf` (OpenType Font) - Also supported

**What You Need:**
- Font files for different weights (Regular, Bold, Light, etc.)
- At minimum: Regular (400) and Bold (700) weights
- Optionally: Multiple weights for better typography

**Where to Get Fonts:**

1. **Google Fonts** (Free): https://fonts.google.com
   - Download any font family
   - Click "Download family" to get all weights

2. **Font Squirrel** (Free): https://www.fontsquirrel.com
   - High-quality free fonts for commercial use

3. **Adobe Fonts** (Paid): https://fonts.adobe.com
   - Premium fonts with Adobe subscription

4. **Custom Fonts**: Use your own brand fonts
   - Get from your design team
   - Ensure you have proper licensing

### Step 2: Add Font Files to Assets

1. **Navigate to the fonts directory:**
   ```
   assets/fonts/
   ```

2. **Add your font files:**
   - Copy all your `.ttf` or `.otf` files to this directory
   - Use clear naming convention: `FontName-Weight.ttf`

   **Example:**
   ```
   assets/fonts/
   ├── Roboto-Regular.ttf
   ├── Roboto-Bold.ttf
   ├── Roboto-Light.ttf
   ├── Roboto-Medium.ttf
   └── Roboto-Black.ttf
   ```

3. **Naming Best Practices:**
   - Keep filenames consistent
   - Use hyphen or underscore between name and weight
   - Examples: `Roboto-Bold.ttf`, `OpenSans-Regular.ttf`, `Poppins-SemiBold.ttf`

### Step 3: Register Fonts in pubspec.yaml

Open `pubspec.yaml` and update the fonts section:

**Current Configuration (Geist font):**
```yaml
fonts:
  - family: Geist
    fonts:
      - asset: assets/fonts/Geist-Black.ttf
        weight: 900
      - asset: assets/fonts/Geist-Bold.ttf
        weight: 700
      - asset: assets/fonts/Geist-ExtraBold.ttf
        weight: 800
      - asset: assets/fonts/Geist-ExtraLight.ttf
        weight: 200
      - asset: assets/fonts/Geist-Light.ttf
        weight: 300
      - asset: assets/fonts/Geist-Medium.ttf
        weight: 500
      - asset: assets/fonts/Geist-Regular.ttf
        weight: 400
      - asset: assets/fonts/Geist-SemiBold.ttf
        weight: 600
      - asset: assets/fonts/Geist-Thin.ttf
        weight: 100
```

**Example: Changing to Roboto font:**
```yaml
fonts:
  - family: Roboto
    fonts:
      - asset: assets/fonts/Roboto-Thin.ttf
        weight: 100
      - asset: assets/fonts/Roboto-Light.ttf
        weight: 300
      - asset: assets/fonts/Roboto-Regular.ttf
        weight: 400
      - asset: assets/fonts/Roboto-Medium.ttf
        weight: 500
      - asset: assets/fonts/Roboto-Bold.ttf
        weight: 700
      - asset: assets/fonts/Roboto-Black.ttf
        weight: 900
```

**Font Weight Reference:**

| Weight | Common Name | Numeric Value |
|--------|-------------|---------------|
| Thin | Thin/Hairline | 100 |
| Extra Light | Ultra Light | 200 |
| Light | Light | 300 |
| Regular | Normal/Book | 400 |
| Medium | Medium | 500 |
| Semi Bold | Demi Bold | 600 |
| Bold | Bold | 700 |
| Extra Bold | Ultra Bold | 800 |
| Black | Heavy/Black | 900 |

**Important Notes:**
- The `family` name is what you'll use in your code
- Match weight numbers to the actual font weight
- Indentation matters in YAML - use 2 spaces
- Regular (400) weight is required for proper fallback

### Step 4: Update Theme Configuration

Open `lib/core/theme/app_theme.dart` and update the `fontFamily` constant:

**Current Code:**
```dart
class AppTheme {
  ThemeData theme;
  AppTheme(this.theme);
  bool isDarkMode = false;
  static const String fontFamily = 'Geist';  // Current font

  // ... rest of the code
}
```

**Update to your new font:**
```dart
class AppTheme {
  ThemeData theme;
  AppTheme(this.theme);
  bool isDarkMode = false;
  static const String fontFamily = 'Roboto';  // Your new font name

  // ... rest of the code
}
```

**Important:** The `fontFamily` string must **exactly match** the `family` name you used in `pubspec.yaml`.

### Step 5: Clean and Rebuild

After making changes, you need to rebuild your app:

1. **Stop the running app** (if any)

2. **Clean the build:**
   ```bash
   flutter clean
   ```

3. **Get dependencies:**
   ```bash
   flutter pub get
   ```

4. **Rebuild and run:**
   ```bash
   flutter run
   ```

**Why Clean Build is Required:**
- Font assets are compiled into the app during build
- Changes to `pubspec.yaml` require a fresh build
- Hot reload/restart won't apply font changes

## Complete Example: Changing to Poppins Font

Let's walk through a complete example of changing from Geist to Poppins:

### 1. Download Poppins from Google Fonts
- Go to https://fonts.google.com/specimen/Poppins
- Click "Download family"
- Extract the ZIP file

### 2. Copy Font Files
```bash
# Copy the font files you need
cp ~/Downloads/Poppins/Poppins-Regular.ttf assets/fonts/
cp ~/Downloads/Poppins/Poppins-Bold.ttf assets/fonts/
cp ~/Downloads/Poppins/Poppins-Light.ttf assets/fonts/
cp ~/Downloads/Poppins/Poppins-Medium.ttf assets/fonts/
cp ~/Downloads/Poppins/Poppins-SemiBold.ttf assets/fonts/
```

### 3. Update pubspec.yaml
```yaml
fonts:
  - family: Poppins
    fonts:
      - asset: assets/fonts/Poppins-Light.ttf
        weight: 300
      - asset: assets/fonts/Poppins-Regular.ttf
        weight: 400
      - asset: assets/fonts/Poppins-Medium.ttf
        weight: 500
      - asset: assets/fonts/Poppins-SemiBold.ttf
        weight: 600
      - asset: assets/fonts/Poppins-Bold.ttf
        weight: 700
```

### 4. Update app_theme.dart
```dart
static const String fontFamily = 'Poppins';
```

### 5. Rebuild
```bash
flutter clean
flutter pub get
flutter run
```

## Using Multiple Font Families

You can register multiple font families in your app and use them selectively:

### In pubspec.yaml:
```yaml
fonts:
  - family: Poppins
    fonts:
      - asset: assets/fonts/Poppins-Regular.ttf
        weight: 400
      - asset: assets/fonts/Poppins-Bold.ttf
        weight: 700

  - family: RobotoMono
    fonts:
      - asset: assets/fonts/RobotoMono-Regular.ttf
        weight: 400
      - asset: assets/fonts/RobotoMono-Bold.ttf
        weight: 700
```

### Using in Code:
```dart
// Main app font (defined in AppTheme.fontFamily)
Text('Regular text')  // Uses default Poppins

// Use specific font for code blocks
Text(
  'Code snippet',
  style: TextStyle(fontFamily: 'RobotoMono'),
)
```

## Font Weight Usage in Code

Once your fonts are configured, you can use different weights:

```dart
// Regular (400)
Text('Regular text')

// Bold (700)
Text('Bold text', style: TextStyle(fontWeight: FontWeight.bold))

// Specific weights
Text('Light text', style: TextStyle(fontWeight: FontWeight.w300))
Text('Medium text', style: TextStyle(fontWeight: FontWeight.w500))
Text('SemiBold text', style: TextStyle(fontWeight: FontWeight.w600))

// Available FontWeight constants
FontWeight.w100  // Thin
FontWeight.w200  // Extra Light
FontWeight.w300  // Light
FontWeight.w400  // Regular/Normal
FontWeight.w500  // Medium
FontWeight.w600  // Semi Bold
FontWeight.w700  // Bold
FontWeight.w800  // Extra Bold
FontWeight.w900  // Black
```

## Troubleshooting

### Problem: Font not showing after changes

**Solution 1: Clean build required**
```bash
flutter clean
flutter pub get
flutter run
```

**Solution 2: Check pubspec.yaml indentation**
- YAML is indent-sensitive
- Use 2 spaces for indentation
- No tabs allowed

**Solution 3: Verify font family name**
- Must match exactly between `pubspec.yaml` and `app_theme.dart`
- Case-sensitive (e.g., "Roboto" ≠ "roboto")

### Problem: Some text still shows old font

**Possible causes:**
- Some widgets might have hardcoded font family
- Need to do a clean rebuild
- Cache not cleared

**Solution:**
```bash
# On iOS
flutter clean
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
flutter run

# On Android
flutter clean
cd android
./gradlew clean
cd ..
flutter run
```

### Problem: Font looks different than expected

**Check:**
1. Correct weight files are added
2. Weight numbers match the actual font weight
3. Font files are not corrupted (re-download if needed)

### Problem: App crashes after font change

**Common issues:**
- Missing Regular (400) weight font file
- Incorrect file path in pubspec.yaml
- Corrupted font file

**Solution:**
- Ensure Regular weight is always included
- Verify all paths are correct
- Re-download font files

### Problem: YAML parsing error

**Common mistakes:**
```yaml
# ❌ Wrong - using tabs
fonts:
	- family: Roboto

# ❌ Wrong - incorrect indentation
fonts:
- family: Roboto
  fonts:
    - asset: assets/fonts/Roboto-Regular.ttf

# ✅ Correct - 2 spaces, consistent indentation
fonts:
  - family: Roboto
    fonts:
      - asset: assets/fonts/Roboto-Regular.ttf
        weight: 400
```

## Best Practices

### 1. Font Selection
- Choose readable fonts for body text
- Ensure good support for numbers and special characters
- Test on both iOS and Android devices
- Consider accessibility for users with dyslexia (fonts like OpenDyslexic)

### 2. Font Weights
- Always include Regular (400) and Bold (700) at minimum
- Add additional weights for better typography
- Don't add unnecessary weights to reduce app size

### 3. Font File Size
- Multiple font files increase app size
- Each weight file can be 50-200KB
- Consider app size when adding many weights
- Remove unused weights after testing

### 4. Testing
- Test on multiple screen sizes
- Test both light and dark themes
- Verify special characters display correctly
- Check RTL (Right-to-Left) language support if applicable

### 5. Performance
- Fonts are loaded at app startup
- More font files = slightly longer startup time
- Generally negligible impact for 5-10 font files

## Font Licensing

**Important:** Always verify you have the legal right to use a font in your app.

### License Types:

1. **Open Source (OFL - Open Font License)**
   - Free for commercial use
   - Example: Google Fonts, Font Squirrel
   - No attribution required (but appreciated)

2. **Commercial License**
   - Purchase required for commercial apps
   - Check license terms for mobile app usage
   - May require per-app or per-developer license

3. **Personal Use Only**
   - Cannot be used in commercial/published apps
   - Only for personal projects and learning

### Checking License:
```bash
# Most fonts include a LICENSE.txt or OFL.txt file
ls assets/fonts/
# Look for: LICENSE.txt, OFL.txt, or README.txt
```

## Recommended Free Fonts

Here are some popular, free, high-quality fonts for mobile apps:

### Sans-Serif (Modern, Clean)
- **Roboto** - Google's Android system font
- **Open Sans** - Highly readable, versatile
- **Lato** - Professional, friendly
- **Poppins** - Modern, geometric
- **Montserrat** - Elegant, urban
- **Inter** - Optimized for screens
- **Nunito** - Rounded, friendly

### Serif (Traditional, Formal)
- **Merriweather** - Readable, elegant
- **Lora** - Modern serif, readable
- **Playfair Display** - Elegant headlines

### Monospace (Code, Technical)
- **Roboto Mono** - Clean, professional
- **Fira Code** - Developer favorite
- **JetBrains Mono** - Excellent for code

### Download These Fonts:
- **Google Fonts**: https://fonts.google.com
- **Font Squirrel**: https://www.fontsquirrel.com

## Advanced: Using Google Fonts Package

Instead of manually adding fonts, you can use the `google_fonts` package:

### 1. Add dependency to pubspec.yaml:
```yaml
dependencies:
  google_fonts: ^6.2.0
```

### 2. Use in code:
```dart
import 'package:google_fonts/google_fonts.dart';

// In app_theme.dart
static TextStyle get textTheme => GoogleFonts.robotoTextTheme();

// Or in individual widgets
Text(
  'Hello World',
  style: GoogleFonts.poppins(
    fontSize: 16,
    fontWeight: FontWeight.bold,
  ),
)
```

### Pros:
- No need to download font files
- Easy to switch fonts
- Automatic caching

### Cons:
- Requires internet on first load
- Slightly larger app size
- Less control over exact weights

## Additional Resources

### Font Resources:
- **Google Fonts**: https://fonts.google.com (Free, open source)
- **Font Squirrel**: https://www.fontsquirrel.com (Free, commercial use)
- **DaFont**: https://www.dafont.com (Free and paid)
- **Adobe Fonts**: https://fonts.adobe.com (Requires subscription)
- **1001 Fonts**: https://www.1001fonts.com

### Font Tools:
- **Font Pair**: https://fontpair.co (Font combination suggestions)
- **Type Scale**: https://typescale.com (Typography scale generator)
- **FontDrop**: https://fontdrop.info (Online font file inspector)

### Flutter Documentation:
- **Using Custom Fonts**: https://docs.flutter.dev/cookbook/design/fonts
- **Google Fonts Package**: https://pub.dev/packages/google_fonts
- **Material Design Typography**: https://material.io/design/typography

### Testing Fonts:
- **Fonts Arena**: https://fontsarena.com (Preview fonts before downloading)
- **Font Flipper**: https://fontflipper.com (Quick font comparison)

## Quick Reference Checklist

Use this checklist when changing fonts:

- [ ] Downloaded font files (.ttf or .otf)
- [ ] Verified font license allows commercial use
- [ ] Copied font files to `assets/fonts/` directory
- [ ] Updated `pubspec.yaml` with font family and weights
- [ ] Updated `fontFamily` in `lib/core/theme/app_theme.dart`
- [ ] Verified family name matches exactly (case-sensitive)
- [ ] Included at least Regular (400) weight
- [ ] Ran `flutter clean`
- [ ] Ran `flutter pub get`
- [ ] Rebuilt and ran the app
- [ ] Tested on both light and dark themes
- [ ] Verified text is readable on different screens
- [ ] Checked all font weights display correctly

---

**Note:** Font changes require a complete rebuild (not just hot reload) to take effect. Always test thoroughly on actual devices after changing fonts, as fonts may render differently than on simulators/emulators.
