import { MOCK_COUPONS } from './constants';
import type { Coupon, PricingBreakdown } from './types';

/**
 * Pure pricing/coupon logic — no React, no i18n, no DOM. `OrderSummary` and
 * `CheckoutButton` both read from the same `PricingBreakdown` so the number
 * shown on the pay button can never drift from the one in the summary.
 */

/** No tax engine behind this demo checkout; kept as an explicit seam (not
 *  just a hidden zero) for whoever wires up a real one later. */
const TAX_RATE = 0;

export function resolveCoupon(rawCode: string): Coupon | null {
  const code = rawCode.trim().toUpperCase();
  if (!code) return null;
  return MOCK_COUPONS[code] ?? null;
}

export function computePricing(
  price: number,
  coupon: Coupon | null,
): PricingBreakdown {
  const discount = coupon ? round2((price * coupon.percentOff) / 100) : 0;
  const taxable = Math.max(0, price - discount);
  const tax = round2(taxable * TAX_RATE);
  const total = round2(taxable + tax);
  return { price, discount, tax, total, coupon };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}
