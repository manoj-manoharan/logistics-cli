import { IContainer } from '../Container/IContainer.js';
import { IVehicleProps } from '../Vehicle/IVehicle.js';

export interface IFleet {
  baseDeliveryCost: number;
  unitDistanceDeliveryCost: number;
  unitWeightDeliveryCost: number;
  noOfVehicle: number;
  vehicles: Array<IVehicleProps>;
  setNoOfVehicle(v: number): void;
  getNoOfVehicle(): number;
  setVehicles(v: Array<IVehicleProps>): void;
  addVehicle(v: IVehicleProps): void;
  getVehicles(): Array<IVehicleProps>;

  getDeliveryCost(container: IContainer): number;

  groupByDeliverableBatches(
    containers: Array<IContainer>,
  ): Promise<Map<number, Array<IContainer>>>;

  getEstimatedDeliveryTimeInHours(batches: Array<Array<IContainer>>): {
    [key: IContainer['containerId']]: number;
  };
}
