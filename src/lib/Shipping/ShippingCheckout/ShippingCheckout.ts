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

  private _totalPrice = -1;

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

  // Getting total discount price, if discount code matches
  async fetchTotalPrice(): Promise<number> {
    // if total price is not already set, then set it
    if (this._totalPrice < 0) {
      this._totalPrice = await ConditionalShippingDiscount.getDiscountedPrice({
        distance: this._totalDistance,
        weight: this._totalWeight,
        discountCode: this._discountCode,
        originalPrice: this.getLinePrice(),
      });
    }

    return this._totalPrice;
  }

  //
  async getDiscountedAmount(): Promise<number> {
    return this.getLinePrice() - (await this.fetchTotalPrice());
  }
}
