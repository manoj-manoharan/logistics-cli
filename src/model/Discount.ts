import { discountTable } from '../static/discount.js';

export interface IDiscountProps {
  id: string;
  discount_type: 'percent' | 'flat';
  discount_code: string | null;
  amount: number;
}
export class Discount implements IDiscountProps {
  id: string;
  discount_type: 'percent' | 'flat';
  discount_code: string;
  amount: number;

  static async getDiscount({
    discountCode,
    originalPrice,
  }: {
    discountCode: string;
    originalPrice: number;
  }): Promise<{ discount: Discount; discountPrice: number } | null> {
    // TODO : Validation required
    if (!discountCode.length) return null;

    // For production should be replaced with db call, where the discount is stored
    const discount = discountTable[discountCode] || null;

    if (!discount) return null;

    let discountPrice = originalPrice;

    switch (discount.discount_type) {
      case 'percent':
        discountPrice = (originalPrice / 100) * discount.amount;
        break;
      case 'flat':
        discountPrice = originalPrice - discount.amount;
        break;
      default:
        throw new Error('Discount type not supported');
    }

    return {
      discount,
      discountPrice,
    };
  }
}
