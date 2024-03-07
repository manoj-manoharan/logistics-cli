import { IShippingDiscountProps } from '../model/ShippingDiscount.js';

export const shippingDiscountTable: { [key: string]: IShippingDiscountProps } =
  {
    OFR001: {
      id: 'SHIP_OFR001',
      discount_id: 'OFR001',
      min_distance: 1,
      max_distance: 200,
      min_weight: 70,
      max_weight: 200,
    },
    OFR002: {
      id: 'SHIP_OFR002',
      discount_id: 'OFR002',
      min_distance: 50,
      max_distance: 150,
      min_weight: 100,
      max_weight: 250,
    },
    OFR003: {
      id: 'SHIP_OFR003',
      discount_id: 'OFR003',
      min_distance: 50,
      max_distance: 250,
      min_weight: 10,
      max_weight: 150,
    },
  };
