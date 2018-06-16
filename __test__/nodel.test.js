'use strict';

const Node = require('../model/node');

describe('Node class tests', () => {
  test('constructor returns node with given value', (done) => {
    const node = new Node(5);
    expect(node.value).toEqual(5);
    expect(node.next).toBeNull();
    done();
  });
});
