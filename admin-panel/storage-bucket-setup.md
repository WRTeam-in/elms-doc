---
sidebar_position: 4.5
sidebar_label: Storage Bucket Setup
---

# Storage Bucket Setup

By default eLMS stores course videos, images and documents on your own server (**Local Disk**). For a live platform you can store them in a cloud bucket instead: **Amazon S3** or **Cloudflare R2**. This page shows how to create the bucket, get the access keys, connect it to eLMS, and fix the common errors, including the CORS errors that stop course videos and images from loading on the website.

:::info Which one should I choose?
- **Amazon S3**: the standard choice, available in every region.
- **Cloudflare R2**: S3-compatible and has **no egress (download) fee**, so it is cheaper for video streaming.

Both work the same way in eLMS. Pick one.
:::

## Before you start

- Open **Settings → System → Storage** in the admin panel. This is where you enter the keys.
- Know your **website domains** (the Next.js web URL, for example `https://yourdomain.com`, and your admin panel URL). You need them for the CORS setup.
- Keep your keys private. Never share them in screenshots or chats.

---

## Option A: Amazon S3

### 1. Create the bucket

1. Sign in to the [AWS Console](https://console.aws.amazon.com/) and open **S3**.
2. Click **Create bucket**.
3. Enter a **Bucket name** (for example `my-elms-bucket`) and choose an **AWS Region** (for example `ap-south-1`). Note both, you will need them.
4. Under **Block Public Access settings**, untick **Block all public access** and confirm the warning. Course files must be readable by your website and app.
5. Leave the other options as they are and click **Create bucket**.

### 2. Allow public read of files

Open the bucket → **Permissions** → **Bucket policy** → **Edit**, and paste the following. Replace `my-elms-bucket` with your bucket name.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadForElms",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-elms-bucket/*"
    }
  ]
}
```

Click **Save changes**.

### 3. Add the CORS rule (important)

Open the bucket → **Permissions** → **Cross-origin resource sharing (CORS)** → **Edit**, and paste the following. Replace the domains with your own.

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://www.yourdomain.com",
      "https://admin.yourdomain.com"
    ],
    "ExposeHeaders": ["ETag", "Content-Length", "Content-Range"],
    "MaxAgeSeconds": 3000
  }
]
```

:::tip
Use the exact domain, with `https://` and **no trailing slash**. While testing you can temporarily use `"*"` in `AllowedOrigins`, but change it to your real domains for production.
:::

### 4. Create an access key

Create a dedicated user for eLMS instead of using your main AWS account.

1. Open **IAM → Users → Create user**. Name it, for example, `elms-storage`.
2. Choose **Attach policies directly → Create policy → JSON** and paste the following (replace the bucket name):

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
         "Resource": "arn:aws:s3:::my-elms-bucket"
       },
       {
         "Effect": "Allow",
         "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"],
         "Resource": "arn:aws:s3:::my-elms-bucket/*"
       }
     ]
   }
   ```

3. Attach this policy to the user and finish creating it.
4. Open the user → **Security credentials** → **Create access key** → choose **Application running outside AWS**.
5. Copy the **Access key ID** and the **Secret access key**. The secret is shown **only once**, so save it now.

### 5. Enter the details in eLMS

In **Settings → System → Storage**, choose **Amazon S3** and fill in:

| eLMS field | What to enter |
|---|---|
| **S3 Access Key ID** | The access key ID from step 4. |
| **S3 Secret Access Key** | The secret access key from step 4. |
| **S3 Bucket Name** | Your bucket name, for example `my-elms-bucket`. |
| **AWS Region** | The bucket region, for example `ap-south-1`. |
| **Custom S3 Endpoint** | Leave empty for Amazon S3. Use it only for S3-compatible services such as Wasabi or MinIO. |

Click **Test Connection**, then **Submit**. See [After saving](#after-saving).

---

## Option B: Cloudflare R2

### 1. Create the bucket

1. Sign in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and open **R2 Object Storage**. (You may need to add a payment method first. R2 has a free tier.)
2. Click **Create bucket**, enter a name (for example `my-r2-bucket`) and create it.

### 2. Copy your Account ID

On the **R2 Object Storage** overview page, copy the **Account ID** (a 32-character value). It is also shown in the dashboard under **Account Overview**.

### 3. Create an API token (access keys)

1. On the R2 overview page, click **Manage R2 API Tokens** → **Create API token**.
2. Set the permission to **Object Read & Write**.
3. Under **Specify bucket(s)**, choose your bucket (recommended), then click **Create API Token**.
4. Copy the **Access Key ID** and **Secret Access Key**. The secret is shown **only once**.

### 4. Make files publicly readable

Open the bucket → **Settings** → **Public access**. Choose one:

- **R2.dev subdomain**: click **Allow Access**. You get a URL like `https://pub-xxxxxxxx.r2.dev`. Good for testing.
- **Custom domain** (recommended for production): click **Connect Domain** and use a domain or subdomain on your Cloudflare account, for example `https://cdn.yourdomain.com`.

