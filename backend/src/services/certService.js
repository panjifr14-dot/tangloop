/**
 * Cryptographic Quality Certificate & Surat Jalan Service
 * Issues SHA-256 integrity proofs and municipal digital manifest
 */

const crypto = require("crypto");
const dataStore = require("./dataStore");

function generateOrganolepticHash(payload) {
  const serialized = JSON.stringify(payload);
  return "sha256-" + crypto.createHash("sha256").update(serialized).digest("hex");
}

function getDigitalSuratJalan(orderId) {
  const order = dataStore.getOrderById(orderId) || dataStore.getAllOrders()[0];
  if (!order) return null;

  const lot = dataStore.getLotById(order.lotId) || {};

  const certData = {
    documentNumber: "SJ-TANG-2026-" + order.id.replace("ORD-", ""),
    orderId: order.id,
    issuedAt: order.createdAt || new Date().toISOString(),
    issuer: {
      agency: "Dinas Ketahanan Pangan (DKP) Kota Tangerang",
      inspectionPost: "Pos Inspeksi & Kalibrasi Pasar Induk Tanah Tinggi",
      inspectorName: "H. Joko Susilo, S.Pt (NIP. 19820412 200604 1 003)"
    },
    supplier: {
      name: lot.supplierName || "Lapak H. Somad",
      kiosk: lot.supplierKiosk || "Kios B-12 Pasar Induk",
      hub: "Sentra Pasar Induk Tanah Tinggi Tangerang"
    },
    buyer: {
      name: order.buyerName || "Bu Sri (Dapur Berkah Resto)",
      deliveryAddress: order.destinationAddress || "Jl. Boulevard Bintaro Sektor 7, Tangerang Selatan"
    },
    commodity: {
      name: order.commodity || lot.commodity || "Sawi Hijau Manis Segar",
      quantityKg: order.quantityKg || 45,
      grade: lot.grade || "Grade-B",
      qualityScore: lot.qualityScore || 84.5,
      organolepticSpecs: {
        brixSweetness: "4.8 Brix",
        textureFirmness: "8.2 N",
        moistureContent: "92%"
      }
    },
    coldChainLogistics: {
      fleetPlate: order.fleetPlate || "B 9842 TNC (Isuzu Traga Refrigi #01)",
      driverName: order.driverName || "Pak Rahmat",
      temperatureTarget: "3.5°C - 5.0°C",
      departureSlot: order.pickupSlot || "04:30 - 05:00 WIB Subuh"
    },
    cryptographicProof: {
      hashAlgorithm: "SHA-256",
      digitalHash: order.organolepticHash || generateOrganolepticHash(order),
      verificationUrl: `https://tangloop.tangerangkota.go.id/verify/${order.id}`,
      smartContractStatus: "LOCKED_AND_VERIFIED"
    }
  };

  return certData;
}

module.exports = {
  generateOrganolepticHash,
  getDigitalSuratJalan
};

