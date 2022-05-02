import isValidDateFormat from '.';

describe('isValidDateFormat', () => {
  it('should return true for a valid date', () => {
    expect(isValidDateFormat('2022-05-02')).toBe(true);
  });

  it('should return false for an invalid date 1', () => {
    expect(isValidDateFormat('2022/05/02')).toBe(false);
  });

  it('should return false for an invalid date 2', () => {
    expect(isValidDateFormat('2022-5-2')).toBe(false);
  });

  it('should return false for an invalid date 3', () => {
    expect(isValidDateFormat('2022-05-2')).toBe(false);
  });

  it('should return false for an invalid date 4', () => {
    expect(isValidDateFormat('2022-5-02')).toBe(false);
  });

  it('should return false for an invalid date 5', () => {
    expect(isValidDateFormat('2022-05/02')).toBe(false);
  });
});
