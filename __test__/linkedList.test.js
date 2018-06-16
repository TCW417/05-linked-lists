'use strict';

const LinkedList = require('../model/linkedList');

describe('LinkedList class tests', () => {
  test('ensure constructor returns proper object', (done) => {
    const ll = new LinkedList();
    expect(ll.head).toBeNull();
    expect(ll.tail).toBeNull();
    done();
  });
  test('#push test 1', (done) => {
    const list = new LinkedList();
    list.push(1);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
    done();
  });
  test('#push test 2', (done) => {
    const list = new LinkedList();
    list.push(1, 2, 3);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(3);
    done();
  });
  test('#pop test 0', (done) => {
    const list = new LinkedList();
    const n = list.pop();
    expect(n).toBeNull();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    done();
  });
  test('#pop test 1', (done) => {
    const list = new LinkedList();
    list.push(1);
    const n = list.pop();
    expect(n.value).toEqual(1);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    done();
  });
  test('#pop test 2', (done) => {
    const list = new LinkedList();
    list.push(1);
    list.push(2);
    const n = list.pop();
    expect(n.value).toEqual(2);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
    expect(list.tail.next).toBeNull();
    done();
  });
  test('#pop test 3', (done) => {
    const list = new LinkedList();
    list.push(1, 2, 3);
    const n = list.pop();
    expect(n.value).toEqual(3);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(2);
    expect(list.tail.next).toBeNull();
    done();
  });
  test('#unshift test 1', (done) => {
    const list = new LinkedList();
    list.unshift(1);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
    done();
  });
  test('#unshift test 2', (done) => {
    const list = new LinkedList();
    list.unshift(1, 2, 3);
    expect(list.head.value).toEqual(3);
    expect(list.tail.value).toEqual(1);
    done();
  });
  test('#shift test 0', (done) => {
    const list = new LinkedList();
    const n = list.shift();
    expect(n).toBeNull();
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    done();
  });
  test('#shift test 2', (done) => {
    const list = new LinkedList();
    list.unshift(1);
    list.unshift(2);
    const n = list.shift();
    expect(n.value).toEqual(2);
    expect(list.head.value).toEqual(1);
    expect(list.tail.value).toEqual(1);
    expect(list.tail.next).toBeNull();
    done();
  });
  test('#shift test 3', (done) => {
    const list = new LinkedList();
    list.unshift(1, 2, 3);
    const n = list.shift();
    expect(n.value).toEqual(3);
    expect(list.head.value).toEqual(2);
    expect(list.tail.value).toEqual(1);
    expect(list.tail.next).toBeNull();
    done();
  });
});
