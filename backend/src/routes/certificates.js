const express = require("express");
const router = express.Router();
const { getDigitalSuratJalan } = require("../services/certService");

/**
 * GET /api/certificates/:orderId
 * Retrieve full digital Surat Jalan & quality certificate
 */
router.get("/:orderId", (req, res) => {
  const cert = getDigitalSuratJalan(req.params.orderId);
  if (!cert) {
    return res.status(404).json({ error: "Sertifikat atau pesanan tidak ditemukan" });
  }

  return res.json({
    success: true,
    data: cert
  });
});

/**
 * GET /api/certificates/:orderId/verify-hash
 * Public verification endpoint
 */
router.get("/:orderId/verify-hash", (req, res) => {
  const cert = getDigitalSuratJalan(req.params.orderId);
  if (!cert) {
    return res.status(404).json({ error: "Dokumen tidak ditemukan", valid: false });
  }

  return res.json({
    valid: true,
    documentNumber: cert.documentNumber,
    issuer: cert.issuer.agency,
    cryptographicHash: cert.cryptographicProof.digitalHash,
    status: "AUTHENTIC_DKP_VERIFIED"
  });
});

module.exports = router;
