const express = require("express");
const router = express.Router();
const dataStore = require("../services/dataStore");
const { generateOrganolepticHash } = require("../services/certService");

/**
 * GET /api/verifier/queue
 * Triaged lots waiting for human inspector validation
 */
router.get("/queue", (req, res) => {
  const queue = dataStore.getVerifierQueue();
  return res.json({
    success: true,
    count: queue.length,
    station: "Pos Jaga Tanah Tinggi Pintu 2",
    data: queue
  });
});

/**
 * GET /api/verifier/queue/:id
 * Specific inspection item
 */
router.get("/queue/:id", (req, res) => {
  const item = dataStore.getVerifierItem(req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Item antrean tidak ditemukan" });
  }
  return res.json({ success: true, data: item });
});

/**
 * POST /api/verifier/queue/:id/approve
 * Human verifier signs off and publishes lot to public catalog
 */
router.post("/queue/:id/approve", (req, res) => {
  const {
    finalGrade = "Grade-A",
    organolepticScore = 91.5,
    brix = "5.2 Brix",
    firmness = "8.4 N",
    verifierName = "H. Joko Susilo, S.Pt (DKP Banten)",
    recommendedCategory = "konsumsi",
    basePrice = 14000
  } = req.body;

  const inspectionProof = {
    finalGrade,
    organolepticScore,
    brix,
    firmness,
    verifierName,
    approvedAt: new Date().toISOString()
  };

  const hash = generateOrganolepticHash(inspectionProof);

  const publishedLot = dataStore.approveVerifierItem(req.params.id, {
    finalGrade,
    organolepticScore,
    recommendedCategory,
    basePrice,
    startingPrice: Math.round(basePrice * 0.75),
    verifierName,
    hash
  });

  if (!publishedLot) {
    return res.status(404).json({ error: "Item antrean tidak ditemukan atau sudah diproses" });
  }

  return res.json({
    success: true,
    message: "Lot berhasil diverifikasi, lencana DKP disematkan & sertifikat SHA-256 diterbitkan",
    lot: publishedLot,
    cryptographicProof: {
      algorithm: "SHA-256",
      hash
    }
  });
});

/**
 * POST /api/verifier/queue/:id/reject
 * Reject and redirect to animal feed or TPST Rawa Kucing compost
 */
router.post("/queue/:id/reject", (req, res) => {
  const { reason = "Busuk aktif melebihi batas toleransi konsumsi (Kematangan > 95%)" } = req.body;
  const result = dataStore.rejectVerifierItem(req.params.id, reason);

  if (!result) {
    return res.status(404).json({ error: "Item antrean tidak ditemukan" });
  }

  return res.json({
    success: true,
    message: "Lot dialihkan ke Kompos TPST Rawa Kucing",
    data: result
  });
});

module.exports = router;
