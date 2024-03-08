import isNumberAndEqOrGtThanZero from '../../util/isNumberAndEqOrGtThanZero.js';
import {
  EstimatedShippingCostAndTime,
  Package,
  Shipment,
} from './estimateDeliveryCostAndTime.js';

interface IEstimateDeliveryTime
  extends Pick<Shipment, 'noOfVehicles' | 'packages'> {}
interface PackageDeliveryInfo
  extends Pick<Package, 'id'>,
    Pick<EstimatedShippingCostAndTime, 'estimatedTimeInHours'> {}

/** */
export default function estimateDeliveryTime({
  packages,
  noOfVehicles,
}: IEstimateDeliveryTime): Array<PackageDeliveryInfo> {
  // TODO: Use AJV validator

  const batches = groupIntoBatchesByDeliveryPriority(packages);

  return calculateTimeByBatchesForPackages({ batches, noOfVehicles });
}

/** */
function groupIntoBatchesByDeliveryPriority(
  packages: Array<Package>,
): Array<Array<Package>> {
  if (!packages.length) return [];

  return [];
}

/** */
function calculateTimeByBatchesForPackages({
  batches,
  noOfVehicles,
}: {
  batches: Array<Array<Package>>;
} & Pick<Shipment, 'noOfVehicles'>): Array<PackageDeliveryInfo> {
  //
  if (
    !batches.length ||
    !(isNumberAndEqOrGtThanZero(noOfVehicles) && noOfVehicles <= 0)
  ) {
    return [];
  }

  return [];
}
