import cache from 'memory-cache-pro';
import { isProduction as isProductionMode } from '../utills';

const isProduction = isProductionMode();

/**
 * This middleware makes caching
 *
 * @param {number} duration - Cache duration in milliseconds
 * @param {boolean=} cacheInDevelopment - Should it cache in development mode
 */
const cacheMiddleware =
  (
    duration,
    {
      cacheInDevelopment = false,
      headers = { 'Content-Type': 'application/json; charset=utf-8' },
    } = {}
  ) =>
  (req, res, next) => {
    if (!isProduction && !cacheInDevelopment) {
      return next();
    }

    const url = req.originalUrl ?? req.url;
    const key = `__express__cache__url__${url}`;

    const cacheContent = cache.get(key);

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
