/**
 * TANG-LOOP Unified Development Server
 * Combines Express API (/api/*) and static SPA frontend
 * Accessible on localhost:3000 and local WiFi network
 */

const express = require("express");
const path = require("path");
const os = require("os");
const app = require("./backend/src/app");

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

// Serve static frontend files
app.use(express.static(BASE_DIR));

// Fallback all non-API routes to index.html for SPA client-side routing
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(BASE_DIR, "index.html"));
});

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const server = app.listen(PORT, "0.0.0.0", () => {
  const localIp = getLocalIp();
  console.log("\n======================================================");
  console.log("🚀 TANG-LOOP B2B Food Rescue Full-Stack Server");
  console.log(`💻 Local Laptop : http://localhost:${PORT}`);
  console.log(`📱 Akses HP     : http://${localIp}:${PORT}`);
  console.log(`🔗 API Base     : http://localhost:${PORT}/api`);
  console.log(`⚡ Health Check : http://localhost:${PORT}/api/health`);
  console.log("======================================================\n");
});

module.exports = server;
