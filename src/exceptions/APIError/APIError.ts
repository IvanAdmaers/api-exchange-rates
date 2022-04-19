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
}

export default APIError;