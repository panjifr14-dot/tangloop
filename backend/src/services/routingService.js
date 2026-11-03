/**
 * Circular Valorization Router Service
 * Evaluates produce parameters against the 4-tier hierarchy
 * prioritizing human consumption over feed and compost.
 */

const TIERS = {
  TIER_1: {
    tier: 1,
    name: "Konsumsi Langsung UMKM",
    category: "konsumsi",
    minScore: 75,
    minHours: 24,
    economicRetentionPct: 85,
    co2eAvoidedPerKg: 2.5,
    targetPartners: "Restoran, Katering, Warteg, UMKM Kuliner Bintaro & Kota Tangerang",
    description: "Kondisi sangat baik, tekstur segar, layak langsung dikonsumsi tanpa proses pengolahan ekstrem."
  },
  TIER_2: {
    tier: 2,
    name: "Pengolahan Pangan (Sambal / Selai / Saus)",
    category: "pengolahan",
    minScore: 50,
    minHours: 12,
    economicRetentionPct: 65,
    co2eAvoidedPerKg: 2.1,
    targetPartners: "Industri Rumah Tangga Sambal Kemasan, Saus Cabai, Pasta Tomat",
    description: "Cacat kosmetik ringan atau ukuran tidak seragam, organoleptik aman untuk dimasak/diolah."
  },
  TIER_3: {
    tier: 3,
    name: "Pakan Ternak (Maggot BSF & Budidaya Lele)",
    category: "pakan",
    minScore: 25,
    minHours: 0,
    economicRetentionPct: 40,
    co2eAvoidedPerKg: 1.4,
    targetPartners: "Sentra Budidaya Maggot BSF Cipondoh & Kolam Lele Karawaci",
    description: "Kematangan lewat (overripe) atau memar berat, diubah menjadi biomas protein pakan berkualitas tinggi."
  },
  TIER_4: {
    tier: 4,
    name: "Kompos Organik TPST Rawa Kucing",
    category: "kompos",
    minScore: 0,
    minHours: 0,
    economicRetentionPct: 15,
    co2eAvoidedPerKg: 0.8,
    targetPartners: "TPST Rawa Kucing & Dinas Pertamanan Kota Tangerang",
    description: "Tingkat pembusukan tinggi, dialihkan ke reaktor pupuk kompos untuk menghindari penumpukan gas metana di TPA."
  }
};

function evaluateValorizationRoute({ organolepticScore = 80, residualHours = 24, cosmeticDefectPct = 10, commodity = "Komoditas Segar", weightKg = 50 }) {
  let recommendedTier = TIERS.TIER_4;

  if (organolepticScore >= 75 && residualHours >= 20 && cosmeticDefectPct <= 20) {
    recommendedTier = TIERS.TIER_1;
  } else if (organolepticScore >= 50 && residualHours >= 8) {
    recommendedTier = TIERS.TIER_2;
  } else if (organolepticScore >= 25) {
    recommendedTier = TIERS.TIER_3;
  } else {
    recommendedTier = TIERS.TIER_4;
  }

  const estimatedValuePerKg = Math.round(15000 * (recommendedTier.economicRetentionPct / 100));
  const totalEstimatedValue = estimatedValuePerKg * weightKg;
  const totalCo2eAvoidedKg = Math.round(weightKg * recommendedTier.co2eAvoidedPerKg * 10) / 10;

  return {
    commodity,
    weightKg,
    inputParameters: {
      organolepticScore,
      residualHours,
      cosmeticDefectPct
    },
    recommendedTier: recommendedTier.tier,
    tierName: recommendedTier.name,
    category: recommendedTier.category,
    economicRetentionPct: recommendedTier.economicRetentionPct,
    estimatedValuePerKg,
    totalEstimatedValue,
    totalCo2eAvoidedKg,
    targetPartners: recommendedTier.targetPartners,
    description: recommendedTier.description,
    hierarchyComparison: [TIERS.TIER_1, TIERS.TIER_2, TIERS.TIER_3, TIERS.TIER_4]
  };
}

module.exports = {
  TIERS,
  evaluateValorizationRoute
};

