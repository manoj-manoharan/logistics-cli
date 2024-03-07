import { ConditionalShippingDiscount } from '../../../model/ConditionalShippingDiscount.js';
import { IShippingCheckout } from './IShippingCheckout.js';

interface IShippingCheckoutProps {
  baseCost: number;
  totalDistance: number;
  totalWeight: number;
  unitDistanceCost: number;
  unitWeightCost: number;
  discountCode: string;
}

export class ShippingCheckout implements IShippingCheckout {
  private _baseCost: number;
  private _totalWeight: number;
  private _totalDistance: number;
  private _unitDistanceCost: number;
  private _unitWeightCost: number;
  private _discountCode: string;

  private _discountAmount = -1;

  constructor({
    baseCost = -1,
    totalDistance = -1,
    totalWeight = -1,
    unitDistanceCost = -1,
    unitWeightCost = -1,
    discountCode,
  }: IShippingCheckoutProps) {
    this._baseCost = baseCost;
    this._totalWeight = totalWeight;
    this._totalDistance = totalDistance;
    this._unitDistanceCost = unitDistanceCost;
    this._unitWeightCost = unitWeightCost;
    this._discountCode = discountCode;
  }

  /** We calculate the total cost of sending the container through the transport by combining all the costs */
  getLinePrice(): number {
    // TODO : Validation required
    return (
      this._baseCost +
      this._unitDistanceCost * this._totalDistance +
      this._unitWeightCost * this._totalWeight
    );
  }

  /** If discount is set, then we return it, else we calculate it, then set it then return it */
  async getDiscount(): Promise<number> {
    if (this._discountAmount < 0) {
      this.setDiscount(await this.getCalculatedDiscount());
    }

    return this._discountAmount;
  }

  /** */
  async getCalculatedDiscount(): Promise<number> {
    // getting discount if valid
    const discount = await ConditionalShippingDiscount.getDiscount({
      discountCode: this._discountCode,
      weight: this._totalWeight,
      distance: this._totalDistance,
    });

    if (!discount) return 0;

    switch (discount.discount_type) {
      case 'percent':
        return ()
        break;
      case 'flat':
        return discount.amount;
        break;
      default:
        throw new Error('Discount type not supported');
    }
  }

  /** */
  setDiscount(val: number): void {
    this._discountAmount = val;
    return;
  }

  /** Total price is the line price minus discounted amount */
  async getTotalPrice(): Promise<number> {
    const totalPrice = this.getLinePrice() - (await this.getDiscount());

    // On occasion of flat discount, if line price is lesser than discount,
    // it can lead to negative price, so handling it her
    return totalPrice > 0 ? totalPrice : 0;
  }
}
