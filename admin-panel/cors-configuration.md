---
sidebar_position: 3.5
---

# CORS Configuration

By default the admin panel's `.env` file allows API requests from **any** domain:

```env
CORS_ALLOWED_ORIGINS=*
```

For a live (production) site, replace `*` with your own website URL. Browsers will then block your APIs from being called by any other domain.

## Steps

1. Open the `.env` file in the root folder of your admin panel.
2. Find the `CORS_ALLOWED_ORIGINS` line.
3. Replace `*` with your web URL, including `https://` and without a trailing slash:

   ```env
   CORS_ALLOWED_ORIGINS=https://yourdomain.com
   ```

4. To allow more than one domain, separate them with commas and no spaces:

   ```env
   CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   ```

5. Save the file and clear the config cache:

   ```bash
   php artisan config:clear
   ```

:::note
Use the exact URL that visitors open in their browser. `https://yourdomain.com` and `https://www.yourdomain.com` are different origins, so add both if you use both. If your web panel runs on a different port or subdomain, add that URL as well.
:::

:::info
CORS is enforced by browsers. It stops other websites from calling your APIs from a browser, but it does not block direct server-side requests (for example from Postman or cURL), and mobile apps are not affected by it. Keep authentication on your API routes as usual.
:::
