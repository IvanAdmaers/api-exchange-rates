class APIError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg = 'Some error') {
    return new APIError(400, msg);
  }

  static unauthorized(msg = 'User unauthorized') {
    return new APIError(401, msg);
  }

  static forbidden(msg = 'Action forbidden') {
    return new APIError(403, msg);
  }

  static notFound(msg = 'Not found') {
    return new APIError(404, msg);
  }

  static unprocessableEntity(msg = 'Some params are incorrect') {
    return new APIError(422, msg);
  }

  static internal(msg = 'Something went wrong') {
    return new APIError(500, msg);
  }
}

export default APIError;
