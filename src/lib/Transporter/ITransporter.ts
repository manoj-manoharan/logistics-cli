import { Container } from '../Container/Container.js';

export interface ITransporter {
  canAddContainer(): boolean;
  addContainer(): string;
  getContainers(): Array<Container>;
  removeContainer(): boolean;
  getTotalDistanceTravel(): number;
  getTotalFreightCost(): number;
  getEstimatedDeliveryTime(): number;
  getRemainingFreightTransportedHours(): number;
}
