/**
 * BroadcastChannel name shared between /auth/verify-email (listener) and
 * /confirm-email (sender). Using a namespaced string prevents collisions with
 * any other channel a future feature might open.
 */
export const EMAIL_CONFIRMED_CHANNEL = 'qbtech:email-confirmed';
