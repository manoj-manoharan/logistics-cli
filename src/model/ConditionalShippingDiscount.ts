import {
  IDiscountsInnerJoinConditionShippingDiscount,
  discounts_inner_join_condition_shipping_discount,
} from '../static/discount_conditional_discout.js';
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
    //
    const row =
      await ConditionalShippingDiscount.getJoinedByDiscountIdAndQueriesByDiscountCode(
        discountCode,
      );

    if (
      !row ||
      // Early returning original price if conditional not matches
      !(
        inRange({
          min: row.min_distance,
          max: row.max_distance,
          val: distance,
        }) && inRange({ min: row.min_weight, max: row.max_weight, val: weight })
      )
    ) {
      return originalPrice;
    }

    // Get discounted price based on the discounted type logic
    return Discount.getDiscountedPrice({
      discount: row,
      originalPrice,
    });
  }

  /** Assume this is a join call between the two tables */
  static async getJoinedByDiscountIdAndQueriesByDiscountCode(
    discountCode: string,
  ): Promise<IDiscountsInnerJoinConditionShippingDiscount> {
    return (
      discounts_inner_join_condition_shipping_discount[discountCode] || null
    );
  }
}
