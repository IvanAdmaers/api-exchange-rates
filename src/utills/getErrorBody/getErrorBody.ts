/**
 * This function returns an error body
 */
const getErrorBody = (code: number, errorText: string) => ({
  success: false,
  error: {
    code,
    info: errorText,
  },
});

export default getErrorBody;
