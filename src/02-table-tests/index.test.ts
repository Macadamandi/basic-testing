import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 1, action: Action.Subtract, expected: 3 },
  { a: 5, b: 1, action: Action.Subtract, expected: 4 },
  { a: 6, b: 1, action: Action.Multiply, expected: 6 },
  { a: 7, b: 2, action: Action.Multiply, expected: 14 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 9, b: 2, action: Action.Divide, expected: 4.5 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 11, b: 3, action: Action.Exponentiate, expected: 1331 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Performs $action on $a and $b -> $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
