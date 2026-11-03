/**
 * Smart Lock Service
 * Provides exclusive 15-minute locks on surplus inventory
 * to avoid double-booking while buyer arranges payment/pickup.
 */

const dataStore = require("./dataStore");

const DEFAULT_LOCK_DURATION_SECONDS = 900; // 15 minutes

function acquireLock(lotId, buyerId, durationSeconds = DEFAULT_LOCK_DURATION_SECONDS) {
  const lot = dataStore.getLotById(lotId);
  if (!lot) {
    return { success: false, error: "Lot tidak ditemukan", statusCode: 404 };
  }

  const result = dataStore.lockLot(lotId, buyerId, durationSeconds);
  if (!result.success) {
    return {
      success: false,
      error: result.reason,
      lockedUntil: result.lockedUntil,
      statusCode: 409
    };
  }

  return {
    success: true,
    lotId,
    buyerId,
    durationSeconds,
    expiresAt: new Date(result.lockInfo.expiresAt).toISOString(),
    remainingSeconds: durationSeconds
  };
}

function releaseLock(lotId, buyerId) {
  const success = dataStore.releaseLock(lotId, buyerId);
  return { success, lotId };
}

function getLockStatus(lotId) {
  const lock = dataStore.getLock(lotId);
  if (!lock) {
    return { isLocked: false, remainingSeconds: 0 };
  }
  const remainingSeconds = Math.max(0, Math.floor((lock.expiresAt - Date.now()) / 1000));
  return {
    isLocked: true,
    buyerId: lock.buyerId,
    expiresAt: new Date(lock.expiresAt).toISOString(),
    remainingSeconds
  };
}

module.exports = {
  acquireLock,
  releaseLock,
  getLockStatus,
  DEFAULT_LOCK_DURATION_SECONDS
};
