import { describe, it, expect } from 'vitest';
import { formatDate, formatCurrency } from './format';

describe('formatDate', () => {
  it('formats a date correctly', () => {
    const date = new Date('2023-01-15');
    expect(formatDate(date)).toBe('01/15/2023');
  });

  it('handles single-digit months and days', () => {
    const date = new Date('2023-02-05');
    expect(formatDate(date)).toBe('02/05/2023');
  });

  it('throws an error for invalid dates', () => {
    expect(() => formatDate('not a date')).toThrow('Invalid date');
    expect(() => formatDate(null)).toThrow('Invalid date');
    expect(() => formatDate(undefined)).toThrow('Invalid date');
  });
});

describe('formatCurrency', () => {
  it('formats USD currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats other currencies correctly', () => {
    expect(formatCurrency(1234.56, 'EUR')).toContain('1,234.56');
    expect(formatCurrency(1234.56, 'JPY')).not.toContain('.'); // JPY doesn't use decimal places
  });

  it('handles negative values', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });
});