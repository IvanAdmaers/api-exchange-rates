import getErrorBody from '.';

describe('getErrorBody', () => {
  it('should return a correct result', () => {
    const code: number = 100;
    const error: string = 'Something went wrong';

    const output: object = { success: false, code, error };

    expect(getErrorBody(code, error)).toEqual(output);
  });
});
