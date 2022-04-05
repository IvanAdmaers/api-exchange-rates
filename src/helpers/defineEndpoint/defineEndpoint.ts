import { Endpoint } from '../../typescript/objects';

/**
 * This function defines an endpoint
 */
const defineEndpoint = ({
  startDate,
  endDate,
  date,
}: {
  startDate?: string;
  endDate?: string;
  date?: string;
}) => {
  if (startDate && endDate) {
    return Endpoint.Timeseries;
  }

  if (date) {
    return Endpoint.Historical;
  }

  return Endpoint.Latest;
};

export default defineEndpoint;
