import isObject from '../../util/isObject.js';
import isString from '../../util/isString.js';
import { IContainer } from '../Container/IContainer.js';
import { IFleet } from '../Fleet/IFleet.js';
import { IDispatchItem, IDispatcher } from './IDispatcher.js';

export class Dispatcher implements IDispatcher {
  fleet: IFleet;
  containers: Array<IContainer>;
  dispatchItems: Array<IDispatchItem>;

  constructor({ fleet }: Pick<IDispatcher, 'fleet'>) {
    this.setFleet(fleet);
  }

  setFleet(v: IFleet): void {
    this.fleet = v;
  }

  getFleet(): IFleet {
    return this.fleet;
  }

  async getDispatchItems(): Promise<Array<IDispatchItem>> {
    // TODO : calculate the estimated delivery time for all the items in dispatch list
    // and update it to items in the list

    // TODO: Return the updated dispatch list items

    throw new Error('Not implemented');
  }

  async addToDispatch(
    v: Pick<IDispatchItem, 'discountCode' | 'container'>,
  ): Promise<void> {
    if (!(isObject(v) && isString(v.discountCode))) {
      throw new Error('Dispatch item not valid.');
    }

    // TODO : Calculate discountPrice, linePrice & totalPrice and add the container item to dispatch list
  }
}
