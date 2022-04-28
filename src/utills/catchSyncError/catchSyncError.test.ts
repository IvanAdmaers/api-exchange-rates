import catchSyncError from './catchSyncError';

describe('catchSyncError', () => {
  it('should call an input function with passed arguments', () => {
    const functionArguments: Array<number | string | Array<number> | object> = [
      1,
      'lol',
      [2],
      { a: 3 },
    ];
    const iNeedArgumentsFunction = jest.fn();

    const [error] = catchSyncError(
      iNeedArgumentsFunction,
      ...functionArguments
    );

    expect(error).toBe(null);
    expect(iNeedArgumentsFunction).toBeCalledWith(...functionArguments);
  });

  it('should call an input function without arguments', () => {
    const iNeedArgumentsFunction: Function = jest.fn();

    const [error] = catchSyncError(iNeedArgumentsFunction);

    expect(error).toBe(null);
    expect(iNeedArgumentsFunction).toBeCalledWith();
  });

  it('should catch an error', () => {
    const angryFunction = (a: number) => {
      if (a) {
        throw new Error('Why do we need `a`?');
      }

      throw new Error('Where is `a`???');
    };

    const [error, result] = catchSyncError(angryFunction, 1);

    expect(error).toBeTruthy();
    expect(result).toBe(undefined);
  });

  it('should not catch an error', () => {
    const string: string = 'Sup';
    const goodFunction: Function = (): string => string;

    const [error, result] = catchSyncError(goodFunction);

    expect(error).toBe(null);
    expect(result).toBe(string);
  });
});
