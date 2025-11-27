---
sidebar_position: 15
---

# NextJS Deployment

## Port Configuration

Before setting up the port, check available ports with this command:

```bash
sudo lsof -i -P -n | grep 8003
```

![Port Occupied](/images/web/port_occupy.png)

If you see a response like above, it means this port is occupied by another project. Try other ports like 8000, 8001, 8002, etc.

![Available Port](/images/web/available_port.png)

If you get no response, it means the port is available and you can use it.

Now add the available port to your `package.json` and `.htaccess` files:

![Package JSON](/images/web/package_json.png)

Copy the .htaccess file code and change the port number as needed.

![Htaccess File](/images/web/htaccess_file.png)

## Project Setup

:::warning
Make sure you have `node_modules` installed in your directory.
:::

Install project dependencies:

```bash
npm install
```

This will install all the node modules in your directory.

After that, build the production application:

```bash
npm run build
```

## Running the PM2 Server

Go to the project root and start the PM2 server:

```bash
pm2 start "npm start" -n "YOUR_PROJECT_NAME"
```

Check if PM2 process is running correctly:

```bash
pm2 ls
```

When you run `pm2 ls`, you will see one of two types of output:

1. Error:
   ![PM2 Error](/images/web/news_pm2_eerror.png)

2. Success:
   ![PM2 Success](/images/web/news_pm2.png)

If you're getting errors, run `pm2 logs` and check the error details.

If successful, set up a startup script to ensure PM2 restarts automatically after a system reboot:

```bash
pm2 startup
```

After setting up PM2 with the startup command, save the current process list 
```bash
pm2 save
```

If you want to restart your pm2 process then run pm2 restart id // Replace id with your process id

For example here id is 0 in the above screenshot **pm2 restart 0**

For deleting the previous project running in the PM2 server, use the following command
```bash
pm2 delete "YOUR_PROJECT_NAME"
```

Your News Web application should now be running with full SEO capabilities.
