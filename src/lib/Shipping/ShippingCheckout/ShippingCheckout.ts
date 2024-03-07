import { ShippingDiscount } from '../../../model/ShippingDiscount.js';
import { IShippingCheckout } from './IShippingCheckout.js';

interface IShippingCheckoutProps {
  baseCost: number;
  distanceCost: number;
  weightCost: number;
  discountCodes: Array<string>;
}

export class ShippingCheckout implements IShippingCheckout {
  private _baseCost: number;
  private _weightCost: number;
  private _distanceCost: number;
  private _discountCode: string;

  private _discount = -1;

  constructor({
    baseCost = -1,
    distanceCost = -1,
    weightCost = -1,
    discountCodes = [],
  }: IShippingCheckoutProps) {
    this._baseCost = baseCost;
    this._weightCost = distanceCost;
    this._distanceCost = weightCost;
    this._discountCodes = discountCodes;
  }

  /** We calculate the total cost of sending the container through the transport by combining all the costs */
  getLinePrice(): number {
    return this._baseCost + this._weightCost + this._distanceCost;
  }

  /** If discount is set, then we return it, else we calculate it, then set it then return it */
  getDiscount(): number {
    if (this._discount < 0) this.setDiscount(this.getCalculatedDiscount());

    return this._discount;
  }

  /** */
  getCalculatedDiscount(): number {
    return ShippingDiscount.getDiscount(this._discountCode);
  }

  /** */
  setDiscount(val: number): void {
    this._discount = val;
    return;
  }

  /** Total price is the line price minus discounted amount */
  getTotalPrice(): number {
    const totalPrice = this.getLinePrice() - this.getDiscount();

    // On occasion of flat discount, if line price is lesser than discount,
    // it can lead to negative price, so handling it her
    return totalPrice > 0 ? totalPrice : 0;
  }
}
