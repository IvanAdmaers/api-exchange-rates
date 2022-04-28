/**
 * This function catches errors in sync function
 */
const catchSyncError = <Result>(
  inputFunction: Function,
  ...inputFunctionArguments
): [null | string, Result | undefined] => {
  try {
    const result = inputFunction(...inputFunctionArguments);

    return [null, result];
  } catch (error) {
    return [error, undefined];
  }
};

export default catchSyncError;
