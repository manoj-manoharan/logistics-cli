import isWholeNumber from '../src/util/isWholeNumber.js';

describe('Testing is whole number function', () => {
  //
  it('1 should be true', () => {
    expect(isWholeNumber(1)).toBe(true);
  });

  it('0 should be true', () => {
    expect(isWholeNumber(1)).toBe(true);
  });

  //
  it('-1 should be false', () => {
    expect(isWholeNumber(-1)).toBe(false);
  });

  it('Object should be false', () => {
    expect(isWholeNumber({})).toBe(false);
  });
});
