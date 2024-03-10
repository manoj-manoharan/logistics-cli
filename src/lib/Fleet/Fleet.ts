import isArray from '../../util/isArray.js';
import isNumberAndEqOrGtThanZero from '../../util/isNumberAndEqOrGtThanZero.js';
import { IContainer } from '../Container/IContainer.js';
import { IFleet } from './IFleet.js';
import { Vehicle } from '../Vehicle/Vehicle.js';
import { Batcher } from '../Batcher/Batcher.js';
import { MinHeap } from '../Heap/MinHeap.js';
import { HeapItem } from '../Heap/HeapItem.js';

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

    if (!containers.length) return new Map();

    if (!this.vehicles.length) return new Map();

    // using first vehicle's capacity as max, because all vehicles are same type in current case
    const maxCapacity = this.vehicles[0].maxWeightCapacity;

    return new Batcher().getBatchContainersMap({ maxCapacity, containers });
  }

  getEstimatedDeliveryTimeInHours(
    containerBatchMap: Map<number, Array<IContainer>>,
  ): {
    [key: IContainer['containerId']]: number;
  } {
    // validation
    if (!containerBatchMap.size) return {};

    // No vehicles available, so no parcels can be delivered
    if (!this.vehicles.length) return {};

    // Checking if the first batch is valid array
    if (!isArray(containerBatchMap.get(0))) {
      throw new Error('Values inside batch array are not a valid list');
    }

    // using first vehicle's speed as max, because all vehicles are same type in current case
    const maxSpeed = this.vehicles[0].maxSpeed || 1;

    // Function to calculate time taken in minutes to reach the place to deliver
    const calculateTimeTaken = (kilometer = 1): number =>
      Math.floor((kilometer / maxSpeed) * 60);

    // Initializing a min heap
    const minHeap = new MinHeap<{ minutesTakenTillNow: number }>();

    // Total number of vehicles that will be available to consume
    for (let i = 0; i < this.vehicles.length; ++i) {
      minHeap.push(new HeapItem({ minutesTakenTillNow: 0 }, 0));
    }

    // Object to store the results
    const packageDeliveryEstimatedHour = {};

    // looping through the batches and estimating dispatch time for all the packages in vehicles
    for (const batch of containerBatchMap.values()) {
      // popping the earliest available vehicle
      const {
        item: { minutesTakenTillNow: estimatedDeliveryStartTime },
      } = minHeap.pop();

      // storing the longest distance for current batch
      let maxTimePackage = 0;

      for (const container of batch) {
        // time taken for the current package to be delivered
        const packageEstimatedDeliveryTime =
          calculateTimeTaken(container.getDistance()) +
          estimatedDeliveryStartTime;

        // saving the time that the package will be delivered
        packageDeliveryEstimatedHour[container.containerId] = parseFloat(
          (packageEstimatedDeliveryTime / 60).toFixed(2),
        );

        // calculating the longest distance
        maxTimePackage = Math.max(maxTimePackage, packageEstimatedDeliveryTime);
      }

      minHeap.push(new HeapItem({ minutesTakenTillNow: maxTimePackage * 2 }));
    }

    return packageDeliveryEstimatedHour;
  }

  getDeliveryCost(c: IContainer): number {
    return (
      this.baseDeliveryCost +
      c.getWeight() * this.unitWeightDeliveryCost +
      c.getDistance() * this.unitDistanceDeliveryCost
    );
  }
}
