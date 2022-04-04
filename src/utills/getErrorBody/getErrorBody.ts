/**
 * This function returns an error body
 */
const getErrorBody = (code: number, errorText: string) => ({
  success: false,
  code,
  error: errorText,
});

export default getErrorBody;
