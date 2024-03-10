import isNumberAndEqOrGtThanZero from '../../util/isNumberAndEqOrGtThanZero.js';
import { IVehicle } from './IVehicle.js';

export class Vehicle implements IVehicle {
  maxSpeed: number;
  maxWeightCapacity: number;

  constructor({ maxSpeed, maxWeightCapacity }: IVehicle) {
    this.setMaxSpeed(maxSpeed);
    this.setMaxWeightCapacity(maxWeightCapacity);
  }

  setMaxSpeed(v: number): void {
    if (!isNumberAndEqOrGtThanZero(v)) {
      throw new Error('Max speed is not valid');
    }

    this.maxSpeed = v;
  }

  getMaxSpeed(): number {
    return this.maxSpeed;
  }

  setMaxWeightCapacity(v: number): void {
    if (!isNumberAndEqOrGtThanZero(v)) {
      throw new Error('Max weight capacity is not valid');
    }

    this.maxWeightCapacity = v;
  }

  getMaxWeightCapacity(): number {
    return this.maxWeightCapacity;
  }
}
