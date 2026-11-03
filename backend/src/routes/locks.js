const express = require("express");
const router = express.Router({ mergeParams: true });
const { acquireLock, releaseLock, getLockStatus } = require("../services/smartLockService");

/**
 * POST /api/lots/:id/lock
 * Acquire 15-minute exclusive lock on a lot
 */
router.post("/:id/lock", (req, res) => {
  const lotId = req.params.id;
  const { buyerId = "BUY-CURRENT-USER", durationSeconds = 900 } = req.body;

  const result = acquireLock(lotId, buyerId, durationSeconds);
  if (!result.success) {
    return res.status(result.statusCode || 400).json(result);
  }

  return res.json({
    success: true,
    message: "Smart Lock berhasil aktif: kuota terkunci selama 15 menit",
    ...result
  });
});

/**
 * DELETE /api/lots/:id/lock
 * Release lock manually
 */
router.delete("/:id/lock", (req, res) => {
  const lotId = req.params.id;
  const { buyerId } = req.body;

  const result = releaseLock(lotId, buyerId);
  return res.json(result);
});

/**
 * GET /api/lots/:id/lock
 * Check lock status
 */
router.get("/:id/lock", (req, res) => {
  const lotId = req.params.id;
  const status = getLockStatus(lotId);
  return res.json({ success: true, lotId, ...status });
});

module.exports = router;
