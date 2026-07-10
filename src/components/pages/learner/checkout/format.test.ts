import { describe, expect, it } from 'vitest';
import { formatCardNumber, formatCvv, formatExpiry } from './format';

describe('formatCardNumber', () => {
  it('groups digits in fours', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242');
  });

  it('strips non-digit characters, including its own prior spaces', () => {
    expect(formatCardNumber('4242 4242 4242')).toBe('4242 4242 4242');
    expect(formatCardNumber('4242-4242-4242')).toBe('4242 4242 4242');
  });

  it('does not add a trailing space right after a full group', () => {
    expect(formatCardNumber('4242')).toBe('4242');
    expect(formatCardNumber('42424')).toBe('4242 4');
  });

  it('caps at 19 digits', () => {
    expect(formatCardNumber('1'.repeat(25)).replace(/\s/g, '')).toHaveLength(
      19,
    );
  });
});

describe('formatExpiry', () => {
  it('inserts a slash after the month', () => {
    expect(formatExpiry('1225')).toBe('12/25');
  });

  it('leaves a single digit alone', () => {
    expect(formatExpiry('1')).toBe('1');
  });

  it('does not insert a slash until a second month digit exists', () => {
    expect(formatExpiry('12')).toBe('12');
  });

  it('clamps a month typo above 12 down to 12', () => {
    expect(formatExpiry('13')).toBe('12');
    expect(formatExpiry('1325')).toBe('12/25');
  });

  it('caps at 4 digits total', () => {
    expect(formatExpiry('122599')).toBe('12/25');
  });

  it('returns empty for empty input', () => {
    expect(formatExpiry('')).toBe('');
  });
});

describe('formatCvv', () => {
  it('keeps only digits, capped at 4', () => {
    expect(formatCvv('12a3b45')).toBe('1234');
  });
});
