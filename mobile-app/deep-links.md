---
sidebar_position: 10
---


# Deep links

This guide explains how to configure deep linking for the ELMS (E-Learning Management System) Flutter application on iOS and Android platforms.


## Prerequisites

- Basic understanding of iOS and Android configuration

## Native Platform Configuration

### Step 1: Choose Your URL Scheme

First, decide on your custom URL scheme. The default is `elms`, but you should change it to something unique for your app.

**Naming Guidelines:**
- Use lowercase letters only
- Keep it short and memorable
- Make it unique to avoid conflicts
- Examples: `mylearning`, `eduapp`, `learnhub`

### Step 2: Configure Android

#### 2.1 Open Android Manifest

Navigate to:
```
android/app/src/main/AndroidManifest.xml
```

#### 2.2 Update Custom Scheme

Find this section and replace `elms` with your chosen scheme:

```xml
<!-- Deep Link Intent Filter -->
<intent-filter>
    <action android:name="android.intent.action.VIEW"/>
    <category android:name="android.intent.category.DEFAULT"/>
    <category android:name="android.intent.category.BROWSABLE"/>

    <!-- Custom scheme: yourscheme://... -->
    <data android:scheme="elms"/>  <!-- Change 'elms' to your scheme -->
</intent-filter>
```

**Example:** If your scheme is `mylearning`:
```xml
<data android:scheme="mylearning"/>
```

**Complete Example (AndroidManifest.xml):**
```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="singleTop"
    android:theme="@style/LaunchTheme"
    android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
    android:hardwareAccelerated="true"
    android:windowSoftInputMode="adjustResize">

    <!-- Standard launcher intent -->
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>

    <!-- Custom scheme deep links -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data android:scheme="mylearning"/>
    </intent-filter>
</activity>
```

### Step 3: Configure iOS

#### 3.1 Open Info.plist

Navigate to:
```
ios/Runner/Info.plist
```

#### 3.2 Update Custom Scheme

Find the `CFBundleURLTypes` section and update your custom scheme:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <!-- Your custom scheme here -->
            <string>elms</string>  <!-- Change to your scheme -->
            <!-- Other schemes (Google Sign-In, etc.) -->
            <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
        </array>
    </dict>
</array>
```

**Example:** If your scheme is `mylearning`:
```xml
<array>
    <string>mylearning</string>
    <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
</array>
```

#### 3.3 Enable Flutter Deep Linking

Ensure this key is present and set to `true`:

```xml
<key>FlutterDeepLinkingEnabled</key>
<true/>
```

### Step 4: Testing Your Configuration

#### 4.1 Testing Custom Scheme Links

**On Android (ADB):**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "elms://course-details/123"
```

**On iOS (Simulator):**
```bash
xcrun simctl openurl booted "elms://course-details/123"
```

#### 4.2 Testing on Real Devices

- Send the deep link via Messages, WhatsApp, or email
- Tap the link to verify the app opens correctly
- Test from Safari (iOS) or Chrome (Android) browser

## Troubleshooting

### Issue: Deep links not working on Android

**Solutions:**

1. **Verify intent filter is correct:**
   - Check `AndroidManifest.xml` for typos
   - Verify scheme matches exactly

2. **Clear app data and reinstall:**
   ```bash
   adb shell pm clear com.yourcompany.yourapp
   adb uninstall com.yourcompany.yourapp
   flutter run
   ```

3. **Check ADB logs:**
   ```bash
   adb logcat | grep -i "intent"
   ```

### Issue: Deep links not working on iOS

**Solutions:**

1. **Verify Info.plist configuration:**
   - Check scheme is in `CFBundleURLSchemes`
   - Ensure `FlutterDeepLinkingEnabled` is `true`

2. **Test with different methods:**
   - Long-press link in Notes app
   - Use Safari instead of in-app browser
   - Try from Messages app

3. **Check iOS logs:**
   - Open Console app on Mac
   - Filter by your device
   - Look for deep link related errors

### Issue: App opens but doesn't navigate to correct screen

**Solutions:**

1. **Check Deep Link Manager implementation:**
   - Verify route name matches in switch statement
   - Check if screen route exists in `AppRoutes`
   - Ensure navigation context is available

2. **Add logging:**
   ```dart
   void _handleDeepLink(String link) {
     print('Handling deep link: $link');  // Add this
     try {
       // ... rest of code
     } catch (e) {
       print('Error handling deep link: $e');  // Add this
       return;
     }
   }
   ```

3. **Verify app initialization:**
   - Ensure `DeepLinkManager.instance.initialize()` is called
   - Check it's called after navigation context is available

## Additional Resources

### Documentation:
- **app_links package**: https://pub.dev/packages/app_links
- **Android Deep Links**: https://developer.android.com/training/app-links/deep-linking
- **iOS URL Schemes**: https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app

### Testing Tools:
- **Deep Link Tester (Android)**: https://play.google.com/store/apps/details?id=com.tetracode.deeplinktester

### Debugging Tools:
- **ADB (Android Debug Bridge)**: For testing Android deep links
- **Xcode Console**: For debugging iOS deep links

## Configuration Checklist

### Android Native Configuration
- [ ] Updated `AndroidManifest.xml` with custom scheme
- [ ] Verified scheme matches exactly (no typos)
- [ ] Tested deep links with ADB commands
- [ ] Tested on real devices

### iOS Native Configuration
- [ ] Updated `Info.plist` with custom scheme in `CFBundleURLSchemes`
- [ ] Set `FlutterDeepLinkingEnabled` to `true` in `Info.plist`
- [ ] Tested deep links with Simulator
- [ ] Tested deep links on real device

---

**Note:** Deep linking configuration requires careful setup on both native platforms. Test thoroughly on both iOS and Android before releasing to production.
