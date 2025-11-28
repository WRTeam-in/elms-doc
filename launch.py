import http.server
import socketserver
import webbrowser
import os

# ---------- SETTINGS ----------
FOLDER_TO_SERVE = "./build"    # folder you want to serve
PORT = 8000                  # localhost port
# ------------------------------

# Change directory to the folder to serve
os.chdir(FOLDER_TO_SERVE)

# Start server
handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), handler)

# Open browser automatically
url = f"http://localhost:{PORT}"
print(f"Serving '{FOLDER_TO_SERVE}' at {url}")
webbrowser.open(url)

# Run server forever
httpd.serve_forever()
