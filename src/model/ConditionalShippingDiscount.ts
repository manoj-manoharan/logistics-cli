import { shippingDiscountTable } from '../static/shipping_discount.js';
import { inRange } from '../util/inRange.js';
import { Discount } from './Discount.js';

export interface IConditionalShippingDiscountProps {
  id: string;
  discount_id: string;
  min_distance: number;
  max_distance: number;
  min_weight: number;
  max_weight: number;
}

export class ConditionalShippingDiscount
  implements IConditionalShippingDiscountProps
{
  id: string;
  discount_id: string;
  min_distance: number;
  max_distance: number;
  min_weight: number;
  max_weight: number;

  static async getDiscountedPrice({
    distance = 0,
    weight = 0,
    discountCode,
    originalPrice = 0,
  }: {
    distance: number;
    weight: number;
    discountCode: string;
    originalPrice: number;
  }): Promise<number> {
    // Getting discount from discount table,
    // for production this should be replaced
    // with a join call between the two tables(discounts & condition_shipping_discounts)
    const result = await Discount.getDiscount({ discountCode, originalPrice });

    // if the result from the discount model is not valid, then no need to proceed
    if (!(result && result.discount && result['discountPrice'])) return 0;

    //
    const { discount, discountPrice } = result;

    // using discount_id, getting shipping discount conditions
    const shippingDiscount = await this.getByDiscountId(discount.id);

    // Checking if it matches, conditional shipping discount's rules, and return the discounted price if it does
    if (
      shippingDiscount &&
      inRange(
        shippingDiscount.min_distance,
        shippingDiscount.max_distance,
        distance,
      ) &&
      inRange(shippingDiscount.min_weight, shippingDiscount.max_weight, weight)
    ) {
      return discountPrice;
    }

    return originalPrice;
  }

  /** */
  private static async getByDiscountId(
    discountId: string,
  ): Promise<ConditionalShippingDiscount | null> {
    // For production use, we must use a real db and index the discount id column
    return shippingDiscountTable[discountId] || null;
  }
}
