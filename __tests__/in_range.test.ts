import { inRange } from '../src/util/inRange.js';

describe('Testing is whole number function', () => {
  //
  it('1, 10, 5 should be true', () => {
    expect(inRange({ min: 1, max: 10, val: 5 })).toBe(true);
  });

  it('1, 10, 11 should be false', () => {
    expect(inRange({ min: 1, max: 10, val: 11 })).toBe(false);
  });

  it('0, 10, 1 should be true', () => {
    expect(inRange({ min: 0, max: 10, val: 1 })).toBe(true);
  });

  it('-1, 10, 1 should be true', () => {
    expect(inRange({ min: -1, max: 10, val: 1 })).toBe(true);
  });

  it('-1, 10, -2 should be false', () => {
    expect(inRange({ min: -1, max: 10, val: -2 })).toBe(false);
  });
});
