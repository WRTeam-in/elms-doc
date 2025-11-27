---
sidebar_position: 5
---

# Firebase Auth

This guide mirrors the structure of our other mobile setup docs. It walks through the Firebase Console work plus the exact locations for the generated configuration files inside the Android and iOS projects. Follow it whenever you onboard a new Firebase project or rotate credentials.

## Prerequisites

- Access to the Firebase Console project used by ELMS.
- Local copies of the Flutter source code (Android and iOS folders included).
- Android Studio / Xcode installed for editing native files.
- Apple Developer access for the bundle ID that ships with the app.

---

## Firebase Console Configuration

### Step 1: Enable Authentication Providers

1. Navigate to **Firebase Console → Build → Authentication** and click **Get started** if prompted.
2. Under **Sign-in method**:
   - **Email/Password** → toggle **Enable** → **Save**.
   - **Phone** → toggle **Enable** → **Save**.
   - **Google** → toggle **Enable**, pick a **Project support email**, then **Save**.
   - **Apple** (iOS only) → toggle **Enable** → **Save**. Ensure your Apple Developer account already owns the bundle ID with “Sign in with Apple” capability.

### Step 2: Gather Identifiers & Fingerprints

| Platform | Required value | Where to find it |
| --- | --- | --- |
| Android | Package name (`applicationId`) | `android/app/build.gradle` |
| Android | SHA-1 & SHA-256 fingerprints (debug + release) | `keytool -list -v -keystore ...` |
| iOS | Bundle ID | `ios/Runner.xcodeproj` → **Runner** target → **General** |
| iOS | Apple Team ID | developer.apple.com/account |

Add these items under **Project settings → Your apps** before downloading any configuration files.

### Step 3: Download Config Files

1. Still in **Project settings → Your apps**, select the Android app → click **Download `google-services.json`**.
2. Select the iOS app → click **Download `GoogleService-Info.plist`**.
3. Repeat this download any time you change SHA fingerprints (Android) or bundle identifiers (iOS).

---

## Android Native Configuration

### Step 4: Place `google-services.json`

1. Copy the downloaded file into `android/app/`.
2. Confirm the Gradle project is wired correctly:
   - `android/build.gradle` must include `classpath 'com.google.gms:google-services:X.X.X'`.
   - `android/app/build.gradle` must apply the plugin at the bottom:
     ```gradle
     apply plugin: "com.google.gms.google-services"
     ```
3. Rebuild the Android project so Gradle ingests the updated JSON.

---

## iOS Native Configuration

### Step 5: Add `GoogleService-Info.plist` to Runner

1. Copy the plist into `ios/Runner/`.
2. Open `ios/Runner.xcworkspace` in Xcode.
3. Drag the plist into the **Runner** target (check **Copy items if needed**).
4. Verify it is listed under **Build Phases → Copy Bundle Resources** to ensure the file ships with the app.

### Step 6: Register the Reversed Client ID (Google Sign-In)

1. Open `GoogleService-Info.plist` and copy the `REVERSED_CLIENT_ID` value (for example `com.googleusercontent.apps.12345-abcdef`).
2. In Xcode → select the **Runner** target → **Info** tab → expand **URL Types**.
3. Click **+** and fill in:
   - **Identifier**: `com.google`
   - **URL Schemes**: paste the `REVERSED_CLIENT_ID`.
4. Save to commit the change to `ios/Runner/Info.plist`. The relevant block should look like:
   ```xml
   <key>CFBundleURLTypes</key>
   <array>
     <dict>
       <key>CFBundleTypeRole</key>
       <string>Editor</string>
       <key>CFBundleURLSchemes</key>
       <array>
         <string>com.googleusercontent.apps.12345-abcdef</string>
         <!-- Other schemes such as deep links can follow -->
       </array>
     </dict>
   </array>
   ```
   Without this entry, Google Sign-In cannot hand control back to your app after authentication.

### Step 7: Enable Apple Sign-In Capability

1. Sign in to [developer.apple.com](https://developer.apple.com/account) with the Team that matches your bundle ID and ensure the App ID has **Sign in with Apple** enabled. Download refreshed provisioning profiles if Apple prompts you.
2. In Xcode → **Runner** target → **Signing & Capabilities**, click **+ Capability**, search for **Sign in with Apple**, and add it.
3. Open `ios/Runner/Runner.entitlements` to confirm it contains:
   ```xml
   <key>com.apple.developer.applesignin</key>
   <array>
     <string>Default</string>
   </array>
   ```
   Keep this file under source control so teammates inherit the capability.
4. Build the app on a physical iOS device (iOS 13+) to verify the Apple Sign-In sheet appears and stays open.

