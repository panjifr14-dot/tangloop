/**
 * In-Memory Data Store & Seed Engine
 * Provides resilient, zero-crash state persistence for TANG-LOOP
 * Supports full CRUD operations whether running against Neon Postgres or standalone
 */

const SEED_LOTS = [
  {
    id: "LOT-TT-001",
    supplierId: "SUP-001",
    supplierName: "Lapak H. Somad",
    supplierKiosk: "Kios B-12",
    commodity: "Sawi Hijau Manis Segar",
    category: "konsumsi",
    initialStockKg: 50,
    remainingStockKg: 45,
    basePrice: 12000,
    floorPrice: 5000,
    currentPrice: 8582,
    grade: "Grade-B",
    qualityScore: 84.5,
    expiryHours: 18,
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 15 * 3600 * 1000).toISOString(),
    status: "published",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIEPI7bgFooD9c_g3JslbwM0ahH5DMVOmp70CFKKj8tkIqrDtSGwtAAUYamN75y_8gtWfQ_Narw_aWbW9jw5-Q98PSLSNN3EILDQ4OBHzaD6Qv6X4XQJvEAGYMXTi_6ZvQLdZ2LqM_dC6JvrqP5JkOrBdpeemc2kdgHA-YwCCJHPmBT6rOJhasmhfQUrMJP-GwsCx2mzmllFu7tMchyTmGDK0fOY2fbhNxTeTGPn4",
    badgeColor: "bg-primary",
    verifiedBy: "Petugas Pos Tanah Tinggi - DKP Banten",
    organolepticHash: "sha256-a94f8fe5ccb19ba61c4c0873d391e987982fbbd3"
  },
  {
    id: "LOT-TT-002",
    supplierId: "SUP-002",
    supplierName: "Lapak Bu Dewi",
    supplierKiosk: "Kios C-04",
    commodity: "Tomat Cherry Sortir Pasar",
    category: "pengolahan",
    initialStockKg: 35,
    remainingStockKg: 30,
    basePrice: 18000,
    floorPrice: 8000,
    currentPrice: 12988,
    grade: "Grade-A",
    qualityScore: 92.0,
    expiryHours: 24,
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 22 * 3600 * 1000).toISOString(),
    status: "published",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpLYJKf7oibDu0bDXgjTMGT32EdXVvDQsbQ7yZQFkHZTvenxd5iiaDAydaZryXL75hAlp0M5ANUcKFjIYm0yNVbcMTZjQ45XF_gfX52yBsuSGlHHzqMzIiNKFphnO4wr-l9m8D5y0JA2CqQLyh3lvEAfKdy09n5R9LS0iC8HrBrUdIbKY9Uj2hTzrdCYkc6irqdJnDqBzvh7Xjl1a7SmuoGe0Fetc0npHMFmdwLQA",
    badgeColor: "bg-secondary",
    verifiedBy: "Petugas Pos Tanah Tinggi - DKP Banten",
    organolepticHash: "sha256-c73ab6218d8442d87e076634125b09819f390e11"
  },
  {
    id: "LOT-TT-003",
    supplierId: "SUP-003",
    supplierName: "Lapak Buah Berkah",
    supplierKiosk: "Kios A-01",
    commodity: "Pepaya California Matang",
    category: "konsumsi",
    initialStockKg: 70,
    remainingStockKg: 65,
    basePrice: 9000,
    floorPrice: 4000,
    currentPrice: 6494,
    grade: "Grade-B",
    qualityScore: 81.0,
    expiryHours: 12,
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 8 * 3600 * 1000).toISOString(),
    status: "published",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZwAF8hQDEVmkNOeEnDheyzZVe-w-b5YCxnMcleecRBk61NP37WkvIoBdYxyIo1oAsAJ9SXNJQEgHB__sMRmVzbuILbyeY3G-kJgfdKKJnCGH5rqO-E4X8gG-TDgEBmKvG7lyUQiW_vLxrhHuaMJq1AysYRe1d0mHFV4_BG6wLIz3m2vY8sJ6AuW-FI3Uq1QMrwpXE4MQDX0eumBsqE8otF9wt2_ONeKnxo7j-54",
    badgeColor: "bg-secondary-container",
    verifiedBy: "Petugas Pos Tanah Tinggi - DKP Banten",
    organolepticHash: "sha256-ff101889271acb839384728ef192301983021944"
  },
  {
    id: "LOT-TT-004",
    supplierId: "SUP-004",
    supplierName: "CV Mitra Tani",
    supplierKiosk: "Lapak 08",
    commodity: "Cabai Merah Keriting",
    category: "pengolahan",
    initialStockKg: 25,
    remainingStockKg: 22,
    basePrice: 32000,
    floorPrice: 15000,
    currentPrice: 20709,
    grade: "Grade-C",
    qualityScore: 73.0,
    expiryHours: 14,
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + 9 * 3600 * 1000).toISOString(),
    status: "published",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuIHcY1SGyB4f19KfIsXdx4a_8xVheZ8xlqdMvoXBfiNB1OwxTyy6mU_O2JcQP2AuHuqAHycHjBWK5gTm-KG_evroF_oL5vYwZL6eVopKPQB3oICaD809l3Y6yjUwKZwhhxjWBOdHeNEBRMfUA3UDPktmylSDtbs1PpExqqjrA8iB7S-TlOAIMaqyi0ZNL0Dfr1yjd7hiAvu57_52j8AIug83EyPlCVHrjYXrdoPc",
    badgeColor: "bg-red-600",
    verifiedBy: "Petugas Pos Tanah Tinggi - DKP Banten",
    organolepticHash: "sha256-8390bcaefd8392182098018d9ef8219472190abc"
  }
];

