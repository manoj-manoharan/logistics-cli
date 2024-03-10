import isNumberAndEqOrGtThanZero from '../../util/isNumberAndEqOrGtThanZero.js';
import isObject from '../../util/isObject.js';
import isString from '../../util/isString.js';
import { IContainer } from './IContainer.js';

export class Container implements IContainer {
  containerId: string;
  dimension: { weight: number };
  route: { distance: number };

  constructor({ containerId, dimension, route }: IContainer) {
    this.setContainerId(containerId);
    this.setDimension(dimension);
    this.setRoute(route);
  }

  setContainerId(v: IContainer['containerId']): void {
    if (!isString(v)) throw new Error('Container Id passed is not string');
    this.containerId = v;
  }

  setDimension(v: IContainer['dimension']): void {
    if (!(isObject(v) && isNumberAndEqOrGtThanZero(v.weight))) {
      throw new Error('Dimension is not valid');
    }

    this.dimension = v;
  }

  setRoute(v: IContainer['route']): void {
    if (!(isObject(v) && isNumberAndEqOrGtThanZero(v.distance))) {
      throw new Error('Dimension is not valid');
    }

    this.route = v;
  }

  getWeight(): number {
    return this.dimension.weight;
  }

  getDistance(): number {
    return this.route.distance;
  }
}
