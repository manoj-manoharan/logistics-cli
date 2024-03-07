import { IDiscountProps } from '../model/Discount.js';

export const discountTable: { [key: string]: IDiscountProps } = {
  OFR001: {
    id: 'OFR001',
    discount_type: 'percent',
    discount_code: 'OFR001',
    amount: 10,
  },
  OFR002: {
    id: 'OFR002',
    discount_type: 'percent',
    discount_code: 'OFR002',
    amount: 7,
  },
  OFR003: {
    id: 'OFR003',
    discount_type: 'percent',
    discount_code: 'OFR003',
    amount: 5,
  },
};
