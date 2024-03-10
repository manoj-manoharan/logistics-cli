import { ConditionalShippingDiscount } from '../../model/ConditionalShippingDiscount.js';
import isArray from '../../util/isArray.js';
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

  async getDispatchItems(
    withTimeEstimation = false,
  ): Promise<Array<IDispatchItem>> {
    // Only when true, calculate the estimated delivery time for all the items in dispatch list
    // and update it to items in the list
    if (withTimeEstimation) {
      const estimation = this.fleet.getEstimatedDeliveryTimeInHours(
        await this.fleet.groupByDeliverableBatches(
          this.dispatchItems.map((v) => v.container),
        ),
      );

      // Looping through current batch of dispatch items
      for (const [k, v] of Object.entries(estimation)) {
        // Finding index
        const index = this.dispatchItems.findIndex(
          (v) => v.container.containerId === k,
        );

        // estimated hours
        this.dispatchItems[index].estimatedDeliveryTimeInHours = v;
      }
    }

    return this.dispatchItems;
  }

  async addToDispatch(
    v: Array<Pick<IDispatchItem, 'discountCode' | 'container'>>,
  ): Promise<void> {
    //
    if (!isArray(v)) {
      throw new Error('Parameter is not a valid list.');
    }

    if (!v.length) return;

    //  Calculate discountPrice, linePrice & totalPrice and add the container item to dispatch list
    const getFormattedDispatchItem = async (
      params: Pick<IDispatchItem, 'container' | 'discountCode'>,
    ): Promise<IDispatchItem> => {
      const { container, discountCode } = params;

      const linePrice = this.fleet.getDeliveryCost(container);

      const totalPrice = await ConditionalShippingDiscount.getDiscountedPrice({
        discountCode,
        originalPrice: linePrice,
        weight: container.dimension.weight,
        distance: container.route.distance,
      });

      return {
        container,
        discountCode,
        linePrice,
        totalPrice,
        discountPrice: linePrice - totalPrice,
        estimatedDeliveryTimeInHours: -1,
      };
    };

    for (const item of v) {
      this.dispatchItems.push(await getFormattedDispatchItem(item));
    }
  }
}
