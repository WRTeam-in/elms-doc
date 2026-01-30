---
sidebar_position: 8
---

# Supervisor Setup

This section guides you through setting up Supervisor for managing queue workers in your eLMS installation.

Supervisor is a process control system that allows you to monitor and control a number of processes on UNIX-like operating systems. It is essential for ensuring your queue workers stay running.

## Queue Architecture

The system uses two separate queues for optimal resource management:

| Queue | Purpose | Workers | Timeout |
|---|---|---|---|
| `default` | Notifications, emails, general jobs | 2 | 1 hour |
| `video-encoding` | HLS video encoding (CPU intensive) | 1 | 2 hours |

This separation ensures:
- Video encoding doesn't block other jobs
- Resource-intensive encoding runs with limited concurrency
- Server stays responsive during heavy encoding

## Prerequisites

- Ubuntu/Debian/CentOS VPS with PHP 8.3+ installed
- Laravel application deployed
- FFmpeg installed for video encoding (optional but recommended)

## Finding Configuration Paths

:::warning Do not assume `/etc/supervisor/conf.d/` is used.
Hosting panels (aaPanel, cPanel, Plesk) often override this path and may only accept specific file extensions.
:::

Before installing the worker configuration, find where supervisor actually looks for config files on your server.

### Step 1: Find the Active Supervisor Configuration

```bash
# Get the supervisor process ID
sudo supervisorctl pid

# Check which config file supervisor is using
ps -fp $(sudo supervisorctl pid)
```

**Example output:**
```
/usr/bin/python3 /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
```
The file after `-c` is the main supervisor configuration file.

### Step 2: Find the Include Directory

```bash
# View the [include] section
sudo grep -A5 "\[include\]" /etc/supervisor/supervisord.conf
```

**Example output (standard installation):**
```ini
[include]
files = /etc/supervisor/conf.d/*.conf
```

**Example output (aaPanel / BT Panel):**
```ini
[include]
files = /www/server/panel/plugin/supervisor/profile/*.ini
```

This `files =` directive tells you **where** to place your worker config file and **what extension** it must have.

## Installation

### 1. Install Supervisor

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install supervisor

# CentOS/RHEL
sudo yum install epel-release
sudo yum install supervisor
```

### 2. Copy Configuration File

You can find a template configuration file in your project at `deployment/supervisor/elms-worker.conf`.

```bash
# Copy the worker config to supervisor's config directory (adjust path as needed)
sudo cp /var/www/html/elms-worker.conf /etc/supervisor/conf.d/

# If your application is in a different directory, update the paths in the config file
sudo nano /etc/supervisor/conf.d/elms-worker.conf
```

### 3. Update Configuration

Edit the copied configuration file and adjust:
- `command`: Update the path `/var/www/html/artisan` to your actual application path
- `user`: Change from `www-data` to your web server user (e.g., `nginx`, `apache`)
- `numprocs`: Number of worker processes per queue
- `stdout_logfile`: Update log file paths if needed

### 4. Start Supervisor

```bash
# Reload supervisor configuration
sudo supervisorctl reread
sudo supervisorctl update

# Start all workers
sudo supervisorctl start all
```

### 5. Enable Supervisor on Boot

```bash
sudo systemctl enable supervisor
```

## Management Commands

```bash
# View all process status
sudo supervisorctl status

# Start/Stop/Restart all workers
sudo supervisorctl start all
sudo supervisorctl stop all
sudo supervisorctl restart all

# Reload configuration (after changing .conf file)
sudo supervisorctl reread
sudo supervisorctl update
```

## Troubleshooting

### Workers not showing in status
- Check if the config file is in the correct directory found in "Finding Configuration Paths".
- Check if the file extension matches what Supervisor expects (`.conf` vs `.ini`).
- Run `sudo supervisorctl avail` to see if Supervisor detects the config but hasn't loaded it.

### Video Encoding Jobs Failing
- Check FFmpeg installation: `ffmpeg -version`
- Check worker logs: `sudo tail -f /path/to/your/logs/worker-video.log`
- Increase memory limit or timeout in the config if large videos fail.

### Permission Denied
- Ensure the `user` in the config file matches the owner of your web project files.
- Check logs: `sudo tail -50 /var/log/supervisor/supervisord.log`
