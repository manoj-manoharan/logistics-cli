import isNumberAndEqOrGtThanZero from '../src/util/isNumberAndEqOrGtThanZero.js';

describe('Testing is whole number function', () => {
  //
  it('1 should be true', () => {
    expect(isNumberAndEqOrGtThanZero(1)).toBe(true);
  });

  it('0 should be true', () => {
    expect(isNumberAndEqOrGtThanZero(1)).toBe(true);
  });

  //
  it('-1 should be false', () => {
    expect(isNumberAndEqOrGtThanZero(-1)).toBe(false);
  });

  it('Object should be false', () => {
    expect(isNumberAndEqOrGtThanZero({})).toBe(false);
  });
});
