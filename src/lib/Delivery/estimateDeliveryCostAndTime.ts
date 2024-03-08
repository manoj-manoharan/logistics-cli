import { Cart } from '../Transaction/index.js';
import estimateDeliveryTime from './estimateDeliveryTime.js';

export interface Shipment {
  baseDeliveryCost: number;
  noOfPackages: number;
  noOfVehicles: number;
  max_speed: number;
  max_weight_limit: number;
  unitDistanceCost: number;
  unitWeightCost: number;
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
): Promise<EstimatedShippingCostAndTime[]> {
  //TODO: Use AJV validator to validate params

  const res: { [key: string]: EstimatedShippingCostAndTime } = {};

  // Calculating discount & total price, and setting on result object
  for (const item of params.packages) {
    const cart = new Cart({
      baseCost: params.baseDeliveryCost,
      unitDistanceCost: params.unitDistanceCost,
      unitWeightCost: params.unitWeightCost,
      totalDistance: item.distance,
      totalWeight: item.weight,
      discountCode: item.discountCode,
    });

    res[item.id] = {
      id: item.id,
      discount: await cart.getDiscountedAmount(),
      totalCost: await cart.getTotalPrice(),
      estimatedTimeInHours: 0,
    };
  }

  // calculating estimated time delivery for each packages
  // based on the batch that has been assigned
  estimateDeliveryTime({
    packages: params.packages,
    noOfVehicles: params.noOfVehicles,
  }).map((v) => {
    res[v.id].estimatedTimeInHours = v.estimatedTimeInHours;
  });

  return Object.values(res);
}
