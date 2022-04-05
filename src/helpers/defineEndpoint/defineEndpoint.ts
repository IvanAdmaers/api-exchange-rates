/**
 * This function defines an endpoint
 */
const defineEndpoint = ({ startDate, endDate, date }) => {
  if (startDate && endDate) {
    return 'timeseries';
  }

  if (date) {
    return 'historical';
  }

  return 'latest';
};

export default defineEndpoint;
