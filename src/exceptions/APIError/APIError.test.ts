import APIError from '.';

describe('APIError', () => {
  it('should return the error object from the static class', () => {
    const Error = APIError.notFound();

    expect(Error instanceof APIError).toBe(true);
    expect(typeof Error.code).toBe('number');
    expect(typeof Error.message).toBe('string');
  });

  it('should return the error object from the static class with a custom message', () => {
    const text = 'Not found custom text';
    const Error = APIError.notFound(text);

    expect(Error instanceof APIError).toBe(true);
    expect(typeof Error.code).toBe('number');
    expect(Error.message).toBe(text);
  });

  it('should return an error object', () => {
    const code = 404;
    const message = 'Page not found';

    const Error = new APIError(code, message);

    expect(Error.code).toBe(code);
    expect(Error.message).toBe(message);
  });
});
