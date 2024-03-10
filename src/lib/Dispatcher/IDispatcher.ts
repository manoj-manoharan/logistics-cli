import { IContainer } from '../Container/IContainer.js';
import { IFleet } from '../Fleet/IFleet.js';

export interface IDispatchItem {
  container: IContainer;
  discountCode: string;
  discountPrice: number;
  linePrice: number;
  totalPrice: number;
  estimatedDeliveryTimeInHours: number;
}

export interface IDispatcher {
  fleet: IFleet;
  containers: Array<IContainer>;
  dispatchItems: Array<IDispatchItem>;

  setFleet(v: IFleet): void;
  getFleet(): IFleet;

  getDispatchItems(withTimeEstimation: boolean): Promise<Array<IDispatchItem>>;

  addToDispatch(
    v: Array<Pick<IDispatchItem, 'discountCode' | 'container'>>,
  ): Promise<void>;
}
