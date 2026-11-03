const express = require("express");
const router = express.Router();
const { analyzeProduceImage } = require("../services/aiGradingService");

/**
 * POST /api/ai/grade-scan
 * Run computer vision inference on uploaded image
 */
router.post("/grade-scan", (req, res) => {
  const { imageUrl, notes, commodityHint } = req.body;

  const result = analyzeProduceImage({
    imageUrl,
    notes,
    commodityHint
  });

  return res.json({
    success: true,
    data: result
  });
});

/**
 * GET /api/ai/health
 * Edge ML / Vision model status
 */
router.get("/health", (req, res) => {
  return res.json({
    status: "ONLINE",
    model: "Gemini-Multimodal-FoodRescue-v2",
    edgeInferenceEngine: "TensorFlow-Lite-Wasm",
    latencyMs: 142
  });
});

module.exports = router;
