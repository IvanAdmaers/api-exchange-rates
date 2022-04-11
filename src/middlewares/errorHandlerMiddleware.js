import { APIError } from '../exceptions';

import { getErrorBody } from '../utills';

const errorHandlerMiddleware = () => (error, req, res, next) => {
  if (error instanceof APIError) {
    return res.status(error.code).json(getErrorBody(error.code, error.message));
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res
      .status(error.status)
      .json(getErrorBody(error.status, 'Incorrect request'));
  }

  console.error(error);

  return res.status(500).json(getErrorBody(500, 'Something went really wrong'));
};

export default errorHandlerMiddleware;
