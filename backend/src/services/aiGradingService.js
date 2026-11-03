/**
 * AI Computer Vision & Organoleptic Grading Service
 * Simulates on-device / edge ML inference and Gemini Multimodal vision
 * Flags lots with confidence < 80% or defect > 15% to verifier queue
 */

const dataStore = require("./dataStore");

function analyzeProduceImage({ imageUrl, notes = "", commodityHint = "" }) {
  // Deterministic simulation based on commodity hint or realistic random variance
  const hintLower = (commodityHint || "").toLowerCase();

  let commodity = "Tomat Sortir Pasar";
  let grade = "Grade-B";
  let confidence = 86.4;
  let defectPct = 8.2;
  let estimatedWeightKg = 45;
  let recommendedCategory = "konsumsi";
  let shelfLifeDays = 2.5;

  if (hintLower.includes("sawi") || hintLower.includes("sayur")) {
    commodity = "Sawi Hijau Manis Segar";
    grade = "Grade-B";
    confidence = 88.5;
    defectPct = 6.0;
    estimatedWeightKg = 50;
    recommendedCategory = "konsumsi";
    shelfLifeDays = 2.0;
  } else if (hintLower.includes("cabe") || hintLower.includes("cabai")) {
    commodity = "Cabai Merah Keriting";
    grade = "Grade-C";
    confidence = 74.0; // below 80 -> triggers verifier!
    defectPct = 18.5;
    estimatedWeightKg = 25;
    recommendedCategory = "pengolahan";
    shelfLifeDays = 1.5;
  } else if (hintLower.includes("pepaya") || hintLower.includes("buah")) {
    commodity = "Pepaya California Matang";
    grade = "Grade-B";
    confidence = 82.0;
    defectPct = 11.0;
    estimatedWeightKg = 65;
    recommendedCategory = "konsumsi";
    shelfLifeDays = 1.0;
  } else {
    // Generate high quality default
    confidence = Math.round((75 + Math.random() * 20) * 10) / 10;
    defectPct = Math.round((4 + Math.random() * 16) * 10) / 10;
    if (confidence >= 85) grade = "Grade-A";
    else if (confidence >= 75) grade = "Grade-B";
    else grade = "Grade-C";
  }

  const needsHumanVerification = confidence < 80.0 || defectPct > 15.0;

  const result = {
    commodity,
    grade,
    confidenceScore: confidence,
    defectPercentage: defectPct,
    estimatedWeightKg,
    recommendedCategory,
    shelfLifeDays,
    needsHumanVerification,
    verificationReason: needsHumanVerification
      ? "Skor kepercayaan AI di bawah 80% atau cacat visual > 15% — dialihkan ke Antrean Verifikator DKP"
      : "Mutu terverifikasi otomatis AI (Skor ≥ 80%) — siap terbit langsung",
    boundingBoxes: [
      { label: commodity, box: [120, 85, 340, 290], confidence: confidence / 100 },
      { label: "Permukaan Segar", box: [140, 100, 220, 180], confidence: 0.92 },
      { label: defectPct > 10 ? "Bintik Memar" : "Tekstur Kencang", box: [260, 210, 310, 270], confidence: 0.81 }
    ],
    timestamp: new Date().toISOString()
  };

  return result;
}

module.exports = {
  analyzeProduceImage
};
