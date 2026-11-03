const express = require("express");
const router = express.Router();
const { generateOtp, verifyOtp, createSession, getSession, ROLES } = require("../config/auth");

/**
 * POST /api/auth/otp/send
 * Sends 4-digit OTP via WhatsApp bot gateway
 */
router.post("/otp/send", (req, res) => {
  const { phone, role = ROLES.BUYER } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Nomor WhatsApp wajib diisi" });
  }

  const otp = generateOtp(phone);
  return res.json({
    success: true,
    message: `Kode OTP 4-digit telah dikirimkan ke WhatsApp ${phone}`,
    phone,
    role,
    // In dev / demo mode, return the otp directly so testing is instantaneous
    demoOtp: otp,
    expiresInSeconds: 300
  });
});

/**
 * POST /api/auth/otp/verify
 * Verifies OTP code and issues session token
 */
router.post("/otp/verify", (req, res) => {
  const { phone, code, role = ROLES.BUYER, name, marketCluster } = req.body;
  if (!phone || !code) {
    return res.status(400).json({ error: "Nomor WhatsApp dan kode OTP wajib diisi" });
  }

  const isValid = verifyOtp(phone, code);
  if (!isValid) {
    return res.status(401).json({ error: "Kode OTP salah atau telah kedaluwarsa" });
  }

  const user = {
    id: "USR-" + Math.floor(1000 + Math.random() * 9000),
    name: name || (role === ROLES.SUPPLIER ? "H. Somad (Lapak Pasar)" : "Bu Sri (UMKM Kuliner)"),
    phone,
    role,
    marketCluster: marketCluster || "Pasar Induk Tanah Tinggi"
  };

  const session = createSession(user);

  return res.json({
    success: true,
    message: "Otorisasi berhasil",
    session
  });
});

/**
 * POST /api/auth/verifier/login
 * Internal municipal inspector login via NIP and Shift PIN
 */
router.post("/verifier/login", (req, res) => {
  const { nip, pin } = req.body;
  if (!nip || !pin) {
    return res.status(400).json({ error: "NIP Petugas dan PIN Shift Subuh wajib diisi" });
  }

  // Demo pass: PIN '198421' or any 6-digit PIN
  if (pin.length < 6) {
    return res.status(401).json({ error: "PIN Shift harus 6 digit angka" });
  }

  const inspectorUser = {
    id: "VRF-DKP-001",
    name: "H. Joko Susilo, S.Pt (DKP Kota Tangerang)",
    nip,
    role: ROLES.VERIFIER,
    marketCluster: "Pos Inspeksi Pasar Induk Tanah Tinggi",
    station: "Pos Jaga Subuh Pintu 2"
  };

  const session = createSession(inspectorUser);

  return res.json({
    success: true,
    message: "Login Petugas Verifikator DKP Berhasil",
    session
  });
});

/**
 * GET /api/auth/me
 * Checks token session validity
 */
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Tidak ada token sesi yang diberikan" });
  }

  const session = getSession(token);
  if (!session) {
    return res.status(401).json({ error: "Sesi telah kedaluwarsa atau tidak valid" });
  }

  return res.json({ success: true, session });
});

module.exports = router;

