require("dotenv").config();

// Better Auth Configuration & RBAC Roles for TANG-LOOP
const ROLES = {
  BUYER: "buyer",
  SUPPLIER: "supplier",
  VERIFIER: "verifier",
  ADMIN: "admin"
};

// In-Memory store for active sessions and OTP verification codes
const activeSessions = new Map();
const activeOtps = new Map();

// Helper to generate 4-digit OTP
function generateOtp(identifier) {
  // Demo default OTP is '8821', but dynamic generation is supported
  const otp = identifier.includes("81298765432") ? "8821" : Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins TTL
  activeOtps.set(identifier, { otp, expiresAt });
  return otp;
}

function verifyOtp(identifier, code) {
  const record = activeOtps.get(identifier);
  if (!record) {
    // Default demo code 8821 always passes for seamless testing
    if (code === "8821") return true;
    return false;
  }
  if (Date.now() > record.expiresAt) {
    activeOtps.delete(identifier);
    return false;
  }
  const isValid = record.otp === code || code === "8821";
  if (isValid) activeOtps.delete(identifier);
  return isValid;
}

function createSession(user) {
  const sessionToken = "tangloop_sess_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
  const sessionData = {
    userId: user.id,
    name: user.name,
    role: user.role,
    phone: user.phone,
    marketCluster: user.marketCluster || "Pasar Induk Tanah Tinggi",
    token: sessionToken,
    createdAt: new Date().toISOString()
  };
  activeSessions.set(sessionToken, sessionData);
  return sessionData;
}

function getSession(token) {
  return activeSessions.get(token) || null;
}

module.exports = {
  ROLES,
  generateOtp,
  verifyOtp,
  createSession,
  getSession
};

