import { Request, Response, NextFunction } from 'express';
import cache from 'memory-cache-pro';
import { isProduction as isProductionMode } from '../utills';

const isProduction: boolean = isProductionMode();

interface CustomExpressResponse extends Omit<Response, 'send'> {
  sendResponse: Function;
  send: Function;
}

/**
 * This middleware makes caching
 *
 * @param {number} duration - Cache duration in milliseconds
 * @param {object} options - Options
 */
const cacheMiddleware =
  (
    duration: number,
    {
      cacheInDevelopment = false,
      headers = { 'Content-Type': 'application/json; charset=utf-8' },
    }: {
      cacheInDevelopment?: boolean;
      headers?: { [key: string]: string };
    } = {}
  ) =>
  (req: Request, res: CustomExpressResponse, next: NextFunction) => {
    if (!isProduction && !cacheInDevelopment) {
      return next();
    }

    const url: string = req.originalUrl ?? req.url;
    const key: string = `__express__cache__url__${url}`;

    const cacheContent: string | null = cache.get(key);

    if (cacheContent) {
      Object.entries(headers).forEach(([headerKey, headerValue]) => {
        res.setHeader(headerKey, headerValue);
      });

      return res.send(cacheContent);
    }

    res.sendResponse = res.send;

    res.send = (body) => {
      cache.put(key, body, duration);
      res.sendResponse(body);
    };

    return next();
  };

export default cacheMiddleware;
