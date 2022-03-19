import convert from 'xml-js';

const XMLToObject = (XML = '', compact = true) =>
  convert.xml2js(XML, { compact });

export default XMLToObject;