const SEED_VERIFIER_QUEUE = [
  {
    id: "VRF-091",
    lotId: "LOT-TT-005",
    supplierName: "Lapak Sayur Berkah (Blok C-12)",
    commodity: "Kembang Kol & Brokoli",
    weightKg: 120,
    initialAiGrade: "Grade-B",
    aiScore: 78.4,
    flagReason: "AI Deteksi Bintik Cokelat > 15%",
    status: "kritis",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    priority: "Tinggi (Harus selesai sebelum Subuh)",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAANI79bm8zmdRaX8vGxcvsBIz1o4uP6rSdhqCY6HzqX6gZYp7d0Y2MFVwY1WpMFybcf_A5xq4GcdeSuXjttDiAkrkvkCq36l6RdKD9IHeI-o6JtTd5603wDwOI7R8aIjIKIZNQ2e3t9b7AdYAcq98HTm2U3U05Qy8M1SYDLRSIPUvKW7rhPY0d0xEVo7Z03Kdgk_37TCoBgXJiGMsruIhhtQbx4NSWe-WUh-jHvnk"
  },
  {
    id: "VRF-092",
    lotId: "LOT-TT-006",
    supplierName: "Grosir Buah Segar Nusantara",
    commodity: "Pisang Sunpride Sortir",
    weightKg: 250,
    initialAiGrade: "Grade-C",
    aiScore: 72.1,
    flagReason: "Kematangan Tinggi (Tingkat Gula > 19 Brix)",
    status: "kuning",
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    priority: "Sedang",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDA79RM68qBWWMdLqiehZgvv6cpFcFO72B0_pF1fI8ZhiG_UZ1WnVj1rKnmdnXwXSgFi21w0umDerUwR1Yuh7Fb_ovDjQ_6KWTQjVvo5Ji-HEFT011Op3wuDLGHqKgETRLrxLYPewHjhuvj3eIgNBah5czCgVXypoO2UnDADc7UUwGmkyx8woklLKTkjHDWWyOYDr8BpkFD8zFpYX0Me2Nwh-3l7ra4y62Yshc9Gt0"
  },
  {
    id: "VRF-093",
    lotId: "LOT-TT-007",
    supplierName: "UD Tani Mandiri",
    commodity: "Wortel Brastagi",
    weightKg: 80,
    initialAiGrade: "Grade-B",
    aiScore: 76.0,
    flagReason: "Patah Fisik & Ujung Kering",
    status: "kuning",
    createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    priority: "Normal",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI1Qm_VaMlzDpg9BVMUK5VP6paYyHTZ8II-20wyPGGdvzN_9bkGcEYVrbpP0JW-vSe9OFg9nybD-4rDAizpNoMq5hzy0lM4sPwPJEW3Qxvw_-WJm2IHt5xavUba8Owzi0uFI7SX-2P3WMR51_ub5HKNSLq1lwi3IUbXMgmeVgPAcTalAxX-_ATwuWqGxyg6x2s0_bKiZJnBJIntmhEBg_mWcEBK5eLfA19xh4sOUg"
  }
];

const SEED_ORDERS = [
  {
    id: "ORD-2026-0814",
    buyerId: "BUY-001",
    buyerName: "Bu Sri (Dapur Berkah Resto)",
    lotId: "LOT-TT-001",
    commodity: "Sawi Hijau Manis Segar",
    quantityKg: 45,
    unitPrice: 8582,
    totalPrice: 386190,
    deliveryFee: 25000,
    appFee: 5000,
    grandTotal: 416190,
    paymentMethod: "QRIS Dinamis / VA Bank Banten",
    status: "in_transit",
    pickupSlot: "04:30 - 05:00 WIB Subuh",
    destinationAddress: "Jl. Boulevard Bintaro Sektor 7, Tangerang Selatan",
    fleetPlate: "B 9842 TNC (Isuzu Traga Refrigi #01)",
    driverName: "Pak Rahmat (Koordinator Armada Subuh)",
    temperatureTarget: "3.5°C - 5.0°C",
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    organolepticHash: "sha256-a94f8fe5ccb19ba61c4c0873d391e987982fbbd3",
    qrCodeData: "https://tangloop.tangerangkota.go.id/verify/ORD-2026-0814"
  }
];

