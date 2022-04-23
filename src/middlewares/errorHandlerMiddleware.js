import { APIError } from '../exceptions';

import { getErrorBody } from '../utills';

const errorHandlerMiddleware = () => (error, req, res, next) => {
  if (error instanceof APIError) {
    const status = error.code < 200 ? 200 : error.code;

    return res.status(status).json(getErrorBody(error.code, error.message));
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
