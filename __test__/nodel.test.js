'use strict';

const Node = require('../model/node');

describe('Node class tests', () => {
  test('constructor returns node with given value', () => {
    const node = new Node(5);
    expect(node.value).toEqual(5);
    expect(node.next).toBeNull();
  });

  test('no value results in null in object', () => {
    const node = new Node();
    expect(node.value).toBeNull();
  });

  test('value 0', () => {
    const node = new Node(0);
    expect(node.value).toEqual(0);
  });
});
