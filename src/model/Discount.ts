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

  static async getDiscount<T = Discount | null>(
    discountCode: string,
  ): Promise<T> {
    // TODO : Validation required
    if (!discountCode.length) return null;

    return discountTable[discountCode] || null;
  }
}
