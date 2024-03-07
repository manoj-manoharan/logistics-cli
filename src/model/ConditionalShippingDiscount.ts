import {
  IDiscountsInnerJoinConditionShippingDiscount,
  discounts_inner_join_condition_shipping_discount,
} from '../static/discount_conditional_discout.js';
import { inRange } from '../util/inRange.js';
import isNumberAndEqOrGtThanZero from '../util/isNumberAndEqOrGtThanZero.js';
import isString from '../util/isString.js';
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
    distance = -1,
    weight = -1,
    discountCode,
    originalPrice = -1,
  }: {
    distance: number;
    weight: number;
    discountCode: string;
    originalPrice: number;
  }): Promise<number> {
    //
    if (
      !(
        isString(discountCode) &&
        [distance, weight, originalPrice].every(isNumberAndEqOrGtThanZero)
      )
    ) {
      return originalPrice;
    }

    //
    const row =
      await ConditionalShippingDiscount.getJoinedByDiscountIdAndQueriesByDiscountCode(
        discountCode,
      );

    // If min, max distance or weight is invalid, or if the values are not in range then early return
    if (
      !row ||
      ![
        row.min_distance,
        row.max_distance,
        row.min_weight,
        row.max_weight,
      ].every(isNumberAndEqOrGtThanZero) ||
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
