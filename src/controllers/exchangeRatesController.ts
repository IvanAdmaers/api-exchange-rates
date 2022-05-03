import { Request, Response, NextFunction } from 'express';
import memory from 'memory-cache-pro';

import { APIError } from '../exceptions';
import {
  modifyRates,
  getRatesList,
  defineEndpoint,
  getRequestInfo,
} from '../helpers';
import {
  RATES_MEMORY_KEY,
  LAST_RATES_DATE_MEMORY_KEY,
  DEFAULT_BASE,
} from '../constants';

const ratesList = memory.get(RATES_MEMORY_KEY);
const lastRatesDate = memory.get(LAST_RATES_DATE_MEMORY_KEY);

interface Queries {
  symbols?: string;
  start_date?: string;
  end_date?: string;
  date?: string;
  amount?: number;
  base?: string;
}

export const rates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      symbols,
      start_date: startDate,
      end_date: endDate,
      date,
    }: Queries = req.query;
    const base: Queries['base'] = req.query.base
      ? (req.query.base as string)
      : DEFAULT_BASE;
    const amount: Queries['amount'] = req.query.amount
      ? +req.query.amount
      : undefined;

    const endpoint = defineEndpoint({ date, startDate, endDate });
    const isTimeseries = endpoint === 'timeseries';

    const currentRatesList = getRatesList({
      rates: ratesList,
      lastRatesDate,
      endpoint,
      date,
      startDate,
      endDate,
    });

    if (!currentRatesList) {
      return next(APIError.noResult());
    }

    const ratesData = modifyRates({
      rates: currentRatesList,
      base,
      symbols,
      amount,
      isTimeseries,
    });

    const requestInfo = getRequestInfo({
      endpoint,
      lastRatesDate,
      date,
      startDate,
      endDate,
      symbols,
      amount,
      base,
    });

    return res.json({
      success: true,
      ...requestInfo,
      rates: ratesData,
    });
  } catch (error) {
    return next(error);
  }
};
