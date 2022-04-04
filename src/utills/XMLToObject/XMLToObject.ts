import convert from 'xml-js';

/**
 * This function converts XML to a JS object
 */
const XMLToObject = (XML: string, compact: boolean = true) =>
  convert.xml2js(XML, { compact });

export default XMLToObject;
