---
sidebar_position: 6
---

# Change App Theme

This guide explains how to customize the color scheme of the ELMS (E-Learning Management System) Flutter application for both light and dark themes.

## Overview

The ELMS app uses a centralized color management system that supports both light and dark themes. All theme colors are defined in a single file, making it easy to customize the entire app's appearance.

## File Location

**Main Color Configuration File:**
```
lib/core/constants/app_colors.dart
```

## Color Structure

The app defines colors in three categories:

### 1. Light Mode Colors

These colors are used when the app is in light theme mode:

| Color Name | Default Value | Purpose |
|------------|---------------|---------|
| `primaryColor` | `#5A5BB5` (Purple) | Main theme color used for primary actions, buttons, and branding |
| `secondaryColor` | `#FFFFFF` (White) | Card backgrounds and form field backgrounds |
| `backgroundColor` | `#F2F5F7` (Light Gray) | Screen background color |
| `borderColor` | `#D8E0E6` (Gray) | Border color for inputs, cards, and dividers |
| `errorColor` | `#DB3D26` (Red) | Error messages and validation states |

### 2. Dark Mode Colors

These colors are used when the app is in dark theme mode:

| Color Name | Default Value | Purpose |
|------------|---------------|---------|
| `darkPrimaryColor` | `#7273D3` (Light Purple) | Main theme color for dark mode |
| `darkSecondaryColor` | `#787878` (Gray) | Card and field backgrounds in dark mode |
| `darkBackgroundColor` | `#101010` (Almost Black) | Screen background in dark mode |
| `darkBorderColor` | `#343536` (Dark Gray) | Borders in dark mode |
| `darkErrorColor` | `#DB3D26` (Red) | Error messages in dark mode |

### 3. Custom Constant Colors

These colors remain the same in both light and dark modes:

| Color Name | Default Value | Purpose |
|------------|---------------|---------|
| `infoColor` | `#0186D8` (Blue) | Information messages and notifications |
| `warningColor` | `#E29512` (Orange) | Warning messages |
| `successColor` | `#34A853` (Green) | Success messages |
| `darkColor` | `#000000` (Black) | Text and icons (adapts in dark mode) |

## How to Change Colors

### Step 1: Open the Color Configuration File

Navigate to and open:
```
lib/core/constants/app_colors.dart
```

### Step 2: Modify the Desired Colors

The file contains static color constants. To change a color, simply update its hex value:

```dart
// Example: Changing primary color from purple to blue
static const Color primaryColor = Color(0xff5A5BB5);  // Old purple
static const Color primaryColor = Color(0xff2196F3);  // New blue
```

### Step 3: Color Format

Colors are defined using hexadecimal values with the `Color()` constructor:

**Format Options:**

1. **Hex with alpha (most common):**
   ```dart
   Color(0xffRRGGBB)
   // ff = alpha (opacity), RR = red, GG = green, BB = blue
   ```

2. **ARGB format:**
   ```dart
   Color.fromARGB(255, red, green, blue)
   // 255 = fully opaque, then RGB values from 0-255
   ```

3. **RGBA format:**
   ```dart
   Color.fromRGBO(red, green, blue, opacity)
   // RGB values from 0-255, opacity from 0.0 to 1.0
   ```

## Example: Complete Theme Color Change

Let's say you want to change the app to use a green theme:

### Light Mode Changes
```dart
// Primary color to green
static const Color primaryColor = Color(0xff4CAF50);

// Keep secondary (white) as is
static const Color secondaryColor = Color(0xffffffff);

// Light green background
static const Color backgroundColor = Color(0xffE8F5E9);

// Green-tinted border
static const Color borderColor = Color(0xffC8E6C9);

// Keep error red
static const Color errorColor = Color(0xffDB3D26);
```

