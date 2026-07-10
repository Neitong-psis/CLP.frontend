/** The three ways a learner can pay. Exactly one is ever selected. */
export type PaymentMethodId = 'card' | 'paypal' | 'khqr';

export interface BillingValues {
  fullName: string;
  email: string;
  /** ISO 3166-1 alpha-2 code, e.g. "KH". */
  country: string;
}

export interface CardValues {
  cardNumber: string;
  /** "MM/YY" */
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
}

export interface Coupon {
  readonly code: string;
  /** 0–100. */
  readonly percentOff: number;
}

/** The fully-resolved numbers the order summary and the pay button read from. */
export interface PricingBreakdown {
  readonly price: number;
  readonly discount: number;
  readonly tax: number;
  readonly total: number;
  readonly coupon: Coupon | null;
}

export type CheckoutStatus = 'idle' | 'submitting' | 'success';