Copy this public URL. You will paste it into eLMS as **R2 Public URL**.

### 5. Add the CORS policy (important)

Open the bucket → **Settings** → **CORS Policy** → **Add CORS policy**, and paste the following (replace the domains):

```json
[
  {
    "AllowedOrigins": [
      "https://yourdomain.com",
      "https://www.yourdomain.com",
      "https://admin.yourdomain.com"
    ],
    "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "Content-Length", "Content-Range"],
    "MaxAgeSeconds": 3000
  }
]
```

### 6. Enter the details in eLMS

In **Settings → System → Storage**, choose **Cloudflare R2** and fill in:

| eLMS field | What to enter |
|---|---|
| **R2 Access Key ID** | The access key ID from step 3. |
| **R2 Secret Access Key** | The secret access key from step 3. |
| **R2 Bucket Name** | Your bucket name, for example `my-r2-bucket`. |
| **Cloudflare Account ID** | The 32-character account ID from step 2. |
| **R2 S3 API Endpoint** | Filled in automatically from the Account ID (`https://<account-id>.r2.cloudflarestorage.com`). Change it only if you use a custom endpoint. |
| **R2 Public URL** | The public URL from step 4, for example `https://cdn.yourdomain.com`. Without it, files may not load on the website. |

Click **Test Connection**, then **Submit**.

---

## After saving

1. Make sure the connection shows **Online & Connected** at the top of the Storage tab.
2. Upload a small test lecture or image and open it on the website to confirm it loads.
3. The new driver applies to **newly uploaded** files. To move existing files, use the **File Migration Tool** (**Settings → File Migration**): click **Scan & Sync Files**, then migrate. Migration runs in the background, so make sure your [queue workers](./supervisor-setup.md) are running.
4. Keep the old files until you have checked that everything loads from the bucket.

:::note
If the cloud settings are incomplete or invalid, eLMS automatically falls back to **Local Disk** so the site keeps working. If your files are still going to your server after you saved, the credentials are probably wrong. Run **Test Connection** again.
:::

---

## Troubleshooting Storage and Course Errors

Most problems come from three things: **CORS**, **public access** and **wrong keys**.

### Course video or image does not load on the website (CORS error)

**Symptom:** The player stays black or spins, images are missing, and the browser console (press `F12` → **Console**) shows a message like `blocked by CORS policy: No 'Access-Control-Allow-Origin' header`.

