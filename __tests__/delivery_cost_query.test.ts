import { ConditionalShippingDiscount } from '../src/model/ConditionalShippingDiscount.js';

describe('delivery cost function', () => {
  it('calculate discount: scenario 1', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR001',
        weight: 5,
        distance: 5,
        originalPrice: 175,
      }),
    ).toBe(175);
  });

  it('calculate discount: scenario 2', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR002',
        weight: 15,
        distance: 5,
        originalPrice: 275,
      }),
    ).toBe(275);
  });

  it('calculate discount: scenario 3', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR003',
        weight: 10,
        distance: 100,
        originalPrice: 700.0,
      }),
    ).toBe(665);
  });
});
