import { ConditionalShippingDiscount } from '../src/model/ConditionalShippingDiscount.js';

describe('Conditional discount function', () => {
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

  it('OFR001 - within range', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR001',
        weight: 150,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(90); // 100 - 10% discount
  });

  it('OFR001 - outside weight range (too low)', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR001',
        weight: 60,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(100); // No discount
  });

  it('OFR001 - outside weight range (too high)', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR001',
        weight: 250,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(100); // No discount
  });

  it('OFR0002 - not applicable (wrong code)', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR0002',
        weight: 150,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(100); // No discount
  });

  it('OOFR003 - not applicable (wrong code)', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OOFR003',
        weight: 150,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(100); // No discount
  });

  // **50-150 km, 100-250 kg**

  it('OFR002 - within range', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR002',
        weight: 150,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(93); // 100 - 7% discount
  });

  it('OFR002 - outside weight range (too low)', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR002',
        weight: 90,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(100); // No discount
  });

  it('OFR002 - outside weight range (too high)', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR002',
        weight: 260,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(100); // No discount
  });

  it('OFR0 - not applicable (wrong code)', async () => {
    expect(
      await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode: 'OFR0',
        weight: 150,
        distance: 100,
        originalPrice: 100,
      }),
    ).toBe(100); // No discount
  });
});
