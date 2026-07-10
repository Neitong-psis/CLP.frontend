import { describe, expect, it } from 'vitest';
import { computePricing, formatCurrency, resolveCoupon } from './pricing';

describe('resolveCoupon', () => {
  it('matches a known code case-insensitively and trims whitespace', () => {
    expect(resolveCoupon(' save10 ')).toEqual({
      code: 'SAVE10',
      percentOff: 10,
    });
  });

  it('returns null for an unknown code', () => {
    expect(resolveCoupon('NOTREAL')).toBeNull();
  });

  it('returns null for an empty or blank code', () => {
    expect(resolveCoupon('')).toBeNull();
    expect(resolveCoupon('   ')).toBeNull();
  });
});

describe('computePricing', () => {
  it('charges the full price with no coupon', () => {
    expect(computePricing(49, null)).toEqual({
      price: 49,
      discount: 0,
      tax: 0,
      total: 49,
      coupon: null,
    });
  });

  it('applies a percentage discount', () => {
    const coupon = { code: 'SAVE10', percentOff: 10 };
    expect(computePricing(49, coupon)).toEqual({
      price: 49,
      discount: 4.9,
      tax: 0,
      total: 44.1,
      coupon,
    });
  });

  it('never lets a 100%-off coupon push the total negative', () => {
    const coupon = { code: 'FREE', percentOff: 100 };
    const result = computePricing(49, coupon);
    expect(result.total).toBe(0);
    expect(result.discount).toBe(49);
  });

  it('rounds to two decimal places', () => {
    const coupon = { code: 'ODD', percentOff: 33 };
    const result = computePricing(19.99, coupon);
    // 19.99 * 0.33 = 6.5967 → 6.6; total = 13.39, not a long float.
    expect(result.discount).toBe(6.6);
    expect(result.total).toBe(13.39);
  });

  it('is free for a $0 course regardless of coupon', () => {
    expect(computePricing(0, null).total).toBe(0);
  });
});

describe('formatCurrency', () => {
  it('formats whole and fractional USD amounts', () => {
    expect(formatCurrency(49)).toBe('$49.00');
    expect(formatCurrency(4.9)).toBe('$4.90');
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
