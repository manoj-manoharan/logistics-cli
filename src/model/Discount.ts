import isNumberAndEqOrGtThanZero from '../util/isNumberAndEqOrGtThanZero.js';

export interface IDiscountProps {
  id: string;
  discount_type: (typeof Discount.DISCOUNT_TYPES)[number];
  discount_code: string | null;
  amount: number;
}
export class Discount implements IDiscountProps {
  id: string;
  discount_type: 'percent' | 'flat';
  discount_code: string;
  amount: number;

  static DISCOUNT_TYPES = ['percent', 'flat'] as const;

  static async getDiscountedPrice({
    discount,
    originalPrice,
  }: {
    discount: Omit<IDiscountProps, 'discount_code' | 'id'>;
    originalPrice: number;
  }): Promise<number> {
    //
    if (
      !(
        typeof discount === 'object' &&
        Discount.DISCOUNT_TYPES.includes(discount.discount_type) &&
        isNumberAndEqOrGtThanZero(discount.amount) &&
        isNumberAndEqOrGtThanZero(originalPrice)
      )
    ) {
      throw new Error('Invalid Discount object');
    }

    let discountedPrice = originalPrice;

    switch (discount.discount_type) {
      case 'percent':
        discountedPrice =
          originalPrice - (originalPrice / 100) * discount.amount;
        break;
      case 'flat':
        discountedPrice = originalPrice - discount.amount;
        break;
      default:
        throw new Error('Discount type not supported');
    }

    return Math.max(discountedPrice, 0);
  }
}
