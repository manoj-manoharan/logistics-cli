import { IContainer } from '../Container/IContainer.js';
import { IVehicle } from './IVehicle.js';

export interface IFleet {
  baseDeliveryCost: number;
  unitDistanceDeliveryCost: number;
  unitWeightDeliveryCost: number;
  noOfVehicle: number;
  vehicles: Array<IVehicle>;
  setNoOfVehicle(v: number): void;
  getNoOfVehicle(): number;
  setVehicles(v: Array<IVehicle>): void;
  addVehicle(v: IVehicle): void;
  getVehicles(): Array<IVehicle>;

  groupByDeliverableBatches(
    containers: Array<IContainer>,
  ): Array<Array<IContainer>>;

  getEstimatedDeliveryTimeInHours(batches: Array<Array<IContainer>>): {
    [key: IContainer['containerId']]: number;
  };
}
