import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import { APIError } from '../exceptions';
import { getErrorBody, hasOwnProperty } from '../utills';

interface SyntaxErrorInterface extends SyntaxError {
  status?: number;
}

const errorHandlerMiddleware =
  () =>
  (
    error: ErrorRequestHandler | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof APIError) {
      return res.status(200).json(getErrorBody(error.code, error.message));
    }

    const possibleSyntaxError = error as SyntaxErrorInterface;

    if (error instanceof SyntaxError && hasOwnProperty(error, 'body')) {
      return res
        .status(possibleSyntaxError.status || 400)
        .json(
          getErrorBody(possibleSyntaxError.status || 400, 'Incorrect request')
        );
    }

    console.error(error);

    return res
      .status(500)
      .json(getErrorBody(500, 'Something went really wrong'));
  };

export default errorHandlerMiddleware;
