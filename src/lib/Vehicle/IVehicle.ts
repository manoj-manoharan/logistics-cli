export interface IVehicleProps {
  maxSpeed: number;
  maxWeightCapacity: number;
}

export interface IVehicle extends IVehicleProps {
  setMaxSpeed(v: number): void;
  getMaxSpeed(): number;
  setMaxWeightCapacity(v: number): void;
  getMaxWeightCapacity(): number;
}
