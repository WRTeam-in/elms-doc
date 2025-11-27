---
sidebar_position: 1
---

# Introduction

This guide will walk you through deploying the Web application.

## Prerequisites

:::warning
If you possess a VPS server along with some familiarity with [Node.js](https://nodejs.org/docs/latest/api/), [npm](https://docs.npmjs.com/), and [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/), you're well-equipped to deploy.
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
