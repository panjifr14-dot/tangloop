const express = require("express");
const router = express.Router();
const dataStore = require("../services/dataStore");
const { calculateDynamicPrice } = require("../services/pricingService");
const { getDigitalSuratJalan, generateOrganolepticHash } = require("../services/certService");

/**
 * GET /api/orders
 * List orders
 */
router.get("/", (req, res) => {
  const orders = dataStore.getAllOrders();
  return res.json({ success: true, count: orders.length, data: orders });
});

/**
 * GET /api/orders/:id
 * Get single order with complete logistics manifest
 */
router.get("/:id", (req, res) => {
  const order = dataStore.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Pesanan tidak ditemukan" });
  }

  const suratJalan = getDigitalSuratJalan(order.id);
  return res.json({
    success: true,
    data: {
      ...order,
      suratJalan
    }
  });
});

/**
 * POST /api/orders
 * Create order / checkout from locked lot
 */
router.post("/", (req, res) => {
  const {
    lotId,
    buyerId = "BUY-001",
    buyerName = "Bu Sri (Dapur Berkah Resto)",
    quantityKg,
    pickupSlot = "04:30 - 05:00 WIB Subuh",
    destinationAddress = "Jl. Boulevard Bintaro Sektor 7, Tangerang Selatan",
    paymentMethod = "QRIS Dinamis"
  } = req.body;

  if (!lotId) {
    return res.status(400).json({ error: "ID Lot wajib disertakan" });
  }

  const lot = dataStore.getLotById(lotId);
  if (!lot) {
    return res.status(404).json({ error: "Lot tidak ditemukan" });
  }

  const qty = Number(quantityKg) || lot.remainingStockKg;
  const currentPrice = calculateDynamicPrice(lot);
  const totalPrice = currentPrice * qty;
  const deliveryFee = 25000;
  const appFee = 5000;
  const grandTotal = totalPrice + deliveryFee + appFee;

  const orderPayload = {
    buyerId,
    buyerName,
    lotId,
    commodity: lot.commodity,
    quantityKg: qty,
    unitPrice: currentPrice,
    totalPrice,
    deliveryFee,
    appFee,
    grandTotal,
    paymentMethod,
    pickupSlot,
    destinationAddress,
    fleetPlate: "B 9842 TNC (Isuzu Traga Refrigi #01)",
    driverName: "Pak Rahmat (Koordinator Armada Subuh)",
    temperatureTarget: "3.5°C - 5.0°C",
    organolepticHash: lot.organolepticHash || generateOrganolepticHash({ lotId, buyerId, timestamp: Date.now() })
  };

  const newOrder = dataStore.createOrder(orderPayload);

  // Update remaining stock in lot
  dataStore.updateLot(lotId, {
    remainingStockKg: Math.max(0, lot.remainingStockKg - qty)
  });

  return res.status(201).json({
    success: true,
    message: "Pesanan surplus berhasil dibuat & Armada Subuh dijadwalkan",
    data: newOrder
  });
});

module.exports = router;
