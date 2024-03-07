import { Container } from '../Container/Container.js';
import { ITransporter } from './ITransporter.js';

export class Transporter implements ITransporter {
  canAddContainer(): boolean {
    throw new Error('Method not implemented.');
  }
  addContainer(): string {
    throw new Error('Method not implemented.');
  }
  getContainers(): Container[] {
    throw new Error('Method not implemented.');
  }
  removeContainer(): boolean {
    throw new Error('Method not implemented.');
  }
  getTotalDistanceTravel(): number {
    throw new Error('Method not implemented.');
  }
  getTotalFreightCost(): number {
    throw new Error('Method not implemented.');
  }
  getEstimatedDeliveryTime(): number {
    throw new Error('Method not implemented.');
  }
  getRemainingFreightTransportedHours(): number {
    throw new Error('Method not implemented.');
  }
}
