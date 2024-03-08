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

export interface EstimatedShippingCostAndTime {
  id: string;
  discount: number;
  totalCost: number;
  estimatedTimeInHours: number;
}

export default async function estimateDeliveryCostAndTime(
  params: Shipment,
): Promise<EstimatedShippingCostAndTime> {
  //TODO: Use AJV validator to validate params
}
