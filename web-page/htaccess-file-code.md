---
sidebar_position: 14
---

# .htaccess File Code

```
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^_next/(.*) /.next/$1 [L]
# Allow access to static files with specific extensions
RewriteCond %{REQUEST_URI} \.(js|css|svg|jpg|jpeg|png|gif)$
RewriteRule ^ - [L]
RewriteRule ^index.html http://127.0.0.1:8001/$1 [P]
RewriteRule ^index.php http://127.0.0.1:8001/$1 [P]
RewriteRule ^/?(.*)$ http://127.0.0.1:8001/$1 [P]     
</IfModule>                                  
```

![htaccessFIleCodeSeo](/images/web/htaccess_file_seo.png)

## For Nginx Servers

If your server is running Nginx, copy the following code and paste it into your server's `nginx.conf` file's server block:

```nginx
# nginx configuration by winginx.com
location ~ ^(.*)$ { }

location /_next {
 rewrite ^/_next/(.*) /.next/$1 break;
}

location / {
 if ($request_uri ~ "\.(js|css|svg|jpg|jpeg|png|gif)$"){
 rewrite ^/index.html http://127.0.0.1:8001/$1 redirect;
 }
 rewrite ^/?(.*)$ http://127.0.0.1:8001/$1 redirect;
}

location /index {
 rewrite ^/index.php http://127.0.0.1:8001/$1 redirect;
}
```
:::caution MANDATORY
Make sure you have paste this code inside server blocks.
:::
