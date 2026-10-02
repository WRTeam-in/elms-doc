---
sidebar_position: 11
---

# Facebook App Events

This guide explains what Facebook App Events are and how to configure them for the ELMS app on both Android and iOS.

:::info Facebook App Events Guide
For a general walkthrough of Facebook App Events in a Flutter app, see the [Facebook App Events Guide](https://marketplace.wrteam.in/docs/flutter-common-doc/GeneralSettings/facebook-app-events).
:::

## What It Is

Facebook App Events let the app send user activity (installs, app opens, purchases, registrations, course views, etc.) to **Meta Events Manager**. This data is used for ad measurement, attribution, and audience building if you run Facebook/Instagram ads for your app.

The integration itself is **already built into the app** — the `facebook_app_events` package is installed, and standard events (registration, login, search, add to cart, purchase, checkout, wishlist, ratings, course completion, etc.) are already wired up in the app's code. All you need to do is plug in your own Facebook App credentials.

## Step 1: Get Your Facebook App Credentials

1. Go to [developers.facebook.com](https://developers.facebook.com/) and create (or open) your app.
2. From **App Settings → Basic**, copy the **App ID**.
3. From **App Settings → Advanced → Security**, copy the **Client Token**.

You'll need both values for the steps below.

## Step 2: Add Credentials for Android

Open:
```
android/app/src/main/res/values/strings.xml
```

Update the values with your own App ID and Client Token:

```xml
<resources>
    <string name="facebook_app_id">YOUR_FACEBOOK_APP_ID</string>
    <string name="facebook_client_token">YOUR_FACEBOOK_CLIENT_TOKEN</string>
</resources>
```

The `AndroidManifest.xml` is already set up to read these values — you don't need to touch it:

```xml
<meta-data
    android:name="com.facebook.sdk.ApplicationId"
    android:value="@string/facebook_app_id" />
<meta-data
    android:name="com.facebook.sdk.ClientToken"
    android:value="@string/facebook_client_token" />
```

## Step 3: Add Credentials for iOS

Open:
```
ios/Runner/Info.plist
```

Update (or add) the following keys:

```xml
<key>FacebookAppID</key>
<string>YOUR_FACEBOOK_APP_ID</string>
<key>FacebookClientToken</key>
<string>YOUR_FACEBOOK_CLIENT_TOKEN</string>
<key>FacebookDisplayName</key>
<string>YOUR_APP_NAME</string>
<key>FacebookAutoLogAppEventsEnabled</key>
<true/>
<key>FacebookAdvertiserIDCollectionEnabled</key>
<true/>
```

Then install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

## Step 4: Clean and Rebuild

Credential changes in native config files require a full rebuild — hot reload/restart is not enough:

```bash
flutter clean
flutter pub get
flutter run
```

## Step 5: Connect the App in Meta Events Manager

1. Go to **Meta Events Manager** → **Connect Data Sources** → **App**.
2. Select your app using the same App ID you configured above.
3. Keep the app open and perform a few actions (open the app, view a course, sign up, etc.).
4. Check the **Test Events** tab in Meta Events Manager to confirm events are coming through in real time.

## Events Already Tracked in the App

No code changes are needed for these — they're already logged automatically at the right places in the app:

| Event | Triggered When |
|-------|-----------------|
| App Activated | App opens |
| Login | User logs in |
| Completed Registration | User signs up |
| Search | User searches for a course |
| Viewed Content | User opens a course details page |
| Added to Wishlist | User adds a course to wishlist |
| Added to Cart | User adds a course to cart |
| Initiated Checkout | User starts checkout |
| Purchase | User completes a paid order |
| Free Enroll | User enrolls in a free course |
| Wallet Top-up | User adds funds to their wallet |
| Rated | User rates a course |
| Unlocked Achievement | User completes a course |

If you need to track an additional custom event, it can be added alongside the existing ones in the app's Facebook events service — contact the development team if you'd like a new event added.

## Troubleshooting

**Q: No events are showing up in Meta Events Manager**
- Double-check the App ID and Client Token match exactly (no extra spaces).
- Make sure you did a full `flutter clean` + rebuild after changing `strings.xml` / `Info.plist`.
- Allow a few minutes — events can take some time to appear outside of the **Test Events** tab.

**Q: Events work on Android but not iOS (or vice versa)**
- Verify credentials were updated in **both** `strings.xml` (Android) and `Info.plist` (iOS) — they're configured separately per platform.

**Q: Build fails after updating Info.plist**
- Make sure `pod install` was run inside the `ios` folder after the change.

---
