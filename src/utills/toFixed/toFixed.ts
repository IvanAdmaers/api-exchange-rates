/**
 * This function calls toFixed to a number
 */
const toFixed = (number: number, digits: number): number =>
  +Number.prototype.toFixed.call(number, digits);

export default toFixed;
