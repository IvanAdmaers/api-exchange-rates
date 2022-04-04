const getErrorBody = (code, errorText = '') => ({
  success: false,
  code,
  error: errorText,
});

export default getErrorBody;
