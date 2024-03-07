import { Discount } from '../src/model/Discount.js';

describe('Discount module', () => {
  //
  it('10% discount of 10 should result in 9', async () => {
    expect(
      await Discount.getDiscountedPrice({
        discount: {
          discount_type: 'percent',
          amount: 10,
        },
        originalPrice: 10,
      }),
    ).toBe(9);
  });

  it('3% discount of 10 should result in 7', async () => {
    expect(
      await Discount.getDiscountedPrice({
        discount: {
          discount_type: 'percent',
          amount: 10,
        },
        originalPrice: 10,
      }),
    ).toBe(9);
  });

  it('17% discount of 43 should result in 35.69', async () => {
    expect(
      await Discount.getDiscountedPrice({
        discount: {
          discount_type: 'percent',
          amount: 17,
        },
        originalPrice: 43,
      }),
    ).toBe(35.69);
  });

  it('5 flat discount of 64 should result in 59', async () => {
    expect(
      await Discount.getDiscountedPrice({
        discount: {
          discount_type: 'flat',
          amount: 5,
        },
        originalPrice: 64,
      }),
    ).toBe(59);
  });

  it('should throw error on invalid config', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidDiscount: any = {};
    await expect(Discount.getDiscountedPrice(invalidDiscount)).rejects.toThrow(
      'Invalid Discount object',
    );
  });

  it('should throw error on invalid config - discount type', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidDiscount: any = {
      discount: {
        discount_type: 'flater',
        amount: 5,
      },
      originalPrice: 64,
    };

    await expect(Discount.getDiscountedPrice(invalidDiscount)).rejects.toThrow(
      'Invalid Discount object',
    );
  });

  it('should throw error on invalid config - amount', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidDiscount: any = {
      discount: {
        discount_type: 'flat',
      },
      originalPrice: 64,
    };

    await expect(Discount.getDiscountedPrice(invalidDiscount)).rejects.toThrow(
      'Invalid Discount object',
    );
  });

  it('should throw error on invalid config - original price', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invalidDiscount: any = {
      discount: {
        discount_type: 'flat',
        amount: 5,
      },
    };

    await expect(Discount.getDiscountedPrice(invalidDiscount)).rejects.toThrow(
      'Invalid Discount object',
    );
  });
});
