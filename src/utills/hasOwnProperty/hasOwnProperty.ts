/**
 * This function checks has object own property
 */
const hasOwnProperty = (object: object, property: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, property);

export default hasOwnProperty;