**Fix:**
1. Add or correct the CORS rule on the bucket (see the steps above for [S3](#3-add-the-cors-rule-important) or [R2](#5-add-the-cors-policy-important)).
2. `AllowedOrigins` must contain the **exact** web domain, with `https://` and no trailing slash. Add both the `www` and non-`www` versions if you use both.
3. Allow the `GET` and `HEAD` methods, and expose `Content-Range` and `Content-Length`, which the video player needs.
4. Wait a minute, then hard refresh the page (`Ctrl + Shift + R`). Cloudflare and browsers may cache the old response.

### HLS video does not play, or `.m3u8` / `.ts` files are blocked

HLS videos are loaded as many small files by the player in the browser, so each file must be allowed by CORS.

- Apply the CORS rule above to the **same bucket** that stores the encoded videos.
- If you use a **custom domain** on R2 or CloudFront, make sure the CORS headers are not removed by a caching or transform rule.
- Check that `elms-video-encoding` is `RUNNING` (see [Queue Setup](./supervisor-setup.md)).

### `403 Forbidden` or `AccessDenied` when opening a file

- **S3:** Untick **Block all public access** on the bucket and add the public read [bucket policy](#2-allow-public-read-of-files). Also check that the bucket name in the policy matches exactly.
- **R2:** Turn on **Public access** (R2.dev subdomain or a custom domain) and put that URL in **R2 Public URL**.

### `Connection failed` when you click Test Connection

| Message | Cause and fix |
|---|---|
| `The AWS Access Key Id you provided does not exist` | Wrong access key ID, or the key was deleted. Create a new key. |
| `SignatureDoesNotMatch` | Wrong secret key, or extra spaces when pasting. Paste it again without spaces. |
| `AccessDenied` / `not authorized` | The IAM user or R2 token has no write permission. Check the IAM policy or choose **Object Read & Write** for R2. |
| `NoSuchBucket` | Wrong bucket name. Names are case-sensitive. |
| `The bucket you are attempting to access must be addressed using the specified endpoint` | Wrong **AWS Region**. Use the exact region of the bucket. |
| `Could not resolve host` / timeout | Wrong or incomplete Account ID or endpoint (R2), or your server blocks outgoing connections. |
| `Configuration is incomplete` | A required field is empty. |

### Files are still saved on my server

The cloud credentials are missing or invalid, so eLMS fell back to **Local Disk**. Fix the keys, run **Test Connection**, then submit again. Check `storage/logs/laravel.log` for the exact error.

### Video upload fails or is very slow

- Check **Maximum Video Upload Size** in **Settings → System → General**, and your server's `upload_max_filesize` and `post_max_size`.
- Make sure the `video-process` queue worker is running. It moves the uploaded file to the bucket (see [Queue Setup](./supervisor-setup.md)).
- Make sure the CORS rule allows `PUT` and `POST`, and your server date and time are correct (a wrong clock causes signature errors).

### Images load on the admin panel but not on the website (or the other way round)

Add **both** domains to `AllowedOrigins`: your website and your admin panel.

### Mixed content error (`blocked: mixed content`)

Your website uses `https://` but the file URL starts with `http://`. Use an `https://` custom domain or the R2.dev `https` URL, and an HTTPS endpoint.

---

## Making sure the website can read bucket data

The Next.js website loads images, videos and HLS files **directly from the bucket in the visitor's browser**. For this to work:

1. **Public read** is enabled on the bucket (S3 bucket policy, or R2 public access).
2. **CORS** lists the exact web domain (`https://yourdomain.com`).
3. If you use image optimisation in Next.js, add the bucket host to the allowed image domains in your web project's `next.config.js`:

   ```js
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: 'my-elms-bucket.s3.ap-south-1.amazonaws.com' },
       { protocol: 'https', hostname: 'cdn.yourdomain.com' },
     ],
   },
   ```

   Use your own bucket host or CDN domain, then rebuild and redeploy the web project.
4. If you have a **Content Security Policy**, allow the bucket domain in `img-src` and `media-src`.

To check from the command line, replace the URL with a real file URL from your bucket and the origin with your web domain:

```bash
curl -I -H "Origin: https://yourdomain.com" https://cdn.yourdomain.com/path/to/file.jpg
```

The response should be `200 OK` and include `access-control-allow-origin: https://yourdomain.com`. If that header is missing, the CORS rule is not applied.

:::tip Security
- Use a dedicated key for eLMS with access to **one bucket only**.
- Never commit keys to Git or share them in screenshots.
- If a key is exposed, delete it in AWS or Cloudflare and create a new one.
:::
