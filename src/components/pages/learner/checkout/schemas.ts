import { z } from 'zod';

/**
 * Every `.min`/`.regex`/`.refine` message here is an i18n *key*
 * ("errorCardNumberInvalid", …), not literal copy — the form reads
 * `error.message` and passes it through `t()`. Keeps validation logic
 * language-agnostic and the copy centralized in the locale files.
 */

export const billingSchema = z.object({
  fullName: z.string().trim().min(1, 'errorFullNameRequired'),
  email: z
    .string()
    .trim()
    .min(1, 'errorEmailRequired')
    .email('errorEmailInvalid'),
  country: z.string().min(1, 'errorCountryRequired'),
});

export type BillingSchema = z.infer<typeof billingSchema>;

/** Luhn checksum — catches typos/transpositions without needing a real PAN. */
function passesLuhnCheck(value: string): boolean {
  let sum = 0;
  let double = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = Number(value[i]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

/** "MM/YY" where the card is not already past its last valid month. */
function isNotExpired(value: string): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  return year > currentYear || (year === currentYear && month >= currentMonth);
}

export const cardSchema = z.object({
  cardNumber: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(
      z
        .string()
        .min(1, 'errorCardNumberRequired')
        .regex(/^\d{13,19}$/, 'errorCardNumberInvalid')
        .refine(passesLuhnCheck, 'errorCardNumberInvalid'),
    ),
  cardExpiry: z
    .string()
    .min(1, 'errorCardExpiryRequired')
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'errorCardExpiryInvalid')
    .refine(isNotExpired, 'errorCardExpiryPast'),
  cardCvv: z
    .string()
    .min(1, 'errorCardCvvRequired')
    .regex(/^\d{3,4}$/, 'errorCardCvvInvalid'),
  cardName: z.string().trim().min(1, 'errorCardNameRequired'),
});

export type CardSchema = z.infer<typeof cardSchema>;

/**
 * The single schema the whole checkout form validates against. Card fields
 * exist on it unconditionally (so react-hook-form always has somewhere to put
 * them) but are only *required* when `paymentMethod === 'card'` — enforced by
 * re-running the already-tested `billingSchema`/`cardSchema` and forwarding
 * their issues, rather than duplicating the rules here.
 */
export const checkoutFormSchema = z
  .object({
    fullName: z.string(),
    email: z.string(),
    country: z.string(),
    paymentMethod: z.enum(['card', 'paypal', 'khqr']),
    cardNumber: z.string(),
    cardExpiry: z.string(),
    cardCvv: z.string(),
    cardName: z.string(),
    termsAccepted: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const billing = billingSchema.safeParse({
      fullName: data.fullName,
      email: data.email,
      country: data.country,
    });
    if (!billing.success) forwardIssues(ctx, billing.error.issues);

    if (data.paymentMethod === 'card') {
      const card = cardSchema.safeParse({
        cardNumber: data.cardNumber,
        cardExpiry: data.cardExpiry,
        cardCvv: data.cardCvv,
        cardName: data.cardName,
      });
      if (!card.success) forwardIssues(ctx, card.error.issues);
    }

    if (!data.termsAccepted) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['termsAccepted'],
        message: 'errorTermsRequired',
      });
    }
  });

function forwardIssues(ctx: z.RefinementCtx, issues: readonly z.ZodIssue[]) {
  for (const issue of issues) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: issue.path,
      message: issue.message,
    });
  }
}

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
