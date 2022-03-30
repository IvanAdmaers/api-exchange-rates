import toFixed from '.';

describe('toFixed', () => {
  it('should return a correct value with a number', (): void => {
    const input: number = 1.3346865133062698;
    const digits: number = 6;
    const output: number = 1.334687;

    expect(toFixed(input, digits)).toBe(output);
  });
});
