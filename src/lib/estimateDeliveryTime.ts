export interface Shipment {
  baseDeliveryCost: number;
  noOfPackages: number;
  noOfVehicles: number;
  max_speed: number;
  max_weight_limit: number;
  packages: Package[];
}

export interface Package {
  id: string;
  weight: number;
  distance: number;
  discountCode: string;
}

export default async function estimateDeliveryTime(params: Shipment) {
  //TODO: Use AJV validator to validate params
}
