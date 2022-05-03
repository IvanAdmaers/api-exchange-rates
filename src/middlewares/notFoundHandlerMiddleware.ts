import { Request, Response, NextFunction } from 'express';

import { APIError } from '../exceptions';

const notFoundHandlerMiddleware =
  () => (req: Request, res: Response, next: NextFunction) =>
    next(APIError.notFound());

export default notFoundHandlerMiddleware;
