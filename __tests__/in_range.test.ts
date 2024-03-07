import { inRange } from '../src/util/inRange.js';

describe('Testing is whole number function', () => {
  //
  it('-100, 0, 100 should be true', () => {
    expect(inRange({ min: -100, val: 0, max: 100 })).toBe(true);
  });

  it('-100, -101, 100 should be false', () => {
    expect(inRange({ min: -100, val: -101, max: 100 })).toBe(false);
  });

  it('-100, 101, 100 should be false', () => {
    expect(inRange({ min: -100, val: 101, max: 100 })).toBe(false);
  });
});
