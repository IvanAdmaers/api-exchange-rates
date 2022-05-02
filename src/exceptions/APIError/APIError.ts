class APIError {
  public readonly code: number;

  public readonly message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

  public static badRequest(msg: string = 'Some error'): APIError {
    return new APIError(400, msg);
  }

  public static unauthorized(msg: string = 'User unauthorized'): APIError {
    return new APIError(401, msg);
  }

  public static forbidden(msg: string = 'Action forbidden'): APIError {
    return new APIError(403, msg);
  }

  public static notFound(msg: string = 'Not found'): APIError {
    return new APIError(404, msg);
  }

  public static unprocessableEntity(
    msg: string = 'Some params are incorrect'
  ): APIError {
    return new APIError(422, msg);
  }

  public static internal(msg: string = 'Something went wrong'): APIError {
    return new APIError(500, msg);
  }

  public static noResult(
    message: string = 'The current request did not return any results'
  ) {
    return new APIError(207, message);
  }

  public static invalidDate(
    message: string = 'An invalid date has been specified'
  ) {
    return new APIError(203, message);
  }

  public static invalidStartDate(
    message: string = 'No or an invalid \'start_date\' has been specified'
  ) {
    return new APIError(204, message);
  }

  public static invalidEndDate(
    message: string = 'No or an invalid \'end_date\' has been specified'
  ) {
    return new APIError(205, message);
  }

  public static dateNotSpecified(message = 'No date has been specified') {
    return new APIError(301, message);
  }

  public static pecifiedTimeFrameIsTooLong(
    message: string = 'The period specified is too long, expected up to and including 366 days'
  ) {
    return new APIError(206, message);
  }

  public static invalidBase(
    message: string = 'An invalid base currency has been entered'
  ) {
    return new APIError(201, message);
  }

  public static invalidAmount(
    message: string = 'An invalid amount has been entered'
  ) {
    return new APIError(202, message);
  }
}

export default APIError;
