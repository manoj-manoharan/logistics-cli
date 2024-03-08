import {
  EstimatedShippingCostAndTime,
  Package,
} from './estimateDeliveryCostAndTime.js';

export default function estimateDeliveryTime(
  params: Package[],
): Array<
  Pick<Package, 'id'> &
    Pick<EstimatedShippingCostAndTime, 'estimatedTimeInHours'>
> {}
