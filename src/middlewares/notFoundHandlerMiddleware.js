import APIError from '../exceptions/APIError';

const notFoundHandlerMiddleware = () => (req, res, next) =>
  next(APIError.notFound());

export default notFoundHandlerMiddleware;
