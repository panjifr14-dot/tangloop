const express = require("express");
const router = express.Router();
const { getActiveTelemetry, WAYPOINTS } = require("../services/telemetryService");

/**
 * GET /api/telemetry/active
 * Real-time GPS and temperature sensor data
 */
router.get("/active", (req, res) => {
  const { orderId } = req.query;
  const telemetry = getActiveTelemetry(orderId);
  return res.json({
    success: true,
    data: telemetry
  });
});

/**
 * GET /api/telemetry/route-history
 * Historic GPS waypoints along the dawn delivery route
 */
router.get("/route-history", (req, res) => {
  return res.json({
    success: true,
    data: WAYPOINTS
  });
});

module.exports = router;
