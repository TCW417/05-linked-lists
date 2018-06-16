'use strict';

const LinkedList = require('../model/linkedList');

describe('LinkedList class tests', () => {
  test('ensure constructor returns proper object', (done) => {
    const ll = new LinkedList();
    expect(ll.head).toBeNull();
    expect(ll.tail).toBeNull();
    done();
  });
});
