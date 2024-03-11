import isString from '../../../../util/isString.js';
import { Vehicle } from '../../../Vehicle/Vehicle.js';
import { ShipmentUI } from './ShipmentUI.js';

export class DeliveryTimeEstimation extends ShipmentUI {
  third(): void {
    this.rl.question(
      'Enter number of vehicles, Maximum speed & Max weight capacity:',
      (input) => {
        const [noOfVehiclesStr, maxSpeedStr, maxWeightCapacityStr] =
          input.split(' ');

        if (
          isString(noOfVehiclesStr) &&
          isString(maxSpeedStr) &&
          isString(maxWeightCapacityStr)
        ) {
          const noOfVehicles = Number(noOfVehiclesStr);
          const maxSpeed = Number(maxSpeedStr);
          const maxWeightCapacity = Number(maxWeightCapacityStr);

          for (let i = 0; i < noOfVehicles; ++i) {
            this.fleet.addVehicle(
              new Vehicle({
                maxWeightCapacity,
                maxSpeed,
              }),
            );
          }

          this.fourth();
        } else {
          console.log();
          console.error(
            '**Please check the inputs for number of vehicles, Maximum speed & Max weight capacity**',
          );
          console.log();
          this.third();
        }
      },
    );
  }

  async fourth(): Promise<void> {
    await this.dispatcher.addToDispatch(this.parcels);
    const dispatchItems = await this.dispatcher.getPreparedItemsForDispatching({
      withTimeEstimation: true,
    });

    console.log('___________________');
    for (const item of dispatchItems) {
      console.log(
        `${item.container.containerId} ${item.discountPrice} ${item.totalPrice} ${item.estimatedDeliveryTimeInHours}`,
      );
    }
  }
}

try {
  new DeliveryTimeEstimation().first();
} catch (e) {
  console.error(e.message);
}
