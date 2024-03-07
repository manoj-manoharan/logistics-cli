export interface ICart {
  getLinePrice(): number;
  getTotalPrice(): Promise<number>;
  getDiscountedAmount(): Promise<number>;
}
