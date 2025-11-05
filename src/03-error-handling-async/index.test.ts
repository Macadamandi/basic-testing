import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(255);
    expect(result).toBe(255);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const callErrorResult = () => throwError('Some error message');
    expect(callErrorResult).toThrow('Some error message');
  });

  test('should throw error with default message if message is not provided', () => {
    const callErrorResult = () => throwError();
    expect(callErrorResult).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const callErrorResult = () => throwCustomError();
    expect(callErrorResult).toThrow(MyAwesomeError);
    expect(callErrorResult).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const callErrorResult = rejectCustomError();
    await expect(callErrorResult).rejects.toThrow(MyAwesomeError);
    await expect(callErrorResult).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
