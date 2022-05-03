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

  it('should return false for an invalid date 6', () => {
    expect(isValidDateFormat('2022-05-032')).toBe(false);
  });

  it('should return false for an invalid date 7', () => {
    expect(isValidDateFormat('2022-105-03')).toBe(false);
  });

  it('should return false for an invalid date 8', () => {
    expect(isValidDateFormat('20222-05-03')).toBe(false);
  });

  it('should return false for an invalid date 9', () => {
    expect(isValidDateFormat('20220503')).toBe(false);
  });

  it('should return false for an invalid date 10', () => {
    expect(isValidDateFormat('')).toBe(false);
  });

  it('should return false for an invalid date 11', () => {
    expect(isValidDateFormat('hi')).toBe(false);
  });

  it('should return false for an invalid date 12', () => {
    expect(isValidDateFormat('🔫')).toBe(false);
  });

  it('should return false for an invalid date 14', () => {
    expect(isValidDateFormat('U+1F52B')).toBe(false);
  });
});
