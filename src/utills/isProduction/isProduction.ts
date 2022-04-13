/**
 * This function checks is the current mode production
 */
const isProduction = (): boolean => process.env.NODE_ENV === 'production';

export default isProduction;
