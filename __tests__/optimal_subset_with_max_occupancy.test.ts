import { Package } from '../src/rough/estimateDeliveryCostAndTime.js';

describe('Find the subset with optimal capacity occupancy (with weight & distance as tie breakers)', () => {
  it('For arr = [[1,1], [2,1], [3,1], [4,1]], max = 3 output should be [[1,1], [2,1]]', () => {
    expect(
      optimalSubsetWithMaxOccupancy({
        arr: [
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
        ],
        maxCapacity: 3,
      }),
    ).toStrictEqual([
      [1, 1],
      [2, 1],
    ]);
  });
});

/** */
function optimalSubsetWithMaxOccupancy({
  arr,
  maxCapacity,
}: {
  arr: Array<[number, number]>;
  maxCapacity: number;
}): Array<[number, number]> {
  //
  const result = [];
  let len = 0;
  let totalWeight = 0;

  type MemoRes = {
    totalWeight: number;
    totalDistance: number;
    packages: Array<Package>;
  };

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
    const key = `${remainingCapacity}.${index}`;

    if (!memo[key]) {
      const [currWeight, currDistance] = arr[index];

      const withCurr = recursion(remainingCapacity - currWeight, index + 1, {
        totalWeight: stack.totalWeight + currWeight,
        totalDistance: stack.totalDistance + currDistance,
        packages: [...stack.packages, [currWeight, currDistance]],
      });

      const withoutCurr = recursion(remainingCapacity, index + 1, {
        ...stack,
      });

      /** Priority logic */
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
    }

    return memo[key];
  };

  //
  arr.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]));

  // Calculating the minimum items that fills the capacity
  for (const [w] of arr) {
    totalWeight += w;
    if (totalWeight <= maxCapacity) len++;
  }

  // If there is more than 0 len, than there is a possibility of filling up packages
  if (len > 0) {
    // If the len is just 1, than that means only one item can be used to fill
    if (len === 1) {
      // Only pushing the max weigh item
      for (let i = arr.length - 1; i >= 0; --i) {
        if (arr[i][0] <= maxCapacity) {
          result.push(arr[i]);
          break;
        }
      }
    } else {
      // Finds optimal subset and pushes into result
      recursion(len, maxCapacity);
    }
  }

  return result;
}
