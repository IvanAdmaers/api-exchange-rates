import { EndpointObject } from '../../typescript/objects';
import { DEFAULT_BASE } from '../../constants';

interface Params {
  endpoint: string;
  lastRatesDate?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  symbols?: string;
  amount?: number;
  base?: string;
}

interface Result extends Omit<Params, 'endpoint' | 'lastRatesDate'> {}

const getRequestInfo = ({
  endpoint,
  date,
  startDate,
  endDate,
  symbols,
  amount,
  base,
  lastRatesDate,
}: Params): Result => {
  const result: Result = {};

  const { Latest, Historical, Timeseries } = EndpointObject;

  if (endpoint === Latest) {
    result.date = lastRatesDate;
  }

  if (endpoint === Historical) {
    result.date = date;
  }

  if (endpoint === Timeseries) {
    result.startDate = startDate;
    result.endDate = endDate;
  }

  result.base = !base ? DEFAULT_BASE : base;

  if (symbols) {
    result.symbols = symbols;
  }

  if (amount) {
    result.amount = amount;
  }

  return result;
};

export default getRequestInfo;
