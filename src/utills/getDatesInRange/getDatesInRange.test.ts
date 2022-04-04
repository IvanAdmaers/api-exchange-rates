import getDatesInRange from '.';

describe('getDatesInRange', () => {
  it('should return a correct result', () => {
    const startDate: Date = new Date('01-01-1999');
    const endDate: Date = new Date('01-03-1999');
    const output: Array<Date> = [startDate, new Date('01-02-1999'), endDate];

    const result: Array<Date> = getDatesInRange(startDate, endDate);

    const every: boolean = output.every((expectedDate: Date) =>
      result.find(
        (resultDate: Date) => expectedDate.getTime() === resultDate.getTime()
      )
    );

    expect(every).toBe(true);
  });

  it('should return a correct result when an end date is less than a start date', () => {
    const startDate: Date = new Date('01-03-1999');
    const endDate: Date = new Date('01-01-1999');
    const output: [] = [];

    const result: Array<Date> = getDatesInRange(startDate, endDate);

    expect(result).toEqual(output);
  });
});
