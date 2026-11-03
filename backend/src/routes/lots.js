const express = require("express");
const router = express.Router();
const dataStore = require("../services/dataStore");
const { calculateDynamicPrice, getPriceDecayCurve } = require("../services/pricingService");
const { getLockStatus } = require("../services/smartLockService");

/**
 * GET /api/lots
 * Fetch active surplus catalog with real-time dynamic pricing
 */
router.get("/", (req, res) => {
  const { category, search, cluster } = req.query;
  let lots = dataStore.getAllLots();

  if (category && category !== "all") {
    lots = lots.filter(l => l.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    lots = lots.filter(l => 
      (l.commodity && l.commodity.toLowerCase().includes(q)) ||
      (l.supplierName && l.supplierName.toLowerCase().includes(q)) ||
      (l.category && l.category.toLowerCase().includes(q))
    );
  }

  // Attach dynamically computed price and lock status to each lot
  const enrichedLots = lots.map(lot => {
    const dynamicPrice = calculateDynamicPrice(lot);
    const lock = getLockStatus(lot.id);
    return {
      ...lot,
      currentPrice: dynamicPrice,
      isLocked: lock.isLocked,
      lockRemainingSeconds: lock.remainingSeconds
    };
  });

  return res.json({
    success: true,
    count: enrichedLots.length,
    marketCluster: cluster || "Pasar Induk Tanah Tinggi",
    data: enrichedLots
  });
});

/**
 * GET /api/lots/:id
 * Retrieve specific lot details, dynamic pricing decay curve, and sensor status
 */
router.get("/:id", (req, res) => {
  const lot = dataStore.getLotById(req.params.id);
  if (!lot) {
    return res.status(404).json({ error: "Lot tidak ditemukan" });
  }

  const dynamicPrice = calculateDynamicPrice(lot);
  const decayCurve = getPriceDecayCurve(lot);
  const lock = getLockStatus(lot.id);

  return res.json({
    success: true,
    data: {
      ...lot,
      currentPrice: dynamicPrice,
      decayCurve,
      lockStatus: lock
    }
  });
});

/**
 * POST /api/lots
 * Posting new surplus lot by market stall supplier
 */
router.post("/", (req, res) => {
  const {
    supplierName = "Lapak Pasar Induk",
    supplierKiosk = "Kios Sayur",
    commodity,
    category = "konsumsi",
    weightKg,
    basePrice,
    floorPrice,
    grade = "Grade-B",
    qualityScore = 85.0,
    img
  } = req.body;

  if (!commodity || !weightKg || !basePrice) {
    return res.status(400).json({ error: "Komoditas, kuantitas kg, dan harga acuan wajib diisi" });
  }

  const newLot = dataStore.createLot({
    supplierId: "SUP-" + Math.floor(100 + Math.random() * 900),
    supplierName,
    supplierKiosk,
    commodity,
    category,
    initialStockKg: Number(weightKg),
    remainingStockKg: Number(weightKg),
    basePrice: Number(basePrice),
    floorPrice: floorPrice ? Number(floorPrice) : Math.round(Number(basePrice) * 0.4),
    currentPrice: Number(basePrice),
    grade,
    qualityScore: Number(qualityScore),
    expiryHours: 24,
    expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    img: img || "https://lh3.googleusercontent.com/aida-public/AB6AXuCj2TRcy5ZTWb6VphYb7zeq-D-PkX_Aw_SSNt-L4Kt8KiEIYshOtX9tm95WaE8_QT-enCLBnnGNjQMSGKvKD0HH5AXvtBLCAL5BMdfUA8C5qTp89k1UDnXGQRukYm85jGUTwFeWimVB0bmfIsleQ-_Mo2aLiWAHhDGiMVIEiMYfLkvVAQGrv1P8x011JNblV_t3k5jfGr8hl0mCPIM_0PeyoYP9YUMgJYbTEsmYFcI",
    badgeColor: grade === "Grade-A" ? "bg-primary" : grade === "Grade-B" ? "bg-secondary" : "bg-red-600",
    verifiedBy: "AI Grading Auto-Verification"
  });

  return res.status(201).json({
    success: true,
    message: "Surplus lot berhasil diterbitkan ke katalog Beranda TANG-LOOP",
    data: newLot
  });
});

module.exports = router;

