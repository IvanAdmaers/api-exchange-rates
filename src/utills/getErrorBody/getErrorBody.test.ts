import getErrorBody from '.';

describe('getErrorBody', () => {
  it('should return a correct result', () => {
    const code: number = 100;
    const info: string = 'Something went wrong';

    const output: object = { success: false, error: { code, info } };

    expect(getErrorBody(code, info)).toEqual(output);
  });
});
