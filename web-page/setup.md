---
sidebar_position: 2
---

# How to setup Web Version

## Install Node.js

Visit Node.js official website: [https://nodejs.dev/en/learn/how-to-install-nodejs/](https://nodejs.dev/en/learn/how-to-install-nodejs/) for the full installation guide.

## Run the project

1. Unzip the downloaded code. After unzipping you will have News - Web Code Folder. Open it in Visual Studio Code.

2. Open VS Code terminal by typing **CTRL+J** in Windows/Linux, and for macOS **CMD+J** and execute the command --> **npm install**  
   This will take some time to download packages so wait for a few minutes.

3. After **npm install** finishes, run this command --> **npm run dev**  
   This command will start the development mode. Check if everything is working fine before proceeding further.

:::caution MANDATORY
The Web domain must be SSL for security reasons
:::

:::note IMPORTANT
News Web Version is built with Next.js v14.0.3 so you need to setup your Local Computer first.
:::

## Configuration Options

For detailed configuration options, see the following sections:

- [Setting API URL](domain-url.md)
- [Integrating Firebase](integrate-firebase.md)
- [Enabling Mobile Login](mobile-login.md)
