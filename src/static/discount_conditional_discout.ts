/** This is a structure which resembles a joined table of `discounts` & `condition_shipping_discount` */

import { IConditionalShippingDiscountProps } from '../model/ConditionalShippingDiscount.js';
import { IDiscountProps } from '../model/Discount.js';

// to avoid ambiguous id issue, `condition_shipping_discount`'s Id is renamed to csd_id

//
export interface IDiscountsInnerJoinConditionShippingDiscount
  extends IDiscountProps,
    IConditionalShippingDiscountProps {
  csd_id: string;
}

//
export const discounts_inner_join_condition_shipping_discount: {
  [key: string]: IDiscountsInnerJoinConditionShippingDiscount;
} = {
  OFR001: {
    id: 'OFR001',
    discount_type: 'percent',
    discount_code: 'OFR001',
    amount: 10,
    csd_id: 'SHIP_OFR001',
    discount_id: 'OFR001',
    min_distance: 1,
    max_distance: 200,
    min_weight: 70,
    max_weight: 200,
  },
  OFR002: {
    id: 'OFR002',
    discount_type: 'percent',
    discount_code: 'OFR002',
    amount: 7,
    csd_id: 'SHIP_OFR002',
    discount_id: 'OFR002',
    min_distance: 50,
    max_distance: 150,
    min_weight: 100,
    max_weight: 250,
  },
  OFR003: {
    id: 'OFR003',
    discount_type: 'percent',
    discount_code: 'OFR003',
    amount: 5,
    csd_id: 'SHIP_OFR003',
    discount_id: 'OFR003',
    min_distance: 50,
    max_distance: 250,
    min_weight: 10,
    max_weight: 150,
  },
};
