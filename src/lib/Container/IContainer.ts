export interface IContainer {
  containerId: string;
  dimension: {
    weight: number;
  };
  route: {
    distance: number;
  };

  setContainerId(v: IContainer['containerId']): void;
  setDimension(v: IContainer['dimension']): void;
  setRoute(v: IContainer['route']): void;
  getWeight(): IContainer['dimension']['weight'];
  getDistance(): IContainer['route']['distance'];
}
