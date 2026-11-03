const express = require("express");
const router = express.Router();
const { getEsgDashboardMetrics } = require("../services/esgService");

/**
 * GET /api/esg/dashboard
 * Aggregated ESG, CO2e reduction, SDG 2/11/12 indicators
 */
router.get("/dashboard", (req, res) => {
  const metrics = getEsgDashboardMetrics();
  return res.json({
    success: true,
    data: metrics
  });
});

/**
 * GET /api/esg/report/export
 * Export audit report metadata
 */
router.get("/report/export", (req, res) => {
  const metrics = getEsgDashboardMetrics();
  return res.json({
    success: true,
    exportMeta: {
      title: "Laporan Dampak Keberlanjutan & Ekonomi Sirkular Kota Tangerang (TANG-LOOP)",
      period: "Kuartal 1 - 2026",
      auditor: "Bappeda Kota Tangerang & Dinas Lingkungan Hidup",
      downloadUrl: "https://tangloop.tangerangkota.go.id/reports/TANG-LOOP-ESG-Q1-2026.pdf",
      metrics: metrics.summary
    }
  });
});

module.exports = router;

