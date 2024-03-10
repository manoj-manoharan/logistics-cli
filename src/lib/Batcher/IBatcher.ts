import { IContainer } from '../Container/IContainer.js';

export interface IBatcher {
  //
  getBatchContainersMap({
    containers,
    maxCapacity,
  }: {
    containers: Array<IContainer>;
    maxCapacity: number;
  }): Map<number, Array<IContainer>>;
}
