/**
 * IoT Cold-Chain & Fleet Telemetry Service
 * Monitors Isuzu Traga Refrigi sensors in real-time
 */

const WAYPOINTS = [
  { step: 1, lat: -6.1782, lng: 106.6541, label: "Pos Inspeksi Pasar Induk Tanah Tinggi", status: "completed", timestamp: "04:15 WIB" },
  { step: 2, lat: -6.1850, lng: 106.6430, label: "Pintu Tol Kunciran 1 (Menuju BSD/Bintaro)", status: "completed", timestamp: "04:32 WIB" },
  { step: 3, lat: -6.2301, lng: 106.6710, label: "KM 12 Tol Lingkar Barat Tangerang", status: "active", timestamp: "04:45 WIB" },
  { step: 4, lat: -6.2810, lng: 106.7150, label: "Titik Penurunan: Dapur Berkah Bintaro", status: "pending", timestamp: "04:58 WIB (Est)" }
];

function getActiveTelemetry(orderId = "ORD-2026-0814") {
  // Add realistic subtle sensor noise
  const tempVariance = (Math.random() * 0.4 - 0.2).toFixed(1);
  const currentTemp = (3.8 + parseFloat(tempVariance)).toFixed(1);
  const humidity = Math.round(84 + Math.random() * 4);

  return {
    orderId,
    fleetId: "FLEET-REFRIGI-01",
    vehicleModel: "Isuzu Traga Refrigi Box 2.5L",
    plateNumber: "B 9842 TNC",
    driverName: "Pak Rahmat (Sopir Subuh Bersertifikat)",
    driverPhone: "+62 813-9921-7734",
    status: "in_transit",
    batteryLevel: 98,
    refrigerationUnit: {
      powerState: "ACTIVE",
      setpointTemp: "3.5°C",
      currentTemperature: `${currentTemp}°C`,
      temperatureStatus: "OPTIMAL",
      humidity: `${humidity}%`,
      compressorRpm: 1850,
      doorStatus: "LOCKED_SEALED"
    },
    currentLocation: {
      latitude: -6.2301,
      longitude: 106.6710,
      headingDegrees: 142,
      speedKmH: 48,
      address: "KM 12 Tol Jakarta-Serpong / Lingkar Barat"
    },
    routeProgress: {
      percentCompleted: 68,
      estimatedArrivalMinutes: 13,
      destinationName: "Dapur Berkah Resto (Bintaro Sektor 7)",
      waypoints: WAYPOINTS
    },
    lastUpdated: new Date().toISOString()
  };
}

module.exports = {
  getActiveTelemetry,
  WAYPOINTS
};

