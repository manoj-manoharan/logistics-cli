export interface IShippingCheckout {
  getLinePrice(): number;
  fetchTotalPrice(): Promise<number>;
  getDiscountedAmount(): Promise<number>;
}
