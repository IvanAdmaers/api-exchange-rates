import APIError from '.';

describe('APIError', () => {
  it('should return the error object from the static class', () => {
    const error = APIError.notFound();

    expect(error instanceof APIError).toBe(true);
    expect(typeof error.code).toBe('number');
    expect(typeof error.message).toBe('string');
  });

  it('should return the error object from the static class with a custom message', () => {
    const text = 'Not found custom text';
    const error = APIError.notFound(text);

    expect(error instanceof APIError).toBe(true);
    expect(typeof error.code).toBe('number');
    expect(error.message).toBe(text);
  });

  it('should return an error object', () => {
    const code = 404;
    const message = 'Page not found';

    const error = new APIError(code, message);

    expect(error.code).toBe(code);
    expect(error.message).toBe(message);
  });
});
