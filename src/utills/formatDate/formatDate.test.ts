import formatDate from '.';

describe('formatDate', () => {
  it('should return a correct result with an usual date', () => {
    const date: string = '1999-01-01';

    expect(formatDate(date)).toBe(date);
  });

  it('should return a correct result with an text date', () => {
    const date: string = 'Mon Apr 04 2022 13:44:54';
    const output: string = '2022-04-04';

    expect(formatDate(date)).toBe(output);
  });
});
