/** */
export function optimalSubsetWithMaxOccupancy({
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
