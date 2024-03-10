import { IContainer } from '../Container/IContainer.js';
import { IBatcher } from './IBatcher.js';

export class Batcher implements IBatcher {
  private getFormattedAndFilteredContainers({
    containers,
    maxCapacity,
  }: {
    containers: Array<IContainer>;
    maxCapacity: number;
  }): Array<[number, number, string]> {
    return (
      containers
        // Only allow boxes which have weight lesser than max capacity
        .filter((v) => v.dimension.weight <= maxCapacity)
        // Sort for better handling
        .sort((a, b) => {
          return a.dimension.weight !== b.dimension.weight
            ? a.dimension.weight - b.dimension.weight
            : b.route.distance - a.route.distance;
        })
        // Format for the library function
        .map((v) => [v.dimension.weight, v.route.distance, v.containerId])
    );
  }

  private getOptimalSubsetWithMaxOccupancy({
    arr,
    maxCapacity,
  }: {
    arr: Array<[number, number, string]>;
    maxCapacity: number;
  }): Array<[number, number, string]> {
    // Declaring type
    type MemoRes = {
      totalWeight: number;
      totalDistance: number;
      packages: Array<[number, number, string]>;
    };

    // Used to memoize the range computations
    const memo: {
      [key: string]: MemoRes;
    } = {};

    // This is going to used to find the optimal subset,
    //  if there is possibility that there might be more than one
    const recursion = (
      remainingCapacity = 0,
      index = 0,
      stack = {
        totalWeight: 0,
        totalDistance: 0,
        packages: [],
      },
    ): MemoRes => {
      // Forming the range key
      const key = `${remainingCapacity}.${index}`;

      // If key exists in memo, no need process it again
      if (memo[key]) return memo[key];

      // If index exceeded return the previous result
      if (index === arr.length) return stack;

      // Taking the current item's weight and distance
      const [currWeight, currDistance, id] = arr[index];

      // If capacity exceed, should not process curr item
      let withCurr = stack;
      if (remainingCapacity - currWeight >= 0) {
        // Getting max, with current item
        withCurr = recursion(remainingCapacity - currWeight, index + 1, {
          totalWeight: stack.totalWeight + currWeight,
          totalDistance: stack.totalDistance + currDistance,
          packages: [...stack.packages, [currWeight, currDistance, id]],
        });
      }

      // Getting item without current element
      const withoutCurr = recursion(remainingCapacity, index + 1, {
        ...stack,
      });

      /** Priority logic & setting it in memo */
      if (withCurr.packages.length > withoutCurr.packages.length) {
        memo[key] = withCurr;
      } else if (withCurr.packages.length < withoutCurr.packages.length) {
        memo[key] = withoutCurr;
      } else {
        if (withCurr.totalWeight > withoutCurr.totalWeight) {
          memo[key] = withCurr;
        } else if (withCurr.totalWeight < withoutCurr.totalWeight) {
          memo[key] = withoutCurr;
        } else {
          memo[key] =
            withCurr.totalDistance <= withoutCurr.totalDistance
              ? withCurr
              : withoutCurr;
        }
      }

      return memo[key];
    };

    const result = recursion(maxCapacity);

    return result.packages;
  }

  private getIdBatchedMap({
    containers,
    maxCapacity,
  }: {
    containers: Array<IContainer>;
    maxCapacity: number;
  }): Map<number, Set<string>> {
    // Grouping by batch
    const batches: Map<number, Set<string>> = new Map();

    // Maintaining batch count
    let batchCount = 0;

    // Get formatted and filtered containers
    let boxes: Array<[number, number, string]> =
      this.getFormattedAndFilteredContainers({
        containers,
        maxCapacity,
      });

    // Till all the boxes are batched run the loop
    // This is a inefficient function which runs on O(n^3) time complexity and O(n^3) memory complexity
    while (boxes.length) {
      // Get max occupancy batch
      const batch = this.getOptimalSubsetWithMaxOccupancy({
        maxCapacity,
        arr: boxes,
      });

      batches.set(batchCount, new Set([]));

      // Mark the boxes which are batched, with the batch number
      for (const item of batch) {
        // Pushing the id into the appropriate batch
        batches.get(batchCount).add(item[2]);
      }

      // Only filter the boxes which are not yet batched,
      // do not use simple not(!) condition, as 0 indexes are there
      boxes = boxes.filter((b) => !batches.get(batchCount).has(b[2]));

      // Increment the batch number for next process
      ++batchCount;
    }

    return batches;
  }

  getBatchContainersMap({
    containers,
    maxCapacity,
  }: {
    containers: Array<IContainer>;
    maxCapacity: number;
  }): Map<number, Array<IContainer>> {
    const tempObj = {};

    for (const container of containers) {
      tempObj[container.containerId] = container;
    }

    const idBatchedMap = this.getIdBatchedMap({ containers, maxCapacity });
    const finalBatchMap: Map<number, Array<IContainer>> = new Map();

    for (const [key, idArr] of idBatchedMap.entries()) {
      // fetching container object, and setting in for the batch
      finalBatchMap.set(key, []);

      idArr.forEach((id) => {
        finalBatchMap.get(key).push(tempObj[id]);
      });
    }

    return finalBatchMap;
  }
}
