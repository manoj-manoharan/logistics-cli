export interface IShippingCheckout {
  getLinePrice(): number;
  getDiscount(): Promise<number>;
  getCalculatedDiscount(): Promise<number>;
  setDiscount(v: number): void;
  getTotalPrice(): Promise<number>;
}
