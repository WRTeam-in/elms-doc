---
sidebar_position: 7
---

# Payment Gateway Settings


![Payment Gateway Settings](../static/images/admin/11.png)

## Stripe
1. Log in to the Stripe dashboard — https://dashboard.stripe.com/
2. You will find your Publishable key and Secret key in the dashboard.

![Stripe](../static/images/admin/14.png)
3. Docs - https://docs.stripe.com/payments?payments=popular

## Razorpay

1. Go to https://dashboard.razorpay.com/ and sign in with your Razorpay account
![Razorpay](../static/images/admin/15.png)
2. Click Settings
![Razorpay](../static/images/admin/16.png)
3. Click Api keys
![Razorpay](../static/images/admin/17.png)
4. Genetare new key or regenerate key and copy it. <br/> 
![Razorpay](../static/images/admin/18.png)

## Flutterwave

1. Log in to the Flutterwave dashboard — https://app.flutterwave.com/login
2. In Settings → Developers → API Keys, you can find your keys.
![Flutterwave](../static/images/admin/13.png)
3. Docs - https://developer.flutterwave.com/docs/getting-started?_gl=1*1xkvvzx*_gcl_au*MTQxNjg3NzkzOC4xNzY0MjU2Nzg1*_ga*MTg3MTEwMDMzNy4xNzY0MjMwNzI5*_ga_KQ9NSEMFCF*czE3NjQyNTY3NDgkbzEkZzEkdDE3NjQyNTY3ODUkajIzJGwwJGgw 

## Apple Pay / App Store

### 1. Issuer ID, Key ID, and Private Key (.p8)

**Where:** App Store Connect → Users and Access → Integrations → App Store Connect API  
**Link:** [App Store Connect API](https://appstoreconnect.apple.com/access/integrations/api)

**Steps:**
1. Log in to App Store Connect with an Admin or Account Holder role.
2. Go to **Users and Access** → **Integrations** → **App Store Connect API**.
3. Click the **Keys** tab (In-App Purchase keys, not Team keys).
4. Click **"+"** to generate a new key.
5. Give it a name (e.g., "IAP Server Key") and select the **In-App Purchase** key type.
6. Click **Generate**.
7. Copy the **Key ID** shown in the table.
8. Download the **.p8 file** — you can only download it once, so save it securely.
9. The **Issuer ID** is shown at the top of the page.

Open the `.p8` file in a text editor and paste the full contents (including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines) into the Private Key field.

![App Store](../static/images/admin/app_store.png)

### 2. Bundle ID

**Where:** App Store Connect → Apps → [Your App] → General → App Information  
**Links:** 
- [App Store Connect Apps](https://appstoreconnect.apple.com/apps)
- [Apple Developer Portal - Identifiers](https://developer.apple.com/account/resources/identifiers/list)

It's your iOS app's bundle identifier, e.g., `com.demo.customer`.

### 3. Environment

- **Sandbox (Testing):** Use this during development/testing.
- **Production:** Switch to this when your app is live on the App Store.

### 4. App Store Server Notifications URL

**Where:** App Store Connect → Apps → [Your App] → App Information → App Store Server Notifications  
**Link:** [App Store Connect](https://appstoreconnect.apple.com/apps) → select your app → **App Information** (left sidebar) → scroll to **App Store Server Notifications**.

**Steps:**
1. Set the **Production Server URL** and **Sandbox Server URL** to the webhook URL shown in your settings panel (replace `127.0.0.1:8000` with your actual production domain).
2. Select **Version 2** for notifications (recommended).

---

**Important Notes:**
- You need an Apple Developer Program membership ($99/year): [Apple Developer Programs](https://developer.apple.com/programs/)
- The API key must be of type **In-App Purchase** (not App Store Connect team keys).
- For production, your webhook URL must be **HTTPS** on a public domain — `127.0.0.1` won't work.

## Store Credit
![Store Credit](../static/images/admin/store_credit.png)