export interface ICart {
  getLinePrice(): number;
  fetchTotalPrice(): Promise<number>;
  getDiscountedAmount(): Promise<number>;
}
