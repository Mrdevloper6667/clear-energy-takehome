import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formats 118000 paise to ₹1,180.00', () => {
    expect(formatPrice(118000)).toBe('₹1,180.00');
  });

  it('formats 100 paise to ₹1.00', () => {
    expect(formatPrice(100)).toBe('₹1.00');
  });

  it('formats 0 paise to ₹0.00', () => {
    expect(formatPrice(0)).toBe('₹0.00');
  });
});
