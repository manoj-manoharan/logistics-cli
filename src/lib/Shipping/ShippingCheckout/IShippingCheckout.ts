export interface IShippingCheckout {
  getLinePrice(): number;
  getDiscount(): number;
  getCalculatedDiscount(): number;
  setDiscount(v: number): void;
  getTotalPrice(): number;
}
