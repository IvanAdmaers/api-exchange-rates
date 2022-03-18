import APIError from '../exceptions/APIError.js';

const notFoundHandlerMiddleware = () => (req, res, next) =>
  next(APIError.notFound());

export default notFoundHandlerMiddleware;
