import isArray from '../../util/isArray.js';
import isNumberAndEqOrGtThanZero from '../../util/isNumberAndEqOrGtThanZero.js';
import { IContainer } from '../Container/IContainer.js';
import { IFleet } from './IFleet.js';
import { Vehicle } from '../Vehicle/Vehicle.js';
import { Batcher } from '../Batcher/Batcher.js';

export class Fleet implements IFleet {
  baseDeliveryCost: number;
  unitDistanceDeliveryCost: number;
  unitWeightDeliveryCost: number;
  noOfVehicle: number = 0;
  vehicles: IFleet['vehicles'] = [];

  constructor({
    baseDeliveryCost,
    unitDistanceDeliveryCost,
    unitWeightDeliveryCost,
    vehicles = [],
  }: Pick<
    IFleet,
    | 'baseDeliveryCost'
    | 'unitDistanceDeliveryCost'
    | 'unitWeightDeliveryCost'
    | 'vehicles'
  >) {
    this.setBaseDeliveryCost(baseDeliveryCost);
    this.setUnitDistanceDeliveryCost(unitDistanceDeliveryCost);
    this.setUnitWeightDeliveryCost(unitWeightDeliveryCost);
    this.setVehicles(vehicles);
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

    this.unitWeightDeliveryCost = v;
  }

  getUnitWeightDeliveryCost(): number {
    return this.unitWeightDeliveryCost;
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

  setVehicles(v: IFleet['vehicles']): void {
    if (!isArray(v)) {
      throw new Error('Vehicles list is not valid.');
    }

    for (const item of v) {
      this.addVehicle(item);
    }
  }

  addVehicle(v: IFleet['vehicles'][number]): void {
    this.vehicles.push(new Vehicle(v));
    this.setNoOfVehicle(this.vehicles.length);
  }

  getVehicles(): IFleet['vehicles'] {
    return this.vehicles;
  }

  async groupByDeliverableBatches(
    containers: Array<IContainer>,
  ): Promise<Map<number, Array<IContainer>>> {
    // validation
    if (!isArray(containers)) {
      throw new Error('Containers are not a valid list');
    }

    if (!containers.length) return [];

    if (!this.vehicles.length) return [];

    // using first vehicle's capacity as max, because all vehicles are same type in current case
    const maxCapacity = this.vehicles[0].maxWeightCapacity;

    return new Batcher().getBatchContainersMap({ maxCapacity, containers });
  }

  getEstimatedDeliveryTimeInHours(batches: Array<Array<IContainer>>): {
    [key: IContainer['containerId']]: number;
  } {
    // validation
    if (!isArray(batches)) {
      throw new Error('Batches are not a valid list');
    }

    if (!batches.length) return {};

    if (!isArray(batches[0])) {
      throw new Error('Values inside batch array are not a valid list');
    }

    throw new Error('Not implemented');
  }

  getDeliveryCost(c: IContainer): number {
    return (
      this.baseDeliveryCost +
      c.dimension.weight * this.unitWeightDeliveryCost +
      c.route.distance * this.unitDistanceDeliveryCost
    );
  }
}
