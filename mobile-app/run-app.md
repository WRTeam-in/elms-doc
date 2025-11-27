---
sidebar_position: 10
---

# Run App

Follow these steps to run the ELMS Flutter application on your device or emulator.

## Prerequisites

Before running the app, ensure you have:
- Flutter SDK installed (check with `flutter --version`)
- Android Studio or Xcode installed (for Android or iOS development)
- An emulator/simulator running or a physical device connected

## Steps to Run

### 1. Navigate to Project Directory

Open your terminal and navigate to the project root:

```bash
cd /path/to/elms
```

### 2. Install Dependencies

If you haven't already, get all the required packages:

```bash
flutter pub get
```

### 3. Check Available Devices

List all available devices (emulators, simulators, or connected physical devices):

```bash
flutter devices
```

### 4. Run the App

#### Option A: Run on Default Device
```bash
flutter run
```

#### Option B: Run on Specific Device
```bash
flutter run -d <device-id>
```

For example:
- iOS Simulator: `flutter run -d iphone`
- Android Emulator: `flutter run -d emulator-5554`
- Chrome (web): `flutter run -d chrome`

#### Option C: Run with Specific Flavor (if configured)
```bash
flutter run --flavor development
flutter run --flavor production
```

### 5. Development Mode Features

Once the app is running, you can use these hot reload features:
- Press `r` to hot reload
- Press `R` to hot restart
- Press `h` to display help
- Press `q` to quit

## Common Issues & Solutions

### Issue: "No devices found"
**Solution**: Start an emulator or connect a physical device, then run `flutter devices` to verify.

### Issue: Build errors or dependency conflicts
**Solution**: Clean and rebuild:
```bash
flutter clean
flutter pub get
flutter run
```

### Issue: iOS build fails
**Solution**: Update CocoaPods dependencies:
```bash
cd ios
pod install
cd ..
flutter run
```

### Issue: Android build fails
**Solution**:
- Ensure Android SDK is properly configured
- Check `android/local.properties` has correct SDK path
- Run `flutter doctor` to diagnose issues

## Quick Command Reference

| Command | Description |
|---------|-------------|
| `flutter run` | Run app on default device |
| `flutter run --release` | Run in release mode |
| `flutter run --profile` | Run in profile mode (for performance testing) |
| `flutter devices` | List available devices |
| `flutter clean` | Clean build artifacts |
| `flutter pub get` | Get dependencies |
| `flutter doctor` | Check Flutter environment setup |

## Additional Notes

- For detailed troubleshooting and project-specific commands, refer to the README.md file
- The app supports both light and dark themes
- All user-facing strings are localized (see `assets/languages/`)
- API endpoints are configured in `lib/core/api/`

---

For more information about the project architecture and development guidelines, see CLAUDE.md.