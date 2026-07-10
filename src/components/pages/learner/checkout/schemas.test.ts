import { describe, expect, it } from 'vitest';
import { billingSchema, cardSchema, checkoutFormSchema } from './schemas';

describe('billingSchema', () => {
  it('accepts a valid billing record', () => {
    const result = billingSchema.safeParse({
      fullName: 'Keo Hengneitong',
      email: 'keo@example.com',
      country: 'KH',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an empty name, a malformed email, and a missing country', () => {
    const result = billingSchema.safeParse({
      fullName: '',
      email: 'not-an-email',
      country: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toEqual(
        expect.arrayContaining(['fullName', 'email', 'country']),
      );
    }
  });

  it('flags a syntactically-plausible but invalid email distinctly from a blank one', () => {
    const blank = billingSchema.safeParse({
      fullName: 'A',
      email: '',
      country: 'KH',
    });
    const malformed = billingSchema.safeParse({
      fullName: 'A',
      email: 'nope',
      country: 'KH',
    });
    expect(!blank.success && blank.error.issues[0]?.message).toBe(
      'errorEmailRequired',
    );
    expect(!malformed.success && malformed.error.issues[0]?.message).toBe(
      'errorEmailInvalid',
    );
  });
});

describe('cardSchema', () => {
  const validExpiry = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear() % 100).padStart(2, '0');
    return `${mm}/${yy}`;
  };

  it('accepts a well-formed card (Luhn-valid test number)', () => {
    const result = cardSchema.safeParse({
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: validExpiry(),
      cardCvv: '123',
      cardName: 'Keo Hengneitong',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      // Spaces are stripped during validation.
      expect(result.data.cardNumber).toBe('4242424242424242');
    }
  });

  it('rejects a card number that fails the Luhn checksum', () => {
    const result = cardSchema.safeParse({
      cardNumber: '4242 4242 4242 4241',
      cardExpiry: validExpiry(),
      cardCvv: '123',
      cardName: 'Keo Hengneitong',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an expiry date already in the past', () => {
    const result = cardSchema.safeParse({
      cardNumber: '4242424242424242',
      cardExpiry: '01/20',
      cardCvv: '123',
      cardName: 'Keo Hengneitong',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe('errorCardExpiryPast');
    }
  });

  it('accepts the current month as not-yet-expired', () => {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear() % 100).padStart(2, '0');
    const result = cardSchema.safeParse({
      cardNumber: '4242424242424242',
      cardExpiry: `${mm}/${yy}`,
      cardCvv: '123',
      cardName: 'Keo Hengneitong',
    });
    expect(result.success).toBe(true);
  });

  it('rejects a malformed expiry format', () => {
    const result = cardSchema.safeParse({
      cardNumber: '4242424242424242',
      cardExpiry: '13/99',
      cardCvv: '123',
      cardName: 'Keo Hengneitong',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a CVV outside 3-4 digits', () => {
    const tooShort = cardSchema.safeParse({
      cardNumber: '4242424242424242',
      cardExpiry: validExpiry(),
      cardCvv: '12',
      cardName: 'Keo Hengneitong',
    });
    expect(tooShort.success).toBe(false);
  });
});

describe('checkoutFormSchema', () => {
  const validExpiry = () => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 2);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear() % 100).padStart(2, '0');
    return `${mm}/${yy}`;
  };

  const base = {
    fullName: 'Keo Hengneitong',
    email: 'keo@example.com',
    country: 'KH',
    termsAccepted: true,
  };

  it('ignores blank card fields when PayPal is selected', () => {
    const result = checkoutFormSchema.safeParse({
      ...base,
      paymentMethod: 'paypal',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: '',
    });
    expect(result.success).toBe(true);
  });

  it('ignores blank card fields when KHQR is selected', () => {
    const result = checkoutFormSchema.safeParse({
      ...base,
      paymentMethod: 'khqr',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: '',
    });
    expect(result.success).toBe(true);
  });

  it('requires valid card fields when Card is selected', () => {
    const result = checkoutFormSchema.safeParse({
      ...base,
      paymentMethod: 'card',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toEqual(
        expect.arrayContaining([
          'cardNumber',
          'cardExpiry',
          'cardCvv',
          'cardName',
        ]),
      );
    }
  });

  it('passes with valid card fields when Card is selected', () => {
    const result = checkoutFormSchema.safeParse({
      ...base,
      paymentMethod: 'card',
      cardNumber: '4242 4242 4242 4242',
      cardExpiry: validExpiry(),
      cardCvv: '123',
      cardName: 'Keo Hengneitong',
    });
    expect(result.success).toBe(true);
  });

  it('requires the terms checkbox regardless of payment method', () => {
    const result = checkoutFormSchema.safeParse({
      ...base,
      termsAccepted: false,
      paymentMethod: 'paypal',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path[0] === 'termsAccepted'),
      ).toBe(true);
    }
  });

  it('still enforces billing fields when a non-card method is selected', () => {
    const result = checkoutFormSchema.safeParse({
      ...base,
      fullName: '',
      paymentMethod: 'khqr',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardName: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === 'fullName')).toBe(
        true,
      );
    }
  });
});
