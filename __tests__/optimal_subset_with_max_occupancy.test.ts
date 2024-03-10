import { optimalSubsetWithMaxOccupancy } from '../src/util/optimalSubsetWithMaxOccupancy.js';

describe('Find the subset with optimal capacity occupancy (with max no of items as priority and weight & distance as tie breakers)', () => {
  it('Scenario 1', () => {
    expect(
      optimalSubsetWithMaxOccupancy({
        arr: [
          [1, 1, 'id'],
          [2, 1, 'id'],
          [3, 1, 'id'],
          [4, 1, 'id'],
        ],
        maxCapacity: 3,
      }),
    ).toStrictEqual([
      [1, 1, 'id'],
      [2, 1, 'id'],
    ]);
  });

  it('Scenario 2', () => {
    expect(
      optimalSubsetWithMaxOccupancy({
        arr: [
          [1, 1, 'id'],
          [1, 1, 'id'],
          [1, 1, 'id'],
          [1, 1, 'id'],
          [1, 1, 'id'],
          [2, 1, 'id'],
          [3, 1, 'id'],
          [4, 1, 'id'],
        ],
        maxCapacity: 3,
      }),
    ).toStrictEqual([
      [1, 1, 'id'],
      [1, 1, 'id'],
      [1, 1, 'id'],
    ]);
  });

  it('Scenario 3', () => {
    expect(
      optimalSubsetWithMaxOccupancy({
        arr: [
          [1, 2, 'id'],
          [1, 2, 'id'],
          [1, 2, 'id'],
          [1, 3, 'id'],
          [1, 3, 'id'],
          [1, 3, 'id'],
        ],
        maxCapacity: 3,
      }),
    ).toStrictEqual([
      [1, 2, 'id'],
      [1, 2, 'id'],
      [1, 2, 'id'],
    ]);
  });

  it('Scenario 4', () => {
    expect(
      optimalSubsetWithMaxOccupancy({
        arr: [
          [1, 2, 'id'],
          [1, 2, 'id'],
          [1, 2, 'id'],
          [2, 1, 'id'],
          [2, 1, 'id'],
          [2, 1, 'id'],
        ],
        maxCapacity: 3,
      }),
    ).toStrictEqual([
      [1, 2, 'id'],
      [1, 2, 'id'],
      [1, 2, 'id'],
    ]);
  });
});
