import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const values = [1, 2, 3];
    const linkedList = generateLinkedList(values);

    // expected structure
    const expected = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(linkedList).toStrictEqual(expected);
  });

  // match comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values = ['a', 'b', 'c'];
    const linkedList = generateLinkedList(values);

    // Snapshot testing: Jest will save this object structure
    // in a __snapshots__ folder the first time
    expect(linkedList).toMatchSnapshot();
  });
});
