const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const lotRoutes = require("./routes/lots");
const lockRoutes = require("./routes/locks");
const orderRoutes = require("./routes/orders");
const routingRoutes = require("./routes/routing");
const aiRoutes = require("./routes/ai");
const verifierRoutes = require("./routes/verifier");
const telemetryRoutes = require("./routes/telemetry");
const certRoutes = require("./routes/certificates");
const esgRoutes = require("./routes/esg");

const app = express();

// Global middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health Check Endpoint
app.get(["/api/health", "/health"], (req, res) => {
  res.json({
    status: "ok",
    service: "TANG-LOOP B2B Backend API",
    version: "2.0.0",
    city: "Kota Tangerang",
    deployment: process.env.VERCEL ? "vercel-serverless" : "standalone-express",
    timestamp: new Date().toISOString()
  });
});

// Root API documentation index
app.get(["/api", "/api/"], (req, res) => {
  res.json({
    name: "TANG-LOOP Backend API",
    description: "Hyperlocal B2B Food Rescue & Circular Valorization API for Kota Tangerang",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      lots: "/api/lots",
      smartLock: "/api/lots/:id/lock",
      orders: "/api/orders",
      valorizationRouter: "/api/routing",
      aiGrading: "/api/ai",
      verifierQueue: "/api/verifier/queue",
      telemetry: "/api/telemetry/active",
      certificates: "/api/certificates/:orderId",
      esgDashboard: "/api/esg/dashboard"
    }
  });
});

// Feature routers: mount with both /api and root prefixes for maximum Vercel rewrite compatibility
app.use(["/api/auth", "/auth"], authRoutes);
app.use(["/api/lots", "/lots"], lotRoutes);
app.use(["/api/lots", "/lots"], lockRoutes);
app.use(["/api/orders", "/orders"], orderRoutes);
app.use(["/api/routing", "/routing"], routingRoutes);
app.use(["/api/ai", "/ai"], aiRoutes);
app.use(["/api/verifier", "/verifier"], verifierRoutes);
app.use(["/api/telemetry", "/telemetry"], telemetryRoutes);
app.use(["/api/certificates", "/certificates"], certRoutes);
app.use(["/api/esg", "/esg"], esgRoutes);

// Fallback 404 handler for API routes
app.use((req, res) => {
  res.status(404).json({
    error: "API route not found",
    path: req.url,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Express global error handler:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message
  });
});

module.exports = app;
