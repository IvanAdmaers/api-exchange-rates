import { Request, Response, NextFunction } from 'express';

import { APIError } from '../exceptions';
import { isValidDateFormat } from '../utills';

/**
 * This function is a validator middleware
 */
const validatorMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const reqAmount = req.query.amount;

    if (reqAmount) {
      if (!reqAmount || reqAmount === ' ' || Number.isNaN(reqAmount)) {
        return next(APIError.invalidAmount('Amount is not a number'));
      }

      const amount: number = +req.query.amount!;

      if (amount <= 0 || !Number.isSafeInteger(amount)) {
        return next(APIError.invalidAmount('Amount is incorrect'));
      }
    }

    const { date } = req.params;

    if (date) {
      if (!isValidDateFormat(date)) {
        return next(APIError.invalidDate());
      }
    }

    const { start_date: startDateQuery, end_date: endDateQuery } = req.query;

    if (startDateQuery || endDateQuery) {
      if (!startDateQuery) {
        return next(APIError.invalidStartDate());
      }

      if (!endDateQuery) {
        return next(APIError.invalidEndDate());
      }

      if (!isValidDateFormat(startDateQuery as string)) {
        return next(APIError.invalidStartDate());
      }

      if (!isValidDateFormat(endDateQuery as string)) {
        return next(APIError.invalidEndDate());
      }

      const startDate: Date = new Date(startDateQuery as string);
      const endDate: Date = new Date(endDateQuery as string);

      const invalidDateString: string = 'Invalid Date';

      if (startDate.toString() === invalidDateString) {
        return next(APIError.invalidStartDate());
      }

      if (endDate.toString() === invalidDateString) {
        return next(APIError.invalidEndDate());
      }

      if (startDate.getFullYear() > endDate.getFullYear()) {
        return next(APIError.invalidStartDate());
      }

      // TODO: to think about add a validator of days length bettween two dates
      // that now in getRatesList
    }

    return next();
  };

export default validatorMiddleware;
