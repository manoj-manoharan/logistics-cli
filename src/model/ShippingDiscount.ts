import { shippingDiscountTable } from '../static/shipping_discount.js';
import { inRange } from '../util/inRange.js';
import { Discount, IDiscountProps } from './Discount.js';

export interface IShippingDiscountProps {
  id: string;
  discount_id: string;
  min_distance: number;
  max_distance: number;
  min_weight: number;
  max_weight: number;
}

export class ShippingDiscount implements IShippingDiscountProps {
  id: string;
  discount_id: string;
  min_distance: number;
  max_distance: number;
  min_weight: number;
  max_weight: number;

  static async getDiscount({
    distance = 0,
    weight = 0,
    discountCode,
  }: {
    distance: number;
    weight: number;
    discountCode: string;
  }): Promise<Pick<IDiscountProps, 'amount' | 'discount_type'>> {
    // Getting discount from discount table
    const discount = await Discount.getDiscount(discountCode);

    if (!discount) return null;

    // using discount_id, getting shipping discount conditions
    const shippingDiscount = await this.getByDiscountId(discount.id);

    let calculatedDiscount: Pick<IDiscountProps, 'amount' | 'discount_type'> = {
      discount_type: 'percent',
      amount: 0,
    };

    // Checking if it matches, shipping discount's rules, and assign if it does
    if (
      shippingDiscount &&
      inRange(
        shippingDiscount.min_distance,
        shippingDiscount.max_distance,
        distance,
      ) &&
      inRange(shippingDiscount.min_weight, shippingDiscount.max_weight, weight)
    ) {
      calculatedDiscount = discount;
    }

    return calculatedDiscount;
  }

  /** */
  private static async getByDiscountId(
    discountId: string,
  ): Promise<ShippingDiscount | null> {
    // For production use, we must use a real db and index the discount id column
    return shippingDiscountTable[discountId] || null;
  }
}
