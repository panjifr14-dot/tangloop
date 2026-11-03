const express = require("express");
const cors = require("cors");
const path = require("path");

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

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "TANG-LOOP B2B Backend API",
    version: "2.0.0",
    city: "Kota Tangerang",
    deployment: process.env.VERCEL ? "vercel-serverless" : "standalone-express",
    timestamp: new Date().toISOString()
  });
});

// Mount modular feature routes under /api
app.use("/api/auth", authRoutes);
app.use("/api/lots", lotRoutes);
app.use("/api/lots", lockRoutes); // mergeParams handles /api/lots/:id/lock
app.use("/api/orders", orderRoutes);
app.use("/api/routing", routingRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/verifier", verifierRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/certificates", certRoutes);
app.use("/api/esg", esgRoutes);

// Root API documentation index
app.get("/api", (req, res) => {
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

module.exports = app;
