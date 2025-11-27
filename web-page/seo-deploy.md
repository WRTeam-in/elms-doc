---
sidebar_position: 14
---

# Deploy the Site 

This guide will walk you through deploying the Web application.

## Prerequisites

:::warning
If you possess a VPS server along with some familiarity with [Node.js](https://nodejs.org/docs/latest/api/), [npm](https://docs.npmjs.com/), and [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/), you're well-equipped to deploy with SEO. Otherwise, feel free to use the [local build method](local-build) instead.
:::

## Required Resources
:::caution MANDATORY
1. **VPS Hosting**: A Virtual Private Server (VPS) is mandatory to ensure reliable performance and security. Shared hosting environments are not supported for this deployment method.
2. **Node.js Support**: The server must support Node.js , as it is essential for running the application with seo.
3. **Memory Requirements**: The server should have at least 3-4 GB of free RAM to handle the application's processes effectively.
4. **SSH Root Access**: The server must provide SSH root access to execute Node.js commands and manage the application.
:::

## Server Setup
:::warning
(For SEO) Deployment of Next.js requires knowledge of `node.js`, `npm`, and `pm2` technologies. We assume you are using a `debian`-based OS with apt as your package manager. If you are using another Linux distribution, replace apt with your system's package manager.
:::


## Project Upload

Before starting deployment, upload your project to the server. You can use [FileZilla](https://filezilla-project.org/download.php) or other file transfer methods.

### Installing NodeJS

NodeJS can be installed using NVM by which multi Node version can be controlled easily:

```bash
sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
command -v nvm
nvm install node 20.*
```

Check if node js is installed correctly:

```bash
node -v
```

For more information, refer to the [official documentation](https://nodejs.org/docs/latest/api/).

### Installing PM2 Server

By running the following command, PM2 server can be installed globally:

```bash
npm install pm2 -g
```

## Deployment Process

Refer to the [NextJS deployment](nextjsdeploy.md) section for detailed steps on how to:

1. Set available ports
2. Configure the server
3. Install dependencies
4. Build the project
5. Run the PM2 server

After successfully deploying with SEO, your site will have improved search engine visibility and performance.
