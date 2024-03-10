import isArray from '../../util/isArray.js';
import isNumberAndEqOrGtThanZero from '../../util/isNumberAndEqOrGtThanZero.js';
import { IContainer } from '../Container/IContainer.js';
import { IFleet } from './IFleet.js';
import { IVehicle } from './IVehicle.js';
import { Vehicle } from './Vehicle.js';

export class Fleet implements IFleet {
  baseDeliveryCost: number;
  unitDistanceDeliveryCost: number;
  unitWeightDeliveryCost: number;
  noOfVehicle: number;
  vehicles: IVehicle[];

  constructor({
    baseDeliveryCost,
    unitDistanceDeliveryCost,
    unitWeightDeliveryCost,
  }: IFleet) {
    this.setBaseDeliveryCost(baseDeliveryCost);
    this.setUnitDistanceDeliveryCost(unitDistanceDeliveryCost);
    this.setUnitWeightDeliveryCost(unitWeightDeliveryCost);
    this.setNoOfVehicle(0);
  }

  setBaseDeliveryCost(v: number): void {
    if (!isNumberAndEqOrGtThanZero(v)) {
      throw new Error('baseDeliveryCost is not valid');
    }

    this.baseDeliveryCost = v;
  }

  getBaseDeliveryCost(): number {
    return this.baseDeliveryCost;
  }

  setUnitDistanceDeliveryCost(v: number): void {
    if (!isNumberAndEqOrGtThanZero(v)) {
      throw new Error('unitDistanceDeliveryCost is not valid');
    }

    this.unitDistanceDeliveryCost = v;
  }

  getUnitDistanceDeliveryCost(): number {
    return this.unitDistanceDeliveryCost;
  }

  setUnitWeightDeliveryCost(v: number): void {
    if (!isNumberAndEqOrGtThanZero(v)) {
      throw new Error('unitWeightDeliveryCost is not valid');
    }

    this.noOfVehicle = v;
  }

  getUnitWeightDeliveryCost(): number {
    return this.noOfVehicle;
  }

  setNoOfVehicle(v: number): void {
    if (!isNumberAndEqOrGtThanZero(v)) {
      throw new Error('noOfVehicle is not valid');
    }

    this.noOfVehicle = v;
  }

  getNoOfVehicle(): number {
    return this.noOfVehicle;
  }

  setVehicles(v: IVehicle[]): void {
    if (!isArray(v)) {
      throw new Error('Vehicles list is not valid.');
    }

    for (const item of v) {
      this.addVehicle(item);
    }
  }

  addVehicle(v: IVehicle): void {
    this.vehicles.push(new Vehicle(v));
    this.setNoOfVehicle(this.vehicles.length);
  }

  getVehicles(): IVehicle[] {
    return this.vehicles;
  }

  getEstimatedDeliveryTimeInHours(containers: Array<IContainer>): Array<{
    containerId: IContainer['containerId'];
    deliveryTimeInHours: number;
  }> {
    // validation
    if (!isArray(containers)) return [];

    // Batch containers
    const batches: Array<Array<IContainer>> =
      this.groupByDeliverableBatches(containers);

    return this.estimateDeliveryTimes(batches);
  }
}