// Active locks: key = lotId, value = { buyerId, lockedAt, expiresAt, durationSeconds }
const activeLocks = new Map();

class DataStore {
  constructor() {
    this.lots = [...SEED_LOTS];
    this.verifierQueue = [...SEED_VERIFIER_QUEUE];
    this.orders = [...SEED_ORDERS];
    this.locks = activeLocks;
  }

  // --- Lots ---
  getAllLots() {
    return this.lots;
  }

  getLotById(id) {
    return this.lots.find(l => l.id === id);
  }

  createLot(lotData) {
    const id = "LOT-TT-" + String(this.lots.length + 1).padStart(3, "0");
    const newLot = {
      id,
      createdAt: new Date().toISOString(),
      status: "published",
      ...lotData
    };
    this.lots.unshift(newLot);
    return newLot;
  }

  updateLot(id, updates) {
    const idx = this.lots.findIndex(l => l.id === id);
    if (idx === -1) return null;
    this.lots[idx] = { ...this.lots[idx], ...updates };
    return this.lots[idx];
  }

  // --- Locks ---
  lockLot(lotId, buyerId, durationSeconds = 900) {
    const now = Date.now();
    const existing = this.locks.get(lotId);
    if (existing && existing.expiresAt > now && existing.buyerId !== buyerId) {
      return { success: false, reason: "Lot sedang dikunci oleh pembeli lain", lockedUntil: existing.expiresAt };
    }
    const expiresAt = now + durationSeconds * 1000;
    const lockInfo = { lotId, buyerId, lockedAt: now, expiresAt, durationSeconds };
    this.locks.set(lotId, lockInfo);
    return { success: true, lockInfo };
  }

  releaseLock(lotId, buyerId) {
    const existing = this.locks.get(lotId);
    if (existing && (!buyerId || existing.buyerId === buyerId)) {
      this.locks.delete(lotId);
      return true;
    }
    return false;
  }

  getLock(lotId) {
    const lock = this.locks.get(lotId);
    if (!lock) return null;
    if (Date.now() > lock.expiresAt) {
      this.locks.delete(lotId);
      return null;
    }
    return lock;
  }

  // --- Verifier Queue ---
  getVerifierQueue() {
    return this.verifierQueue;
  }

  getVerifierItem(id) {
    return this.verifierQueue.find(v => v.id === id);
  }

  approveVerifierItem(id, inspectionData) {
    const idx = this.verifierQueue.findIndex(v => v.id === id);
    if (idx === -1) return null;
    const item = this.verifierQueue[idx];
    this.verifierQueue.splice(idx, 1);

    // Publish to main lots catalog
    const newLot = {
      id: item.lotId,
      supplierId: "SUP-VERIF",
      supplierName: item.supplierName,
      supplierKiosk: "Pasar Induk",
      commodity: item.commodity,
      category: inspectionData.recommendedCategory || "konsumsi",
      initialStockKg: item.weightKg,
      remainingStockKg: item.weightKg,
      basePrice: inspectionData.basePrice || 14000,
      floorPrice: inspectionData.floorPrice || 6000,
      currentPrice: inspectionData.startingPrice || 10500,
      grade: inspectionData.finalGrade || "Grade-B",
      qualityScore: inspectionData.organolepticScore || 85.0,
      expiryHours: 24,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      status: "published",
      img: item.img,
      badgeColor: "bg-primary",
      verifiedBy: inspectionData.verifierName || "Petugas DKP Pos Tanah Tinggi",
      organolepticHash: inspectionData.hash || "sha256-" + Math.random().toString(36).substring(2)
    };
    this.lots.unshift(newLot);
    return newLot;
  }

  rejectVerifierItem(id, reason) {
    const idx = this.verifierQueue.findIndex(v => v.id === id);
    if (idx === -1) return null;
    const item = this.verifierQueue.splice(idx, 1)[0];
    return { item, redirectedTo: "TPST Rawa Kucing - Kompos Organik", reason };
  }

  // --- Orders ---
  getAllOrders() {
    return this.orders;
  }

  getOrderById(id) {
    return this.orders.find(o => o.id === id);
  }

  createOrder(orderData) {
    const id = "ORD-2026-" + String(Math.floor(1000 + Math.random() * 9000));
    const newOrder = {
      id,
      createdAt: new Date().toISOString(),
      status: "in_transit",
      ...orderData
    };
    this.orders.unshift(newOrder);

    // Release smart lock if any
    if (orderData.lotId) {
      this.locks.delete(orderData.lotId);
    }
    return newOrder;
  }
}

const storeInstance = new DataStore();
module.exports = storeInstance;
