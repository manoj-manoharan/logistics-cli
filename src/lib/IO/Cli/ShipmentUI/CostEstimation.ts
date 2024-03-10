import { ShipmentUI } from './ShipmentUI.js';

export class CostEstimationUI extends ShipmentUI {
  async third(): Promise<void> {
    await this.dispatcher.addToDispatch(this.parcels);
    const dispatchItems =
      await this.dispatcher.getPreparedItemsForDispatching();

    for (const item of dispatchItems) {
      console.log(
        `${item.container.containerId} ${item.discountPrice} ${item.totalPrice}`,
      );
    }
  }
}

new CostEstimationUI().first();
