import APIError from '../exceptions/APIError.js';

import { getErrorBody } from '../utills/index.js';

const errorHandlerMiddleware = () => (error, req, res, next) => {
  if (error instanceof APIError) {
    return res.status(error.code).json(getErrorBody(error.message));
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json(getErrorBody('Incorrect request'));
  }

  console.error(error);

  return res.status(500).json(getErrorBody('Something went really wrong'));
};

export default errorHandlerMiddleware;
