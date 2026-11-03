const express = require("express");
const router = express.Router();
const { evaluateValorizationRoute, TIERS } = require("../services/routingService");

/**
 * GET /api/routing/tiers
 * Returns 4-Tier circular valorization hierarchy
 */
router.get("/tiers", (req, res) => {
  return res.json({
    success: true,
    data: Object.values(TIERS)
  });
});

/**
 * POST /api/routing/evaluate
 * Evaluates produce metrics and returns optimal circular pathway
 */
router.post("/evaluate", (req, res) => {
  const {
    commodity = "Komoditas Surplus",
    organolepticScore = 80,
    residualHours = 24,
    cosmeticDefectPct = 10,
    weightKg = 50
  } = req.body;

  const result = evaluateValorizationRoute({
    commodity,
    organolepticScore: Number(organolepticScore),
    residualHours: Number(residualHours),
    cosmeticDefectPct: Number(cosmeticDefectPct),
    weightKg: Number(weightKg)
  });

  return res.json({
    success: true,
    data: result
  });
});

module.exports = router;
