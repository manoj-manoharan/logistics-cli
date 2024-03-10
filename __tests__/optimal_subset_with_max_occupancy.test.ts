import { optimalSubsetWithMaxOccupancy } from '../src/util/optimalSubsetWithMaxOccupancy.js';

describe('Find the subset with optimal capacity occupancy (with max no of items as priority and weight & distance as tie breakers)', () => {
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

  it('Scenario 2', () => {
    expect(
      optimalSubsetWithMaxOccupancy({
        arr: [
          [1, 1],
          [1, 1],
          [1, 1],
          [1, 1],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
        ],
        maxCapacity: 3,
      }),
    ).toStrictEqual([
      [1, 1],
      [1, 1],
      [1, 1],
    ]);
  });

  it('Scenario 3', () => {
    expect(
      optimalSubsetWithMaxOccupancy({
        arr: [
          [1, 2],
          [1, 2],
          [1, 2],
          [1, 3],
          [1, 3],
          [1, 3],
        ],
        maxCapacity: 3,
      }),
    ).toStrictEqual([
      [1, 2],
      [1, 2],
      [1, 2],
    ]);
  });

  it('Scenario 4', () => {
    expect(
      optimalSubsetWithMaxOccupancy({
        arr: [
          [1, 2],
          [1, 2],
          [1, 2],
          [2, 1],
          [2, 1],
          [2, 1],
        ],
        maxCapacity: 3,
      }),
    ).toStrictEqual([
      [1, 2],
      [1, 2],
      [1, 2],
    ]);
  });
});
