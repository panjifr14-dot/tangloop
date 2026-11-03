/**
 * Dynamic Pricing Service
 * Implements exponential decay pricing formula:
 * P(t) = P_min + (P_max - P_min) * (t_sisa / T_total)^alpha
 * where alpha = 1.5
 */

function calculateDynamicPrice(lot) {
  const alpha = 1.5;
  const pMax = Number(lot.basePrice) || 12000;
  const pMin = Number(lot.floorPrice) || (pMax * 0.4);

  const createdAt = new Date(lot.createdAt).getTime();
  const expiresAt = new Date(lot.expiresAt).getTime();
  const now = Date.now();

  const totalTime = Math.max(expiresAt - createdAt, 1000);
  const remainingTime = Math.max(expiresAt - now, 0);

  if (remainingTime <= 0) {
    return pMin;
  }

  const ratio = Math.min(Math.max(remainingTime / totalTime, 0), 1);
  const decayFactor = Math.pow(ratio, alpha);
  const price = Math.round(pMin + (pMax - pMin) * decayFactor);

  return price;
}

/**
 * Generate 24-hour decay curve data points for the dynamic pricing chart
 */
function getPriceDecayCurve(lot) {
  const pMax = Number(lot.basePrice) || 12000;
  const pMin = Number(lot.floorPrice) || (pMax * 0.4);
  const alpha = 1.5;
  const steps = 12;
  const curve = [];

  for (let i = 0; i <= steps; i++) {
    const ratio = (steps - i) / steps;
    const decayFactor = Math.pow(ratio, alpha);
    const calculatedPrice = Math.round(pMin + (pMax - pMin) * decayFactor);
    curve.push({
      hourOffset: i * 2,
      timeLabel: `+${i * 2} Jam`,
      remainingRatio: ratio,
      price: calculatedPrice
    });
  }

  return {
    basePrice: pMax,
    floorPrice: pMin,
    currentPrice: calculateDynamicPrice(lot),
    alpha,
    curve
  };
}

module.exports = {
  calculateDynamicPrice,
  getPriceDecayCurve
};
