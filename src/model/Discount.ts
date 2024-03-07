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

  static async getDiscountedPrice({
    discount,
    originalPrice,
  }: {
    discount: IDiscountProps;
    originalPrice: number;
  }): Promise<number> {
    if (!discount) return originalPrice;

    switch (discount.discount_type) {
      case 'percent':
        return (originalPrice / 100) * discount.amount;
        break;
      case 'flat':
        return originalPrice - discount.amount;
        break;
      default:
        throw new Error('Discount type not supported');
    }
  }
}
