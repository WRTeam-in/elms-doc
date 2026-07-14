---
sidebar_position: 1
---

# User Authentication

Users can log in via phone number, email, Google, or Apple (iOS app only).

- **Phone & Email** – Login works with a password. First-time registration requires OTP verification for phone numbers and email link validation (via Firebase) for email accounts. Forgot password verification works similarly to registration, all handled through Firebase, after which the user is stored on the server.

![User Authentication](/images/features/user/user-auth.png)
