/**
 * This function checks a date format yyyy-mm-dd
 */
const isValidDateFormat = (date: string): boolean =>
  Boolean(date.match(/^(\d{4})[-](\d{2})[-](\d{2})$/gm));

export default isValidDateFormat;