### Dark Mode Changes
```dart
// Dark mode primary - lighter green
static const Color darkPrimaryColor = Color(0xff81C784);

// Keep dark secondary as is
static const Color darkSecondaryColor = Color.fromRGBO(120, 120, 120, 1);

// Dark green background
static const Color darkBackgroundColor = Color(0xff1B5E20);

// Dark green border
static const Color darkBorderColor = Color(0xff2E7D32);

// Keep error red
static const Color darkErrorColor = Color(0xffDB3D26);
```

## Theme Mapping

The colors from `AppColors` are mapped to Flutter's `ColorScheme` in `lib/core/theme/app_theme.dart`:

### Light Theme Mapping
- `primary` → `primaryColor`
- `surface` → `secondaryColor` (cards, sheets)
- `outline` → `borderColor`
- `error` → `errorColor`
- `scaffoldBackgroundColor` → `backgroundColor`

### Dark Theme Mapping
- `primary` → `darkPrimaryColor`
- `surface` → `darkBackgroundColor` (slightly brightened)
- `outline` → `darkBorderColor`
- `error` → `darkErrorColor`
- `scaffoldBackgroundColor` → `darkBackgroundColor`

## Testing Your Changes

After changing colors:

1. **Hot Reload:** Press `r` in your terminal or use your IDE's hot reload feature
2. **Test Both Themes:**
   - Switch between light and dark mode in the app
   - Verify all screens look correct
3. **Check Contrast:** Ensure text is readable on all backgrounds
4. **Test Components:**
   - Buttons
   - Text fields
   - Cards
   - Dialogs
   - Navigation bars

## Best Practices

1. **Maintain Contrast:** Ensure sufficient contrast between text and backgrounds for accessibility
2. **Consistent Dark Mode:** Dark mode colors should be lighter versions of light mode colors
3. **Brand Consistency:** Use colors that align with your brand identity
4. **Test Thoroughly:** Always test both light and dark themes after changes
5. **Use Color Tools:** Use tools like [Coolors.co](https://coolors.co) or [Adobe Color](https://color.adobe.com) to generate harmonious color palettes

## Color Accessibility

Follow WCAG 2.1 guidelines for color contrast:
- **Normal text:** Minimum contrast ratio of 4.5:1
- **Large text:** Minimum contrast ratio of 3:1
- **UI components:** Minimum contrast ratio of 3:1

Test your colors using tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

## Getting Color Codes

### From Design Tools
- **Figma:** Select color → Copy as CSS → Extract hex
- **Adobe XD:** Use color picker → Copy hex value
- **Sketch:** Color picker → Hex value

### From Images
- Use online color pickers like [ImageColorPicker.com](https://imagecolorpicker.com)
- Upload your logo/brand image to extract exact colors

### Converting Colors to Flutter Format

If you have a hex color like `#5A5BB5`:
```dart
// Add 'ff' prefix for full opacity and '0x' for Flutter
Color(0xff5A5BB5)
```

## Troubleshooting

**Q: My changes aren't showing up**
- Try hot restart instead of hot reload (press `R` in terminal)
- Rebuild the entire app

**Q: Colors look different in dark mode**
- Make sure you updated both light AND dark color variants
- Check `app_theme.dart` for any color transformations

**Q: Text is not readable**
- Increase contrast between text and background colors
- Check if you need to adjust text colors separately

**Q: Some parts of the app didn't change color**
- Some widgets might use hardcoded colors (not recommended)
- Search for `Color(0x` in the codebase to find hardcoded colors

## Additional Resources

- **Color Palette Generators:**
  - [Coolors.co](https://coolors.co)
  - [Material Design Color Tool](https://material.io/resources/color/)
  - [Adobe Color](https://color.adobe.com)

- **Accessibility Testing:**
  - [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
  - [Colorable](https://colorable.jxnblk.com/)

- **Flutter Documentation:**
  - [Material Design Colors](https://api.flutter.dev/flutter/material/Colors-class.html)
  - [ColorScheme Class](https://api.flutter.dev/flutter/material/ColorScheme-class.html)

---

