export interface IVehicle {
  maxSpeed: number;
  maxWeightCapacity: number;
  setMaxSpeed(v: number): void;
  getMaxSpeed(): number;
  setMaxWeightCapacity(v: number): void;
  getMaxWeightCapacity(): number;
}
