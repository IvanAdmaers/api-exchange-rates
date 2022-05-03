import { APIError } from '../exceptions';

const notFoundHandlerMiddleware = () => (req, res, next) =>
  next(APIError.notFound());

export default notFoundHandlerMiddleware;
